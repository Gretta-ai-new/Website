from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import (
    Contact, ContactCreate,
    NewsletterSubscriber, NewsletterCreate,
    DemoRequest, DemoRequestCreate,
    TrialSignup, TrialSignupCreate,
    Analytics
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Gretta AI API is running"}


# Contact Form Submission
@api_router.post("/contact", response_model=dict)
async def create_contact(contact_data: ContactCreate):
    try:
        contact = Contact(**contact_data.dict())
        await db.contacts.insert_one(contact.dict())
        return {"success": True, "message": "Contact request submitted successfully"}
    except Exception as e:
        logging.error(f"Error creating contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact request")


# Newsletter Signup
@api_router.post("/newsletter", response_model=dict)
async def subscribe_newsletter(newsletter_data: NewsletterCreate):
    try:
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one({"email": newsletter_data.email})
        if existing:
            return {"success": True, "message": "You are already subscribed to our newsletter"}
        
        subscriber = NewsletterSubscriber(**newsletter_data.dict())
        await db.newsletter_subscribers.insert_one(subscriber.dict())
        return {"success": True, "message": "Successfully subscribed to newsletter"}
    except Exception as e:
        logging.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")


# Demo Request
@api_router.post("/demo-request", response_model=dict)
async def create_demo_request(demo_data: DemoRequestCreate):
    try:
        demo_request = DemoRequest(**demo_data.dict())
        await db.demo_requests.insert_one(demo_request.dict())
        return {"success": True, "message": "Demo request submitted successfully"}
    except Exception as e:
        logging.error(f"Error creating demo request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit demo request")


# Free Trial Signup
@api_router.post("/trial-signup", response_model=dict)
async def create_trial_signup(trial_data: TrialSignupCreate):
    try:
        # Check if email already exists
        existing = await db.trial_signups.find_one({"email": trial_data.email})
        if existing:
            return {"success": True, "message": "You have already signed up for a free trial"}
        
        trial_signup = TrialSignup(**trial_data.dict())
        await db.trial_signups.insert_one(trial_signup.dict())
        return {"success": True, "message": "Free trial signup successful! We'll contact you shortly."}
    except Exception as e:
        logging.error(f"Error creating trial signup: {e}")
        raise HTTPException(status_code=500, detail="Failed to sign up for trial")


# Get Analytics
@api_router.get("/analytics", response_model=Analytics)
async def get_analytics():
    try:
        total_contacts = await db.contacts.count_documents({})
        total_demo_requests = await db.demo_requests.count_documents({})
        total_trial_signups = await db.trial_signups.count_documents({})
        total_newsletter_subscribers = await db.newsletter_subscribers.count_documents({})
        
        return Analytics(
            total_contacts=total_contacts,
            total_demo_requests=total_demo_requests,
            total_trial_signups=total_trial_signups,
            total_newsletter_subscribers=total_newsletter_subscribers
        )
    except Exception as e:
        logging.error(f"Error getting analytics: {e}")
        raise HTTPException(status_code=500, detail="Failed to get analytics")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

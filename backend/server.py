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
from retell import Retell

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Retell AI client
retell_api_key = os.environ.get('RETELL_API_KEY')
retell = Retell(api_key=retell_api_key) if retell_api_key else None

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


# Demo Request (also used for Booking Appointments)
@api_router.post("/demo-request", response_model=dict)
async def create_demo_request(demo_data: DemoRequestCreate):
    try:
        demo_request = DemoRequest(**demo_data.dict())
        result = await db.demo_requests.insert_one(demo_request.dict())
        
        # Return the data in a format suitable for webhooks
        return {
            "success": True, 
            "message": "Demo request submitted successfully",
            "data": {
                "id": str(result.inserted_id),
                "name": demo_request.name,
                "email": demo_request.email,
                "phone": demo_request.phone,
                "company": demo_request.company,
                "interested_in": demo_request.plan_type,
                "timestamp": demo_request.created_at.isoformat()
            }
        }
    except Exception as e:
        logging.error(f"Error creating demo request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit demo request")


# Webhook endpoint for external integrations (HubSpot, Zapier, etc.)
@api_router.get("/webhook/bookings", response_model=list)
async def get_bookings_webhook():
    """Webhook endpoint to fetch recent booking/demo requests for integration with HubSpot/Zapier"""
    try:
        # Get last 100 demo requests
        demo_requests = await db.demo_requests.find().sort("created_at", -1).limit(100).to_list(100)
        
        # Format for webhook consumption
        formatted_data = []
        for req in demo_requests:
            formatted_data.append({
                "id": req.get("id"),
                "name": req.get("name"),
                "email": req.get("email"),
                "phone": req.get("phone"),
                "company": req.get("company"),
                "interested_in": req.get("plan_type"),
                "preferred_time": req.get("preferred_time"),
                "created_at": req.get("created_at")
            })
        
        return formatted_data
    except Exception as e:
        logging.error(f"Error fetching bookings webhook: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch bookings")


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

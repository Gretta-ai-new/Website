from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime, timedelta
import httpx
from models import (
    Contact, ContactCreate,
    NewsletterSubscriber, NewsletterCreate,
    DemoRequest, DemoRequestCreate,
    TrialSignup, TrialSignupCreate,
    Analytics
)
from retell import Retell
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInputForCreate as ContactInput
from hubspot.crm.contacts import SimplePublicObjectInput as ContactUpdateInput
from hubspot.crm.deals import SimplePublicObjectInputForCreate as DealInput
from hubspot.crm.objects.notes import SimplePublicObjectInputForCreate as NoteInput

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Retell AI client
retell_api_key = os.environ.get('RETELL_API_KEY')
retell = Retell(api_key=retell_api_key) if retell_api_key else None

# Cal.com API configuration
cal_api_key = os.environ.get('CAL_API_KEY')
cal_api_url = "https://api.cal.com/v2"

# HubSpot client
hubspot_api_key = os.environ.get('HUBSPOT_API_KEY')
hubspot_client = HubSpot(access_token=hubspot_api_key) if hubspot_api_key else None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ HubSpot Integration Helpers ============

async def sync_contact_to_hubspot(name: str, email: str, phone: str = None, company: str = None, interest: str = None):
    """Create or update a contact in HubSpot"""
    if not hubspot_client:
        logging.warning("HubSpot not configured, skipping sync")
        return None
    
    try:
        # Split name into first and last name
        name_parts = name.split(" ", 1)
        firstname = name_parts[0]
        lastname = name_parts[1] if len(name_parts) > 1 else ""
        
        properties = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
        }
        
        if phone:
            properties["phone"] = phone
        if company:
            properties["company"] = company
        
        # Try to get existing contact by email
        try:
            existing = hubspot_client.crm.contacts.basic_api.get_by_id(
                email,
                id_property="email"
            )
            # Update existing contact
            update_obj = ContactUpdateInput(properties=properties)
            response = hubspot_client.crm.contacts.basic_api.update(
                contact_id=existing.id,
                simple_public_object_input=update_obj
            )
            logging.info(f"Updated HubSpot contact: {existing.id}")
            return {"hubspot_id": existing.id, "action": "updated"}
        except Exception as e:
            if "404" in str(e) or "NOT_FOUND" in str(e).upper():
                # Contact doesn't exist, create new one
                create_obj = ContactInput(properties=properties)
                response = hubspot_client.crm.contacts.basic_api.create(
                    simple_public_object_input_for_create=create_obj
                )
                logging.info(f"Created HubSpot contact: {response.id}")
                return {"hubspot_id": response.id, "action": "created"}
            else:
                raise
    
    except Exception as e:
        logging.error(f"Error syncing to HubSpot: {e}")
        return None


async def create_hubspot_note(contact_id: str, note_text: str):
    """Create a note associated with a contact in HubSpot"""
    if not hubspot_client:
        return None
    
    try:
        properties = {
            "hs_note_body": note_text,
            "hs_timestamp": datetime.utcnow().isoformat() + "Z"
        }
        
        input_obj = NoteInput(properties=properties)
        
        # Create the note
        response = hubspot_client.crm.objects.notes.basic_api.create(
            simple_public_object_input=input_obj
        )
        
        # Associate note with contact
        note_id = response.id
        hubspot_client.crm.objects.notes.associations_api.create(
            note_id=note_id,
            to_object_type="contact",
            to_object_id=contact_id,
            association_type_id=202  # Default note_to_contact association type
        )
        
        logging.info(f"Created HubSpot note {note_id} for contact {contact_id}")
        return {"note_id": note_id}
    
    except Exception as e:
        logging.error(f"Error creating HubSpot note: {e}")
        return None


async def create_hubspot_deal(contact_email: str, deal_name: str, interest: str, amount: float = 0):
    """Create a deal in HubSpot for trial signups"""
    if not hubspot_client:
        return None
    
    try:
        properties = {
            "dealname": deal_name,
            "dealstage": "appointmentscheduled",  # Trial signup stage
            "pipeline": "default",
            "amount": str(amount),
        }
        
        input_obj = DealInput(properties=properties)
        
        # Create the deal
        response = hubspot_client.crm.deals.basic_api.create(
            simple_public_object_input=input_obj
        )
        
        deal_id = response.id
        
        # Associate deal with contact if possible
        try:
            contact = hubspot_client.crm.contacts.basic_api.get_by_id(
                contact_email,
                id_property="email"
            )
            
            hubspot_client.crm.deals.associations_api.create(
                deal_id=deal_id,
                to_object_type="contact",
                to_object_id=contact.id,
                association_type_id=3  # Default deal_to_contact association type
            )
            
            logging.info(f"Associated deal {deal_id} with contact {contact.id}")
        except Exception as e:
            logging.warning(f"Could not associate deal with contact: {e}")
        
        logging.info(f"Created HubSpot deal: {deal_id}")
        return {"deal_id": deal_id}
    
    except Exception as e:
        logging.error(f"Error creating HubSpot deal: {e}")
        return None


# ============ Cal.com Integration Helpers ============

async def create_cal_booking(name: str, email: str, event_type_slug: str = "30min", username: str = "gretta-ai"):
    """Create a booking in Cal.com"""
    if not cal_api_key:
        logging.warning("Cal.com not configured, skipping booking creation")
        return None
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Authorization": f"Bearer {cal_api_key}",
                "Content-Type": "application/json",
                "cal-api-version": "2024-08-13"
            }
            
            # Split name
            name_parts = name.split(" ", 1)
            firstname = name_parts[0]
            
            # Get available slots first
            tomorrow = (datetime.utcnow() + timedelta(days=1)).isoformat() + "Z"
            next_week = (datetime.utcnow() + timedelta(days=7)).isoformat() + "Z"
            
            slots_response = await client.get(
                f"{cal_api_url}/slots",
                headers=headers,
                params={
                    "eventTypeSlug": event_type_slug,
                    "username": username,
                    "startTime": tomorrow,
                    "endTime": next_week,
                    "timeZone": "UTC"
                }
            )
            
            if slots_response.status_code != 200:
                logging.error(f"Cal.com slots error: {slots_response.text}")
                return None
            
            slots_data = slots_response.json()
            available_slots = slots_data.get("data", {})
            
            # Get first available slot
            first_slot = None
            for date, slots in available_slots.items():
                if slots and len(slots) > 0:
                    first_slot = slots[0].get("start")
                    break
            
            if not first_slot:
                logging.warning("No available Cal.com slots found")
                return None
            
            # Create booking
            booking_payload = {
                "start": first_slot,
                "eventTypeSlug": event_type_slug,
                "username": username,
                "attendee": {
                    "name": name,
                    "email": email,
                    "timeZone": "UTC"
                },
                "metadata": {
                    "source": "gretta-ai-website"
                }
            }
            
            response = await client.post(
                f"{cal_api_url}/bookings",
                headers=headers,
                json=booking_payload
            )
            
            if response.status_code >= 400:
                logging.error(f"Cal.com booking error: {response.text}")
                return None
            
            result = response.json()
            logging.info(f"Created Cal.com booking: {result}")
            return result.get("data", {})
    
    except Exception as e:
        logging.error(f"Error creating Cal.com booking: {e}")
        return None


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
        
        # Sync to HubSpot
        hubspot_result = await sync_contact_to_hubspot(
            name=contact_data.name,
            email=contact_data.email,
            company=getattr(contact_data, 'company', None),
            interest=getattr(contact_data, 'message', None)
        )
        
        # Add note with form details if contact was created/updated in HubSpot
        if hubspot_result and hubspot_result.get("hubspot_id"):
            note_text = f"Contact Form Submission\n\nName: {contact_data.name}\nEmail: {contact_data.email}\nMessage: {getattr(contact_data, 'message', 'N/A')}"
            await create_hubspot_note(hubspot_result["hubspot_id"], note_text)
        
        return {
            "success": True, 
            "message": "Contact request submitted successfully",
            "hubspot_synced": hubspot_result is not None
        }
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
        
        # Sync to HubSpot
        hubspot_result = await sync_contact_to_hubspot(
            name=demo_request.name,
            email=demo_request.email,
            phone=demo_request.phone,
            company=demo_request.company,
            interest=demo_request.plan_type
        )
        
        # Add note with booking details if contact was created/updated in HubSpot
        if hubspot_result and hubspot_result.get("hubspot_id"):
            note_text = f"Booking/Demo Request\n\nName: {demo_request.name}\nEmail: {demo_request.email}\nPhone: {demo_request.phone}\nCompany: {demo_request.company}\nInterest: {demo_request.plan_type}"
            await create_hubspot_note(hubspot_result["hubspot_id"], note_text)
        
        # Create Cal.com booking
        cal_booking = await create_cal_booking(
            name=demo_request.name,
            email=demo_request.email
        )
        
        # Return the data in a format suitable for webhooks
        return {
            "success": True, 
            "message": "Demo request submitted successfully",
            "hubspot_synced": hubspot_result is not None,
            "cal_booking_created": cal_booking is not None,
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
        
        # Sync to HubSpot - create contact
        hubspot_result = await sync_contact_to_hubspot(
            name=trial_data.name,
            email=trial_data.email,
            company=trial_data.company,
            interest=trial_data.plan
        )
        
        # Create HubSpot deal for trial signup
        if hubspot_result:
            deal_name = f"Trial Signup - {trial_data.plan} - {trial_data.name}"
            deal_result = await create_hubspot_deal(
                contact_email=trial_data.email,
                deal_name=deal_name,
                interest=trial_data.plan,
                amount=0
            )
            
            # Add note with trial details
            if hubspot_result.get("hubspot_id"):
                note_text = f"Free Trial Signup\n\nName: {trial_data.name}\nEmail: {trial_data.email}\nCompany: {trial_data.company}\nPlan: {trial_data.plan}"
                await create_hubspot_note(hubspot_result["hubspot_id"], note_text)
        
        return {
            "success": True, 
            "message": "Free trial signup successful! We'll contact you shortly.",
            "hubspot_synced": hubspot_result is not None
        }
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


# Retell AI Web Call endpoint
@api_router.post("/retell/web-call")
async def create_retell_web_call():
    """Create a Retell web call for real-time voice conversation"""
    try:
        if not retell:
            raise HTTPException(status_code=500, detail="Retell AI not configured")
        
        # Use pre-created agent from dashboard
        agent_id = "agent_c66728951e5ce6e61b79b01af9"
        
        # Create web call with the agent
        web_call_response = retell.call.create_web_call(
            agent_id=agent_id,
        )
        
        return {
            "access_token": web_call_response.access_token,
            "call_id": web_call_response.call_id,
            "agent_id": agent_id
        }
        
    except Exception as e:
        logging.error(f"Error creating Retell web call: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create web call: {str(e)}")


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

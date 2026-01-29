# Gretta AI - HubSpot & Zapier Integration Guide

## Overview
This guide explains how to connect Gretta AI booking submissions to HubSpot or Zapier for automatic lead capture and CRM integration.

---

## Current Setup

### What Happens Now:
1. User fills out "Book Appointment" form on your landing page
2. Data is saved to MongoDB database (`demo_requests` collection)
3. User is automatically redirected to Cal.com booking page (https://cal.com/gretta-ai/30min)
4. Toast notification confirms submission

### Data Captured:
- Full Name
- Business Name / Company
- Email
- Phone (with country code)
- Interested In (Service type)
- Timestamp

---

## Integration Options

### Option 1: Zapier Integration (Recommended - Easiest)

#### Step 1: Create Webhook in Zapier
1. Log into your Zapier account
2. Create a new Zap
3. Choose trigger: **"Webhooks by Zapier"**
4. Select **"Catch Hook"**
5. Copy the webhook URL provided by Zapier

#### Step 2: Configure Backend to Send to Zapier
Add this environment variable to `/app/backend/.env`:
```
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
```

#### Step 3: Update Backend Code
In `/app/backend/server.py`, modify the `create_demo_request` function to send data to Zapier:

```python
import httpx

@api_router.post("/demo-request", response_model=dict)
async def create_demo_request(demo_data: DemoRequestCreate):
    try:
        demo_request = DemoRequest(**demo_data.dict())
        await db.demo_requests.insert_one(demo_request.dict())
        
        # Send to Zapier webhook
        zapier_url = os.environ.get('ZAPIER_WEBHOOK_URL')
        if zapier_url:
            async with httpx.AsyncClient() as client:
                await client.post(zapier_url, json={
                    "name": demo_request.name,
                    "email": demo_request.email,
                    "phone": demo_request.phone,
                    "company": demo_request.company,
                    "interested_in": demo_request.plan_type,
                    "timestamp": demo_request.created_at.isoformat()
                })
        
        return {"success": True, "message": "Demo request submitted successfully"}
    except Exception as e:
        logging.error(f"Error creating demo request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit demo request")
```

#### Step 4: Connect to Your CRM in Zapier
1. In your Zap, add action: **"Create Contact in [Your CRM]"**
2. Map fields:
   - Name → Contact Name
   - Email → Email Address
   - Phone → Phone Number
   - Company → Company Name
   - Interested In → Custom Field or Notes
3. Test and activate your Zap

---

### Option 2: HubSpot Direct Integration

#### Step 1: Get HubSpot API Key
1. Log into HubSpot
2. Go to Settings → Integrations → API Key
3. Create or copy your API key

#### Step 2: Add to Environment Variables
Add to `/app/backend/.env`:
```
HUBSPOT_API_KEY=your-hubspot-api-key-here
```

#### Step 3: Install HubSpot SDK
```bash
cd /app/backend
pip install hubspot-api-client
pip freeze > requirements.txt
```

#### Step 4: Update Backend Code
In `/app/backend/server.py`:

```python
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInputForCreate, ApiException

# Initialize HubSpot client
hubspot_api_key = os.environ.get('HUBSPOT_API_KEY')
hubspot_client = HubSpot(api_key=hubspot_api_key) if hubspot_api_key else None

@api_router.post("/demo-request", response_model=dict)
async def create_demo_request(demo_data: DemoRequestCreate):
    try:
        demo_request = DemoRequest(**demo_data.dict())
        await db.demo_requests.insert_one(demo_request.dict())
        
        # Send to HubSpot
        if hubspot_client:
            try:
                properties = {
                    "email": demo_request.email,
                    "firstname": demo_request.name.split()[0] if demo_request.name else "",
                    "lastname": " ".join(demo_request.name.split()[1:]) if len(demo_request.name.split()) > 1 else "",
                    "phone": demo_request.phone,
                    "company": demo_request.company,
                    "interested_in": demo_request.plan_type,
                }
                simple_public_object_input = SimplePublicObjectInputForCreate(properties=properties)
                hubspot_client.crm.contacts.basic_api.create(simple_public_object_input_for_create=simple_public_object_input)
            except ApiException as e:
                logging.error(f"HubSpot API error: {e}")
        
        return {"success": True, "message": "Demo request submitted successfully"}
    except Exception as e:
        logging.error(f"Error creating demo request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit demo request")
```

#### Step 5: Restart Backend
```bash
sudo supervisorctl restart backend
```

---

### Option 3: Webhook Polling (For Any CRM)

Your backend already has a webhook endpoint that can be polled:

**Endpoint:** `GET /api/webhook/bookings`

**Returns:** Array of recent booking submissions (last 100)

**Example Response:**
```json
[
  {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+61 400 123 456",
    "company": "ABC Corp",
    "interested_in": "Inbound Customer Service & Bookings",
    "preferred_time": "ASAP",
    "created_at": "2025-01-30T10:30:00"
  }
]
```

**How to Use:**
1. Set up a scheduled job (cron) in Zapier/Make.com/n8n
2. Poll this endpoint every 5-15 minutes
3. Check for new entries
4. Send to your CRM

---

## Testing Your Integration

1. Go to your landing page
2. Click "Book Appointment"
3. Fill out the form with test data
4. Submit the form
5. Check your CRM/Zapier to verify the lead was created

---

## Troubleshooting

### Leads Not Appearing in CRM?
1. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
2. Verify environment variables are set correctly
3. Test webhook URL manually with curl
4. Check Zapier/HubSpot activity logs

### Need Help?
Contact your development team or refer to:
- Zapier Webhooks: https://zapier.com/help/create/code-webhooks/trigger-zaps-from-webhooks
- HubSpot API: https://developers.hubspot.com/docs/api/crm/contacts

---

## Current Backend URL
Your backend API is accessible at the URL stored in `/app/frontend/.env` as `REACT_APP_BACKEND_URL`.

Webhook endpoint: `{REACT_APP_BACKEND_URL}/api/webhook/bookings`

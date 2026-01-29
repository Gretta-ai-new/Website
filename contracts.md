# Gretta AI Landing Page - Backend Integration Contracts

## API Endpoints

### 1. Contact Form Submission
**POST /api/contact**
- Request Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string (optional)",
    "message": "string",
    "company": "string (optional)"
  }
  ```
- Response: `{ "success": true, "message": "Contact request submitted" }`
- MongoDB Collection: `contacts`

### 2. Newsletter Signup
**POST /api/newsletter**
- Request Body:
  ```json
  {
    "email": "string"
  }
  ```
- Response: `{ "success": true, "message": "Subscribed to newsletter" }`
- MongoDB Collection: `newsletter_subscribers`

### 3. Demo Request
**POST /api/demo-request**
- Request Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string (optional)",
    "planType": "string (SMS Only | Inbound + SMS | Outbound Full Suite)",
    "preferredTime": "string (optional)"
  }
  ```
- Response: `{ "success": true, "message": "Demo request submitted" }`
- MongoDB Collection: `demo_requests`

### 4. Free Trial Signup
**POST /api/trial-signup**
- Request Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string (optional)",
    "planType": "string"
  }
  ```
- Response: `{ "success": true, "message": "Trial signup submitted" }`
- MongoDB Collection: `trial_signups`

### 5. Get Analytics
**GET /api/analytics**
- Response:
  ```json
  {
    "totalContacts": "number",
    "totalDemoRequests": "number",
    "totalTrialSignups": "number",
    "totalNewsletterSubscribers": "number"
  }
  ```

## Frontend Changes
- Remove mock.js (currently no mock data)
- Update buttons to trigger API calls
- Add form validation using react-hook-form + zod
- Add toast notifications for success/error states
- Add loading states for all API calls

## MongoDB Models
- Contact, NewsletterSubscriber, DemoRequest, TrialSignup models with timestamps
- Email validation for all models
- Phone validation where applicable

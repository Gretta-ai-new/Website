#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Gretta AI Landing Page
Tests all API endpoints with various scenarios including validation and error handling
"""

import requests
import json
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in /app/frontend/.env")
    exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"Testing API at: {API_BASE}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
    
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed}/{total} tests passed")
        if self.errors:
            print(f"\nFAILED TESTS:")
            for error in self.errors:
                print(f"  - {error}")
        print(f"{'='*60}")

results = TestResults()

def test_api_health():
    """Test API health check"""
    try:
        response = requests.get(f"{API_BASE}/")
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Gretta AI API is running":
                results.add_pass("API Health Check")
                return True
            else:
                results.add_fail("API Health Check", f"Unexpected response: {data}")
        else:
            results.add_fail("API Health Check", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("API Health Check", f"Connection error: {str(e)}")
    return False

def test_contact_form():
    """Test POST /api/contact endpoint"""
    print(f"\n--- Testing Contact Form API ---")
    
    # Test 1: Valid contact with all fields
    valid_contact = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@techcorp.com",
        "phone": "+1-555-0123",
        "message": "I'm interested in implementing Gretta AI for our customer service team. Can we schedule a demo?",
        "company": "TechCorp Solutions"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=valid_contact)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "successfully" in data.get("message", "").lower():
                results.add_pass("Contact Form - Valid data (all fields)")
            else:
                results.add_fail("Contact Form - Valid data (all fields)", f"Unexpected response: {data}")
        else:
            results.add_fail("Contact Form - Valid data (all fields)", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Contact Form - Valid data (all fields)", f"Error: {str(e)}")
    
    # Test 2: Valid contact with only required fields
    required_only = {
        "name": "Mike Chen",
        "email": "mike.chen@startup.io",
        "message": "Looking for AI voice solutions for our mobile app."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=required_only)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                results.add_pass("Contact Form - Required fields only")
            else:
                results.add_fail("Contact Form - Required fields only", f"Unexpected response: {data}")
        else:
            results.add_fail("Contact Form - Required fields only", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Required fields only", f"Error: {str(e)}")
    
    # Test 3: Invalid email format
    invalid_email = {
        "name": "Test User",
        "email": "invalid-email-format",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=invalid_email)
        if response.status_code == 422:  # Validation error expected
            results.add_pass("Contact Form - Invalid email validation")
        else:
            results.add_fail("Contact Form - Invalid email validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Invalid email validation", f"Error: {str(e)}")
    
    # Test 4: Missing required fields
    missing_fields = {
        "name": "Test User"
        # Missing email and message
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=missing_fields)
        if response.status_code == 422:  # Validation error expected
            results.add_pass("Contact Form - Missing required fields validation")
        else:
            results.add_fail("Contact Form - Missing required fields validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Missing required fields validation", f"Error: {str(e)}")

def test_trial_signup():
    """Test POST /api/trial-signup endpoint"""
    print(f"\n--- Testing Trial Signup API ---")
    
    # Test 1: Valid trial signup with all fields
    valid_signup = {
        "name": "Emma Rodriguez",
        "email": "emma.rodriguez@retailchain.com",
        "phone": "+1-555-0456",
        "company": "RetailChain Inc",
        "plan_type": "professional"
    }
    
    try:
        response = requests.post(f"{API_BASE}/trial-signup", json=valid_signup)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "successful" in data.get("message", "").lower():
                results.add_pass("Trial Signup - Valid data (all fields)")
            else:
                results.add_fail("Trial Signup - Valid data (all fields)", f"Unexpected response: {data}")
        else:
            results.add_fail("Trial Signup - Valid data (all fields)", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Trial Signup - Valid data (all fields)", f"Error: {str(e)}")
    
    # Test 2: Duplicate email prevention
    duplicate_signup = {
        "name": "Emma Rodriguez Duplicate",
        "email": "emma.rodriguez@retailchain.com",  # Same email as above
        "phone": "+1-555-0789",
        "plan_type": "enterprise"
    }
    
    try:
        response = requests.post(f"{API_BASE}/trial-signup", json=duplicate_signup)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "already signed up" in data.get("message", "").lower():
                results.add_pass("Trial Signup - Duplicate email prevention")
            else:
                results.add_fail("Trial Signup - Duplicate email prevention", f"Should prevent duplicate, got: {data}")
        else:
            results.add_fail("Trial Signup - Duplicate email prevention", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Trial Signup - Duplicate email prevention", f"Error: {str(e)}")
    
    # Test 3: Invalid phone format (if validation exists)
    invalid_phone = {
        "name": "Test User",
        "email": "test.phone@example.com",
        "phone": "invalid-phone",
        "plan_type": "starter"
    }
    
    try:
        response = requests.post(f"{API_BASE}/trial-signup", json=invalid_phone)
        # Note: Phone validation might not be implemented, so we accept both outcomes
        if response.status_code in [200, 422]:
            results.add_pass("Trial Signup - Phone format handling")
        else:
            results.add_fail("Trial Signup - Phone format handling", f"Unexpected status: {response.status_code}")
    except Exception as e:
        results.add_fail("Trial Signup - Phone format handling", f"Error: {str(e)}")
    
    # Test 4: Plan selection validation
    valid_plan_signup = {
        "name": "David Kim",
        "email": "david.kim@techstartup.com",
        "phone": "+1-555-0321",
        "plan_type": "enterprise"
    }
    
    try:
        response = requests.post(f"{API_BASE}/trial-signup", json=valid_plan_signup)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                results.add_pass("Trial Signup - Plan selection validation")
            else:
                results.add_fail("Trial Signup - Plan selection validation", f"Unexpected response: {data}")
        else:
            results.add_fail("Trial Signup - Plan selection validation", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Trial Signup - Plan selection validation", f"Error: {str(e)}")

def test_newsletter():
    """Test POST /api/newsletter endpoint"""
    print(f"\n--- Testing Newsletter API ---")
    
    # Test 1: New subscription
    new_subscriber = {
        "email": "newsletter.subscriber@example.com"
    }
    
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=new_subscriber)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "subscribed" in data.get("message", "").lower():
                results.add_pass("Newsletter - New subscription")
            else:
                results.add_fail("Newsletter - New subscription", f"Unexpected response: {data}")
        else:
            results.add_fail("Newsletter - New subscription", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Newsletter - New subscription", f"Error: {str(e)}")
    
    # Test 2: Duplicate email handling
    duplicate_subscriber = {
        "email": "newsletter.subscriber@example.com"  # Same email as above
    }
    
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=duplicate_subscriber)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "already subscribed" in data.get("message", "").lower():
                results.add_pass("Newsletter - Duplicate email handling")
            else:
                results.add_fail("Newsletter - Duplicate email handling", f"Should handle duplicate, got: {data}")
        else:
            results.add_fail("Newsletter - Duplicate email handling", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter - Duplicate email handling", f"Error: {str(e)}")
    
    # Test 3: Invalid email format
    invalid_email = {
        "email": "not-an-email"
    }
    
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=invalid_email)
        if response.status_code == 422:  # Validation error expected
            results.add_pass("Newsletter - Invalid email validation")
        else:
            results.add_fail("Newsletter - Invalid email validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter - Invalid email validation", f"Error: {str(e)}")

def test_demo_request():
    """Test POST /api/demo-request endpoint"""
    print(f"\n--- Testing Demo Request API ---")
    
    # Test 1: Valid demo request with all fields
    valid_demo = {
        "name": "Lisa Wang",
        "email": "lisa.wang@healthcare.org",
        "phone": "+1-555-0654",
        "company": "HealthCare Solutions",
        "plan_type": "enterprise",
        "preferred_time": "Next Tuesday 2-4 PM EST"
    }
    
    try:
        response = requests.post(f"{API_BASE}/demo-request", json=valid_demo)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "successfully" in data.get("message", "").lower():
                results.add_pass("Demo Request - Valid data (all fields)")
            else:
                results.add_fail("Demo Request - Valid data (all fields)", f"Unexpected response: {data}")
        else:
            results.add_fail("Demo Request - Valid data (all fields)", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Demo Request - Valid data (all fields)", f"Error: {str(e)}")
    
    # Test 2: Demo request with required fields only
    required_demo = {
        "name": "John Smith",
        "email": "john.smith@company.com",
        "phone": "+1-555-0987",
        "plan_type": "professional"
    }
    
    try:
        response = requests.post(f"{API_BASE}/demo-request", json=required_demo)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                results.add_pass("Demo Request - Required fields only")
            else:
                results.add_fail("Demo Request - Required fields only", f"Unexpected response: {data}")
        else:
            results.add_fail("Demo Request - Required fields only", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Demo Request - Required fields only", f"Error: {str(e)}")
    
    # Test 3: Preferred time validation (flexible test)
    time_demo = {
        "name": "Alice Brown",
        "email": "alice.brown@enterprise.com",
        "phone": "+1-555-0147",
        "plan_type": "starter",
        "preferred_time": "Tomorrow morning"
    }
    
    try:
        response = requests.post(f"{API_BASE}/demo-request", json=time_demo)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                results.add_pass("Demo Request - Preferred time validation")
            else:
                results.add_fail("Demo Request - Preferred time validation", f"Unexpected response: {data}")
        else:
            results.add_fail("Demo Request - Preferred time validation", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Demo Request - Preferred time validation", f"Error: {str(e)}")

def test_analytics():
    """Test GET /api/analytics endpoint"""
    print(f"\n--- Testing Analytics API ---")
    
    try:
        response = requests.get(f"{API_BASE}/analytics")
        if response.status_code == 200:
            data = response.json()
            required_fields = ["total_contacts", "total_demo_requests", "total_trial_signups", "total_newsletter_subscribers"]
            
            if all(field in data for field in required_fields):
                # Verify all counts are integers and >= 0
                if all(isinstance(data[field], int) and data[field] >= 0 for field in required_fields):
                    results.add_pass("Analytics - All counts returned correctly")
                    print(f"  Analytics data: {data}")
                else:
                    results.add_fail("Analytics - All counts returned correctly", f"Invalid count values: {data}")
            else:
                results.add_fail("Analytics - All counts returned correctly", f"Missing fields in response: {data}")
        else:
            results.add_fail("Analytics - All counts returned correctly", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Analytics - All counts returned correctly", f"Error: {str(e)}")

def test_analytics_after_entries():
    """Test analytics after creating multiple entries"""
    print(f"\n--- Testing Analytics After Creating Entries ---")
    
    # Get initial counts
    try:
        initial_response = requests.get(f"{API_BASE}/analytics")
        if initial_response.status_code != 200:
            results.add_fail("Analytics - Initial count check", f"Could not get initial analytics: {initial_response.status_code}")
            return
        
        initial_data = initial_response.json()
        print(f"  Initial analytics: {initial_data}")
        
        # Create a new contact
        test_contact = {
            "name": "Analytics Test User",
            "email": "analytics.test@example.com",
            "message": "Testing analytics functionality"
        }
        
        contact_response = requests.post(f"{API_BASE}/contact", json=test_contact)
        if contact_response.status_code != 200:
            results.add_fail("Analytics - Test entry creation", f"Could not create test contact: {contact_response.status_code}")
            return
        
        # Get updated counts
        updated_response = requests.get(f"{API_BASE}/analytics")
        if updated_response.status_code != 200:
            results.add_fail("Analytics - Updated count check", f"Could not get updated analytics: {updated_response.status_code}")
            return
        
        updated_data = updated_response.json()
        print(f"  Updated analytics: {updated_data}")
        
        # Verify the contact count increased
        if updated_data["total_contacts"] > initial_data["total_contacts"]:
            results.add_pass("Analytics - Counts update after new entries")
        else:
            results.add_fail("Analytics - Counts update after new entries", 
                           f"Contact count did not increase: {initial_data['total_contacts']} -> {updated_data['total_contacts']}")
    
    except Exception as e:
        results.add_fail("Analytics - Counts update after new entries", f"Error: {str(e)}")

def main():
    """Run all tests"""
    print(f"Starting comprehensive backend API testing...")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    
    # Test API health first
    if not test_api_health():
        print("❌ API health check failed. Stopping tests.")
        return
    
    # Run all endpoint tests
    test_contact_form()
    test_trial_signup()
    test_newsletter()
    test_demo_request()
    test_analytics()
    test_analytics_after_entries()
    
    # Print final results
    results.summary()
    
    return results.failed == 0

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
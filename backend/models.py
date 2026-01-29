from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
import uuid


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    company: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    company: Optional[str] = None


class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)


class NewsletterCreate(BaseModel):
    email: EmailStr


class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    plan_type: str
    preferred_time: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    plan_type: str
    preferred_time: Optional[str] = None


class TrialSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    plan_type: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TrialSignupCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    plan_type: str


class Analytics(BaseModel):
    total_contacts: int
    total_demo_requests: int
    total_trial_signups: int
    total_newsletter_subscribers: int

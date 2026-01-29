import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useToast } from '../hooks/use-toast';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BookingModal = ({ open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interested_in: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using demo-request endpoint for bookings
      const response = await axios.post(`${BACKEND_URL}/api/demo-request`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company,
        plan_type: formData.interested_in,
        preferred_time: 'ASAP'
      });
      
      if (response.data.success) {
        toast.success('Booking Submitted!', {
          description: "Thank you! Redirecting you to schedule your demo..."
        });
        setFormData({ name: '', company: '', email: '', phone: '', interested_in: '' });
        onOpenChange(false);
        
        // Redirect to Cal.com after 2 seconds
        setTimeout(() => {
          window.open('https://cal.com/gretta-ai/30min', '_blank');
        }, 2000);
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: error.response?.data?.detail || 'Failed to submit booking. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestChange = (value) => {
    setFormData({ ...formData, interested_in: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-900">Book an Appointment</DialogTitle>
          <DialogDescription className="text-slate-600">
            Fill out the form below and we'll get in touch to schedule your personalized Gretta AI demo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="booking-name" className="text-slate-700">Full Name *</Label>
            <Input
              id="booking-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className="bg-white border-slate-300 text-slate-900 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="booking-company" className="text-slate-700">Business Name / Company *</Label>
            <Input
              id="booking-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="ABC Corporation"
              className="bg-white border-slate-300 text-slate-900 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="booking-email" className="text-slate-700">Email *</Label>
            <Input
              id="booking-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="bg-white border-slate-300 text-slate-900 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="booking-phone" className="text-slate-700">Phone (Optional)</Label>
            <Input
              id="booking-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+61 400 123 456"
              className="bg-white border-slate-300 text-slate-900 mt-1"
            />
            <p className="text-xs text-slate-500 mt-1">Include country code (e.g., +61 for Australia)</p>
          </div>
          
          <div>
            <Label className="text-slate-700 mb-3 block">Interested In *</Label>
            <RadioGroup value={formData.interested_in} onValueChange={handleInterestChange} required>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer">
                  <RadioGroupItem value="Inbound Customer Service & Bookings" id="interest-inbound" />
                  <Label htmlFor="interest-inbound" className="cursor-pointer flex-1 text-slate-800">
                    Inbound Customer Service & Bookings
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer">
                  <RadioGroupItem value="Outbound Calls" id="interest-outbound" />
                  <Label htmlFor="interest-outbound" className="cursor-pointer flex-1 text-slate-800">
                    Outbound Calls
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer">
                  <RadioGroupItem value="SMS Automation" id="interest-sms" />
                  <Label htmlFor="interest-sms" className="cursor-pointer flex-1 text-slate-800">
                    SMS Automation
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer">
                  <RadioGroupItem value="Other" id="interest-other" />
                  <Label htmlFor="interest-other" className="cursor-pointer flex-1 text-slate-800">
                    Other - please specify in follow-up
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg py-6 text-base font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Book Your Appointment'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
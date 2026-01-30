import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TrialModal = ({ open, onOpenChange, defaultPlan = '' }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    plan_type: defaultPlan
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/trial-signup`, formData);
      
      if (response.data.success) {
        toast.success('Success!', {
          description: response.data.message,
        });
        setFormData({ name: '', email: '', phone: '', company: '', plan_type: '' });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Error', {
        description: error.response?.data?.detail || 'Failed to sign up for trial'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanChange = (value) => {
    setFormData({ ...formData, plan_type: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-slate-200 text-slate-900">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-900">Start Your 7-Day Free Trial</DialogTitle>
          <DialogDescription className="text-slate-600">
            No credit card required. Get started in minutes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="trial-name" className="text-slate-700">Name *</Label>
            <Input
              id="trial-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border-slate-300 text-slate-900"
            />
          </div>
          <div>
            <Label htmlFor="trial-email" className="text-slate-700">Email *</Label>
            <Input
              id="trial-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border-slate-300 text-slate-900"
            />
          </div>
          <div>
            <Label htmlFor="trial-phone" className="text-slate-700">Phone *</Label>
            <Input
              id="trial-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white border-slate-300 text-slate-900"
            />
          </div>
          <div>
            <Label htmlFor="trial-company" className="text-slate-700">Company</Label>
            <Input
              id="trial-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="bg-white border-slate-300 text-slate-900"
            />
          </div>
          <div>
            <Label htmlFor="trial-plan" className="text-slate-700">Select Plan *</Label>
            <Select value={formData.plan_type} onValueChange={handlePlanChange} required>
              <SelectTrigger className="bg-white border-slate-300 text-slate-900">
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 text-slate-900">
                <SelectItem value="SMS Only">SMS Only - $299/month</SelectItem>
                <SelectItem value="Inbound + SMS">Inbound + SMS - $995/month</SelectItem>
                <SelectItem value="Outbound + SMS">Outbound + SMS - $1,195/month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Start Free Trial'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrialModal;
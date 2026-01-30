import React from 'react';
import { Card, CardContent } from './ui/card';
import { Phone, Calendar, MessageSquare, PhoneOutgoing, Mic, Zap, ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Phone,
      title: 'Inbound Call Answering',
      description: 'Never miss a lead. Gretta answers instantly, qualifies prospects, and routes calls intelligently.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Smart Appointment Booking',
      description: 'Seamlessly syncs with Google Calendar, Calendly & more. Handles bookings automatically.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Two-Way SMS Automation',
      description: 'Automated text conversations that feel personal. Follow-ups, reminders & lead qualification.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: PhoneOutgoing,
      title: 'Powerful Outbound Calling',
      description: 'Scale your outreach with smart dialing sequences that respect time zones.',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Mic,
      title: 'Human-like Voice',
      description: 'Natural conversations with emotional intelligence. Custom voice cloning available.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Easy Integrations',
      description: 'Connect with Zapier, HubSpot, Salesforce & more. Setup in minutes.',
      color: 'from-blue-500 to-purple-600'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Automate
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Gretta handles every touchpoint in your customer journey with precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group bg-white border border-slate-200 hover:border-purple-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learn more link */}
        <div className="text-center mt-12">
          <a href="#pricing" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
            See pricing plans
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
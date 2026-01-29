import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Phone, Calendar, MessageSquare, PhoneOutgoing, Mic, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Phone,
      title: 'Inbound Call Answering',
      description: 'Gretta picks up instantly, qualifies leads, answers FAQs, and routes calls intelligently — never miss an opportunity again.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Smart Appointment Booking',
      description: 'Syncs with Google Calendar, Calendly, and more. Handles bookings, reschedules, and confirmations automatically.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Two-Way SMS Automation',
      description: 'Send reminders, follow-ups, and qualify leads via text. Automated conversations that feel personal and timely.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: PhoneOutgoing,
      title: 'Powerful Outbound Calling',
      description: 'Scale your outreach with cold/warm calling and follow-up sequences. Smart dialing that respects time zones.',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Mic,
      title: 'Human-like Voice',
      description: 'Natural conversations with emotional intelligence. Multilingual support and custom voice cloning for your brand.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Easy Integrations',
      description: 'Connect with Zapier, HubSpot, Salesforce, calendars, SMS gateways, and more. Setup in minutes, not weeks.',
      color: 'from-blue-500 to-purple-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Automate Communications
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Gretta handles every touchpoint in your customer journey with AI-powered precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="feature-card bg-white border-2 border-slate-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
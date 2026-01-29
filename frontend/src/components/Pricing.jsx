import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import TrialModal from './TrialModal';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      name: 'SMS Only',
      icon: Zap,
      price: 299,
      annualPrice: 254,
      description: 'Automate texts & reminders affordably',
      features: [
        'Unlimited SMS conversations',
        'Two-way text automation',
        'Lead qualification via SMS',
        'Calendar reminders',
        'Basic integrations',
        'Email support'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: 'Inbound + SMS',
      icon: Crown,
      price: 997,
      annualPrice: 847,
      description: 'Perfect for high-volume inbound & texting',
      features: [
        'Everything in SMS Only',
        'Unlimited inbound calls',
        'Smart appointment booking',
        'Voice AI with custom training',
        'Priority integrations',
        '24/7 priority support',
        'Custom voice cloning',
        'Advanced analytics'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Outbound Full Suite',
      icon: Rocket,
      price: 1299,
      annualPrice: 1104,
      description: 'Scale outreach with powerful calling',
      features: [
        'Everything in Inbound + SMS',
        'Unlimited outbound calls',
        'Smart dialing sequences',
        'Cold & warm outreach campaigns',
        'Time zone intelligence',
        'White-glove onboarding',
        'Dedicated account manager',
        'Custom API access'
      ],
      color: 'from-pink-500 to-purple-600',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent{' '}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. No contracts, cancel anytime.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-slate-700 rounded-full transition-colors duration-300 focus:outline-none"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-transform duration-300 ${
                  isAnnual ? 'transform translate-x-7' : ''
                }`}
              ></div>
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-slate-400'}`}>
              Annual
            </span>
          </div>
          
          {isAnnual && (
            <Badge className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-300">
              Save 15% with annual billing
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = isAnnual ? plan.annualPrice : plan.price;
            
            return (
              <Card
                key={index}
                className={`pricing-card relative bg-slate-900/50 border-slate-800 transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  plan.popular
                    ? 'border-purple-500/50 shadow-xl shadow-purple-500/20 md:scale-105'
                    : 'hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-white">${displayPrice}</span>
                    <span className="text-slate-400 text-lg"> / month</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-90 shadow-lg shadow-purple-500/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    } font-semibold py-6 transition-all duration-300`}
                  >
                    Start 14-Day Free Trial
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-lg">
            No contracts • Cancel anytime • 14-day free trial on all plans
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
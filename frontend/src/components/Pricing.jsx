import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Zap, Crown, Users, PhoneOutgoing } from 'lucide-react';
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
      popular: false,
      isCustom: false
    },
    {
      name: 'Inbound + SMS',
      icon: Crown,
      price: 995,
      annualPrice: 846,
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
      popular: true,
      isCustom: false
    },
    {
      name: 'Outbound + SMS',
      icon: PhoneOutgoing,
      price: 1195,
      annualPrice: 1016,
      description: 'Scale outreach with powerful calling',
      features: [
        'Everything in SMS Only',
        'Unlimited outbound calls',
        'Smart dialing sequences',
        'Cold & warm outreach campaigns',
        'Time zone intelligence',
        'Priority integrations',
        'Advanced analytics',
        'Email & chat support'
      ],
      color: 'from-blue-600 to-purple-600',
      popular: false,
      isCustom: false
    },
    {
      name: 'Enterprise',
      icon: Users,
      price: null,
      annualPrice: null,
      description: 'Complete solution: Inbound + Outbound + SMS',
      features: [
        'Everything in all plans combined',
        'Unlimited inbound & outbound calls',
        'Full SMS automation suite',
        'White-glove onboarding',
        'Dedicated account manager',
        'Custom API access',
        'Custom voice training',
        'Priority 24/7 support'
      ],
      color: 'from-pink-500 to-purple-600',
      popular: false,
      isCustom: true,
      customLink: 'https://cal.com/gretta-ai/45min'
    }
  ];

  return (
    <>
      <section id="pricing" className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/30 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Simple, Transparent{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your business. No contracts, cancel anytime.
            </p>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className={`text-lg ${!isAnnual ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-slate-300 rounded-full transition-colors duration-300 focus:outline-none"
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-transform duration-300 ${
                    isAnnual ? 'transform translate-x-7' : ''
                  }`}
                ></div>
              </button>
              <span className={`text-lg ${isAnnual ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                Annual
              </span>
            </div>
            
            {isAnnual && (
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-700 shadow-sm">
                Save 15% with annual billing
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const displayPrice = plan.isCustom ? null : (isAnnual ? plan.annualPrice : plan.price);
              
              return (
                <Card
                  key={index}
                  className={`pricing-card relative bg-white border-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl ${
                    plan.popular
                      ? 'border-purple-400 md:scale-105'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-lg">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900 text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-600 text-base">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-6">
                      {plan.isCustom ? (
                        <div className="text-3xl font-bold text-slate-900">Custom Pricing</div>
                      ) : (
                        <>
                          <span className="text-5xl font-bold text-slate-900">${displayPrice}</span>
                          <span className="text-slate-600 text-lg"> / month</span>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    {plan.isCustom ? (
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 shadow-lg text-white font-semibold py-6 transition-all duration-300"
                        onClick={() => window.open(plan.customLink, '_blank')}
                      >
                        Speak to Team
                      </Button>
                    ) : (
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-90 shadow-lg text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                        } font-semibold py-6 transition-all duration-300`}
                        onClick={() => {
                          setSelectedPlan(plan.name);
                          setTrialOpen(true);
                        }}
                      >
                        Start 7-Day Free Trial
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-lg">
              No contracts • Cancel anytime • 7-day free trial on all plans
            </p>
          </div>
        </div>
      </section>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} defaultPlan={selectedPlan} />
    </>
  );
};

export default Pricing;
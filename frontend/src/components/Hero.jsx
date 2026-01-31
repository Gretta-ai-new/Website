import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Calendar, MessageSquare, PhoneOutgoing, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import TrialModal from './TrialModal';
import PushToSpeak from './PushToSpeak';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/5jdvd23u_Untitled%20design%20%2814%29.png';

const Hero = () => {
  const [trialOpen, setTrialOpen] = useState(false);

  const benefits = [
    'No credit card required',
    '7-day free trial',
    'Cancel anytime'
  ];

  return (
    <>
      <section className="hero-section relative min-h-[90vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-28 pb-12 lg:pb-16">
          
          {/* Mobile/Tablet: Logo at top, centered and prominent */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="relative">
              {/* Gradient glow behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-purple-500/25 to-blue-500/25 rounded-full blur-3xl scale-150 animate-pulse"></div>
              <img 
                src={LOGO_URL} 
                alt="Gretta AI" 
                className="relative h-32 sm:h-44 w-auto object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <Badge className="mb-4 lg:mb-6 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 shadow-sm text-xs sm:text-sm">
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1.5 sm:mr-2" />
                AI-Powered Voice Agent
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 mb-4 lg:mb-6 leading-[1.1] tracking-tight">
                Your 24/7 AI Agent That{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Never Misses a Call
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Handle inbound calls, book appointments, manage SMS — all powered by human-like AI voice that works around the clock.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-5 lg:mb-6">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setTrialOpen(true)}
                >
                  Start Free Trial
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-purple-400 text-purple-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300"
                  onClick={() => {
                    document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Try Live Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Logo (Desktop) & Push to Speak */}
            <div className="flex flex-col items-center order-1 lg:order-2">
              {/* Desktop Logo - Hidden on mobile/tablet */}
              <div className="hidden lg:block relative mb-8">
                {/* Gradient glow behind logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl scale-125 animate-pulse"></div>
                <img 
                  src={LOGO_URL} 
                  alt="Gretta AI" 
                  className="relative h-64 w-auto object-contain drop-shadow-xl animate-float"
                />
              </div>

              {/* Push to Speak Component */}
              <div className="w-full max-w-sm">
                <PushToSpeak />
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 lg:mt-16 pt-8 lg:pt-12 border-t border-slate-100">
            <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
              {[
                { icon: Phone, label: 'Inbound Calls', color: 'from-blue-500 to-cyan-500' },
                { icon: Calendar, label: 'Smart Booking', color: 'from-purple-500 to-purple-600' },
                { icon: MessageSquare, label: 'SMS Automation', color: 'from-purple-500 to-blue-500' },
                { icon: PhoneOutgoing, label: 'Outbound Reach', color: 'from-blue-600 to-cyan-600' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 lg:gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-3 lg:px-5 py-2 lg:py-2.5 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-3 lg:w-4 h-3 lg:h-4 text-white" />
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Hero;

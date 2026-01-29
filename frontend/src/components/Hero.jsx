import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Calendar, MessageSquare, PhoneOutgoing, Sparkles } from 'lucide-react';
import TrialModal from './TrialModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/5jdvd23u_Untitled%20design%20%2814%29.png';

const Hero = () => {
  const [trialOpen, setTrialOpen] = useState(false);
  const phoneNumber = '+61 1800 GRETTA';
  const telLink = 'tel:+611800473882';

  return (
    <>
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <img 
                src={LOGO_URL} 
                alt="Gretta AI" 
                className="h-40 sm:h-44 md:h-48 w-auto object-contain animate-float drop-shadow-2xl"
              />
            </div>

            <Badge className="mb-5 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 text-blue-700 hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200 shadow-sm text-xs">
              <Sparkles className="w-3 h-3 mr-2" />
              Powered by Advanced Voice AI
            </Badge>

            <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-5 leading-tight">
              Meet Gretta: Your 24/7 AI Voice Agent That{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Never Misses a Call
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-7 max-w-3xl mx-auto leading-relaxed">
              Handle inbound calls, book appointments instantly, manage SMS conversations, and run smart outbound campaigns — all powered by human-like AI voice.
            </p>

            <div className="flex flex-col items-center space-y-5 mb-10">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-8 py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => setTrialOpen(true)}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Gretta Now – Try It Free
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => {
                    document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Watch Demo
                </Button>
              </div>

              <div className="phone-number-display bg-white border-2 border-blue-300 rounded-2xl px-8 py-6 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-xl hover:shadow-2xl">
                <a href={telLink} className="block">
                  <p className="text-sm text-slate-600 mb-1 group-hover:text-purple-600 transition-colors font-medium">Click to call and speak with Gretta live</p>
                  <p className="text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-gradient group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {phoneNumber}
                  </p>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">Inbound Calls</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">Smart Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">SMS Automation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                  <PhoneOutgoing className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">Outbound Reach</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Hero;
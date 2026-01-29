import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Calendar, MessageSquare, PhoneOutgoing, Sparkles } from 'lucide-react';
import TrialModal from './TrialModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/4cpjuxon_Untitled%20design%20%283%29.jpg';

const Hero = () => {
  const [trialOpen, setTrialOpen] = useState(false);
  const phoneNumber = '+61 1800 GRETTA';
  const telLink = 'tel:+611800473882';

  return (
    <>
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <img 
                src={LOGO_URL} 
                alt="Gretta AI" 
                className="h-32 w-32 object-contain animate-float"
              />
            </div>

          <Badge className="mb-6 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-cyan-400/30 text-cyan-300 hover:bg-gradient-to-r hover:from-blue-600/30 hover:via-purple-600/30 hover:to-pink-600/30">
            <Sparkles className="w-3 h-3 mr-2" />
            Powered by Advanced Voice AI
          </Badge>

          <h1 className="hero-headline text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Meet Gretta: Your 24/7 AI Voice Agent That{' '}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Never Misses a Call
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Handle inbound calls, book appointments instantly, manage SMS conversations, and run smart outbound campaigns — all powered by human-like AI voice.
          </p>

          <div className="flex flex-col items-center space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
                onClick={() => setTrialOpen(true)}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Gretta Now – Try It Free
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                onClick={() => {
                  document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Watch Demo
              </Button>
            </div>

            <div className="phone-number-display bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl px-8 py-6 hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <a href={telLink} className="block">
                <p className="text-sm text-slate-400 mb-1 group-hover:text-cyan-400 transition-colors">Click to call and speak with Gretta live</p>
                <p className="text-4xl sm:text-5xl font-bold text-white group-hover:text-gradient group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {phoneNumber}
                </p>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-slate-300">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-sm sm:text-base">Inbound Calls</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-sm sm:text-base">Smart Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-pink-400" />
              <span className="text-sm sm:text-base">SMS Automation</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneOutgoing className="w-5 h-5 text-blue-400" />
              <span className="text-sm sm:text-base">Outbound Reach</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>

    <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
  </>
  );
};

export default Hero;
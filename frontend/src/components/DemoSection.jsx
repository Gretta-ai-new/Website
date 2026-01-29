import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Phone, Play, Pause, Volume2 } from 'lucide-react';
import TrialModal from './TrialModal';

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const phoneNumber = '+61 XXX XXX XXX';
  const telLink = 'tel:+61XXXXXXXXX';

  return (
    <section id="demo" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/30 to-pink-950/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Experience Gretta{' '}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Right Now
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            See the magic in action. Call Gretta live or watch a demo conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Call Gretta Live</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8 relative">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center relative animate-pulse-slow">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-50 blur-2xl animate-pulse"></div>
                  <Phone className="w-24 h-24 text-white relative z-10" />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-400 mb-3">Click to call and speak with Gretta</p>
                <a
                  href={telLink}
                  className="block bg-slate-900/80 border-2 border-cyan-400/50 rounded-2xl px-6 py-5 hover:border-cyan-400 transition-all duration-300 hover:scale-105 group"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-white group-hover:text-gradient group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {phoneNumber}
                  </p>
                </a>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                Ask anything — book a fake appointment, get business info, or just chat. No sign-up needed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Watch Demo Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-950/50 rounded-2xl p-8 mb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative">
                    <Volume2 className="w-16 h-16 text-white" />
                    <div className="absolute inset-0 rounded-full">
                      <div className="waveform-animation"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-slate-800/80 rounded-lg p-4 text-left">
                    <p className="text-xs text-cyan-400 mb-1 font-semibold">CALLER</p>
                    <p className="text-white">"Hi, I'd like to book an appointment for next Tuesday."</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-4 text-left">
                    <p className="text-xs text-purple-300 mb-1 font-semibold">GRETTA AI</p>
                    <p className="text-white">"Of course! I have availability at 10 AM, 2 PM, or 4 PM. Which works best for you?"</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-left">
                    <p className="text-xs text-cyan-400 mb-1 font-semibold">CALLER</p>
                    <p className="text-white">"2 PM would be perfect."</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-4 text-left">
                    <p className="text-xs text-purple-300 mb-1 font-semibold">GRETTA AI</p>
                    <p className="text-white">"Great! You're all set for Tuesday at 2 PM. I'll send you a confirmation text shortly."</p>
                  </div>
                </div>

                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play Demo Audio
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-slate-500 text-center">
                Actual conversation recorded with client permission
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-10 py-6 text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
            onClick={() => setTrialOpen(true)}
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </div>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </section>
  );
};

export default DemoSection;
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
    <>
      <section id="demo" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Experience Gretta{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Right Now
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the magic in action. Call Gretta live or watch a demo conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-white border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-900 text-2xl text-center">Call Gretta Live</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8 relative">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center relative animate-pulse-slow shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 blur-2xl animate-pulse"></div>
                    <Phone className="w-24 h-24 text-white relative z-10" />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-slate-600 mb-3 font-medium">Click to call and speak with Gretta</p>
                  <a
                    href={telLink}
                    className="block bg-white border-2 border-blue-300 rounded-2xl px-6 py-5 hover:border-purple-400 transition-all duration-300 hover:scale-105 group shadow-lg hover:shadow-xl"
                  >
                    <p className="text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-gradient group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {phoneNumber}
                    </p>
                  </a>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  Ask anything — book a fake appointment, get business info, or just chat. No sign-up needed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-900 text-2xl text-center">Watch Demo Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 border border-slate-200">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center relative shadow-xl">
                      <Volume2 className="w-16 h-16 text-white" />
                      <div className="absolute inset-0 rounded-full">
                        <div className="waveform-animation"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white rounded-lg p-4 text-left border border-blue-200 shadow-sm">
                      <p className="text-xs text-blue-600 mb-1 font-semibold">CALLER</p>
                      <p className="text-slate-900">"Hi, I'd like to book an appointment for next Tuesday."</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 text-left border border-purple-200 shadow-sm">
                      <p className="text-xs text-purple-700 mb-1 font-semibold">GRETTA AI</p>
                      <p className="text-slate-900">"Of course! I have availability at 10 AM, 2 PM, or 4 PM. Which works best for you?"</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-left border border-blue-200 shadow-sm">
                      <p className="text-xs text-blue-600 mb-1 font-semibold">CALLER</p>
                      <p className="text-slate-900">"2 PM would be perfect."</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 text-left border border-purple-200 shadow-sm">
                      <p className="text-xs text-purple-700 mb-1 font-semibold">GRETTA AI</p>
                      <p className="text-slate-900">"Great! You're all set for Tuesday at 2 PM. I'll send you a confirmation text shortly."</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg"
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
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:opacity-90 font-semibold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => setTrialOpen(true)}
            >
              Start Your Free Trial Today
            </Button>
          </div>
        </div>
      </section>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default DemoSection;

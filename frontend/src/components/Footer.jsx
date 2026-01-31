import React, { useState } from 'react';
import { Button } from './ui/button';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import TrialModal from './TrialModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/5jdvd23u_Untitled%20design%20%2814%29.png';

const Footer = () => {
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to never miss a lead again?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses using Gretta to automate their customer communications.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 font-semibold px-8 py-6 text-lg shadow-xl"
            onClick={() => setTrialOpen(true)}
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <img 
                src={LOGO_URL} 
                alt="Gretta AI Logo" 
                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
              />
              <p className="text-sm text-slate-400 leading-relaxed">
                AI voice agent that handles calls, books appointments & manages SMS 24/7.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>hello@gretta.ai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>+61 1800 GRETTA</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Sydney, Australia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2025 Gretta AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Footer;

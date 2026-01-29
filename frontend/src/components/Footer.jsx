import React, { useState } from 'react';
import { Button } from './ui/button';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import TrialModal from './TrialModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/4cpjuxon_Untitled%20design%20%283%29.jpg';

const Footer = () => {
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <footer id="contact" className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={LOGO_URL} 
                  alt="Gretta AI Logo" 
                  className="h-12 w-12 object-contain"
                />
                <span className="text-2xl font-bold text-white">Gretta AI</span>
              </div>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              The AI voice agent that handles inbound calls, books appointments, manages SMS, and powers outbound campaigns — so you never miss an opportunity.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90"
              onClick={() => setTrialOpen(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#demo" className="text-slate-400 hover:text-cyan-400 transition-colors">Demo</a></li>
              <li><a href="#integrations" className="text-slate-400 hover:text-cyan-400 transition-colors">Integrations</a></li>
              <li><a href="#use-cases" className="text-slate-400 hover:text-cyan-400 transition-colors">Use Cases</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#blog" className="text-slate-400 hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#careers" className="text-slate-400 hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="#support" className="text-slate-400 hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@gretta.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+61 1800 GRETTA</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Sydney, Australia</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#facebook" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#linkedin" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#instagram" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-slate-500 text-sm space-y-2 md:space-y-0">
            <p>© 2025 Gretta AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 py-8 border-t border-slate-900">
        <p className="text-slate-400 text-lg mb-4">
          Ready to never miss a lead again?
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold px-10 py-6 text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Gretta or Get Started
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
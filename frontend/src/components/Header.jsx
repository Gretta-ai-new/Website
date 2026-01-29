import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';
import TrialModal from './TrialModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/5jdvd23u_Untitled%20design%20%2814%29.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallNow = () => {
    window.location.href = 'tel:+611800473882';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img 
                src={LOGO_URL} 
                alt="Gretta AI Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">Pricing</a>
              <a href="#demo" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">Try Demo</a>
              <a 
                href="#contact" 
                className="text-slate-700 hover:text-purple-600 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                }}
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold"
                onClick={handleCallNow}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:opacity-90 font-semibold shadow-lg"
                onClick={() => setTrialOpen(true)}
              >
                Start Free Trial
              </Button>
            </div>

            <button
              className="md:hidden text-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 space-y-4">
              <a href="#features" className="block text-slate-700 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="block text-slate-700 hover:text-purple-600 transition-colors font-medium">Pricing</a>
              <a href="#demo" className="block text-slate-700 hover:text-purple-600 transition-colors font-medium">Try Demo</a>
              <a 
                href="#contact" 
                className="block text-slate-700 hover:text-purple-600 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-500 text-blue-600 w-full font-semibold"
                  onClick={handleCallNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white w-full font-semibold"
                  onClick={() => {
                    setTrialOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import ContactModal from './ContactModal';
import TrialModal from './TrialModal';
import BookingModal from './BookingModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_voice-agent-hub-25/artifacts/5jdvd23u_Untitled%20design%20%2814%29.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

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
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Always visible */}
            <a href="#" className="flex items-center flex-shrink-0">
              <img 
                src={LOGO_URL} 
                alt="Gretta AI" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#features" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Features</a>
              <a href="#pricing" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Pricing</a>
              <a href="#demo" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Try Demo</a>
              <a 
                href="#contact" 
                className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                }}
              >
                Contact
              </a>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium text-sm h-10 px-4 shadow-md"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent font-medium text-sm h-10 px-4"
                onClick={handleCallNow}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium shadow-md text-sm h-10 px-4"
                onClick={() => setTrialOpen(true)}
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile: Book Appointment + Menu */}
            <div className="flex lg:hidden items-center space-x-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium text-xs h-9 px-3 shadow-md"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Book
              </Button>
              <button
                className="text-slate-700 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 pt-2 space-y-4 border-t border-slate-100">
              <nav className="space-y-3">
                <a 
                  href="#features" 
                  className="block text-slate-700 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="block text-slate-700 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#demo" 
                  className="block text-slate-700 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Try Demo
                </a>
                <a 
                  href="#contact" 
                  className="block text-slate-700 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setContactOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </a>
              </nav>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-500 text-purple-600 w-full font-medium"
                  onClick={handleCallNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full font-medium"
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
      
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Header;

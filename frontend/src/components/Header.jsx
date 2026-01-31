import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import ContactModal from './ContactModal';
import TrialModal from './TrialModal';
import BookingModal from './BookingModal';

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
          <div className="flex items-center justify-between h-20 py-3">
            <div className="flex items-center space-x-2">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium text-sm h-10 px-5 shadow-md"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>

            <nav className="hidden md:flex items-center space-x-7">
              <a href="#features" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Features</a>
              <a href="#pricing" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Pricing</a>
              <a href="#demo" className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Try Demo</a>
              <a 
                href="#contact" 
                className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                }}
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent font-medium text-sm h-10 px-5"
                onClick={handleCallNow}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium shadow-md text-sm h-10 px-5"
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
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 w-full font-medium text-sm shadow-md"
                onClick={() => {
                  setBookingOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              
              <a href="#features" className="block text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Features</a>
              <a href="#pricing" className="block text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Pricing</a>
              <a href="#demo" className="block text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium">Try Demo</a>
              <a 
                href="#contact" 
                className="block text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-500 text-blue-600 w-full font-medium text-sm"
                  onClick={handleCallNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white w-full font-medium text-sm"
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
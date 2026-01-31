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
          <div className="flex items-center justify-between h-16 lg:h-20 py-2 lg:py-3">
            {/* Left: Book Appointment */}
            <div className="flex items-center">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-medium text-xs sm:text-sm h-9 lg:h-10 px-3 lg:px-5 shadow-md"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar className="w-3.5 lg:w-4 h-3.5 lg:h-4 mr-1.5 lg:mr-2" />
                <span className="hidden sm:inline">Book Appointment</span>
                <span className="sm:hidden">Book</span>
              </Button>
            </div>

            {/* Center: Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7">
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

            {/* Right: CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3">
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-700 p-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 pt-2 space-y-3 border-t border-slate-100">
              <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
                <a 
                  href="#features" 
                  className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#demo" 
                  className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Try Demo
                </a>
                <a 
                  href="#contact" 
                  className="text-slate-700 hover:text-purple-600 transition-colors text-sm font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setContactOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-100">
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-500 text-purple-600 flex-1 font-medium text-sm"
                  onClick={handleCallNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-1 font-medium text-sm"
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

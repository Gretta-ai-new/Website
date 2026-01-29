import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="gretta-logo">
              <div className="logo-gradient"></div>
            </div>
            <span className="text-2xl font-bold text-white">Gretta AI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-200 hover:text-cyan-400 transition-colors">Features</a>
            <a href="#pricing" className="text-slate-200 hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#demo" className="text-slate-200 hover:text-cyan-400 transition-colors">Try Demo</a>
            <a href="#contact" className="text-slate-200 hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90">
              Start Free Trial
            </Button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <a href="#features" className="block text-slate-200 hover:text-cyan-400 transition-colors">Features</a>
            <a href="#pricing" className="block text-slate-200 hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#demo" className="block text-slate-200 hover:text-cyan-400 transition-colors">Try Demo</a>
            <a href="#contact" className="block text-slate-200 hover:text-cyan-400 transition-colors">Contact</a>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="outline" className="border-cyan-400 text-cyan-400 w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 w-full">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
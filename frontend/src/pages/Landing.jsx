import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import DemoSection from '../components/DemoSection';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Landing = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <DemoSection />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Landing;
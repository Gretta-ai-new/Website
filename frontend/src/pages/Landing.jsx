import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
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
      <ROICalculator />
      <DemoSection />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Landing;
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Users, Star, TrendingUp } from 'lucide-react';

const TrustSection = () => {
  const stats = [
    { icon: Users, value: '100+', label: 'Businesses Automated' },
    { icon: Star, value: '4.9/5', label: 'Voice Quality Rating' },
    { icon: TrendingUp, value: '98%', label: 'Customer Satisfaction' },
    { icon: Shield, value: '100%', label: 'Enterprise Security' }
  ];

  const testimonials = [
    {
      quote: "Gretta has transformed how we handle patient calls. We've gone from missing 30% of calls to answering 100% — even after hours.",
      author: "Dr. Sarah Mitchell",
      role: "Medical Clinic Director",
      company: "HealthFirst Clinics"
    },
    {
      quote: "The SMS automation alone saved us 20 hours a week. Adding voice capabilities was game-changing for our sales team.",
      author: "James Rodriguez",
      role: "Operations Manager",
      company: "PropTech Realty"
    },
    {
      quote: "Our clients love how natural Gretta sounds. Most don't even realize they're talking to AI until we tell them.",
      author: "Emily Chen",
      role: "Agency Owner",
      company: "Digital Growth Co"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-300">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Scale,{' '}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Designed for Trust
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm text-center"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 inline-block text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                  <p className="text-sm text-cyan-400">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          <Badge className="bg-slate-900/50 border-slate-700 text-slate-300 px-6 py-3 text-base">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-grade Encryption
          </Badge>
          <Badge className="bg-slate-900/50 border-slate-700 text-slate-300 px-6 py-3 text-base">
            <Shield className="w-4 h-4 mr-2" />
            Australian Data Compliant
          </Badge>
          <Badge className="bg-slate-900/50 border-slate-700 text-slate-300 px-6 py-3 text-base">
            <Shield className="w-4 h-4 mr-2" />
            SOC 2 Type II Certified
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
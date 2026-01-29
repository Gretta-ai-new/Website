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
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-700 shadow-sm">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built for Scale,{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                className="bg-white border-2 border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-2 border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 inline-block text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-slate-900 font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          <Badge className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 text-base shadow-md hover:shadow-lg transition-all">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-grade Encryption
          </Badge>
          <Badge className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 text-base shadow-md hover:shadow-lg transition-all">
            <Shield className="w-4 h-4 mr-2" />
            Australian Data Compliant
          </Badge>
          <Badge className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 text-base shadow-md hover:shadow-lg transition-all">
            <Shield className="w-4 h-4 mr-2" />
            SOC 2 Type II Certified
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

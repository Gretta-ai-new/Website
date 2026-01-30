import React from 'react';
import { Card, CardContent } from './ui/card';
import { Shield, Clock, Zap, HeartHandshake, Star, Quote } from 'lucide-react';

const TrustSection = () => {
  const stats = [
    { icon: Clock, value: '24/7', label: 'Availability' },
    { icon: Zap, value: '<1s', label: 'Response Time' },
    { icon: HeartHandshake, value: '98%', label: 'Satisfaction' },
    { icon: Shield, value: '100%', label: 'Secure' }
  ];

  const testimonials = [
    {
      quote: "Gretta has transformed how we handle patient calls. We've gone from missing 30% of calls to answering 100%.",
      author: "Dr. Sarah Mitchell",
      role: "Medical Clinic Director"
    },
    {
      quote: "The SMS automation alone saved us 20 hours a week. Adding voice was game-changing for sales.",
      author: "James Rodriguez",
      role: "Operations Manager"
    },
    {
      quote: "Our clients love how natural Gretta sounds. Most don't realize they're talking to AI.",
      author: "Emily Chen",
      role: "Agency Owner"
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/50 border border-slate-100"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border border-slate-200 hover:border-purple-200 transition-all duration-300 hover:shadow-md"
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-purple-200 mb-4" />
                <p className="text-slate-700 mb-6 leading-relaxed text-sm">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-900 font-semibold text-sm">{testimonial.author}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Enterprise-grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
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

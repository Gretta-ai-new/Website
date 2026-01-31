import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Clock, Zap } from 'lucide-react';

const ROICalculator = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(35);
  const [hourlyRate, setHourlyRate] = useState(25);

  // Using Inbound + SMS pricing as baseline ($995/month)
  const aiCost = 995;

  // Calculate current monthly cost
  const weeksPerMonth = 4.33;
  const currentMonthlyCost = Math.round(hoursPerWeek * hourlyRate * weeksPerMonth);
  
  // Calculate savings
  const monthlySavings = Math.max(0, currentMonthlyCost - aiCost);
  const yearlySavings = monthlySavings * 12;
  const savingsPercentage = currentMonthlyCost > 0 
    ? Math.round((monthlySavings / currentMonthlyCost) * 100) 
    : 0;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Calculate Your{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              ROI with Gretta
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how much you could save by automating with AI voice agents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Left Panel - Current Costs */}
          <Card className="bg-white border-2 border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Your Current Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Hours slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-700 font-medium">Hours on phone per week</label>
                  <span className="text-2xl font-bold text-blue-600">{hoursPerWeek} hours</span>
                </div>
                <Slider
                  value={[hoursPerWeek]}
                  onValueChange={(value) => setHoursPerWeek(value[0])}
                  min={5}
                  max={80}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>5 hrs</span>
                  <span>80 hrs</span>
                </div>
              </div>

              {/* Hourly rate slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-700 font-medium">Hourly rate of staff</label>
                  <span className="text-2xl font-bold text-blue-600">${hourlyRate}/hr</span>
                </div>
                <Slider
                  value={[hourlyRate]}
                  onValueChange={(value) => setHourlyRate(value[0])}
                  min={15}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>$15/hr</span>
                  <span>$100/hr</span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-lg">Your monthly cost</span>
                  <span className="text-3xl font-bold text-slate-900">${currentMonthlyCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-lg">AI Voice Agent cost</span>
                  <span className="text-3xl font-bold text-blue-600">${aiCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Savings */}
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Your potential monthly savings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center py-8">
                <div className="text-6xl sm:text-7xl font-bold mb-4">
                  ${monthlySavings.toLocaleString()}
                </div>
                <div className="text-xl opacity-90">
                  That's {savingsPercentage}% less than your current costs
                </div>
              </div>

              <div className="border-t border-white/30 pt-8">
                <div className="text-center">
                  <div className="text-lg opacity-90 mb-2">Yearly savings</div>
                  <div className="text-5xl font-bold">
                    ${yearlySavings.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">24/7 Availability</h3>
              <p className="text-slate-600">Never miss a call, even at 3am</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Pickup</h3>
              <p className="text-slate-600">No hold times, ever</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;

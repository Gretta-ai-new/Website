import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import { Users, Phone, MessageSquare, TrendingUp, Mail } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/analytics`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-xl text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Contacts',
      value: analytics?.total_contacts || 0,
      icon: Mail,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Trial Signups',
      value: analytics?.total_trial_signups || 0,
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Demo Requests',
      value: analytics?.total_demo_requests || 0,
      icon: Phone,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Newsletter Subscribers',
      value: analytics?.total_newsletter_subscribers || 0,
      icon: MessageSquare,
      color: 'from-blue-600 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-slate-600">Monitor your Gretta AI platform activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <Badge className="mt-2 bg-green-100 text-green-700 border-green-300">Active</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-white border-2 border-slate-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                <TabsTrigger value="contacts" className="data-[state=active]:bg-white">Contacts</TabsTrigger>
                <TabsTrigger value="trials" className="data-[state=active]:bg-white">Trials</TabsTrigger>
                <TabsTrigger value="demos" className="data-[state=active]:bg-white">Demos</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="text-sm text-slate-600">Total Submissions</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {(analytics?.total_contacts || 0) + (analytics?.total_trial_signups || 0) + (analytics?.total_demo_requests || 0)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border-2 border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">Conversion Rate</p>
                      <p className="text-xl font-bold text-green-600">-</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-2 border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">Avg. Response Time</p>
                      <p className="text-xl font-bold text-blue-600">Instant</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-2 border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">Status</p>
                      <Badge className="bg-green-100 text-green-700 border-green-300">All Systems Operational</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contacts" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-slate-600">Contact submissions: <span className="font-bold text-slate-900">{analytics?.total_contacts || 0}</span></p>
                  <p className="text-sm text-slate-500 mt-2">Individual contact records would be listed here</p>
                </div>
              </TabsContent>
              <TabsContent value="trials" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-slate-600">Trial signups: <span className="font-bold text-slate-900">{analytics?.total_trial_signups || 0}</span></p>
                  <p className="text-sm text-slate-500 mt-2">Individual trial signup records would be listed here</p>
                </div>
              </TabsContent>
              <TabsContent value="demos" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-slate-600">Demo requests: <span className="font-bold text-slate-900">{analytics?.total_demo_requests || 0}</span></p>
                  <p className="text-sm text-slate-500 mt-2">Individual demo request records would be listed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
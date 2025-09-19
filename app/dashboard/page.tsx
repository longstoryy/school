'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BookOpen, Calendar, Clock, FileText, Home, LineChart, Menu, MessageSquare, Settings, User, Users, TrendingUp, Award, Activity, ChevronRight, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will be redirected by the useEffect
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {session.user?.name || 'User'}!
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Time</p>
              </div>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {session.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Students
              </CardTitle>
              <Users className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs opacity-90">
                  +20.1% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Teachers
              </CardTitle>
              <User className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs opacity-90">
                  +5 from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Classes</CardTitle>
              <BookOpen className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <div className="flex items-center mt-2">
                <Plus className="h-4 w-4 mr-1" />
                <p className="text-xs opacity-90">
                  5 new this term
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Attendance Rate</CardTitle>
              <Activity className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">94.3%</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs opacity-90">
                  +1.1% from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Latest updates from your school</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  { type: 'assignment', title: 'New Math Assignment Posted', subtitle: 'Algebra II - Due in 3 days', time: '2h ago', color: 'bg-blue-500' },
                  { type: 'grade', title: 'Grades Updated', subtitle: 'Physics Quiz - Average: 87%', time: '4h ago', color: 'bg-green-500' },
                  { type: 'event', title: 'Parent Meeting Scheduled', subtitle: 'Tomorrow at 2:00 PM', time: '6h ago', color: 'bg-purple-500' },
                  { type: 'announcement', title: 'School Holiday Notice', subtitle: 'Next Friday - No Classes', time: '1d ago', color: 'bg-orange-500' },
                  { type: 'achievement', title: 'Student Achievement', subtitle: 'Science Fair Winner Announced', time: '2d ago', color: 'bg-yellow-500' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      {activity.type === 'assignment' && <FileText className="h-5 w-5 text-white" />}
                      {activity.type === 'grade' && <Award className="h-5 w-5 text-white" />}
                      {activity.type === 'event' && <Calendar className="h-5 w-5 text-white" />}
                      {activity.type === 'announcement' && <Bell className="h-5 w-5 text-white" />}
                      {activity.type === 'achievement' && <Award className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {activity.subtitle}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Your schedule for today</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { title: 'Parent-Teacher Meeting', time: '2:00 PM - 3:00 PM', color: 'border-l-blue-500' },
                    { title: 'Staff Meeting', time: '4:00 PM - 5:00 PM', color: 'border-l-green-500' },
                    { title: 'Student Assembly', time: '10:00 AM - 11:00 AM', color: 'border-l-purple-500' }
                  ].map((event, i) => (
                    <div key={i} className={`border-l-4 ${event.color} pl-4 py-2`}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </p>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">Add Student</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <span className="text-xs">New Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-xs">Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    <span className="text-xs">Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

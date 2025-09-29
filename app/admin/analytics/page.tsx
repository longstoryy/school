'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Users, GraduationCap, DollarSign, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
      return;
    }

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, [router]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleSubmenu = (menuName: string) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const analyticsData = {
    studentEnrollment: {
      current: 3654,
      growth: 12.5,
      monthlyData: [3200, 3300, 3450, 3500, 3600, 3654]
    },
    revenue: {
      current: 125000,
      growth: 18.3,
      monthlyData: [95000, 105000, 110000, 115000, 120000, 125000]
    },
    attendance: {
      current: 94.7,
      growth: 2.1,
      weeklyData: [92.5, 93.2, 94.1, 94.5, 94.7]
    },
    performance: {
      current: 87.3,
      growth: 5.2,
      subjectData: [
        { subject: 'Mathematics', score: 89.5 },
        { subject: 'Science', score: 87.2 },
        { subject: 'English', score: 85.8 },
        { subject: 'History', score: 88.1 }
      ]
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Navigation */}
      <AdminNavbar
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        user={user}
        onLogout={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
        setSidebarOpen={setSidebarOpen}
        setSidebarHovered={setSidebarHovered}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className={`transition-all duration-500 ${sidebarOpen || sidebarHovered ? 'lg:ml-60' : 'lg:ml-20'}`}>
        <main className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Analytics Dashboard
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive insights and performance metrics
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Student Enrollment */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{analyticsData.studentEnrollment.growth}%</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.studentEnrollment.current.toLocaleString()}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Students
            </p>
          </div>

          {/* Revenue */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{analyticsData.revenue.growth}%</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${analyticsData.revenue.current.toLocaleString()}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monthly Revenue
            </p>
          </div>

          {/* Attendance Rate */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{analyticsData.attendance.growth}%</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.attendance.current}%
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Attendance Rate
            </p>
          </div>

          {/* Academic Performance */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{analyticsData.performance.growth}%</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.performance.current}%
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Average Performance
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Student Enrollment Trend */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Student Enrollment Trend
            </h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.studentEnrollment.monthlyData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(value / Math.max(...analyticsData.studentEnrollment.monthlyData)) * 200}px` }}
                  ></div>
                  <span className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    M{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Performance */}
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Subject Performance
            </h3>
            <div className="space-y-4">
              {analyticsData.performance.subjectData.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {subject.subject}
                    </span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {subject.score}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-6 rounded-2xl shadow-lg border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 flex items-center space-x-3">
              <BarChart3 className="w-5 h-5" />
              <span>Generate Report</span>
            </button>
            <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 flex items-center space-x-3">
              <TrendingUp className="w-5 h-5" />
              <span>View Trends</span>
            </button>
            <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-200 flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

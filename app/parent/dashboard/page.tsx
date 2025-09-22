'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, BookOpen, Calendar, Settings, Bell, User, TrendingUp, LogOut, LayoutDashboard,
  GraduationCap, FileText, ClipboardList, BarChart3, MessageCircle, Clock, Target,
  ChevronDown, ChevronRight, Menu, X, Award, DollarSign, Building, Car, Library,
  Shield, Globe, Database, Mail, Smartphone, UserCheck, UserX, Home, MapPin,
  FolderOpen, StickyNote, CheckSquare, Phone, Video, CreditCard, UserPlus,
  Trash2, Heart, Zap, Archive, Download, Upload, Share2, Search, Sun, Moon,
  Maximize, Plus, Languages, CalendarDays, Command, Trophy
} from 'lucide-react';

export default function ParentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }

    // Ctrl+K search functionality
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(true);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleSubmenu = (menuName: string) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const mockResults = [
        { title: 'My Classes', path: '/student/classes', type: 'page' },
        { title: 'My Grades', path: '/student/grades', type: 'page' },
        { title: 'Assignments', path: '/student/assignments', type: 'page' },
        { title: 'Math Class 10A', path: '/student/classes/math-10a', type: 'class' },
        { title: 'Study Materials', path: '/student/materials', type: 'resource' },
      ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
    }
  };

  // Comprehensive Parent Sidebar Items
  const sidebarItems = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/parent/dashboard', active: true },
        { name: 'My Profile', icon: User, href: '/parent/profile' },
      ]
    },
    {
      title: 'My Children',
      items: [
        { 
          name: 'Children Overview', 
          icon: Users,
          submenu: [
            { name: 'All Children', href: '/parent/children' },
            { name: 'Academic Progress', href: '/parent/children/progress' },
            { name: 'Behavior Reports', href: '/parent/children/behavior' },
          ]
        },
        { name: 'Class Information', icon: GraduationCap, href: '/parent/classes' },
        { 
          name: 'Attendance Monitoring', 
          icon: Clock,
          submenu: [
            { name: 'Daily Attendance', href: '/parent/attendance' },
            { name: 'Attendance Reports', href: '/parent/attendance/reports' },
            { name: 'Leave Requests', href: '/parent/attendance/leave' },
          ]
        },
      ]
    },
    {
      title: 'Academic Monitoring',
      items: [
        { 
          name: 'Homework & Assignments', 
          icon: ClipboardList,
          submenu: [
            { name: 'Current Assignments', href: '/parent/assignments' },
            { name: 'Assignment Progress', href: '/parent/assignments/progress' },
            { name: 'Completed Work', href: '/parent/assignments/completed' },
          ]
        },
        { 
          name: 'Examinations & Tests', 
          icon: FileText,
          submenu: [
            { name: 'Exam Schedule', href: '/parent/exams/schedule' },
            { name: 'Test Results', href: '/parent/exams/results' },
            { name: 'Performance Analysis', href: '/parent/exams/analysis' },
          ]
        },
        { name: 'Class Timetable', icon: Calendar, href: '/parent/timetable' },
        { name: 'Curriculum Overview', icon: BookOpen, href: '/parent/curriculum' },
      ]
    },
    {
      title: 'Performance & Reports',
      items: [
        { name: 'Grade Reports', icon: BarChart3, href: '/parent/grades' },
        { name: 'Progress Tracking', icon: TrendingUp, href: '/parent/progress' },
        { name: 'Report Cards', icon: FileText, href: '/parent/report-cards' },
        { name: 'Achievements & Awards', icon: Award, href: '/parent/achievements' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { name: 'School Announcements', icon: Bell, href: '/parent/announcements' },
        { name: 'Teacher Messages', icon: MessageCircle, href: '/parent/messages' },
        { name: 'Parent-Teacher Chat', icon: MessageCircle, href: '/parent/teacher-chat' },
        { name: 'Parent Community', icon: Users, href: '/parent/community' },
      ]
    },
    {
      title: 'School Services',
      items: [
        { 
          name: 'Meetings & Appointments', 
          icon: Calendar,
          submenu: [
            { name: 'Schedule Meeting', href: '/parent/meetings/schedule' },
            { name: 'Parent-Teacher Conferences', href: '/parent/meetings/conferences' },
            { name: 'Counselor Meetings', href: '/parent/meetings/counselor' },
            { name: 'Meeting History', href: '/parent/meetings/history' },
          ]
        },
        { 
          name: 'School Events', 
          icon: Globe,
          submenu: [
            { name: 'Upcoming Events', href: '/parent/events/upcoming' },
            { name: 'Sports Events', href: '/parent/events/sports' },
            { name: 'Cultural Programs', href: '/parent/events/cultural' },
            { name: 'Parent Workshops', href: '/parent/events/workshops' },
          ]
        },
        { 
          name: 'Resources & Support', 
          icon: Library,
          submenu: [
            { name: 'Parent Resources', href: '/parent/resources' },
            { name: 'Educational Guidelines', href: '/parent/guidelines' },
            { name: 'Support Services', href: '/parent/support' },
            { name: 'Counseling Services', href: '/parent/counseling' },
          ]
        },
      ]
    },
    {
      title: 'Activities & Involvement',
      items: [
        { 
          name: 'Extracurricular Activities', 
          icon: Trophy,
          submenu: [
            { name: 'Child\'s Activities', href: '/parent/activities' },
            { name: 'Sports Participation', href: '/parent/activities/sports' },
            { name: 'Club Memberships', href: '/parent/activities/clubs' },
          ]
        },
        { name: 'School Events', icon: Calendar, href: '/parent/school-events' },
        { name: 'Volunteer Opportunities', icon: Heart, href: '/parent/volunteer' },
      ]
    },
    {
      title: 'Financial & Administrative',
      items: [
        { name: 'Fee Payment', icon: CreditCard, href: '/parent/fees' },
        { name: 'Payment History', icon: DollarSign, href: '/parent/payment-history' },
        { name: 'Fee Structure', icon: FileText, href: '/parent/fee-structure' },
        { name: 'Transport Services', icon: Car, href: '/parent/transport' },
        { name: 'School Forms', icon: ClipboardList, href: '/parent/forms' },
      ]
    },
    {
      title: 'Settings & Support',
      items: [
        { name: 'Profile Settings', icon: User, href: '/parent/profile' },
        { name: 'Notification Preferences', icon: Bell, href: '/parent/notifications' },
        { name: 'Privacy Settings', icon: Shield, href: '/parent/privacy' },
        { name: 'Help & Support', icon: MessageCircle, href: '/parent/support' },
      ]
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className={`flex items-center justify-between h-16 px-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>EduManage</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 space-y-1 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {/* Section Header */}
              <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {section.title}
              </div>
              
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md group transition-all duration-200 hover:translate-x-1 ${
                          activeSubmenu === item.name 
                            ? (darkMode ? 'bg-green-800 text-white shadow-lg' : 'bg-green-100 text-green-900 shadow-md')
                            : (darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50')
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                            activeSubmenu === item.name 
                              ? (darkMode ? 'text-white' : 'text-green-600')
                              : (darkMode ? 'text-gray-400' : 'text-gray-500')
                          }`} />
                          <span>{item.name}</span>
                          {item.submenu.length > 0 && (
                            <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.submenu.length}
                            </span>
                          )}
                        </div>
                        {activeSubmenu === item.name ? (
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                        )}
                      </button>
                      {activeSubmenu === item.name && (
                        <div className="ml-6 mt-1 space-y-1 animate-fadeIn">
                          {item.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-200 hover:translate-x-1 ${
                                darkMode 
                                  ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                              }`}></div>
                              <span>{subItem.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md group transition-all duration-200 hover:translate-x-1 ${
                        item.active
                          ? (darkMode ? 'bg-green-800 text-white shadow-lg' : 'bg-green-100 text-green-900 shadow-md')
                          : (darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50')
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                        item.active 
                          ? (darkMode ? 'text-white' : 'text-green-600')
                          : (darkMode ? 'text-gray-400' : 'text-gray-500')
                      }`} />
                      <span>{item.name}</span>
                      {item.name === 'Dashboard' && (
                        <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Section Divider */}
              {sectionIndex < sidebarItems.length - 1 && (
                <div className={`my-3 mx-3 border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md ${
              darkMode 
                ? 'text-gray-400 hover:bg-red-600/20 hover:text-red-400' 
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className={`flex-1 relative z-0 overflow-y-auto focus:outline-none ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Header */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className={`ml-4 text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Parent Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Search Button */}
                  <button
                    onClick={() => setShowSearchModal(true)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700' 
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-white hover:border-green-200'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:block">Search...</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
                      darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Command className="w-3 h-3" />
                      <span>K</span>
                    </div>
                  </button>
                  
                  {/* Academic Year */}
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-green-200'
                  }`}>
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-medium">2024/2025</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-green-200'
                    }`}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>

                  {/* Notifications */}
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md relative ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-green-200'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white animate-pulse"></span>
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name?.charAt(0) || 'T'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className={`relative rounded-2xl shadow-2xl p-8 mb-8 overflow-hidden transition-all duration-300 hover:shadow-3xl group ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600' 
                : 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700'
            }`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full group-hover:translate-x-4 transition-transform duration-500"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                      Welcome back, {user.name?.split(' ')[0] || 'Parent'}! 👨‍👩‍👧‍👦
                    </h1>
                    <p className="text-lg text-white/90 font-medium">
                      Stay connected with your child's educational journey.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">System Online</span>
                      </div>
                      <div className="text-white/80 text-sm">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-6xl">🏫</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - 3D Animated Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Students Tile */}
              <div className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`} style={{animationDelay: '0.1s'}}>
                {/* 3D Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>+12% from last month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>3,654</h3>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Students</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Active: 3,643</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Inactive: 11</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" style={{width: '99.7%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Teachers Tile */}
              <div className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`} style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>+5% from last month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>284</h3>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Teachers</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Active: 254</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Inactive: 30</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse" style={{width: '89.4%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Staff Tile */}
              <div className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`} style={{animationDelay: '0.3s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>+2% from last month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>162</h3>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Staff</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Active: 161</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Inactive: 2</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse" style={{width: '99.4%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Students */}
              <div className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>My Students</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>247</h3>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Students</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Present: 234</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Absent: 13</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className={`w-full h-2 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Revenue Tile */}
              <div className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`} style={{animationDelay: '0.4s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>+18% from last month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>$64,522</h3>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Earnings</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fees: $58,200</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Other: $6,322</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-pulse" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions - 3D Enhanced */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ⚡ Quick Actions
                    </h3>
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="group/btn relative p-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto w-fit mb-3 group-hover/btn:scale-110 transition-transform duration-300 shadow-lg">
                          <UserPlus className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Add Student</span>
                        <p className="text-xs text-gray-600 mt-1">Enroll new student</p>
                      </div>
                    </button>
                    
                    <button className="group/btn relative p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mx-auto w-fit mb-3 group-hover/btn:scale-110 transition-transform duration-300 shadow-lg">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Add Teacher</span>
                        <p className="text-xs text-gray-600 mt-1">Hire new faculty</p>
                      </div>
                    </button>
                    
                    <button className="group/btn relative p-4 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto w-fit mb-3 group-hover/btn:scale-110 transition-transform duration-300 shadow-lg">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Add Class</span>
                        <p className="text-xs text-gray-600 mt-1">Create new class</p>
                      </div>
                    </button>
                    
                    <button className="group/btn relative p-4 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mx-auto w-fit mb-3 group-hover/btn:scale-110 transition-transform duration-300 shadow-lg">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">View Reports</span>
                        <p className="text-xs text-gray-600 mt-1">Analytics & insights</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity - 3D Enhanced */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      📊 Recent Activity
                    </h3>
                    <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className={`group/item p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover/item:scale-110 transition-transform duration-300">
                            <Users className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            New student John Doe enrolled in Grade 10
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              2 hours ago
                            </p>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-xs text-green-600 font-medium">Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`group/item p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg group-hover/item:scale-110 transition-transform duration-300">
                            <DollarSign className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            Fee payment received from Sarah Wilson
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              4 hours ago
                            </p>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-xs text-green-600 font-medium">$2,500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`group/item p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg group-hover/item:scale-110 transition-transform duration-300">
                            <GraduationCap className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            New teacher Maria Garcia added to Mathematics dept
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              1 day ago
                            </p>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-xs text-blue-600 font-medium">Mathematics</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`group/item p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg group-hover/item:scale-110 transition-transform duration-300">
                            <Calendar className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            Exam schedule updated for Grade 12
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              2 days ago
                            </p>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-xs text-orange-600 font-medium">Grade 12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                      View All Activities →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

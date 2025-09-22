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
  Maximize, Plus, Languages, CalendarDays, Command
} from 'lucide-react';

export default function AdminDashboard() {
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
        { title: 'Student Management', path: '/admin/students', type: 'page' },
        { title: 'Teacher Management', path: '/admin/teachers', type: 'page' },
        { title: 'Financial Reports', path: '/admin/finance/reports', type: 'page' },
        { title: 'System Settings', path: '/admin/settings', type: 'page' },
        { title: 'Academic Calendar', path: '/admin/calendar', type: 'page' },
      ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
    }
  };

  // Comprehensive Admin Sidebar Items
  const sidebarItems = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', active: true },
        { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
      ]
    },
    {
      title: 'User Management',
      items: [
        { 
          name: 'Students', 
          icon: Users,
          submenu: [
            { name: 'All Students', href: '/admin/students' },
            { name: 'Student Registration', href: '/admin/students/register' },
            { name: 'Student Records', href: '/admin/students/records' },
            { name: 'Student Reports', href: '/admin/students/reports' },
          ]
        },
        { 
          name: 'Teachers', 
          icon: GraduationCap,
          submenu: [
            { name: 'All Teachers', href: '/admin/teachers' },
            { name: 'Teacher Registration', href: '/admin/teachers/register' },
            { name: 'Teacher Performance', href: '/admin/teachers/performance' },
            { name: 'Teacher Schedules', href: '/admin/teachers/schedules' },
          ]
        },
        { 
          name: 'Staff Management', 
          icon: UserCheck,
          submenu: [
            { name: 'All Staff', href: '/admin/staff' },
            { name: 'Staff Registration', href: '/admin/staff/register' },
            { name: 'Staff Roles', href: '/admin/staff/roles' },
            { name: 'Staff Performance', href: '/admin/staff/performance' },
          ]
        },
        { name: 'Parents', icon: Users, href: '/admin/parents' },
      ]
    },
    {
      title: 'Academic Management',
      items: [
        { 
          name: 'Classes & Sections', 
          icon: Building,
          submenu: [
            { name: 'Class Management', href: '/admin/classes' },
            { name: 'Section Assignment', href: '/admin/classes/sections' },
            { name: 'Class Schedules', href: '/admin/classes/schedules' },
            { name: 'Room Allocation', href: '/admin/classes/rooms' },
          ]
        },
        { 
          name: 'Subjects & Curriculum', 
          icon: BookOpen,
          submenu: [
            { name: 'Subject Management', href: '/admin/subjects' },
            { name: 'Curriculum Planning', href: '/admin/curriculum' },
            { name: 'Syllabus Management', href: '/admin/syllabus' },
            { name: 'Academic Standards', href: '/admin/standards' },
          ]
        },
        { 
          name: 'Examinations', 
          icon: FileText,
          submenu: [
            { name: 'Exam Management', href: '/admin/exams' },
            { name: 'Exam Scheduling', href: '/admin/exams/schedule' },
            { name: 'Result Management', href: '/admin/exams/results' },
            { name: 'Grade Configuration', href: '/admin/exams/grades' },
          ]
        },
        { name: 'Academic Calendar', icon: Calendar, href: '/admin/calendar' },
      ]
    },
    {
      title: 'Financial Management',
      items: [
        { 
          name: 'Fee Management', 
          icon: DollarSign,
          submenu: [
            { name: 'Fee Structure', href: '/admin/fees/structure' },
            { name: 'Fee Collection', href: '/admin/fees/collection' },
            { name: 'Payment Tracking', href: '/admin/fees/tracking' },
            { name: 'Fee Reports', href: '/admin/fees/reports' },
          ]
        },
        { 
          name: 'Financial Reports', 
          icon: BarChart3,
          submenu: [
            { name: 'Revenue Reports', href: '/admin/finance/revenue' },
            { name: 'Expense Reports', href: '/admin/finance/expenses' },
            { name: 'Budget Planning', href: '/admin/finance/budget' },
            { name: 'Financial Analytics', href: '/admin/finance/analytics' },
          ]
        },
        { name: 'Payroll Management', icon: CreditCard, href: '/admin/payroll' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { name: 'Announcements', icon: Bell, href: '/admin/announcements' },
        { name: 'Messaging System', icon: MessageCircle, href: '/admin/messages' },
        { name: 'Notifications', icon: Bell, href: '/admin/notifications' },
        { name: 'Email Management', icon: Mail, href: '/admin/email' },
      ]
    },
    {
      title: 'Facilities & Resources',
      items: [
        { 
          name: 'Infrastructure', 
          icon: Building,
          submenu: [
            { name: 'Campus Management', href: '/admin/campus' },
            { name: 'Room Management', href: '/admin/rooms' },
            { name: 'Equipment Tracking', href: '/admin/equipment' },
            { name: 'Maintenance', href: '/admin/maintenance' },
          ]
        },
        { 
          name: 'Library Management', 
          icon: Library,
          submenu: [
            { name: 'Book Management', href: '/admin/library/books' },
            { name: 'Digital Resources', href: '/admin/library/digital' },
            { name: 'Library Reports', href: '/admin/library/reports' },
          ]
        },
        { name: 'Transport Management', icon: Car, href: '/admin/transport' },
      ]
    },
    {
      title: 'Reports & Analytics',
      items: [
        { name: 'Academic Reports', icon: FileText, href: '/admin/reports/academic' },
        { name: 'Financial Reports', icon: DollarSign, href: '/admin/reports/financial' },
        { name: 'Attendance Reports', icon: Clock, href: '/admin/reports/attendance' },
        { name: 'Performance Analytics', icon: TrendingUp, href: '/admin/reports/performance' },
      ]
    },
    {
      title: 'System Administration',
      items: [
        { 
          name: 'System Settings', 
          icon: Settings,
          submenu: [
            { name: 'General Settings', href: '/admin/settings/general' },
            { name: 'Academic Settings', href: '/admin/settings/academic' },
            { name: 'Security Settings', href: '/admin/settings/security' },
            { name: 'Backup & Restore', href: '/admin/settings/backup' },
          ]
        },
        { 
          name: 'User Roles & Permissions', 
          icon: Shield,
          submenu: [
            { name: 'Role Management', href: '/admin/roles' },
            { name: 'Permission Settings', href: '/admin/permissions' },
            { name: 'Access Control', href: '/admin/access-control' },
          ]
        },
        { name: 'System Logs', icon: Database, href: '/admin/logs' },
        { name: 'Data Management', icon: Archive, href: '/admin/data' },
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

        {/* Navigation - Vuexy Style */}
        <nav className="mt-5 px-2 space-y-1">
          <a
            href="/admin/dashboard"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-900 shadow-md'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-white" />
            Dashboard
            <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </a>
          
          <a
            href="/admin/students"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Students
            <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              1,247
            </span>
          </a>
          
          <a
            href="/admin/teachers"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <GraduationCap className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Teachers
            <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              89
            </span>
          </a>
          
          <a
            href="/admin/classes"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Building className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Classes
          </a>
          
          <a
            href="/admin/finance"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <DollarSign className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Finance
          </a>
          
          <a
            href="/admin/reports"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Reports
          </a>
          
          <a
            href="/admin/settings"
            className={`vuexy-menu-item group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            Settings
          </a>
        </nav>

        {/* User Profile Section - Vuexy Style */}
        <div className="absolute bottom-0 w-full p-4 space-y-3">
          {/* User Profile */}
          <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
            darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-white'
          }`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.name || 'Administrator'}
              </p>
              <p className={`text-xs truncate ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                System Admin
              </p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`vuexy-menu-item w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
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
                    Admin Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Search Button - Vuexy Style */}
                  <button
                    onClick={() => setShowSearchModal(true)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700' 
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-white hover:border-red-200'
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
                  
                  {/* Quick Actions */}
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-red-200'
                  }`}>
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:block">Add Student</span>
                  </button>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-red-200'
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
                        : 'bg-white border-gray-200 text-gray-700 hover:border-red-200'
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
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
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
                      Welcome back, {user.name?.split(' ')[0] || 'Administrator'}! 👋
                    </h1>
                    <p className="text-lg text-white/90 font-medium">
                      Here's what's happening at your school today.
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

      {/* Search Modal - Vuexy Style */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowSearchModal(false)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75 backdrop-blur-sm"></div>
            </div>
            
            <div className={`inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search students, teachers, classes, pages..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none text-lg ${
                      darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    }`}
                    autoFocus
                  />
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span>ESC</span>
                  </div>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      Quick Actions
                    </div>
                    <div className="space-y-1">
                      <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      }`}>
                        <UserPlus className="w-4 h-4" />
                        <span>Add Student</span>
                      </button>
                      <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      }`}>
                        <GraduationCap className="w-4 h-4" />
                        <span>Add Teacher</span>
                      </button>
                    </div>
                    
                    <div className={`text-xs font-semibold uppercase tracking-wider mt-4 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      Search Results
                    </div>
                    {searchResults.map((result, index) => (
                      <a
                        key={index}
                        href={result.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          result.type === 'page' ? 'bg-blue-400' : 'bg-green-400'
                        }`}></div>
                        <span>{result.title}</span>
                        <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {result.type}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Vuexy Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .vuexy-menu-item {
          transition: all 0.2s ease;
        }
        
        .vuexy-menu-item:hover {
          transform: translateX(4px);
        }
        
        .vuexy-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 3px;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

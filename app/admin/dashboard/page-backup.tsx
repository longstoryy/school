'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, Clock, FileText, BarChart3, TrendingUp, Settings, Bell, MessageCircle, Mail, User, Target, ClipboardList, Award, Building, Car, Library, Shield, Globe, Database, Smartphone, UserCheck, UserX, Home, MapPin, FolderOpen, StickyNote, CheckSquare, Phone, Video, CreditCard, UserPlus, Trash2, Heart, Zap, Archive, Download, Upload, Share2, Search, Sun, Moon, Maximize, Plus, Languages, CalendarDays, Command, Trophy, Menu, X, ChevronDown, ChevronRight, LogOut, DollarSign, Lock
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
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
    
    // Click outside handler for Add New menu
    const handleClickOutside = (event: MouseEvent) => {
      if (showAddMenu) {
        setShowAddMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);

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

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const mockResults = [
        { title: 'Student Management', path: '/admin/students', type: 'management' },
        { title: 'Teacher Management', path: '/admin/teachers', type: 'management' },
        { title: 'Fee Collection', path: '/admin/fees', type: 'finance' },
        { title: 'Academic Reports', path: '/admin/reports', type: 'reports' },
        { title: 'System Settings', path: '/admin/settings', type: 'settings' },
        { title: 'User Roles', path: '/admin/roles', type: 'security' },
        { title: 'Attendance Reports', path: '/admin/attendance-reports', type: 'reports' },
        { title: 'Financial Analytics', path: '/admin/finance-analytics', type: 'analytics' },
      ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
    }
  };

  // Admin-Specific Sidebar Items Only
  const sidebarItems = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard', active: true },
        { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
      ]
    },
    {
      title: 'User Management',
      items: [
        { name: 'Students', icon: GraduationCap, href: '/admin/students' },
        { name: 'Teachers', icon: Users, href: '/admin/teachers' },
        { name: 'Parents', icon: Heart, href: '/admin/parents' },
        { name: 'Staff', icon: UserCheck, href: '/admin/staff' },
      ]
    },
    {
      title: 'Academic',
      items: [
        { name: 'Classes', icon: Building, href: '/admin/classes' },
        { name: 'Subjects', icon: BookOpen, href: '/admin/subjects' },
        { name: 'Examinations', icon: FileText, href: '/admin/exams' },
        { name: 'Time Table', icon: Calendar, href: '/admin/timetable' },
      ]
    },
    {
      title: 'Finance',
      items: [
        { name: 'Fee Collection', icon: DollarSign, href: '/admin/fees' },
        { name: 'Expenses', icon: CreditCard, href: '/admin/expenses' },
        { name: 'Reports', icon: BarChart3, href: '/admin/finance-reports' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { name: 'Announcements', icon: Bell, href: '/admin/announcements' },
        { name: 'Messages', icon: MessageCircle, href: '/admin/messages' },
        { name: 'Events', icon: Calendar, href: '/admin/events' },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Academic Reports', icon: FileText, href: '/admin/academic-reports' },
        { name: 'Attendance Reports', icon: Clock, href: '/admin/attendance-reports' },
        { name: 'Financial Reports', icon: TrendingUp, href: '/admin/financial-reports' },
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'System Settings', icon: Settings, href: '/admin/settings' },
        { name: 'User Roles', icon: Shield, href: '/admin/roles' },
        { name: 'Backup & Security', icon: Lock, href: '/admin/security' },
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Static Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl border-r ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Navigation - Admin-Specific Vuexy Style */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="space-y-0.5">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-0.5">
                {/* Collapsible Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 hover:bg-gray-700/30 rounded-md ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
                  }`}
                >
                  <span>{section.title}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    collapsedSections.includes(section.title) ? 'rotate-180' : ''
                  }`} />
                </button>
              
              {!collapsedSections.includes(section.title) && section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.href}
                  className={`vuexy-menu-item flex items-center space-x-3 px-3 py-1.5 text-sm font-medium rounded-md group transition-all duration-200 ${
                    item.active
                      ? (darkMode ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-900 shadow-md')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50')
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                    item.active 
                      ? 'text-white' 
                      : (darkMode ? 'text-gray-400' : 'text-gray-500')
                  }`} />
                  <span>{item.name}</span>
                </a>
              ))}
              
                {/* Section Divider */}
                {sectionIndex < sidebarItems.length - 1 && (
                  <div className={`my-2 mx-3 border-t ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}></div>
                )}
            </div>
          ))}
        </div>
      </nav>

        {/* Professional User Profile Section */}
        <div className="border-t border-gray-700/50 p-4">
          {/* User Profile Card */}
          <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
            darkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-gray-50 hover:bg-white shadow-sm'
          }`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {user?.name || 'Admin User'}
            </p>
            <p className={`text-xs truncate ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              System Administrator
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              darkMode
                ? 'text-gray-400 hover:bg-red-600/20 hover:text-red-400'
                : 'text-gray-500 hover:bg-red-50 hover:text-red-600'
            }`}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="lg:ml-64 min-h-screen">
      <main className={`relative z-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Enhanced Header with 3D Search */}
        <div className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-6 flex-1">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                  
                  {/* 3D Responsive Search Bar */}
                  <div className="flex-1 max-w-2xl">
                    <button
                      onClick={() => setShowSearchModal(true)}
                      className={`w-full flex items-center px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                        darkMode 
                          ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 shadow-xl hover:shadow-2xl' 
                          : 'bg-gradient-to-r from-white to-gray-50 text-gray-600 hover:from-gray-50 hover:to-white shadow-xl hover:shadow-2xl border border-gray-200/50'
                      }`}
                      style={{
                        boxShadow: darkMode 
                          ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <Search className="w-5 h-5 mr-4 transition-colors duration-200" />
                      <span className="text-sm flex-1 text-left font-medium">Search...</span>
                      <div className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                        darkMode ? 'bg-gray-600/80 text-gray-200' : 'bg-gray-100/80 text-gray-700'
                      }`}>
                        ⌘K
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Add New Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAddMenu(!showAddMenu)}
                      className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                        darkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl'
                      }`}
                      style={{
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    
                    {/* Add New Dropdown */}
                    {showAddMenu && (
                      <div className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border backdrop-blur-md z-50 ${
                        darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                      }`}>
                        <div className="p-6">
                          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Add New
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {/* Students */}
                            <button className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              darkMode ? 'bg-blue-600/20 hover:bg-blue-600/30' : 'bg-blue-50 hover:bg-blue-100'
                            }`}>
                              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <GraduationCap className="w-6 h-6 text-white" />
                              </div>
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Students
                              </span>
                            </button>
                            
                            {/* Teachers */}
                            <button className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              darkMode ? 'bg-green-600/20 hover:bg-green-600/30' : 'bg-green-50 hover:bg-green-100'
                            }`}>
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-white" />
                              </div>
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Teachers
                              </span>
                            </button>
                            
                            {/* Staffs */}
                            <button className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              darkMode ? 'bg-orange-600/20 hover:bg-orange-600/30' : 'bg-orange-50 hover:bg-orange-100'
                            }`}>
                              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <UserCheck className="w-6 h-6 text-white" />
                              </div>
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Staffs
                              </span>
                            </button>
                            
                            {/* Invoice */}
                            <button className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              darkMode ? 'bg-purple-600/20 hover:bg-purple-600/30' : 'bg-purple-50 hover:bg-purple-100'
                            }`}>
                              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6 text-white" />
                              </div>
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Invoice
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  
                  {/* UK Flag Language Selector */}
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    darkMode ? 'bg-gray-700/60 hover:bg-gray-600/80 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}>
                    <div className="w-6 h-4 rounded-sm overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 via-white to-red-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700" style={{clipPath: 'polygon(0 0, 100% 0, 0 100%)'}}></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-red-600 to-red-700" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'}}></div>
                        <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)'}}></div>
                        <div className="absolute inset-0 bg-white" style={{clipPath: 'polygon(45% 0, 55% 0, 55% 100%, 45% 100%)'}}></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">EN</span>
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                  
                  {/* Quick Actions - Old Style */}
                  <button className="p-2 rounded-lg border transition-all duration-200 hover:shadow-md bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    </div>
                  </button>
                  
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>


                  {/* Notifications */}
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md relative ${
                      darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 text-xs text-white font-bold flex items-center justify-center" style={{fontSize: '8px'}}>1</span>
                  </button>

                  {/* Messages */}
                  <button className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md relative ${
                    darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}>
                    <MessageCircle className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  </button>

                  {/* Analytics */}
                  <button className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}>
                    <BarChart3 className="w-4 h-4" />
                  </button>

                  {/* Fullscreen */}
                  <button className={`p-2 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}>
                    <Maximize className="w-4 h-4" />
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

          {/* Breadcrumb Navigation */}
          <div className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/80'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <nav className="flex items-center space-x-2 text-sm">
                    <a href="/" className={`font-medium ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                      Dashboard
                    </a>
                    <span className={`${darkMode ? 'text-gray-600' : 'text-gray-400'} font-medium`}>/</span>
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Admin Dashboard</span>
                  </nav>
                  <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Admin Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium">
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Student</span>
                  </button>
                  <button className={`px-5 py-2.5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-105 font-medium ${
                    darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                  }`}>
                    Fees Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Success Notification Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className={`flex items-center justify-between p-4 rounded-lg border-l-4 border-green-400 ${
              darkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-semibold">FH</span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                    Fahed III,C has paid Fees for the "Term1"
                  </p>
                </div>
              </div>
              <button className={`text-gray-400 hover:text-gray-600 transition-colors`}>
                <X className="w-5 h-5" />
              </button>
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

            {/* Comprehensive Dashboard Tiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chat App Tile */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Chat Application
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Online</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Chat Statistics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>247</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Chats</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>89</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Online Users</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1.2k</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Messages Today</div>
                    </div>
                  </div>
                  
                  {/* Chat Activity Graph */}
                  <div className="mb-4">
                    <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message Activity</div>
                    <div className="flex items-end space-x-1 h-20">
                      {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 50].map((height, index) => (
                        <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-sm transition-all duration-300 hover:from-blue-400 hover:to-purple-500" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Chat Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}>
                      <MessageCircle className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">New Chat</div>
                    </button>
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-green-600/20 hover:bg-green-600/30 text-green-400' : 'bg-green-50 hover:bg-green-100 text-green-600'
                    }`}>
                      <Users className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Group Chat</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendance Tracker */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Attendance Tracker
                      </h3>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      darkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                      Live
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Attendance Categories with Sliders */}
                  <div className="space-y-6">
                    {/* Teachers Attendance */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Teachers</span>
                        </div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>94.2%</div>
                      </div>
                      <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{width: '94.2%'}}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Present: 162</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Absent: 10</span>
                      </div>
                    </div>
                    
                    {/* Staff Attendance */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-blue-500" />
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Staff</span>
                        </div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>89.7%</div>
                      </div>
                      <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500" style={{width: '89.7%'}}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Present: 87</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Absent: 10</span>
                      </div>
                    </div>
                    
                    {/* Students Attendance */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-purple-500" />
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Students</span>
                        </div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>91.8%</div>
                      </div>
                      <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{width: '91.8%'}}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Present: 3,354</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Absent: 300</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Attendance Trend Graph */}
                  <div className="mt-6">
                    <div className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weekly Trend</div>
                    <div className="flex items-end justify-between h-16">
                      {[85, 92, 88, 94, 91, 89, 93].map((height, index) => (
                        <div key={index} className="flex flex-col items-center space-y-1">
                          <div className={`w-6 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t transition-all duration-300 hover:from-green-400 hover:to-emerald-300`} style={{height: `${height}%`}}></div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
            
            {/* Second Row - Class Performance and Fees Payment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Class Performance Tile */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Class Performance
                      </h3>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      darkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                    }`}>
                      Updated
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>87.5%</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Score</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>42</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Top Performers</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>8</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Need Support</div>
                    </div>
                  </div>
                  
                  {/* Performance Graph */}
                  <div className="mb-4">
                    <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject Performance</div>
                    <div className="space-y-3">
                      {[
                        {subject: 'Mathematics', score: 92, color: 'from-blue-500 to-blue-600'},
                        {subject: 'Science', score: 88, color: 'from-green-500 to-green-600'},
                        {subject: 'English', score: 85, color: 'from-purple-500 to-purple-600'},
                        {subject: 'History', score: 82, color: 'from-orange-500 to-orange-600'}
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`text-xs font-medium w-20 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.subject}</div>
                          <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`} style={{width: `${item.score}%`}}></div>
                          </div>
                          <div className={`text-xs font-bold w-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.score}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-orange-600/20 hover:bg-orange-600/30 text-orange-400' : 'bg-orange-50 hover:bg-orange-100 text-orange-600'
                    }`}>
                      <BarChart3 className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">View Details</div>
                    </button>
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                    }`}>
                      <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Trends</div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Fees Payment Tile */}
              <div className={`group relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-200 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Fees Payment
                      </h3>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      darkMode ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      Active
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Payment Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>$89.2k</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Collected</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>$12.8k</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>87.4%</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Collection Rate</div>
                    </div>
                  </div>
                  
                  {/* Payment Categories */}
                  <div className="mb-4">
                    <div className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Categories</div>
                    <div className="space-y-3">
                      {[
                        {category: 'Tuition Fees', amount: 65200, percentage: 73, color: 'from-emerald-500 to-emerald-600'},
                        {category: 'Transport', amount: 15400, percentage: 17, color: 'from-blue-500 to-blue-600'},
                        {category: 'Library', amount: 5800, percentage: 7, color: 'from-purple-500 to-purple-600'},
                        {category: 'Activities', amount: 2800, percentage: 3, color: 'from-orange-500 to-orange-600'}
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`text-xs font-medium w-20 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.category}</div>
                          <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`} style={{width: `${item.percentage}%`}}></div>
                          </div>
                          <div className={`text-xs font-bold w-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>${item.amount/1000}k</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Payment Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                    }`}>
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Collect Fees</div>
                    </button>
                    <button className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-teal-600/20 hover:bg-teal-600/30 text-teal-400' : 'bg-teal-50 hover:bg-teal-100 text-teal-600'
                    }`}>
                      <FileText className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Reports</div>
                    </button>
                  </div>
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

      {/* Template Customizer - Floating Button */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setCustomizerOpen(!customizerOpen)}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center justify-center ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
          }`}
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Template Customizer Panel */}
      {customizerOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCustomizerOpen(false)}></div>
          <div className={`absolute right-0 top-0 h-full w-80 shadow-2xl transform transition-transform duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Template Customizer
                </h3>
                <button
                  onClick={() => setCustomizerOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Theme Options */}
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Theme Options
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dark Mode</span>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          darkMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Layout Options */}
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Layout Options
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg border-2 transition-all ${
                      darkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="text-xs font-medium">Default</div>
                    </button>
                    <button className={`p-3 rounded-lg border-2 transition-all ${
                      darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="text-xs font-medium">Compact</div>
                    </button>
                  </div>
                </div>

                {/* Color Schemes */}
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Color Schemes
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-blue-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-green-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-purple-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-orange-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-pink-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-indigo-500 hover:scale-110 transition-transform" />
                    <button className="w-8 h-8 rounded-full bg-teal-500 hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Preview Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
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

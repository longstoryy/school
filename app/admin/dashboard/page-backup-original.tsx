'use client';

import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, Clock, FileText, BarChart3, TrendingUp, Settings, Bell, MessageCircle, Mail, User, Target, ClipboardList, Award, Building, Car, Library, Shield, Globe, Database, Smartphone, UserCheck, UserX, Home, MapPin, FolderOpen, StickyNote, CheckSquare, Phone, Video, CreditCard, UserPlus, Trash2, Heart, Zap, Archive, Download, Upload, Share2, Search, Sun, Moon, Maximize, Plus, Languages, CalendarDays, Command, Trophy, Menu, X, ChevronDown, ChevronRight, LogOut, DollarSign, Lock
} from 'lucide-react';

// 🎯 Premium Enterprise TypeScript Interfaces
interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalStaff: number;
  totalRevenue: number;
  studentGrowth: number;
  teacherGrowth: number;
  staffGrowth: number;
  revenueGrowth: number;
  attendanceRate: number;
  activeStudents: number;
  inactiveStudents: number;
  activeTeachers: number;
  inactiveTeachers: number;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  href: string;
  color: string;
  description: string;
  category: 'primary' | 'secondary';
}

interface RecentActivity {
  id: string;
  type: 'student' | 'teacher' | 'payment' | 'announcement' | 'grade';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

interface SidebarItem {
  name: string;
  icon: any;
  href: string;
  active?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// 🎨 Premium Animated Stats Card Component
const StatsCard = memo(({ 
  title, 
  value, 
  growth, 
  icon: Icon, 
  color, 
  delay = 0,
  darkMode,
  activeCount,
  inactiveCount 
}: {
  title: string;
  value: string | number;
  growth: number;
  icon: any;
  color: string;
  delay?: number;
  darkMode: boolean;
  activeCount?: number;
  inactiveCount?: number;
}) => (
  <div 
    className={`group relative p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer transform-gpu ${
      darkMode ? 'bg-gradient-to-br from-gray-800/90 to-gray-700/90 border-gray-600/50 backdrop-blur-xl' : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 backdrop-blur-xl'
    }`}
    style={{
      animationDelay: `${delay}s`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}
  >
    {/* 🌟 Premium Glass Morphism Background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color}/10 ${color.replace('from-', 'to-')}/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
    
    {/* ✨ Floating Particles Effect */}
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute top-2 right-2 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 transform-gpu`}>
          <Icon className="h-6 w-6 text-white drop-shadow-sm" />
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            growth > 0 ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {growth > 0 ? '+' : ''}{growth}% from last month
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className={`text-3xl font-bold transition-all duration-300 group-hover:scale-105 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className={`text-sm font-medium ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>{title}</p>
        
        {activeCount !== undefined && inactiveCount !== undefined && (
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Active: {activeCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Inactive: {inactiveCount}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* 📊 Premium Progress Bar */}
      <div className="mt-4">
        <div className={`w-full h-2 rounded-full ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
        }`}>
          <div 
            className={`h-2 bg-gradient-to-r ${color} rounded-full transition-all duration-1000 animate-pulse shadow-lg`} 
            style={{width: `${Math.min(95 + (title.length % 5), 100)}%`}}
          ></div>
        </div>
      </div>
    </div>
  </div>
));

StatsCard.displayName = 'StatsCard';

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 🎯 Premium Dashboard Stats with Enterprise Metrics
  const dashboardStats = useMemo<DashboardStats>(() => ({
    totalStudents: 3654,
    totalTeachers: 284,
    totalStaff: 162,
    totalRevenue: 64522,
    studentGrowth: 12.0,
    teacherGrowth: 5.0,
    staffGrowth: 2.0,
    revenueGrowth: 18.0,
    attendanceRate: 94.7,
    activeStudents: 3643,
    inactiveStudents: 11,
    activeTeachers: 254,
    inactiveTeachers: 30
  }), []);

  // 🚀 Performance-Optimized Callbacks
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setShowSearchModal(prev => !prev);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }, []);

  // 🎨 Memoized Quick Actions
  const quickActions = useMemo<QuickAction[]>(() => [
    {
      id: 'add-student',
      label: 'Add New Student',
      icon: UserPlus,
      href: '/admin/students/add',
      color: 'from-blue-500 to-blue-600',
      description: 'Register new student enrollment',
      category: 'primary'
    },
    {
      id: 'send-announcement',
      label: 'Send Announcement',
      icon: MessageCircle,
      href: '/admin/announcements/new',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Broadcast to school community',
      category: 'primary'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'from-purple-500 to-purple-600',
      description: 'Analytics & performance insights',
      category: 'primary'
    }
  ], []);

  // 📊 Memoized Recent Activities
  const recentActivities = useMemo<RecentActivity[]>(() => [
    {
      id: '1',
      type: 'student',
      title: 'New Student Enrolled',
      description: 'Sarah Johnson joined Year 10 Science Program',
      timestamp: '2 minutes ago',
      icon: UserPlus,
      color: 'text-blue-600',
      priority: 'high'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Fee Payment Received',
      description: '$2,400 tuition payment from Michael Chen family',
      timestamp: '15 minutes ago',
      icon: DollarSign,
      color: 'text-green-600',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'grade',
      title: 'Grades Submitted',
      description: 'Dr. Smith submitted Mathematics midterm grades',
      timestamp: '1 hour ago',
      icon: Award,
      color: 'text-purple-600',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'announcement',
      title: 'School Announcement',
      description: 'Parent-Teacher conference scheduled for next week',
      timestamp: '2 hours ago',
      icon: MessageCircle,
      color: 'text-orange-600',
      priority: 'high'
    }
  ], []);

  useEffect(() => {
    // 🎯 Premium User Authentication & Loading
    const initializeDashboard = async () => {
      setIsLoading(true);
      
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        router.push('/login');
        return;
      }

      // 🌙 Initialize Dark Mode
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);

      // ⚡ Simulate premium loading experience
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };

    initializeDashboard();
    
    // 🎮 Advanced Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global Search - Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchToggle();
      }
      // Sidebar Toggle - Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        handleSidebarToggle();
      }
      // Dark Mode Toggle - Ctrl/Cmd + D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        handleDarkModeToggle();
      }
      // Close Modals - Escape
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowAddMenu(false);
        setNotificationOpen(false);
        setProfileOpen(false);
        setCustomizerOpen(false);
      }
      // Help Menu - Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // TODO: Show help modal
      }
    };

    // 🖱️ Click Outside Handler
    const handleClickOutside = (event: MouseEvent) => {
      if (showAddMenu) {
        setShowAddMenu(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router, handleSearchToggle, handleSidebarToggle, handleDarkModeToggle, showAddMenu]);

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

  // 🎨 Premium Loading Screen
  if (isLoading || !user) {
    // Generate deterministic particle positions to avoid hydration mismatch
    const particles = Array.from({ length: 50 }).map((_, i) => ({
      left: ((i * 17 + 23) % 100),
      top: ((i * 31 + 47) % 100),
      delay: (i * 0.1) % 2,
      duration: 2 + (i % 3)
    }));

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* ✨ Animated Background Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center z-10">
          {/* 🌟 Premium Loading Spinner */}
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500 mx-auto"></div>
            <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500 mx-auto absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
          </div>
          
          {/* 📱 Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Loading Enterprise Dashboard
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-purple-200 text-sm font-medium">
              Initializing premium features...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* 🚀 Premium Enterprise Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          sidebarOpen ? 'w-80' : 'lg:w-20'
        }`}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* 🎯 Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-gray-400">Enterprise Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🔍 Premium Search Bar */}
        {sidebarOpen && (
          <div className="p-4">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-full flex items-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 mr-3 group-hover:text-white transition-colors" />
              <span className="text-sm">Search...</span>
              <div className="ml-auto px-2 py-1 rounded-md bg-white/10 text-xs font-medium">⌘K</div>
            </button>
          </div>
        )}

        {/* 🎨 Premium Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 vuexy-scrollbar">
          <div className="space-y-1">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1">
                {/* 🏷️ Section Header */}
                {sidebarOpen && (
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400/70">
                    {section.title}
                  </div>
                )}
                
                {/* 🎯 Menu Items */}
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative group">
                    <a
                      href={item.href}
                      className={`premium-menu-item flex items-center px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                        item.active
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      } ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}
                      style={{
                        backdropFilter: item.active ? 'blur(10px)' : 'none'
                      }}
                    >
                      {/* 🌈 Animated Border Gradient */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #667eea)',
                          padding: '1px'
                        }}
                      >
                        <div className="w-full h-full rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-700/90"></div>
                      </div>
                      
                      {/* 🎯 Icon */}
                      <div className="relative z-10">
                        <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                          item.active ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                        }`} />
                      </div>
                      
                      {/* 📝 Label */}
                      {sidebarOpen && (
                        <span className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                          item.active ? 'text-white' : 'group-hover:text-white'
                        }`}>
                          {item.name}
                        </span>
                      )}
                      
                      {/* ✨ Active Indicator */}
                      {item.active && (
                        <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      )}
                    </a>
                  </div>
                ))}
                
                {/* 📏 Section Divider */}
                {sectionIndex < sidebarItems.length - 1 && sidebarOpen && (
                  <div className="mx-3 my-4 border-t border-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* 👤 Premium User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-gray-800 rounded-full animate-pulse"></div>
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    System Administrator
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 📱 Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🎯 Main Content Area */}
      <div className={`transition-all duration-500 ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-20'}`}>
        <main className={`relative z-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* 🎨 Premium Header */}
          <div className={`sticky top-0 z-30 backdrop-blur-md border-b ${
            darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
          }`} style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-6 flex-1">
                  <button
                    onClick={handleSidebarToggle}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  
                  {/* 🔍 Header Search - Only Search Icon */}
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
                
                {/* 🎯 Header Actions */}
                <div className="flex items-center space-x-3">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={handleDarkModeToggle}
                    className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      darkMode 
                        ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' 
                        : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-700'
                    }`}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  
                  {/* Notifications */}
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className={`relative p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      darkMode 
                        ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 Dashboard Content */}
          <div className="p-6">
            {/* 🎨 Welcome Banner */}
            <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 ${
              darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-white to-gray-50'
            }`} style={{
              boxShadow: darkMode 
                ? '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome back, {user?.name || 'Admin'}! 👋
                    </h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Here's what's happening at your school today.
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-6xl">🏫</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🚀 Premium Enterprise Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Students"
                value={dashboardStats.totalStudents}
                growth={dashboardStats.studentGrowth}
                icon={Users}
                color="from-blue-500 to-blue-600"
                delay={0.1}
                darkMode={darkMode}
                activeCount={dashboardStats.activeStudents}
                inactiveCount={dashboardStats.inactiveStudents}
              />
              
              <StatsCard
                title="Total Teachers"
                value={dashboardStats.totalTeachers}
                growth={dashboardStats.teacherGrowth}
                icon={GraduationCap}
                color="from-emerald-500 to-emerald-600"
                delay={0.2}
                darkMode={darkMode}
                activeCount={dashboardStats.activeTeachers}
                inactiveCount={dashboardStats.inactiveTeachers}
              />
              
              <StatsCard
                title="Total Staff"
                value={dashboardStats.totalStaff}
                growth={dashboardStats.staffGrowth}
                icon={UserCheck}
                color="from-purple-500 to-purple-600"
                delay={0.3}
                darkMode={darkMode}
                activeCount={161}
                inactiveCount={2}
              />
              
              <StatsCard
                title="Monthly Revenue"
                value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
                growth={dashboardStats.revenueGrowth}
                icon={DollarSign}
                color="from-orange-500 to-red-600"
                delay={0.4}
                darkMode={darkMode}
              />
            </div>
          </div>
        </main>
      </div>

      {/* 🔍 Premium Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className={`w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border ${
            darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
          }`} style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className={`flex-1 text-lg bg-transparent border-none outline-none ${
                    darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <a
                      key={index}
                      href={result.path}
                      className={`block p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                        darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          result.type === 'management' ? 'bg-blue-500/20 text-blue-400' :
                          result.type === 'finance' ? 'bg-green-500/20 text-green-400' :
                          result.type === 'reports' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {result.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {result.type}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🎨 Premium Enterprise Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          /* 🌟 Premium Menu Animations */
          .premium-menu-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: left center;
          }
          
          .premium-menu-item:hover {
            transform: translateX(4px) scale(1.02);
          }
          
          /* 🎯 Custom Scrollbars */
          .vuexy-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          
          .vuexy-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .vuexy-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 4px;
            transition: all 0.3s ease;
          }
          
          .vuexy-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #f093fb, #f5576c);
            transform: scaleY(1.2);
          }
          
          /* ✨ Premium Animations */
          .animate-fadeIn {
            animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .animate-reverse-spin {
            animation: reverse-spin 2s linear infinite;
          }
          
          /* 🎭 Keyframes */
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(20px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
          
          @keyframes reverse-spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `
      }} />
    </div>
  );
}

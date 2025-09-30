'use client';

import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, Clock, FileText, BarChart3, TrendingUp, Settings, Bell, MessageCircle, Mail, User, Target, ClipboardList, Award, Building, Car, Library, Shield, Globe, Database, Smartphone, UserCheck, UserX, Home, MapPin, FolderOpen, StickyNote, CheckSquare, Phone, Video, CreditCard, UserPlus, Trash2, Heart, Zap, Archive, Download, Upload, Share2, Search, Sun, Moon, Maximize, Plus, Languages, CalendarDays, Command, Trophy, Menu, X, ChevronDown, ChevronRight, LogOut, DollarSign, Lock
} from 'lucide-react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useTheme } from '@/hooks/useTheme';

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
  submenu?: {
    name: string;
    icon: any;
    href: string;
    active?: boolean;
  }[];
}

// Type guard functions
const hasSubmenu = (item: SidebarItem): item is SidebarItem & { submenu: NonNullable<SidebarItem['submenu']> } => {
  return item.submenu !== undefined && item.submenu.length > 0;
};

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
  
  // Use the theme hook
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [searchResults, setSearchResults] = useState<any[]>([]);
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

  // Dark mode is now handled by useTheme hook

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

      // Dark mode is now handled by useTheme hook

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
        toggleDarkMode();
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
  }, [router, handleSearchToggle, handleSidebarToggle, toggleDarkMode, showAddMenu]);

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

  // Admin-Specific Sidebar Items with Dropdown Menus
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
        { 
          name: 'Students', 
          icon: GraduationCap, 
          href: '/admin/students',
          submenu: [
            { name: 'All Students', icon: Users, href: '/admin/students' },
            { name: 'Add Student', icon: UserPlus, href: '/admin/students/add' },
            { name: 'Student Profiles', icon: User, href: '/admin/students/profiles' },
            { name: 'Admissions', icon: ClipboardList, href: '/admin/students/admissions' },
          ]
        },
        { 
          name: 'Teachers', 
          icon: Users, 
          href: '/admin/teachers',
          submenu: [
            { name: 'All Teachers', icon: Users, href: '/admin/teachers' },
            { name: 'Add Teacher', icon: UserPlus, href: '/admin/teachers/add' },
            { name: 'Teacher Profiles', icon: User, href: '/admin/teachers/profiles' },
            { name: 'Assignments', icon: ClipboardList, href: '/admin/teachers/assignments' },
          ]
        },
        { name: 'Parents', icon: Heart, href: '/admin/parents' },
        { name: 'Staff', icon: UserCheck, href: '/admin/staff' },
      ]
    },
    {
      title: 'Academic',
      items: [
        { 
          name: 'Classes', 
          icon: Building, 
          href: '/admin/classes',
          submenu: [
            { name: 'All Classes', icon: Building, href: '/admin/classes' },
            { name: 'Create Class', icon: Plus, href: '/admin/classes/create' },
            { name: 'Class Schedules', icon: Calendar, href: '/admin/classes/schedules' },
            { name: 'Room Management', icon: Home, href: '/admin/classes/rooms' },
          ]
        },
        { name: 'Subjects', icon: BookOpen, href: '/admin/subjects' },
        { 
          name: 'Examinations', 
          icon: FileText, 
          href: '/admin/exams',
          submenu: [
            { name: 'All Exams', icon: FileText, href: '/admin/exams' },
            { name: 'Create Exam', icon: Plus, href: '/admin/exams/create' },
            { name: 'Exam Results', icon: Trophy, href: '/admin/exams/results' },
            { name: 'Grade Reports', icon: BarChart3, href: '/admin/exams/grades' },
          ]
        },
        { name: 'Time Table', icon: Calendar, href: '/admin/timetable' },
      ]
    },
    {
      title: 'Finance',
      items: [
        { 
          name: 'Fee Collection', 
          icon: DollarSign, 
          href: '/admin/fees',
          submenu: [
            { name: 'Collect Fees', icon: DollarSign, href: '/admin/fees' },
            { name: 'Fee Structure', icon: FileText, href: '/admin/fees/structure' },
            { name: 'Payment History', icon: Clock, href: '/admin/fees/history' },
            { name: 'Outstanding Fees', icon: Bell, href: '/admin/fees/outstanding' },
          ]
        },
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
        { 
          name: 'System Settings', 
          icon: Settings, 
          href: '/admin/settings',
          submenu: [
            { name: 'General Settings', icon: Settings, href: '/admin/settings' },
            { name: 'School Profile', icon: Building, href: '/admin/settings/profile' },
            { name: 'Academic Year', icon: Calendar, href: '/admin/settings/academic-year' },
            { name: 'Notifications', icon: Bell, href: '/admin/settings/notifications' },
          ]
        },
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
      {/* 🎨 Admin Navigation */}
      <AdminNavbar
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
        user={user}
        onLogout={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
      />
      {/* 🚀 Admin Sidebar */}
      <AdminSidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
        setSidebarOpen={setSidebarOpen}
        setSidebarHovered={setSidebarHovered}
        user={user}
        onLogout={handleLogout}
      />

      {/* 🎯 Main Content Area */}
      <div className={`transition-all duration-500 ${sidebarOpen || sidebarHovered ? 'lg:ml-60' : 'lg:ml-20'}`}>
        <main className={`relative z-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* 🎯 Dashboard Content */}
          <div className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
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
                      <div className="text-6xl">🏦</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🚀 Premium Enterprise Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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
                <Search className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="text"
                  placeholder="Search students, teachers, classes, reports..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={`flex-1 bg-transparent text-lg font-medium placeholder-gray-500 focus:outline-none ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  autoFocus
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="space-y-1">
                  {searchResults.map((result: any, index: number) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
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
                          <Search className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {result.title}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {result.path}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No results found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🎨 Custom Styles */}
      <style jsx>{`
        .vuexy-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        
        .vuexy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #7c3aed, #db2777);
        }
        
        .premium-menu-item {
          position: relative;
          overflow: hidden;
        }
        
        .premium-menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .premium-menu-item:hover::before {
          left: 100%;
        }
        
        /* Enhanced Icon Representative Animations */
        .icon-representative {
          transform: translateY(0) scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .icon-representative:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }
        
        .icon-representative:active {
          transform: translateY(-2px) scale(1.05);
        }
        
        /* Gradient border pulse animation */
        @keyframes gradientPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .icon-representative.active {
          animation: gradientPulse 2s ease-in-out infinite;
        }
        
        /* Popup Menu Animations */
        .popup-menu {
          animation: slideInFromLeft 0.3s ease-out;
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeInUp {
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
        
      /* Navigation bar adjustment for sidebar hover */
      @media (min-width: 1024px) {
        .sidebar-hover-active nav {
          left: 256px !important;
        }
      }
      `}</style>
    </div>
  );
}





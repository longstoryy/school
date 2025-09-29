'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Bell, Sun, Moon, User, Calendar, ChevronDown, 
  Settings, LogOut, MessageCircle, Users, Shield, Menu, X, 
  BarChart3, Plus, UserPlus, FileText, DollarSign, AlertCircle,
  Activity, Zap, Globe, Clock, Send, Video, Mail
} from 'lucide-react';

interface AdminNavbarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  user: any;
  onLogout: () => void;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  sidebarHovered: boolean;
}

interface AdminNotification {
  id: string;
  type: 'system' | 'student' | 'teacher' | 'finance' | 'urgent';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: any;
}

interface AdminQuickAction {
  id: string;
  label: string;
  icon: any;
  href: string;
  color: string;
  description: string;
}

export default function AdminNavbar({ 
  darkMode, 
  onDarkModeToggle, 
  user, 
  onLogout,
  onSidebarToggle,
  sidebarOpen,
  sidebarHovered
}: AdminNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const systemStatusRef = useRef<HTMLDivElement>(null);

  // Admin-specific notifications
  const adminNotifications: AdminNotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'System Alert',
      message: 'Server maintenance scheduled for tonight at 2 AM',
      time: '5 min ago',
      read: false,
      priority: 'high',
      icon: AlertCircle
    },
    {
      id: '2',
      type: 'student',
      title: 'New Student Registration',
      message: '3 new students registered today',
      time: '15 min ago',
      read: false,
      priority: 'medium',
      icon: UserPlus
    },
    {
      id: '3',
      type: 'finance',
      title: 'Payment Received',
      message: '$5,200 in tuition payments received',
      time: '1 hour ago',
      read: true,
      priority: 'medium',
      icon: DollarSign
    },
    {
      id: '4',
      type: 'teacher',
      title: 'Teacher Request',
      message: 'Dr. Smith requested classroom equipment',
      time: '2 hours ago',
      read: true,
      priority: 'low',
      icon: MessageCircle
    }
  ];

  // Admin quick actions
  const adminQuickActions: AdminQuickAction[] = [
    {
      id: 'add-student',
      label: 'Add Student',
      icon: UserPlus,
      href: '/admin/students/add',
      color: 'from-blue-500 to-blue-600',
      description: 'Register new student'
    },
    {
      id: 'add-teacher',
      label: 'Add Teacher',
      icon: Users,
      href: '/admin/teachers/add',
      color: 'from-green-500 to-green-600',
      description: 'Add teaching staff'
    },
    {
      id: 'send-announcement',
      label: 'Announcement',
      icon: Send,
      href: '/admin/announcements/new',
      color: 'from-purple-500 to-purple-600',
      description: 'Broadcast message'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'from-orange-500 to-orange-600',
      description: 'Create analytics report'
    }
  ];

  const unreadCount = adminNotifications.filter(n => !n.read).length;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
      if (systemStatusRef.current && !systemStatusRef.current.contains(event.target as Node)) {
        setShowSystemStatus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-red-500';
      case 'system': return 'text-blue-500';
      case 'student': return 'text-green-500';
      case 'teacher': return 'text-purple-500';
      case 'finance': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <nav 
      className={`fixed top-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-lg'
      }`}
      style={{
        left: sidebarOpen || sidebarHovered ? '240px' : '80px',
        background: darkMode 
          ? isScrolled 
            ? 'rgba(17, 24, 39, 0.95)' 
            : 'rgba(17, 24, 39, 0.90)'
          : isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.90)',
        borderBottom: darkMode ? '1px solid rgba(75, 85, 99, 0.2)' : '1px solid rgba(229, 231, 235, 0.3)',
        boxShadow: isScrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : '0 1px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Mobile Menu & Search */}
          <div className="flex items-center space-x-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={onSidebarToggle}
              className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Advanced Admin Search */}
            <div ref={searchRef} className="relative">
              <div className={`flex items-center transition-all duration-300 ${
                searchExpanded ? 'w-80' : 'w-64'
              }`}>
                <div className="relative w-full">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search students, teachers, classes, reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchExpanded(true)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800/80' 
                        : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
              </div>

              {/* Search Results Dropdown */}
              {searchExpanded && searchQuery && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                  darkMode ? 'bg-gray-800/95 border-gray-600/50' : 'bg-white/95 border-gray-200/50'
                }`} style={{ backdropFilter: 'blur(20px)' }}>
                  <div className="p-4">
                    <div className="text-sm font-medium mb-3 text-gray-500">Quick Results</div>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <Users className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              Student Management
                            </div>
                            <div className="text-xs text-gray-500">Manage student records</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* System Status Indicator */}
            <div ref={systemStatusRef} className="relative">
              <button
                onClick={() => setShowSystemStatus(!showSystemStatus)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Activity className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              </button>

              {/* System Status Dropdown */}
              {showSystemStatus && (
                <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                  darkMode ? 'bg-gray-800/95 border-gray-600/50' : 'bg-white/95 border-gray-200/50'
                }`} style={{ backdropFilter: 'blur(20px)' }}>
                  <div className="p-4">
                    <div className="text-sm font-medium mb-3">System Status</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-500">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Services</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-500">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Storage</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-yellow-500">78% Used</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div ref={quickActionsRef} className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Quick Actions Dropdown */}
              {showQuickActions && (
                <div className={`absolute top-full right-0 mt-2 w-72 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                  darkMode ? 'bg-gray-800/95 border-gray-600/50' : 'bg-white/95 border-gray-200/50'
                }`} style={{ backdropFilter: 'blur(20px)' }}>
                  <div className="p-4">
                    <div className="text-sm font-medium mb-3">Quick Actions</div>
                    <div className="grid grid-cols-2 gap-3">
                      {adminQuickActions.map((action) => (
                        <a
                          key={action.id}
                          href={action.href}
                          className={`p-3 rounded-lg transition-all duration-200 group ${
                            darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                          }`}
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {action.label}
                          </div>
                          <div className="text-xs text-gray-500">{action.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-all duration-200 relative ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className={`absolute top-full right-0 mt-2 w-96 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                  darkMode ? 'bg-gray-800/95 border-gray-600/50' : 'bg-white/95 border-gray-200/50'
                }`} style={{ backdropFilter: 'blur(20px)' }}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Admin Notifications</div>
                      <div className="text-xs text-gray-500">{unreadCount} unread</div>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {adminNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 transition-colors ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        } ${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50'}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)} bg-current/10`}>
                            <notification.icon className={`w-4 h-4 ${getNotificationColor(notification.type)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {notification.title}
                              </div>
                              <div className="text-xs text-gray-500">{notification.time}</div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{notification.message}</div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className={`p-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                  darkMode ? 'bg-gray-800/95 border-gray-600/50' : 'bg-white/95 border-gray-200/50'
                }`} style={{ backdropFilter: 'blur(20px)' }}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'Admin User'}
                        </div>
                        <div className="text-sm text-gray-500">Administrator</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <a href="/admin/profile" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                    }`}>
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile Settings</span>
                    </a>
                    <a href="/admin/settings" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                    }`}>
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">System Settings</span>
                    </a>
                    <button
                      onClick={onLogout}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

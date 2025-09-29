'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut,
  BarChart3,
  Users,
  GraduationCap,
  FileText,
  Calendar,
  DollarSign,
  MessageCircle,
  Command,
  ArrowRight,
  ChevronDown,
  Maximize,
  Minimize,
  Clock,
  Activity,
  HelpCircle,
  UserPlus,
  Building,
  CreditCard,
  TrendingUp
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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  href: string;
  description: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({
  darkMode, 
  onDarkModeToggle, 
  user, 
  onLogout,
  onSidebarToggle,
  sidebarOpen,
  sidebarHovered
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mount check for hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // System time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Command palette (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Student Enrollment',
      message: '5 new students enrolled today',
      time: '2 min ago',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Fee Payment Received',
      message: 'Payment of $2,500 received from John Doe',
      time: '1 hour ago',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight at 2 AM',
      time: '3 hours ago',
      read: true,
      type: 'warning'
    }
  ];

  // Quick actions for command palette
  const quickActions: QuickAction[] = [
    { id: '1', label: 'Add Student', icon: UserPlus, href: '/admin/students/add', description: 'Register new student' },
    { id: '2', label: 'Add Teacher', icon: GraduationCap, href: '/admin/teachers/add', description: 'Add teaching staff' },
    { id: '3', label: 'Create Class', icon: Building, href: '/admin/classes/create', description: 'Setup new class' },
    { id: '4', label: 'Fee Collection', icon: CreditCard, href: '/admin/fees', description: 'Manage payments' },
    { id: '5', label: 'View Reports', icon: TrendingUp, href: '/admin/reports', description: 'Analytics & insights' },
    { id: '6', label: 'Settings', icon: Settings, href: '/admin/settings', description: 'System configuration' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Professional Corporate Navbar */}
      <nav 
        className={`fixed top-0 right-0 z-40 transition-all duration-300 ${
          darkMode ? 'bg-gray-900/95' : 'bg-white/95'
        } backdrop-blur-xl border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
        style={{
          left: sidebarOpen || sidebarHovered ? '240px' : '80px',
        }}
      >
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger */}
            <button
              onClick={onSidebarToggle}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Toggle Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className={`hidden md:flex items-center space-x-3 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-[1.02] min-w-[280px] ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-white hover:border-gray-300'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm flex-1 text-left">Search anything...</span>
              <div className="flex items-center space-x-1">
                <kbd className={`px-1.5 py-0.5 text-xs rounded ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>⌘</kbd>
                <kbd className={`px-1.5 py-0.5 text-xs rounded ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>K</kbd>
              </div>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* System Time */}
            <div className={`hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
              darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100/50 text-gray-600'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isMounted ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </span>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className={`hidden lg:flex p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 relative ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount}
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl border ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } overflow-hidden z-50`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-2xl border ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } overflow-hidden z-50`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'Admin User'}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user?.email || 'admin@school.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile Settings</span>
                    </button>
                    <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Preferences</span>
                    </button>
                    <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                      <span className="text-sm">Help & Support</span>
                    </button>
                    <hr className={`my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
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
      </nav>

      {/* Command Palette Modal (Ctrl+K) */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-start justify-center px-4 pt-16">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
              onClick={() => setShowCommandPalette(false)}
            />
            
            <div className={`relative w-full max-w-2xl rounded-xl shadow-2xl border ${
              darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            } overflow-hidden`}>
              {/* Search Header */}
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <Command className="w-5 h-5 mr-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Search for actions, pages, or settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent border-none outline-none text-lg ${
                    darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                  autoFocus
                />
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="text-sm font-medium text-gray-500 mb-3">Quick Actions</div>
                <div className="space-y-2">
                  {quickActions
                    .filter(action => 
                      searchQuery === '' || 
                      action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      action.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((action) => (
                    <a
                      key={action.id}
                      href={action.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                        darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setShowCommandPalette(false)}
                    >
                      <div className="p-2 rounded-lg bg-blue-500 text-white">
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {action.label}
                        </div>
                        <div className="text-xs text-gray-500">{action.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>

                {/* Recent Pages */}
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-500 mb-3">Recent Pages</div>
                  <div className="space-y-2">
                    <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}>
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>Dashboard Overview</span>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}>
                      <Users className="w-4 h-4 text-green-500" />
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>Student Management</span>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}>
                      <GraduationCap className="w-4 h-4 text-purple-500" />
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>Teacher Management</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;

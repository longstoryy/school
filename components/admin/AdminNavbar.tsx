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
  TrendingUp,
  ClipboardList,
  Zap,
  Wifi,
  WifiOff
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
  const [showMessages, setShowMessages] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mount check for hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // System time update - only update every 5 minutes to reduce re-renders
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 300000); // Update every 5 minutes to minimize re-renders
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
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
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

  // Mock messages
  const messages = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      subject: 'Parent-Teacher Meeting Request',
      preview: 'Hi, I would like to schedule a meeting to discuss Emma\'s progress...',
      time: '5 min ago',
      read: false,
      avatar: 'SJ'
    },
    {
      id: '2', 
      sender: 'Michael Chen',
      subject: 'Fee Payment Confirmation',
      preview: 'Thank you for the payment. The receipt has been generated...',
      time: '1 hour ago',
      read: false,
      avatar: 'MC'
    },
    {
      id: '3',
      sender: 'Lisa Williams',
      subject: 'Student Absence Notification',
      preview: 'My daughter will be absent tomorrow due to a medical appointment...',
      time: '2 hours ago',
      read: true,
      avatar: 'LW'
    },
    {
      id: '4',
      sender: 'Admin System',
      subject: 'Weekly Report Generated',
      preview: 'Your weekly academic report is ready for review...',
      time: '1 day ago',
      read: true,
      avatar: 'AS'
    }
  ];

  // Enhanced quick actions for command palette
  const quickActions: QuickAction[] = [
    { id: '1', label: 'Add Student', icon: UserPlus, href: '/admin/students/add', description: 'Register new student enrollment' },
    { id: '2', label: 'Add Teacher', icon: GraduationCap, href: '/admin/teachers/add', description: 'Add new teaching staff member' },
    { id: '3', label: 'Create Class', icon: Building, href: '/admin/classes/create', description: 'Setup new class with schedule' },
    { id: '4', label: 'Fee Collection', icon: DollarSign, href: '/admin/fees', description: 'Manage student fee payments' },
    { id: '5', label: 'View Reports', icon: FileText, href: '/admin/reports', description: 'Generate academic & financial reports' },
    { id: '6', label: 'Schedule Event', icon: Calendar, href: '/admin/events', description: 'Create school events & activities' },
    { id: '7', label: 'Send Messages', icon: MessageCircle, href: '/admin/messages', description: 'Communicate with students & parents' },
    { id: '8', label: 'Exam Management', icon: ClipboardList, href: '/admin/exams', description: 'Create & manage examinations' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <>
      {/* Professional Corporate Navbar */}
      <nav 
        className={`fixed top-0 right-0 z-40 transition-all duration-300 ${
          darkMode ? 'bg-gray-900/95' : 'bg-white/95'
        } backdrop-blur-xl border-b-2 ${
          darkMode ? 'border-gray-700' : 'border-gray-300'
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

            {/* System Online Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Online</span>
            </div>

            {/* Quick Actions */}
            <div ref={quickActionsRef} className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 relative group ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Quick Actions"
              >
                <Zap className="w-5 h-5" />
                {/* Modern tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Quick Actions
                </div>
              </button>

              {/* Quick Actions Dropdown */}
              {showQuickActions && (
                <div className={`absolute top-full right-0 mt-2 w-80 sm:w-72 xs:w-64 rounded-xl shadow-2xl border ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } overflow-hidden z-50`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ⚡ Quick Actions
                    </h3>
                  </div>
                  <div className="p-3 max-h-80 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.slice(0, 6).map((action) => (
                        <a
                          key={action.id}
                          href={action.href}
                          className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 group hover:scale-105 ${
                            darkMode ? 'hover:bg-gray-800/80' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setShowQuickActions(false)}
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mb-2">
                            <action.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {action.label}
                          </span>
                        </a>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={() => {
                          setShowQuickActions(false);
                          setShowCommandPalette(true);
                        }}
                        className={`w-full text-sm py-2 rounded-lg transition-colors ${
                          darkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' : 'text-blue-600 hover:text-blue-700 hover:bg-gray-50'
                        } font-medium`}
                      >
                        View all actions (Ctrl+K)
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

            {/* Messages */}
            <div ref={messagesRef} className="relative">
              <button
                onClick={() => setShowMessages(!showMessages)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 relative group ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Messages"
              >
                <MessageCircle className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {unreadMessages}
                  </div>
                )}
                {/* Modern tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {unreadMessages} new messages
                </div>
              </button>

              {/* Messages Dropdown */}
              {showMessages && (
                <div className={`absolute top-full right-0 mt-2 w-96 sm:w-80 xs:w-72 rounded-xl shadow-2xl border ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } overflow-hidden z-50`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Messages
                      </h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                        {unreadMessages} new
                      </span>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                          !message.read ? 'bg-green-50/50 dark:bg-green-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {message.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {message.sender}
                              </p>
                              <p className="text-xs text-gray-500">{message.time}</p>
                            </div>
                            <p className={`text-sm font-medium mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {message.subject}
                            </p>
                            <p className={`text-sm mt-1 truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {message.preview}
                            </p>
                            {!message.read && (
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <button className={`text-sm w-full text-center py-2 rounded-lg transition-colors ${
                      darkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' : 'text-blue-600 hover:text-blue-700 hover:bg-gray-50'
                    } font-medium`}>
                      View all messages
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 relative group ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                    {unreadCount}
                  </div>
                )}
                {/* Modern tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {unreadCount} notifications
                </div>
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
                      onClick={() => {
                        if (window.confirm('Are you sure you want to logout?')) {
                          onLogout();
                        }
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 group/logout"
                    >
                      <LogOut className="w-4 h-4 group-hover/logout:rotate-12 transition-transform duration-200" />
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

              {/* Quick Actions */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>⚡ Quick Actions</div>
                <div className="space-y-1">
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
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${
                        darkMode ? 'hover:bg-gray-800/80 hover:shadow-lg' : 'hover:bg-gray-50 hover:shadow-md'
                      }`}
                      onClick={() => setShowCommandPalette(false)}
                    >
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {action.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{action.description}</div>
                      </div>
                      <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </a>
                  ))}
                </div>

                {/* Recent Pages */}
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-500 mb-3">Recent Pages</div>
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

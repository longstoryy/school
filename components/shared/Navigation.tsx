'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Bell, Sun, Moon, User, Calendar, ChevronDown, 
  Settings, LogOut, MessageCircle, BookOpen, Users, 
  Shield, GraduationCap, Menu, X, Home, BarChart3,
  Globe, Zap, Heart, Star, Trophy, Target, Clock,
  Smartphone, Wifi, Battery, Signal, Maximize, Languages,
  Send, Video, Headphones, Activity, Plus, UserPlus
} from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  user: any;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  onLogout: () => void;
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  sidebarHovered?: boolean;
}

interface NotificationItem {
  id: string;
  type: 'academic' | 'system' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function Navigation({ 
  darkMode, 
  onDarkModeToggle, 
  user, 
  role, 
  onLogout,
  onSidebarToggle,
  sidebarOpen = false,
  sidebarHovered = false
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const [notifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'academic',
      title: 'New Assignment',
      message: 'Math homework due tomorrow',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'system',
      title: 'System Update',
      message: 'Scheduled maintenance tonight',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    }
  ]);

  // Quick Actions
  const quickActions = [
    { name: 'Add Student', icon: UserPlus, action: () => console.log('Add Student') },
    { name: 'Create Class', icon: Plus, action: () => console.log('Create Class') },
    { name: 'Send Message', icon: MessageCircle, action: () => console.log('Send Message') },
    { name: 'Generate Report', icon: BarChart3, action: () => console.log('Generate Report') },
  ];

  // Languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  // Mock messages
  const messages = [
    { id: '1', sender: 'John Doe', message: 'Assignment submitted successfully', time: '2m ago', avatar: 'JD', online: true },
    { id: '2', sender: 'Jane Smith', message: 'Question about homework', time: '5m ago', avatar: 'JS', online: false },
  ];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

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
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
    };

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(timer);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* 🎨 Glass Morphism Navigation Bar */}
      <nav className={`fixed top-0 z-50 transition-all duration-500 ease-out ${
      isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
    }`} style={{
        left: sidebarOpen || sidebarHovered ? '240px' : '80px',
        right: '0',
        background: darkMode 
          ? `linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.9) 100%)`
          : `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)`,
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.05)'
      }}>
        <div className="mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* 🏠 Logo & Brand */}
            <div className="flex items-center space-x-3">
              {/* Professional Hamburger Menu */}
              {onSidebarToggle && (
                <button
                  onClick={onSidebarToggle}
                  className={`group relative p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-gray-600/40 hover:from-gray-700/90 hover:to-gray-600/90 shadow-xl' 
                      : 'bg-gradient-to-r from-white/90 to-gray-50/90 border-gray-200/60 hover:from-white hover:to-gray-100 shadow-xl'
                  }`}
                  title="Toggle Sidebar"
                >
                  <div className="relative">
                    <div className={`flex flex-col space-y-1 transition-all duration-300 ${
                      sidebarOpen ? 'rotate-45' : 'rotate-0'
                    }`}>
                      <div className={`w-4 h-0.5 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-gray-300 group-hover:bg-white' : 'bg-gray-600 group-hover:bg-gray-800'
                      } ${sidebarOpen ? 'rotate-90 translate-y-1.5' : ''}`}></div>
                      <div className={`w-4 h-0.5 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-gray-300 group-hover:bg-white' : 'bg-gray-600 group-hover:bg-gray-800'
                      } ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                      <div className={`w-4 h-0.5 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-gray-300 group-hover:bg-white' : 'bg-gray-600 group-hover:bg-gray-800'
                      } ${sidebarOpen ? '-rotate-90 -translate-y-1.5' : ''}`}></div>
                    </div>
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
            </div>

            {/* 🔍 Smart Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative">
              <div className={`relative transition-all duration-500 ${
                searchExpanded ? 'scale-105' : 'scale-100'
              }`}>
                <div className={`flex items-center px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                  searchExpanded 
                    ? 'bg-white/20 shadow-2xl ring-2 ring-white/30' 
                    : 'bg-white/10 hover:bg-white/15 shadow-lg'
                }`} style={{
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Search className={`w-5 h-5 transition-all duration-300 ${
                    searchExpanded ? 'text-blue-400 scale-110' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search students, courses, assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchExpanded(true)}
                    className="flex-1 ml-3 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                  />
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-white/20 text-gray-600'
                  }`}>
                    ⌘K
                  </div>
                </div>

                {/* Search Results Dropdown */}
                {searchExpanded && searchQuery.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border overflow-hidden backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center">
                          <Search className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Search results for "{searchQuery}"
                          </span>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {/* Mock search results */}
                        <button className={`w-full flex items-center px-4 py-3 transition-all duration-200 ${
                          darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}>
                          <Users className="w-4 h-4 mr-3" />
                          <span className="text-sm">Students matching "{searchQuery}"</span>
                        </button>
                        <button className={`w-full flex items-center px-4 py-3 transition-all duration-200 ${
                          darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}>
                          <BookOpen className="w-4 h-4 mr-3" />
                          <span className="text-sm">Courses matching "{searchQuery}"</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 🎯 Center Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* 📅 Fall 2024 Calendar */}
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className={`px-2.5 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-gray-900/5 border-gray-600/20 hover:bg-gray-900/10 hover:border-gray-600/30'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-xs font-medium">
                  <Calendar className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`transition-colors duration-200 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Fall 2024</span>
                </div>
              </button>

              {/* 🕐 Current Time */}
              <button className={`px-2.5 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                  : 'bg-gray-900/5 border-gray-600/20 hover:bg-gray-900/10 hover:border-gray-600/30'
              }`}>
                <div className="flex items-center space-x-1.5 text-xs font-medium">
                  <Clock className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <span className={`transition-colors duration-200 tabular-nums ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </button>

              {/* 📱 System Status */}
              <button
                className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                }`}
                title="System Status: Online"
              >
                <Activity className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`} />
                <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full animate-pulse ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
              </button>

              {/* 🌐 Language Selector */}
              <div ref={languageRef} className="relative">
                <button
                  onClick={() => setShowLanguages(!showLanguages)}
                  className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <Languages className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </button>

                {showLanguages && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="p-3 border-b border-white/10">
                      <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Language</h3>
                    </div>
                    <div className="py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`w-full flex items-center px-4 py-3 transition-all duration-200 ${
                            darkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-lg mr-3">{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 💬 Messages */}
              <div ref={messagesRef} className="relative">
                <button
                  onClick={() => setShowMessages(!showMessages)}
                  className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <MessageCircle className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse ${
                    darkMode ? 'bg-green-400' : 'bg-green-500'
                  }`}></div>
                </button>

                {showMessages && (
                  <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Messages</h3>
                        <button className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200">
                          <Send className="w-4 h-4 text-blue-400" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className="p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {message.avatar}
                              </div>
                              {message.online && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{message.sender}</h4>
                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{message.time}</span>
                              </div>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 📺 Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                <Maximize className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isFullscreen 
                    ? (darkMode ? 'text-orange-400 rotate-45' : 'text-orange-600 rotate-45') 
                    : (darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800')
                }`} />
              </button>

              {/* ⚡ Quick Actions */}
              <div className="relative" ref={quickActionsRef}>
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className={`p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode
                      ? 'bg-white/10 border-white/20 hover:bg-white/20'
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`} />
                </button>
                
                {showQuickActions && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="p-2">
                      <h3 className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Quick Actions
                      </h3>
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            darkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <action.icon className="w-4 h-4 mr-3" />
                          {action.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 🔔 Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-xl transition-all duration-200 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border-l-4 ${
                              notification.priority === 'high' 
                                ? 'border-red-500' 
                                : notification.priority === 'medium'
                                ? 'border-yellow-500'
                                : 'border-blue-500'
                            } ${
                              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                            }`}
                          >
                            <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {notification.title}
                            </div>
                            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {notification.message}
                            </div>
                            <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {notification.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 🌙 Dark Mode Toggle */}
              <button
                onClick={onDarkModeToggle}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode
                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* 👤 User Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-200 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showProfile && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                    darkMode 
                      ? 'bg-gray-800/90 border-gray-700' 
                      : 'bg-white/90 border-gray-200'
                  }`}>
                    <div className="p-2">
                      <div className={`px-3 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'Admin User'}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user?.email || 'admin@school.com'}
                        </div>
                      </div>
                      <button
                        onClick={onLogout}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          darkMode
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                            : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

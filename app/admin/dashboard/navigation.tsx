'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Bell, Sun, Moon, User, Calendar, ChevronDown, 
  Settings, LogOut, MessageCircle, BookOpen, Users, 
  Shield, GraduationCap, Menu, X, Home, BarChart3,
  Globe, Zap, Heart, Star, Trophy, Target, Clock,
  Smartphone, Wifi, Battery, Signal, Maximize, Languages,
  Send, Video, Headphones, Activity
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

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'student' | 'teacher' | 'course' | 'assignment' | 'grade';
  icon: any;
  href: string;
}

export default function GlassMorphismNavigation({ 
  darkMode, 
  onDarkModeToggle, 
  user, 
  role, 
  onLogout,
  onSidebarToggle,
  sidebarOpen = false
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    latency: 45,
    uptime: '99.9%'
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const [notifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'academic',
      title: 'New Assignment Posted',
      message: 'Mathematics Quiz 3 has been posted for Grade 10',
      time: '5 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight at 2:00 AM',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Parent inquiry about student progress',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    }
  ]);

  // Mock search suggestions
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'John Smith', type: 'student', icon: User, href: '/students/john-smith' },
    { id: '2', title: 'Mathematics Grade 10', type: 'course', icon: BookOpen, href: '/courses/math-10' },
    { id: '3', title: 'Sarah Johnson', type: 'teacher', icon: GraduationCap, href: '/teachers/sarah-johnson' },
    { id: '4', title: 'Physics Assignment', type: 'assignment', icon: Target, href: '/assignments/physics-1' },
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  // Mock messages
  const messages = [
    { id: '1', sender: 'Sarah Johnson', message: 'Can we schedule a meeting about the new curriculum?', time: '2 min ago', avatar: 'SJ', online: true },
    { id: '2', sender: 'Mike Chen', message: 'The grade reports are ready for review', time: '15 min ago', avatar: 'MC', online: false },
    { id: '3', sender: 'Emma Wilson', message: 'Thank you for the quick response!', time: '1 hour ago', avatar: 'EW', online: true }
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Search functionality
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
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

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setMessagesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchExpanded(true);
      }
      if (event.key === 'Escape') {
        setSearchExpanded(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setLanguageOpen(false);
        setMessagesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleIcon = () => {
    switch (role) {
      case 'admin': return Shield;
      case 'teacher': return GraduationCap;
      case 'student': return BookOpen;
      case 'parent': return Heart;
      default: return User;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-600';
      case 'teacher': return 'from-green-500 to-emerald-600';
      case 'student': return 'from-blue-500 to-purple-600';
      case 'parent': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <>
      {/* 🎨 Glass Morphism Navigation Bar */}
      <nav className={`fixed top-0 z-50 transition-all duration-500 ease-out ${
      isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
    }`} style={{
        left: sidebarOpen ? '240px' : '80px',
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

            {/* 🔍 Smart Search with AI Suggestions */}
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
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setSearchExpanded(true)}
                    className="flex-1 ml-3 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                  />
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-white/20 text-gray-600'
                  }`}>
                    ⌘K
                  </div>
                </div>

                {/* 🎯 Search Suggestions Dropdown */}
                {searchExpanded && (searchSuggestions.length > 0 || searchQuery.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    {searchSuggestions.length > 0 ? (
                      <div className="py-2">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={suggestion.id}
                            className="w-full flex items-center px-4 py-3 hover:bg-white/10 transition-all duration-200 group"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <suggestion.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                            <span className="ml-3 text-sm text-white group-hover:text-blue-300 transition-colors duration-200">
                              {suggestion.title}
                            </span>
                            <span className="ml-auto text-xs text-gray-500 capitalize">
                              {suggestion.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No results found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 🎯 Right Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              
              {/* 📅 Academic Quick Access */}
              <div className="hidden lg:flex items-center space-x-1.5">
                <button className={`group px-2.5 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-gray-900/5 border-gray-600/20 hover:bg-gray-900/10 hover:border-gray-600/30'
                }`}>
                  <div className="flex items-center space-x-1.5 text-xs font-medium">
                    <Calendar className={`w-3.5 h-3.5 transition-colors duration-200 ${
                      darkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
                    }`} />
                    <span className={`transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>Fall 2024</span>
                  </div>
                </button>
                <button className={`group px-2.5 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-gray-900/5 border-gray-600/20 hover:bg-gray-900/10 hover:border-gray-600/30'
                }`}>
                  <div className="flex items-center space-x-1.5 text-xs font-medium">
                    <Clock className={`w-3.5 h-3.5 transition-colors duration-200 ${
                      darkMode ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700'
                    }`} />
                    <span className={`transition-colors duration-200 tabular-nums ${
                      darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </button>
              </div>

              {/* 📱 System Monitor */}
              <button
                className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                }`}
                title="System Status: Online"
              >
                <Activity className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  darkMode ? 'text-green-400 group-hover:text-green-300' : 'text-green-600 group-hover:text-green-700'
                }`} />
                <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full animate-pulse ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
              </button>

              {/* 🎧 Audio Controls */}
              <button
                className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                }`}
                title="Audio Settings"
              >
                <Headphones className={`w-3.5 h-3.5 transition-all duration-300 group-hover:scale-110 ${
                  darkMode ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-700'
                }`} />
              </button>

              {/* 🌐 Language Selector */}
              <div ref={languageRef} className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <Languages className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
                  }`} />
                </button>

                {/* Language Dropdown */}
                {languageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-3 border-b border-white/10">
                      <h3 className="text-sm font-semibold text-white">Select Language</h3>
                    </div>
                    <div className="py-2">
                      {languages.map((lang, index) => (
                        <button
                          key={lang.code}
                          className="w-full flex items-center px-4 py-3 hover:bg-white/10 transition-all duration-200 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-lg mr-3">{lang.flag}</span>
                          <span className="text-sm text-white group-hover:text-blue-300 transition-colors duration-200">
                            {lang.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 💬 Messages */}
              <div ref={messagesRef} className="relative">
                <button
                  onClick={() => setMessagesOpen(!messagesOpen)}
                  className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <MessageCircle className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-green-400 group-hover:text-green-300' : 'text-green-600 group-hover:text-green-700'
                  }`} />
                  <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse ${
                    darkMode ? 'bg-green-400' : 'bg-green-500'
                  }`}></div>
                </button>

                {/* Messages Dropdown */}
                {messagesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Messages</h3>
                        <button className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200">
                          <Send className="w-4 h-4 text-blue-400" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {messages.map((message, index) => (
                        <div
                          key={message.id}
                          className="p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
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
                                <h4 className="text-sm font-medium text-white truncate">{message.sender}</h4>
                                <span className="text-xs text-gray-400">{message.time}</span>
                              </div>
                              <p className="text-sm text-gray-300 line-clamp-2">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-white/10">
                      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-medium transition-colors duration-200">
                        View All Messages
                      </button>
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

              {/* 🌙 Dark/Light Mode Toggle */}
              <button
                onClick={onDarkModeToggle}
                className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group overflow-hidden ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                }`}
              >
                <div className="relative z-10">
                  {darkMode ? (
                    <Sun className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-180 transition-all duration-500" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-all duration-500" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* 🔔 Notification Hub */}
              <div ref={notificationRef} className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`relative p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <Bell className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs font-bold text-white">{unreadCount}</span>
                    </div>
                  )}
                </button>

                {/* 📋 Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-lg font-semibold text-white">Notifications</h3>
                      <p className="text-sm text-gray-400">{unreadCount} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 ${
                            !notification.read ? 'bg-blue-500/10' : ''
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              notification.type === 'academic' ? 'bg-blue-500/20 text-blue-400' :
                              notification.type === 'system' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {notification.type === 'academic' ? <BookOpen className="w-4 h-4" /> :
                               notification.type === 'system' ? <Settings className="w-4 h-4" /> :
                               <MessageCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 👤 User Profile */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-300 group hover:scale-105 ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-gray-900/10 border-gray-600/30 hover:bg-gray-900/20'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getRoleColor()} flex items-center justify-center shadow-xl ring-2 ring-white/30 hover:ring-white/50 transition-all duration-300 hover:scale-110`}>
                      <span className="text-white text-sm font-bold tracking-wide">
                        {user?.name?.charAt(0) || '👤'}
                      </span>
                      {/* Cute sparkle effect */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-60"></div>
                    </div>
                    {/* Professional online status */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 shadow-sm ${
                      darkMode ? 'bg-emerald-400 border-gray-800' : 'bg-emerald-500 border-white'
                    }`}>
                      <div className="w-full h-full rounded-full bg-current animate-pulse opacity-75"></div>
                    </div>
                  </div>
                  <div className="hidden xl:block text-left min-w-0 flex-1">
                    <p className={`text-sm font-semibold truncate ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>{user?.name || 'User'}</p>
                    <p className={`text-xs capitalize truncate ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{role}</p>
                  </div>
                  <ChevronDown className={`w-3 h-3 transition-all duration-300 group-hover:rotate-180 flex-shrink-0 ${
                    darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`} />
                </button>

                {/* 📋 Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRoleColor()} flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold">
                            {user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{user?.name || 'User'}</h3>
                          <p className="text-xs text-gray-400 capitalize">{role}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="p-4 border-b border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">98.5%</div>
                          <div className="text-xs text-gray-400">Attendance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">A+</div>
                          <div className="text-xs text-gray-400">Average</div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button className="w-full flex items-center px-4 py-3 hover:bg-white/10 transition-all duration-200 group">
                        <User className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                        <span className="ml-3 text-sm text-white">Profile Settings</span>
                      </button>
                      <button className="w-full flex items-center px-4 py-3 hover:bg-white/10 transition-all duration-200 group">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                        <span className="ml-3 text-sm text-white">Preferences</span>
                      </button>
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center px-4 py-3 hover:bg-red-500/20 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                        <span className="ml-3 text-sm text-white group-hover:text-red-400">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 📱 Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 🎯 System Status Indicator */}
        <div className="absolute bottom-0 left-4 transform translate-y-full">
          <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-b-lg border-x border-b border-white/20">
            <div className={`w-2 h-2 rounded-full ${systemStatus.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-xs text-gray-400">
              {systemStatus.online ? `${systemStatus.latency}ms` : 'Offline'}
            </span>
          </div>
        </div>
      </nav>

      {/* 📱 Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-16 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 animate-in slide-in-from-top duration-300">
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-white/10">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">Fall 2024</span>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-white/10">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🎨 Gradient Background Effect */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none z-40"></div>
    </>
  );
}

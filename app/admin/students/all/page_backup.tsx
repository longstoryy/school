'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, Filter, Calendar, Grid3X3, List, MoreVertical, 
  Phone, Mail, Eye, Plus, Download, Upload, Printer,
  ChevronDown, ArrowUpDown, Users, UserPlus, Settings, RefreshCw,
  LayoutDashboard, GraduationCap, BookOpen, FileText, BarChart3, 
  TrendingUp, Bell, MessageCircle, Heart, UserCheck, DollarSign, 
  Shield, Lock, X, Clock, Menu, LogOut, User, Home, MapPin, 
  FolderOpen, StickyNote, CheckSquare, Video, CreditCard, Trash2, Zap, 
  Archive, Share2, Sun, Moon, Maximize, Languages, CalendarDays, 
  Command, Trophy, Building, ChevronRight
} from 'lucide-react';

interface SidebarSubItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active: boolean;
}

interface SidebarItem {
  title: string;
  items?: SidebarSubItem[];
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  active?: boolean;
}

export default function AllStudents() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('A-Z');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [studentsDropdownOpen, setStudentsDropdownOpen] = useState(true);
  const [user, setUser] = useState<any>({ name: 'Admin' });
  const router = useRouter();
  const pathname = usePathname();

  // Sample student data
  const students = [
    {
      id: 'STU001',
      name: 'John Doe',
      rollNo: '12',
      class: '10',
      section: 'A',
      gender: 'Male',
      dateOfJoin: '01/01/2023',
      dob: '15/05/2008',
      status: 'Active'
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      rollNo: '15',
      class: '10',
      section: 'B',
      gender: 'Female',
      dateOfJoin: '01/01/2023',
      dob: '20/08/2008',
      status: 'Active'
    },
    {
      id: 'STU003',
      name: 'Robert Johnson',
      rollNo: '22',
      class: '11',
      section: 'A',
      gender: 'Male',
      dateOfJoin: '01/01/2023',
      dob: '10/03/2007',
      status: 'Inactive'
    }
  ];

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  // Sidebar items definition
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard', active: false },
        { name: 'Analytics', icon: BarChart3, href: '/admin/analytics', active: false },
      ]
    },
    {
      title: 'User Management',
      items: [
        { name: 'Students', icon: GraduationCap, href: '/admin/students', active: true },
        { name: 'Teachers', icon: Users, href: '/admin/teachers', active: false },
        { name: 'Parents', icon: Heart, href: '/admin/parents', active: false },
        { name: 'Staff', icon: UserCheck, href: '/admin/staff', active: false },
      ]
    },
    {
      title: 'Academic',
      items: [
        { name: 'Classes', icon: Building, href: '/admin/classes', active: false },
        { name: 'Subjects', icon: BookOpen, href: '/admin/subjects', active: false },
        { name: 'Examinations', icon: FileText, href: '/admin/exams', active: false },
        { name: 'Time Table', icon: Calendar, href: '/admin/timetable', active: false },
      ]
    },
    {
      title: 'Finance',
      items: [
        { name: 'Fee Collection', icon: DollarSign, href: '/admin/fees', active: false },
        { name: 'Expenses', icon: CreditCard, href: '/admin/expenses', active: false },
        { name: 'Reports', icon: BarChart3, href: '/admin/finance-reports', active: false },
      ]
    },
    {
      title: 'Communication',
      items: [
        { name: 'Announcements', icon: Bell, href: '/admin/announcements', active: false },
        { name: 'Messages', icon: MessageCircle, href: '/admin/messages', active: false },
        { name: 'Events', icon: Calendar, href: '/admin/events', active: false },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Academic Reports', icon: FileText, href: '/admin/academic-reports', active: false },
        { name: 'Attendance Reports', icon: Clock, href: '/admin/attendance-reports', active: false },
        { name: 'Financial Reports', icon: TrendingUp, href: '/admin/financial-reports', active: false },
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'System Settings', icon: Settings, href: '/admin/settings', active: false },
        { name: 'User Roles', icon: Shield, href: '/admin/roles', active: false },
        { name: 'Backup & Security', icon: Lock, href: '/admin/security', active: false },
      ]
    },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
    
    // Set dark mode based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800">
            <div className="flex items-center">
              <span className="text-xl font-semibold">SchoolPro</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-blue-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {/* Navigation items */}
              {sidebarItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => toggleSection(item.title)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg ${
                          collapsedSections.includes(item.title)
                            ? 'text-blue-200 hover:bg-blue-800 hover:text-white'
                            : 'text-white bg-blue-800'
                        }`}
                      >
                        <div className="flex items-center">
                          {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform ${
                            collapsedSections.includes(item.title) ? '' : 'rotate-180'
                          }`}
                        />
                      </button>
                      {!collapsedSections.includes(item.title) && (
                        <div className="mt-1 space-y-1 pl-12">
                          {item.items.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm rounded-lg ${
                                pathname === subItem.href
                                  ? 'bg-blue-800 text-white'
                                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                              }`}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                        pathname === item.href
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      <span>{item.title}</span>
                    </a>
                  )}
                </div>
              ))}

              {/* Students Dropdown */}
              <div className="mt-6">
                <button
                  onClick={() => setStudentsDropdownOpen(!studentsDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    <span>Students</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      studentsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {studentsDropdownOpen && (
                  <div className="mt-1 space-y-1 pl-12">
                    <a
                      href="/admin/students/all"
                      className={`block px-4 py-2 text-sm rounded-lg ${
                        pathname === '/admin/students/all'
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      All Students
                    </a>
                    <a
                      href="/admin/students/add"
                      className="block px-4 py-2 text-sm text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg"
                    >
                      Add Student
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-blue-800">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-blue-900 rounded-full"></span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-blue-200">Admin</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-auto p-1.5 text-blue-200 hover:bg-blue-800 rounded-full"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-700 bg-white shadow-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl border-r ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              SchoolPro
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
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
              
                {!collapsedSections.includes(section.title) && section.items?.map((item, itemIndex) => {
                  // Special handling for Students dropdown
                  if (item.name === 'Students') {
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => setStudentsDropdownOpen(!studentsDropdownOpen)}
                          className={`vuexy-menu-item flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium rounded-md group transition-all duration-200 ${
                            studentsDropdownOpen
                              ? (darkMode ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-900 shadow-md')
                              : (darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50')
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                              studentsDropdownOpen 
                                ? 'text-white' 
                                : (darkMode ? 'text-gray-400' : 'text-gray-500')
                            }`} />
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            studentsDropdownOpen ? 'rotate-180' : ''
                          } ${
                            studentsDropdownOpen 
                              ? 'text-white' 
                              : (darkMode ? 'text-gray-400' : 'text-gray-500')
                          }`} />
                        </button>
                        
                        {/* Students Dropdown */}
                        {studentsDropdownOpen && (
                          <div className="ml-8 mt-1 space-y-1">
                            <a
                              href="/admin/students/all"
                              className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                                pathname === '/admin/students/all'
                                  ? (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900')
                                  : (darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                              }`}
                            >
                              <Users className="w-4 h-4" />
                              <span>All Students</span>
                            </a>
                            <a
                              href="/admin/students/add"
                              className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                                darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <UserPlus className="w-4 h-4" />
                              <span>Add New Student</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // Regular menu items
                  return (
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
                  );
                })}
                
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

        {/* User Profile Section */}
        <div className="border-t border-gray-700/50 p-4">
          <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
            darkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-gray-50 hover:bg-white shadow-sm'
          }`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name || 'Admin User'}
              </p>
              <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user?.role || 'Administrator'}
              </p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:pl-64 min-h-screen transition-all duration-300 ${sidebarOpen ? 'pl-0' : ''}`}>
        {/* Header */}
        <header className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="px-6 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm mb-4">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dashboard</span>
              <span className={`${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>/</span>
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Students</span>
              <span className={`${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>/</span>
              <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>All Students</span>
            </div>

            {/* Title and Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Students List</h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your students and their details</p>
              </div>
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Refresh">
                  <RefreshCw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Export">
                  <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Print">
                  <Printer className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
                  <UserPlus className="w-4 h-4 mr-1.5" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>
          </header>
          
          {/* Page Content */}
          <div className="p-6">
            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md ${
                    filterOpen
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Student List */}
            <div className="mt-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`mb-4 rounded-lg overflow-hidden border ${
                    darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                  } shadow-sm transition-all duration-200 hover:shadow-md`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                            {student.name.charAt(0)}
                          </div>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>
                        <div>
                          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {student.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              ID: {student.id}
                            </span>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Roll No: {student.rollNo}
                            </span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              student.status === 'Active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {student.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                            <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Class & Section</span>
                            <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {student.class} - {student.section}
                            </span>
                          </div>
                          <div>
                            <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</span>
                            <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.gender}</span>
                          </div>
                          <div>
                            <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date of Join</span>
                            <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.dateOfJoin}</span>
                          </div>
                          <div>
                            <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date of Birth</span>
                            <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.dob}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex space-x-4">
                            <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                              <Phone className="w-4 h-4" />
                              <span>Call</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                              <Mail className="w-4 h-4" />
                              <span>Email</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={`px-6 py-3 ${
                        darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'
                      } flex justify-end`}>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800">
                          Add Fees
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Joined On</span>
                    <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.dateOfJoin}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                    Add Fees
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table headers */}
              <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Admission No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Roll No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Section
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date of Join
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    DOB
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                {students.map((student) => (
                  <tr key={student.id} className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.dateOfJoin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.dob}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div key={student.id} className={`rounded-lg shadow-md overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {student.class} - {student.section}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Admission No</p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{student.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Roll No</p>
                      <p className="text-sm font-medium">{student.rollNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm">{student.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Date of Join</p>
                      <p className="text-sm">{student.dateOfJoin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date of Birth</p>
                      <p className="text-sm">{student.dob}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>
                
                <div className={`px-6 py-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end`}>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                    Add Fees
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

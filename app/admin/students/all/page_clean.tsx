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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full bg-gradient-to-b from-red-600 to-pink-700 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-black bg-opacity-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
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
                            <item.icon className="w-4 h-4" />
                            <span>Students</span>
                          </div>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                            studentsDropdownOpen ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {studentsDropdownOpen && (
                          <div className="ml-4 mt-1 space-y-1">
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
                            <a href="/admin/students/add" className="block px-4 py-2 text-sm text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg">
                              Add Student
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
                      className={`vuexy-menu-item flex items-center px-3 py-1.5 text-sm font-medium rounded-md group transition-all duration-200 ${
                        pathname === item.href
                          ? (darkMode ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-900 shadow-md')
                          : (darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50')
                      }`}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                <p className="text-xs text-red-200">Administrator</p>
              </div>
              <button className="text-red-200 hover:text-white">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
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
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Students</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  All Students
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Controls */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Students List
              </h2>
              <div className="flex items-center space-x-3">
                {/* View Toggle */}
                <div className={`flex items-center rounded-lg border ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-l-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-r-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border text-sm w-full ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              
              <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}>
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Students Content */}
          {viewMode === 'list' ? (
            /* List View */
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                    {students.map((student) => (
                      <tr key={student.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {student.name.split(' ').map((n: string) => n[0]).join('')}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Roll No: {student.rollNo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {student.class} - {student.section}
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
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-600 font-medium text-sm">{student.id}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {student.class} - {student.section}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Roll No</span>
                      <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.rollNo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gender</span>
                      <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.gender}</span>
                    </div>
                  </div>
                  
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
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800">
                      Add Fees
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

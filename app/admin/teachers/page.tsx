'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Phone, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function TeachersPage() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
      return;
    }

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, [router]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      phone: '+1 (555) 123-4567',
      subject: 'Mathematics',
      department: 'Science',
      experience: '8 years',
      status: 'Active',
      avatar: '/avatars/teacher1.jpg',
      classes: ['Grade 10 Math', 'Grade 11 Advanced Math'],
      joinDate: '2018-09-01'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.com',
      phone: '+1 (555) 234-5678',
      subject: 'Physics',
      department: 'Science',
      experience: '12 years',
      status: 'Active',
      avatar: '/avatars/teacher2.jpg',
      classes: ['Grade 11 Physics', 'Grade 12 Advanced Physics'],
      joinDate: '2015-08-15'
    },
    {
      id: 3,
      name: 'Ms. Emily Rodriguez',
      email: 'emily.rodriguez@school.com',
      phone: '+1 (555) 345-6789',
      subject: 'English Literature',
      department: 'Languages',
      experience: '6 years',
      status: 'Active',
      avatar: '/avatars/teacher3.jpg',
      classes: ['Grade 9 English', 'Grade 10 Literature'],
      joinDate: '2020-01-10'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      email: 'james.wilson@school.com',
      phone: '+1 (555) 456-7890',
      subject: 'Chemistry',
      department: 'Science',
      experience: '15 years',
      status: 'On Leave',
      avatar: '/avatars/teacher4.jpg',
      classes: ['Grade 11 Chemistry', 'Grade 12 Organic Chemistry'],
      joinDate: '2012-03-20'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && teacher.status === 'Active') ||
                         (selectedFilter === 'inactive' && teacher.status !== 'Active');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Navigation */}
      <AdminNavbar
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        user={user}
        onLogout={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
        setSidebarOpen={setSidebarOpen}
        setSidebarHovered={setSidebarHovered}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className={`transition-all duration-500 ${sidebarOpen || sidebarHovered ? 'lg:ml-60' : 'lg:ml-20'}`}>
        <main className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Teachers Management
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your teaching staff and their information
            </p>
          </div>
          <Link
            href="/admin/teachers/add"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add New Teacher</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {teachers.length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Teachers
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {teachers.filter(t => t.status === 'Active').length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Teachers
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  8
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Departments
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  9.2
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Avg. Experience
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`p-6 rounded-2xl shadow-lg border mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search teachers by name, subject, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="all">All Teachers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teachers Table */}
        <div className={`rounded-2xl shadow-lg border overflow-hidden ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Teacher</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Contact</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Subject</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Experience</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Status</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-200`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {teacher.name}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {teacher.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {teacher.email}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {teacher.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {teacher.subject}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {teacher.classes.length} classes
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {teacher.experience}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode 
                            ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                        }`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode 
                            ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
                        }`}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                        }`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/teachers/add"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Add New Teacher
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Register a new teacher
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/teachers/profiles"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Teacher Profiles
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  View detailed profiles
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/teachers/assignments"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Assignments
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage class assignments
                </p>
              </div>
            </div>
          </Link>
        </div>
        </main>
      </div>
    </div>
  );
}

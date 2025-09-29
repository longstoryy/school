'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, UserPlus, Search, Filter, Mail, Phone, Eye, Edit, MessageCircle } from 'lucide-react';
import Navigation from '@/components/shared/Navigation';
import Sidebar from '@/components/shared/Sidebar';

export default function ParentsPage() {
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

  const parents = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      occupation: 'Software Engineer',
      children: ['Emma Smith - Grade 10', 'Liam Smith - Grade 8'],
      address: '123 Oak Street, Springfield',
      emergencyContact: '+1 (555) 987-6543',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      occupation: 'Doctor',
      children: ['Sofia Rodriguez - Grade 11'],
      address: '456 Pine Avenue, Springfield',
      emergencyContact: '+1 (555) 876-5432',
      status: 'Active'
    },
    {
      id: 3,
      name: 'David Johnson',
      email: 'david.johnson@email.com',
      phone: '+1 (555) 345-6789',
      occupation: 'Business Owner',
      children: ['Michael Johnson - Grade 9', 'Sarah Johnson - Grade 12'],
      address: '789 Maple Drive, Springfield',
      emergencyContact: '+1 (555) 765-4321',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      phone: '+1 (555) 456-7890',
      occupation: 'Teacher',
      children: ['Kevin Chen - Grade 10'],
      address: '321 Elm Street, Springfield',
      emergencyContact: '+1 (555) 654-3210',
      status: 'Inactive'
    }
  ];

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         parent.children.some(child => child.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && parent.status === 'Active') ||
                         (selectedFilter === 'inactive' && parent.status === 'Inactive');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <Navigation
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        user={user}
        role="admin"
        onLogout={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
      />

      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        sidebarHovered={sidebarHovered}
        setSidebarOpen={setSidebarOpen}
        setSidebarHovered={setSidebarHovered}
        activeSubmenu={activeSubmenu}
        setActiveSubmenu={setActiveSubmenu}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
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
              Parents Management
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage parent information and communication
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add New Parent</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {parents.length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Parents
                </p>
              </div>
              <div className="p-3 bg-pink-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {parents.filter(p => p.status === 'Active').length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Parents
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  6
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Children
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  95%
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Response Rate
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
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
                placeholder="Search parents by name, email, or child name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-pink-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-pink-500'
                } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
              >
                <option value="all">All Parents</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParents.map((parent) => (
            <div key={parent.id} className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {/* Parent Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {parent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {parent.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {parent.occupation}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                  parent.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {parent.status}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {parent.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {parent.phone}
                  </span>
                </div>
              </div>

              {/* Children */}
              <div className="mb-4">
                <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Children:
                </h4>
                <div className="space-y-1">
                  {parent.children.map((child, index) => (
                    <div key={index} className={`text-sm px-3 py-1 rounded-lg ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {child}
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {parent.address}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
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
                      ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-pink-600 hover:bg-gray-100'
                  }`}>
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-pink-500' : 'bg-white border-gray-200 hover:border-pink-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-500 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Send Announcement
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Broadcast to all parents
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Email Campaign
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Send targeted emails
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Parent Portal
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage portal access
                </p>
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

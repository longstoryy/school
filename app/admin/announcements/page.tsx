'use client';

import { useState, useEffect } from 'react';
import { Bell, Plus, Search, Filter, Calendar, Users, Eye, Edit, Trash2, Send, Pin, AlertCircle } from 'lucide-react';

export default function AnnouncementsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Conference Schedule',
      content: 'The annual parent-teacher conference will be held from March 15-17, 2024. Please book your slots through the parent portal.',
      category: 'Academic',
      priority: 'High',
      status: 'Published',
      author: 'Principal Office',
      publishDate: '2024-01-10',
      expiryDate: '2024-03-20',
      targetAudience: ['Parents', 'Teachers'],
      views: 245,
      isPinned: true
    },
    {
      id: 2,
      title: 'School Sports Day 2024',
      content: 'Join us for the annual sports day celebration on February 28, 2024. Various competitions and activities planned for all grades.',
      category: 'Events',
      priority: 'Medium',
      status: 'Published',
      author: 'Sports Department',
      publishDate: '2024-01-08',
      expiryDate: '2024-03-01',
      targetAudience: ['Students', 'Parents', 'Teachers'],
      views: 189,
      isPinned: false
    },
    {
      id: 3,
      title: 'New Library Hours',
      content: 'Starting January 15, 2024, the library will be open from 7:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends.',
      category: 'General',
      priority: 'Low',
      status: 'Published',
      author: 'Library Staff',
      publishDate: '2024-01-05',
      expiryDate: '2024-06-30',
      targetAudience: ['Students', 'Teachers', 'Staff'],
      views: 156,
      isPinned: false
    },
    {
      id: 4,
      title: 'Midterm Examination Schedule',
      content: 'Midterm examinations for all grades will commence from February 12, 2024. Detailed timetable will be shared soon.',
      category: 'Academic',
      priority: 'High',
      status: 'Draft',
      author: 'Academic Office',
      publishDate: null,
      expiryDate: '2024-02-25',
      targetAudience: ['Students', 'Parents', 'Teachers'],
      views: 0,
      isPinned: false
    },
    {
      id: 5,
      title: 'Cafeteria Menu Update',
      content: 'New healthy meal options have been added to the cafeteria menu. Check out the updated menu on our website.',
      category: 'General',
      priority: 'Low',
      status: 'Published',
      author: 'Cafeteria Management',
      publishDate: '2024-01-03',
      expiryDate: '2024-12-31',
      targetAudience: ['Students', 'Staff'],
      views: 98,
      isPinned: false
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || announcement.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || announcement.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return <AlertCircle className="w-4 h-4" />;
      case 'Events':
        return <Calendar className="w-4 h-4" />;
      case 'General':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Announcements
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage school announcements and communications
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Announcement</span>
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
                  {announcements.length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Announcements
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {announcements.filter(a => a.status === 'Published').length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Published
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <Send className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {announcements.filter(a => a.status === 'Draft').length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drafts
                </p>
              </div>
              <div className="p-3 bg-gray-500 rounded-xl">
                <Edit className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {announcements.reduce((sum, a) => sum + a.views, 0)}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Views
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
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
                placeholder="Search announcements by title, content, or author..."
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="all">All Categories</option>
                <option value="academic">Academic</option>
                <option value="events">Events</option>
                <option value="general">General</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } ${announcement.isPinned ? 'ring-2 ring-yellow-500/50' : ''}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-xl ${
                    announcement.category === 'Academic' ? 'bg-red-500' :
                    announcement.category === 'Events' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {getCategoryIcon(announcement.category)}
                    <span className="text-white">
                      {getCategoryIcon(announcement.category)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-yellow-500" />
                      )}
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {announcement.title}
                      </h3>
                    </div>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {announcement.content}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        By {announcement.author}
                      </span>
                      {announcement.publishDate && (
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Published: {new Date(announcement.publishDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(announcement.status)}`}>
                    {announcement.status}
                  </span>
                </div>
              </div>

              {/* Target Audience */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Target Audience:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {announcement.targetAudience.map((audience, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {announcement.views} views
                    </span>
                  </div>
                </div>
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
                      ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-yellow-600 hover:bg-gray-100'
                  }`}>
                    <Pin className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                  }`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {announcement.status === 'Draft' && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center space-x-1">
                      <Send className="w-4 h-4" />
                      <span>Publish</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create Announcement
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Draft new announcement
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bulk Send
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Send to multiple groups
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Schedule Post
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Schedule for later
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

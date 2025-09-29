'use client';

import { useState, useEffect } from 'react';
import { Building, Plus, Search, Users, BookOpen, Calendar, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ClassesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const classes = [
    {
      id: 1,
      name: 'Grade 10 - Mathematics A',
      grade: '10',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      students: 28,
      maxCapacity: 30,
      room: 'Room 201',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      status: 'Active',
      description: 'Advanced mathematics covering algebra and geometry'
    },
    {
      id: 2,
      name: 'Grade 11 - Physics Lab',
      grade: '11',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      students: 24,
      maxCapacity: 25,
      room: 'Lab 101',
      schedule: 'Tue, Thu - 2:00 PM',
      status: 'Active',
      description: 'Hands-on physics experiments and theory'
    },
    {
      id: 3,
      name: 'Grade 9 - English Literature',
      grade: '9',
      subject: 'English',
      teacher: 'Ms. Emily Rodriguez',
      students: 32,
      maxCapacity: 35,
      room: 'Room 105',
      schedule: 'Daily - 10:30 AM',
      status: 'Active',
      description: 'Classic and modern literature analysis'
    },
    {
      id: 4,
      name: 'Grade 12 - Chemistry Advanced',
      grade: '12',
      subject: 'Chemistry',
      teacher: 'Dr. James Wilson',
      students: 18,
      maxCapacity: 20,
      room: 'Lab 203',
      schedule: 'Mon, Wed - 1:00 PM',
      status: 'Inactive',
      description: 'Advanced organic and inorganic chemistry'
    },
    {
      id: 5,
      name: 'Grade 8 - History',
      grade: '8',
      subject: 'History',
      teacher: 'Mr. Robert Davis',
      students: 30,
      maxCapacity: 32,
      room: 'Room 108',
      schedule: 'Tue, Thu, Fri - 11:00 AM',
      status: 'Active',
      description: 'World history and cultural studies'
    }
  ];

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = selectedGrade === 'all' || classItem.grade === selectedGrade;
    
    return matchesSearch && matchesGrade;
  });

  const grades = ['8', '9', '10', '11', '12'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Classes Management
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage class schedules, assignments, and student enrollment
            </p>
          </div>
          <Link
            href="/admin/classes/create"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Class</span>
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
                  {classes.length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Classes
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {classes.filter(c => c.status === 'Active').length}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Classes
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {classes.reduce((total, c) => total + c.students, 0)}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Students
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
                  {Math.round((classes.reduce((total, c) => total + c.students, 0) / classes.reduce((total, c) => total + c.maxCapacity, 0)) * 100)}%
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Capacity Used
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
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
                placeholder="Search classes by name, subject, or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              >
                <option value="all">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredClasses.map((classItem) => (
            <div key={classItem.id} className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {/* Class Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {classItem.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {classItem.teacher}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                  classItem.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {classItem.status}
                </span>
              </div>

              {/* Class Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Students:
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {classItem.students}/{classItem.maxCapacity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Room:
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {classItem.room}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Schedule:
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {classItem.schedule}
                  </span>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Capacity</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {Math.round((classItem.students / classItem.maxCapacity) * 100)}%
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (classItem.students / classItem.maxCapacity) > 0.8 
                        ? 'bg-gradient-to-r from-red-400 to-red-600' 
                        : (classItem.students / classItem.maxCapacity) > 0.6
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                        : 'bg-gradient-to-r from-green-400 to-green-600'
                    }`}
                    style={{ width: `${(classItem.students / classItem.maxCapacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {classItem.description}
              </p>

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
                      ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                  }`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/classes/create"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create Class
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Add new class
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/classes/schedules"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Schedules
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage timetables
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/classes/rooms"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Room Management
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Assign rooms
                </p>
              </div>
            </div>
          </Link>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Attendance
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Track attendance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

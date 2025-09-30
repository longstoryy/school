'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Search, Plus, Filter, Download, Upload, Eye, Edit, Trash2,
  GraduationCap, Phone, Mail, MapPin, Calendar, User, ChevronDown,
  MoreVertical, CheckCircle, XCircle, Clock, Award
} from 'lucide-react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AddStudentModal from '@/components/admin/AddStudentModal';
import { useTheme } from '@/hooks/useTheme';
import { CACHED_STUDENTS, searchStudents, filterStudentsByStatus, type Student } from '@/lib/studentsCache';

export default function StudentsPage() {
  const [user, setUser] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  // Lightning fast student loading - no API delays
  const loadStudents = () => {
    // Instant loading from cache - no delays, no loading states
    setStudents(CACHED_STUDENTS);
    setLoading(false);
  };

  useEffect(() => {
    // Initialize user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
      return;
    }
    
    // Instant loading - no delays
    loadStudents();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddStudent = async (studentData: any) => {
    try {
      // Generate a new student ID
      const newStudent: Student = {
        id: `STU${Date.now()}`,
        student_id: `STU${String(students.length + 1).padStart(3, '0')}`,
        full_name: `${studentData.first_name} ${studentData.last_name}`,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        phone_number: studentData.phone_number,
        current_class: studentData.current_class,
        section: studentData.section,
        status: studentData.status,
        admission_date: studentData.admission_date,
        age: studentData.date_of_birth ? new Date().getFullYear() - new Date(studentData.date_of_birth).getFullYear() : 0,
        is_active: studentData.status === 'active'
      };

      // Add to current students list
      setStudents(prev => [newStudent, ...prev]);
      
      // TODO: Send to backend API
      console.log('New student added:', newStudent);
      
      // Show success message
      alert('Student added successfully!');
      
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  const getStatusBadge = (status: string, isActive: boolean) => {
    if (status === 'active' && isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    } else if (status === 'inactive') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </span>
      );
    } else if (status === 'graduated') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Award className="w-3 h-3 mr-1" />
          Graduated
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  // Lightning fast filtering with memoization - no re-computation unless needed
  const filteredStudents = useMemo(() => {
    let result = students;
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = searchStudents(result, searchQuery);
    }
    
    // Apply status filter
    result = filterStudentsByStatus(result, statusFilter);
    
    return result;
  }, [students, searchQuery, statusFilter]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Navigation */}
      <AdminNavbar
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
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
        <main className={`relative z-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
            {/* Header */}
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Students</h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage student records and information</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}>
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </button>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </button>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search students by name, ID, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode 
                          ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className={`rounded-2xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <Users className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <h3 className={`mt-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>No students found</h3>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding a new student.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.full_name}</h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.student_id}</p>
                            </div>
                          </div>
                          <div className="relative">
                            <button className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                              <MoreVertical className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <GraduationCap className="w-4 h-4" />
                            <span>{student.current_class} - Section {student.section}</span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Phone className="w-4 h-4" />
                            <span>{student.phone_number}</span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Calendar className="w-4 h-4" />
                            <span>Age: {student.age} years</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {getStatusBadge(student.status, student.is_active)}
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200 hover:scale-110">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <div className={`mt-6 rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
                    <span className="font-medium">{filteredStudents.length}</span> results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 ${
                      darkMode 
                        ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600' 
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                    }`}>
                      Previous
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                      1
                    </button>
                    <button className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 ${
                      darkMode 
                        ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600' 
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                    }`}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddStudent}
        darkMode={darkMode}
      />
    </div>
  );
}

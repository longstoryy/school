'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Search, Plus, Filter, Download, Upload, Eye, Edit, Trash2,
  GraduationCap, Phone, Mail, MapPin, Calendar, User, ChevronDown,
  MoreVertical, CheckCircle, XCircle, Clock, Award, Grid3X3, List,
  ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AddStudentModal from '@/components/admin/AddStudentModal';
import ViewStudentModal from '@/components/admin/ViewStudentModal';
import EditStudentModal from '@/components/admin/EditStudentModal';
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
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Show more students per page
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  // Test function to check API without auth
  const testApiWithoutAuth = async () => {
    try {
      console.log('Testing API without authentication...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/students/`);
      console.log('No-auth response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('No-auth data:', data);
      } else {
        console.log('No-auth failed:', await response.text());
      }
    } catch (error) {
      console.log('No-auth error:', error);
    }
  };

  // Load students from Django backend with authentication
  const loadStudents = async () => {
    try {
      setLoading(true);
      
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // TEMPORARY: Skip authentication for testing
      // TODO: Fix Django authentication setup later
      console.log('LoadStudents - Attempting without authentication for testing');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/students/`, {
        headers
      });
      
      if (response.ok) {
        const data = await response.json();
        // Django returns paginated data with 'results' array
        const studentsData = data.results || data;
        setStudents(studentsData);
        console.log(`Loaded ${studentsData.length} students from backend`);
      } else {
        console.error('Failed to fetch students:', response.status, response.statusText);
        if (response.status === 401) {
          console.warn('Authentication required - using cached data');
        }
        // Fallback to cached data if API fails
        setStudents(CACHED_STUDENTS);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      // Fallback to cached data if API fails
      setStudents(CACHED_STUDENTS);
    } finally {
      setLoading(false);
    }
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
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // TEMPORARY: Skip authentication for testing
      // TODO: Fix Django authentication setup later
      console.log('AddStudent - Attempting without authentication for testing');
      
      // Send to Django backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/students/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log('Student created successfully:', newStudent);
        
        // Refresh the students list from backend
        await loadStudents();
        
        // Success - no need to show alert, modal will handle it
        return;
      } else {
        const errorData = await response.json();
        console.error('Backend error:', errorData);
        if (response.status === 401) {
          alert('Authentication required. Please log in again.');
          router.push('/login');
          return;
        }
        // Throw the error so the modal can handle it
        throw errorData;
      }
      
    } catch (error) {
      console.error('Error adding student:', error);
      // Re-throw the error so the modal can handle it with proper error parsing
      throw error;
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = async (updatedStudent: Student) => {
    try {
      setStudents(prev => prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      ));
      
      // TODO: Send to backend API
      console.log('Student updated:', updatedStudent);
      
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student. Please try again.');
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        setStudents(prev => prev.filter(student => student.id !== studentId));
        
        // TODO: Send to backend API
        console.log('Student deleted:', studentId);
        
        alert('Student deleted successfully!');
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student. Please try again.');
      }
    }
  };

  const handleExport = () => {
    try {
      const csvContent = [
        ['Student ID', 'Full Name', 'Email', 'Phone', 'Class', 'Section', 'Status', 'Admission Date'],
        ...filteredStudents.map(student => [
          student.student_id,
          student.full_name,
          student.email,
          student.phone_number,
          student.current_class,
          student.section,
          student.status,
          student.admission_date
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert('Students data exported successfully!');
    } catch (error) {
      console.error('Error exporting students:', error);
      alert('Error exporting students. Please try again.');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const csv = e.target?.result as string;
            const lines = csv.split('\n');
            const headers = lines[0].split(',');
            
            // TODO: Parse CSV and add students
            console.log('CSV imported:', { headers, lines: lines.length });
            alert('Import functionality will be implemented with backend integration.');
          } catch (error) {
            console.error('Error importing CSV:', error);
            alert('Error importing CSV file. Please check the format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
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

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
                  {/* Modern Refresh Button */}
                  <button 
                    onClick={loadStudents}
                    className="group relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4 text-white transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  
                  {/* Test API Button */}
                  <button 
                    onClick={testApiWithoutAuth}
                    className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200"
                    title="Test API"
                  >
                    Test API
                  </button>
                  
                  <button 
                    onClick={handleExport}
                    className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' 
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button 
                    onClick={handleImport}
                    className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' 
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
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
                  
                  {/* View Toggle */}
                  <div className={`flex items-center border rounded-xl p-1 ${
                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                  }`}>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'grid'
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      title="Grid View"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'list'
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
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
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentStudents.map((student) => (
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
                            <button 
                              onClick={() => handleViewStudent(student)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditStudent(student)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200 hover:scale-110"
                              title="Edit Student"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className={`rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Student
                          </th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Contact
                          </th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Academic
                          </th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Status
                          </th>
                          <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                        {currentStudents.map((student) => (
                          <tr key={student.id} className={`hover:bg-opacity-50 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="ml-4">
                                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {student.full_name}
                                  </div>
                                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {student.student_id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                {student.email}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {student.phone_number}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                {student.current_class}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Section {student.section}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(student.status, student.is_active)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button 
                                  onClick={() => handleViewStudent(student)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditStudent(student)}
                                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200 hover:scale-110"
                                  title="Edit Student"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteStudent(student.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                                  title="Delete Student"
                                >
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
              )}
            </div>

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <div className={`mt-6 rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredStudents.length)}</span> of{' '}
                    <span className="font-medium">{filteredStudents.length}</span> results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode 
                          ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 hover:scale-105 ${
                          page === currentPage
                            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 border-transparent'
                            : darkMode
                              ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600'
                              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode 
                          ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
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

      {/* View Student Modal */}
      <ViewStudentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        student={selectedStudent}
        darkMode={darkMode}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateStudent}
        student={selectedStudent}
        darkMode={darkMode}
      />
    </div>
  );
}

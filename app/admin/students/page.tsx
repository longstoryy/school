'use client';

import { useEffect, useState } from 'react';
import { 
  Users, Search, Plus, Filter, Download, Upload, Eye, Edit, Trash2,
  GraduationCap, Phone, Mail, MapPin, Calendar, User, ChevronDown,
  MoreVertical, CheckCircle, XCircle, Clock, Award
} from 'lucide-react';

interface Student {
  id: string;
  student_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  current_class: string;
  section: string;
  status: string;
  admission_date: string;
  age: number;
  is_active: boolean;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Get token from user object in localStorage
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : null;
      
      if (!token) {
        // For demo purposes, use mock data if no token
        const mockStudents: Student[] = [
          {
            id: '1',
            student_id: 'STU001',
            full_name: 'Emma Johnson',
            first_name: 'Emma',
            last_name: 'Johnson',
            email: 'emma.johnson@student.school.com',
            phone_number: '+447123456789',
            current_class: 'Year 8',
            section: 'A',
            status: 'active',
            admission_date: '2023-09-01',
            age: 13,
            is_active: true
          },
          {
            id: '2',
            student_id: 'STU002',
            full_name: 'James Smith',
            first_name: 'James',
            last_name: 'Smith',
            email: 'james.smith@student.school.com',
            phone_number: '+447234567890',
            current_class: 'Year 9',
            section: 'B',
            status: 'active',
            admission_date: '2022-09-01',
            age: 14,
            is_active: true
          },
          {
            id: '3',
            student_id: 'STU003',
            full_name: 'Olivia Brown',
            first_name: 'Olivia',
            last_name: 'Brown',
            email: 'olivia.brown@student.school.com',
            phone_number: '+447345678901',
            current_class: 'Year 7',
            section: 'A',
            status: 'active',
            admission_date: '2024-09-01',
            age: 12,
            is_active: true
          }
        ];
        setTimeout(() => {
          setStudents(mockStudents);
          setLoading(false);
        }, 1000);
        return;
      }

      let url = `http://localhost:8000/api/students/`;
      
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.results || data);
      } else if (response.status === 401) {
        // Fallback to mock data if unauthorized
        const mockStudents: Student[] = [
          {
            id: '1',
            student_id: 'STU001',
            full_name: 'John Doe',
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@student.school.com',
            phone_number: '+447123456789',
            current_class: 'Year 10',
            section: 'A',
            status: 'active',
            admission_date: '2023-01-01',
            age: 15,
            is_active: true
          }
        ];
        setStudents(mockStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      // Fallback to mock data on error
      const mockStudents: Student[] = [
        {
          id: '1',
          student_id: 'STU001',
          full_name: 'John Doe',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@student.school.com',
          phone_number: '+447123456789',
          current_class: 'Year 10',
          section: 'A',
          status: 'active',
          admission_date: '2023-01-01',
          age: 15,
          is_active: true
        }
      ];
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch students when search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                <p className="text-sm text-gray-600">Manage student records and information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search students by name, ID, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding a new student.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{student.full_name}</h3>
                          <p className="text-sm text-gray-500">{student.student_id}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        <span>{student.current_class} - Section {student.section}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{student.phone_number}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Age: {student.age} years</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {getStatusBadge(student.status, student.is_active)}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
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
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
                <span className="font-medium">{filteredStudents.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

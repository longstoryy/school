'use client';

import { X, User, Mail, Phone, Calendar, MapPin, GraduationCap, Users, Heart } from 'lucide-react';
import { Student } from '@/lib/studentsCache';

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  darkMode: boolean;
}

export default function ViewStudentModal({ isOpen, onClose, student, darkMode }: ViewStudentModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {student.full_name}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Student ID: {student.student_id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.full_name}</p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.email}</p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.phone_number}</p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.age} years old</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <GraduationCap className="w-5 h-5 mr-2" />
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Class</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.current_class}</p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Section</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Section {student.section}</p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Admission Date</span>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(student.admission_date).toLocaleDateString()}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  student.status === 'active' && student.is_active
                    ? 'bg-green-100 text-green-800'
                    : student.status === 'inactive'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

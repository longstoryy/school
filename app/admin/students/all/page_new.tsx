'use client';

import { useState } from 'react';
import { 
  Search, Filter, Grid3X3, List, MoreVertical, 
  Phone, Mail, Eye, Plus
} from 'lucide-react';

export default function AllStudents() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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

  return (
    <div>
      {/* Controls */}
      <div className="bg-white border-gray-200 rounded-lg border p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Students List
          </h2>
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-50 text-gray-600'
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border text-sm w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors border-gray-300 hover:bg-gray-50 text-gray-700">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Students Content */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="bg-white border-gray-200 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-gray-200 divide-y">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
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
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Roll No: {student.rollNo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.class} - {student.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
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
            <div key={student.id} className="bg-white border-gray-200 rounded-lg border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-600 font-medium text-sm">{student.id}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {student.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {student.class} - {student.section}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Roll No</span>
                  <span className="text-gray-900">{student.rollNo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gender</span>
                  <span className="text-gray-900">{student.gender}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600">
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
    </div>
  );
}

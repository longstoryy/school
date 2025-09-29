'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Plus, Search, Filter, Calendar, CheckCircle, XCircle, Clock, Eye, Edit, Send } from 'lucide-react';
import Link from 'next/link';

export default function FeesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const feeRecords = [
    {
      id: 1,
      studentName: 'Emma Smith',
      studentId: 'STU001',
      grade: '10',
      feeType: 'Tuition Fee',
      amount: 2500,
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      status: 'Paid',
      paymentMethod: 'Bank Transfer',
      receiptNo: 'RCP001'
    },
    {
      id: 2,
      studentName: 'Michael Johnson',
      studentId: 'STU002',
      grade: '11',
      feeType: 'Tuition Fee',
      amount: 2500,
      dueDate: '2024-01-15',
      paidDate: null,
      status: 'Overdue',
      paymentMethod: null,
      receiptNo: null
    },
    {
      id: 3,
      studentName: 'Sofia Rodriguez',
      studentId: 'STU003',
      grade: '9',
      feeType: 'Lab Fee',
      amount: 300,
      dueDate: '2024-01-20',
      paidDate: '2024-01-18',
      status: 'Paid',
      paymentMethod: 'Cash',
      receiptNo: 'RCP002'
    },
    {
      id: 4,
      studentName: 'Kevin Chen',
      studentId: 'STU004',
      grade: '12',
      feeType: 'Library Fee',
      amount: 150,
      dueDate: '2024-01-25',
      paidDate: null,
      status: 'Pending',
      paymentMethod: null,
      receiptNo: null
    },
    {
      id: 5,
      studentName: 'Sarah Davis',
      studentId: 'STU005',
      grade: '10',
      feeType: 'Sports Fee',
      amount: 200,
      dueDate: '2024-01-30',
      paidDate: null,
      status: 'Pending',
      paymentMethod: null,
      receiptNo: null
    }
  ];

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.feeType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || record.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = feeRecords.filter(r => r.status === 'Paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = feeRecords.filter(r => r.status === 'Pending').reduce((sum, record) => sum + record.amount, 0);
  const overdueAmount = feeRecords.filter(r => r.status === 'Overdue').reduce((sum, record) => sum + record.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Overdue':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-4 sm:p-6" style={{ paddingTop: '98px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fee Collection
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage student fees, payments, and financial records
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Link
              href="/admin/fees/structure"
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Fee Structure</span>
            </Link>
            <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200 space-x-2">
              <Plus className="w-5 h-5" />
              <span>Collect Fee</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${totalAmount.toLocaleString()}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Fees
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold text-green-600`}>
                  ${paidAmount.toLocaleString()}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Collected
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold text-yellow-600`}>
                  ${pendingAmount.toLocaleString()}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Pending
                </p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold text-red-600`}>
                  ${overdueAmount.toLocaleString()}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overdue
                </p>
              </div>
              <div className="p-3 bg-red-500 rounded-xl">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Collection Rate Progress */}
        <div className={`p-6 rounded-2xl shadow-lg border mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Collection Progress
            </h3>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {Math.round((paidAmount / totalAmount) * 100)}%
            </span>
          </div>
          <div className={`w-full h-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
              style={{ width: `${(paidAmount / totalAmount) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Collected: ${paidAmount.toLocaleString()}
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Total: ${totalAmount.toLocaleString()}
            </span>
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
                placeholder="Search by student name, ID, or fee type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={`px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              >
                <option value="current">Current Month</option>
                <option value="last">Last Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fee Records Table */}
        <div className={`rounded-2xl shadow-lg border overflow-hidden ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Student</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Fee Type</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Amount</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Due Date</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Status</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-200`}>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {record.studentName}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {record.studentId} • Grade {record.grade}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {record.feeType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${record.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {new Date(record.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      {record.paidDate && (
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Paid: {new Date(record.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      {record.paymentMethod && (
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          via {record.paymentMethod}
                        </div>
                      )}
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
                        {record.status !== 'Paid' && (
                          <button className={`p-2 rounded-lg transition-colors duration-200 ${
                            darkMode 
                              ? 'text-gray-400 hover:text-orange-400 hover:bg-gray-700' 
                              : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
                          }`}>
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/fees/structure"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Fee Structure
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage fee types
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/fees/history"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment History
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  View all payments
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/fees/outstanding"
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-500 rounded-xl">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Outstanding Fees
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overdue payments
                </p>
              </div>
            </div>
          </Link>

          <div className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Generate Report
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Financial reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

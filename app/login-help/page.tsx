'use client';

import { useRouter } from 'next/navigation';
import { User, BookOpen, Shield, Users } from 'lucide-react';

export default function LoginHelp() {
  const router = useRouter();

  const testAccounts = [
    {
      role: 'Student',
      email: 'test@example.com',
      password: 'testpass123',
      icon: BookOpen,
      color: 'blue',
      dashboard: '/student/dashboard'
    },
    {
      role: 'Teacher', 
      email: 'teacher@test.com',
      password: 'test123',
      icon: Users,
      color: 'green',
      dashboard: '/teacher/dashboard'
    },
    {
      role: 'Admin',
      email: 'admin@test.com', 
      password: 'test123',
      icon: Shield,
      color: 'red',
      dashboard: '/admin/dashboard'
    },
    {
      role: 'Parent',
      email: 'parent@test.com',
      password: 'test123', 
      icon: User,
      color: 'purple',
      dashboard: '/parent/dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎓 EduManage Test Accounts
          </h1>
          <p className="text-gray-600">
            Use these credentials to test different user roles in the system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testAccounts.map((account) => {
            const IconComponent = account.icon;
            return (
              <div key={account.role} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 bg-${account.color}-100 rounded-lg`}>
                    <IconComponent className={`h-6 w-6 text-${account.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{account.role}</h3>
                    <p className="text-sm text-gray-600">Test Account</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Email
                    </label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {account.email}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Password
                    </label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {account.password}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => router.push('/login')}
                    className={`flex-1 py-2 px-4 bg-${account.color}-600 text-white text-sm rounded-md hover:bg-${account.color}-700 transition-colors`}
                  >
                    Login as {account.role}
                  </button>
                  <button
                    onClick={() => router.push(account.dashboard)}
                    className="flex-1 py-2 px-4 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            🔐 How to Login
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Login as [Role]" button above</li>
            <li>Copy the email and password from the card</li>
            <li>Paste into the login form</li>
            <li>You'll be redirected to the appropriate dashboard</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

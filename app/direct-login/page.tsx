'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DirectLogin() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpass123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDirectLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Test Django API directly
      const response = await fetch('http://localhost:8000/api/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        
        // Get user type and redirect
        const userType = data.user?.user_type?.toLowerCase() || 'student';
        
        switch (userType) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'teacher':
            router.push('/teacher/dashboard');
            break;
          case 'student':
            router.push('/student/dashboard');
            break;
          case 'parent':
            router.push('/parent/dashboard');
            break;
          default:
            router.push('/test-dashboard');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🔧 Direct Login Test
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bypass NextAuth and test Django API directly
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleDirectLogin}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Direct Login'}
          </button>

          <div className="mt-6 space-y-2">
            <button
              onClick={() => router.push('/student/dashboard')}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Go to Student Dashboard (No Auth)
            </button>
            <button
              onClick={() => router.push('/teacher/dashboard')}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Go to Teacher Dashboard (No Auth)
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Go to Admin Dashboard (No Auth)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

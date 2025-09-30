'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Facebook, Chrome, Apple, GraduationCap, BookOpen, Users, Calendar, Award, Bell, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Test accounts with their dashboard routes
  const testAccounts = [
    { 
      email: 'test@example.com', 
      password: 'testpass123', 
      user_type: 'STUDENT', 
      name: 'John Student',
      dashboard: '/student/dashboard'
    },
    { 
      email: 'teacher@test.com', 
      password: 'test123', 
      user_type: 'TEACHER', 
      name: 'Jane Teacher',
      dashboard: '/teacher/dashboard'
    },
    { 
      email: 'admin@test.com', 
      password: 'test123', 
      user_type: 'ADMIN', 
      name: 'Bob Admin',
      dashboard: '/admin/dashboard'
    },
    { 
      email: 'parent@test.com', 
      password: 'test123', 
      user_type: 'PARENT', 
      name: 'Mary Parent',
      dashboard: '/parent/dashboard'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First try Django API authentication
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Django auth successful:', data);
        
        // Get user type and redirect accordingly
        const userType = data.user?.user_type?.toLowerCase();
        
        // Store user info in localStorage for dashboard use
        localStorage.setItem('user', JSON.stringify({
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`,
          user_type: data.user.user_type,
          token: data.access
        }));

        // Redirect based on user type
        switch (userType) {
          case 'student':
            router.push('/student/dashboard');
            break;
          case 'teacher':
            router.push('/teacher/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'parent':
            router.push('/parent/dashboard');
            break;
          default:
            router.push('/student/dashboard');
        }
      } else {
        // If Django fails, try local test accounts
        const account = testAccounts.find(acc => 
          acc.email === email && acc.password === password
        );

        if (account) {
          // Store user info for dashboard use
          localStorage.setItem('user', JSON.stringify({
            email: account.email,
            name: account.name,
            user_type: account.user_type,
            token: 'test-token'
          }));

          console.log(`Local auth successful for ${account.user_type}`);
          router.push(account.dashboard);
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Fallback to local test accounts
      const account = testAccounts.find(acc => 
        acc.email === email && acc.password === password
      );

      if (account) {
        localStorage.setItem('user', JSON.stringify({
          email: account.email,
          name: account.name,
          user_type: account.user_type,
          token: 'test-token'
        }));

        console.log(`Fallback auth successful for ${account.user_type}`);
        router.push(account.dashboard);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (account: typeof testAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-fluid">
        <div className="w-full overflow-hidden position-relative flex-wrap d-block min-h-screen">
          <div className="flex">
            {/* Left Side - Beautiful Background with Announcements */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden min-h-screen">
              {/* Background Image Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-300/20 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-32 left-16 w-40 h-40 bg-purple-300/15 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/20 rounded-full blur-xl animate-bounce"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 w-full p-8 flex flex-col justify-center">
                <div className="mb-8">
                  <h4 className="text-white text-2xl font-bold mb-6">What's New on EduManage !!!</h4>
                  
                  {/* Announcement Cards */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                      <div className="flex-1">
                        <h6 className="text-white font-semibold mb-1">Summer Vacation Holiday Homework</h6>
                        <p className="text-white/80 text-sm truncate">The school will remain closed from April 20th to June...</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                      <div className="flex-1">
                        <h6 className="text-white font-semibold mb-1">New Academic Session Admission Start(2024-25)</h6>
                        <p className="text-white/80 text-sm truncate">An academic term is a portion of an academic year, the time ....</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                      <div className="flex-1">
                        <h6 className="text-white font-semibold mb-1">Date sheet Final Exam Nursery to Sr.Kg</h6>
                        <p className="text-white/80 text-sm truncate">Dear Parents, As the final examination for the session 2024-25 is ...</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                      <div className="flex-1">
                        <h6 className="text-white font-semibold mb-1">Annual Day Function</h6>
                        <p className="text-white/80 text-sm truncate">Annual functions provide a platform for students to showcase their...</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8">
              <div className="w-full max-w-md mx-auto">
                <form onSubmit={handleLogin}>
                  {/* Logo */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
                    <p className="text-gray-600">Please enter your details to sign in</p>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex space-x-3 mb-6">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Chrome className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Apple className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                    </div>
                  </div>

                  {/* Login Form */}
                  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                    <div className="space-y-4">
                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                            Remember Me
                          </label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                          Forgot Password?
                        </a>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                          {error}
                        </div>
                      )}

                      {/* Sign In Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </button>

                      {/* Sign Up Link */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Don't have an account?{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                            Create Account
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Login Section */}
                  <div className="mt-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">Quick Login (Test Accounts)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {testAccounts.map((account) => (
                        <button
                          key={account.email}
                          type="button"
                          onClick={() => quickLogin(account)}
                          className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
                        >
                          {account.user_type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">Copyright © 2024 - EduManage</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

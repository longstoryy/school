'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Frown, 
  Star,
  Sparkles,
  RefreshCw,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function AdminNotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating elements
  useEffect(() => {
    const generateElements = () => {
      const newElements = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      }));
      setFloatingElements(newElements);
    };

    generateElements();
    const interval = setInterval(generateElements, 4000);
    return () => clearInterval(interval);
  }, []);

  const suggestions = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: Home },
    { label: "Student Management", href: "/admin/students", icon: Search },
    { label: "Teacher Management", href: "/admin/teachers", icon: Search },
    { label: "Class Management", href: "/admin/classes", icon: Search }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-bounce"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '4s'
            }}
          >
            <Star className="w-3 h-3 text-yellow-400/60" />
          </div>
        ))}

        {/* Interactive Mouse Trail */}
        <div
          className="absolute w-40 h-40 rounded-full opacity-10 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
          }}
        />

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-20 h-20 rotate-45 bg-gradient-to-r from-pink-400/10 to-red-400/10 animate-spin" style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          {/* Large 404 Text */}
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-pulse">
            404
          </div>
          
          {/* Sad Face Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-bounce">
              <Frown className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          {/* Orbiting Sparkles */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
            <Sparkles className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 text-yellow-400" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
            <MapPin className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-5 text-pink-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Looks like this page decided to take a vacation! 🏖️
          </p>
          <p className="text-gray-400">
            The page you're looking for might have been moved, deleted, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Suggestions */}
        <div className="max-w-lg w-full">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Maybe you were looking for:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                href={suggestion.href}
                className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-700/40 backdrop-blur-sm border border-gray-600/20 group"
              >
                <suggestion.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <span className="text-gray-300 group-hover:text-white">
                  {suggestion.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm mb-2">
            "Not all who wander are lost... but this page definitely is!" 🗺️
          </p>
          <p className="text-xs opacity-75">
            Error Code: 404 | Page Status: Missing in Action 🕵️
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}

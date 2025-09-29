'use client';

import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Sparkles, 
  Clock, 
  Heart, 
  Star,
  Zap,
  Coffee,
  Code,
  Palette,
  ArrowLeft,
  Home
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

interface ComingSoonProps {
  title?: string;
  description?: string;
  darkMode?: boolean;
  estimatedTime?: string;
  features?: string[];
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "We're working hard to bring you something amazing!",
  darkMode = false,
  estimatedTime = "Soon™",
  features = []
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Mock user data for admin components
  const user = {
    name: 'Admin User',
    email: 'admin@school.com',
    avatar: null
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleDarkModeToggle = () => {};
  const handleLogout = () => {};

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  const developmentSteps = [
    { icon: Coffee, label: "Brewing Ideas", status: "completed" },
    { icon: Palette, label: "Designing UI", status: "completed" },
    { icon: Code, label: "Writing Code", status: "in-progress" },
    { icon: Zap, label: "Adding Magic", status: "pending" },
    { icon: Rocket, label: "Launch Ready", status: "pending" }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Navigation */}
      <AdminNavbar
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
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

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-500 ${
          sidebarOpen || sidebarHovered ? 'ml-60' : 'ml-20'
        } pt-16`}
      >
        <div className={`min-h-screen relative overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: '3s'
            }}
          >
            <Star className={`w-2 h-2 ${
              darkMode ? 'text-yellow-400' : 'text-purple-400'
            }`} />
          </div>
        ))}

        {/* Interactive Mouse Trail */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-20 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            background: darkMode 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
          }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-16 h-16 rotate-45 bg-gradient-to-r from-pink-400/20 to-red-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-12 h-12 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">

        {/* Main Illustration */}
        <div className="mb-8 relative">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-500 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-2 border-blue-400/40' 
              : 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-2 border-blue-400/30'
          } backdrop-blur-sm animate-pulse`}>
            <Rocket className={`w-16 h-16 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            } animate-bounce`} />
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
            <Sparkles className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 ${
              darkMode ? 'text-yellow-400' : 'text-purple-500'
            }`} />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <Heart className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 ${
              darkMode ? 'text-pink-400' : 'text-pink-500'
            }`} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-8 max-w-2xl">
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          } animate-pulse`}>
            {title}
          </h1>
          <p className={`text-xl md:text-2xl mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
          
          {/* Estimated Time */}
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
            darkMode 
              ? 'bg-gray-800/50 text-blue-400 border border-blue-400/30' 
              : 'bg-white/50 text-blue-600 border border-blue-400/30'
          } backdrop-blur-sm`}>
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="font-medium">ETA: {estimatedTime}</span>
          </div>
        </div>

        {/* Development Progress */}
        <div className="mb-8 w-full max-w-md">
          <h3 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Development Progress
          </h3>
          <div className="space-y-3">
            {developmentSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  darkMode ? 'bg-gray-800/30' : 'bg-white/30'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-600/20' : 'border-gray-200/20'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  step.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400'
                    : step.status === 'in-progress'
                      ? 'bg-blue-500/20 text-blue-400 animate-pulse'
                      : 'bg-gray-500/20 text-gray-400'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`flex-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  step.status === 'completed' 
                    ? 'bg-green-400'
                    : step.status === 'in-progress'
                      ? 'bg-blue-400 animate-pulse'
                      : 'bg-gray-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        {features.length > 0 && (
          <div className="mb-8 max-w-lg">
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              What's Coming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-800/30' : 'bg-white/30'
                  } backdrop-blur-sm border ${
                    darkMode ? 'border-gray-600/20' : 'border-gray-200/20'
                  } transform hover:scale-105 transition-all duration-300`}
                >
                  <Zap className={`w-4 h-4 ${
                    darkMode ? 'text-yellow-400' : 'text-purple-500'
                  }`} />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fun Message */}
        <div className={`text-center max-w-md ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-sm mb-2">
            Our developers are working with ☕ and 💖 to make this awesome!
          </p>
          <p className="text-xs opacity-75">
            "Great things take time, but amazing things are worth the wait!" ✨
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

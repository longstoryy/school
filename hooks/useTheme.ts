'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run once on mount
    if (isInitialized) return;
    
    try {
      // Check localStorage for saved theme preference
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        const isDark = JSON.parse(savedTheme);
        setDarkMode(isDark);
        // Apply theme to document
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    } finally {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      try {
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        // Apply theme to document
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error saving theme:', error);
      }
      return newDarkMode;
    });
  }, []);

  return {
    darkMode,
    toggleDarkMode,
    isInitialized
  };
}

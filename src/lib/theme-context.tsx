'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Detect system preference
  useEffect(() => {
    setMounted(true);
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial system theme
    setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', handleChange);
      return () => darkModeQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Load saved theme from localStorage
  useEffect(() => {
    if (!mounted) return;

    try {
      const saved = localStorage.getItem('reflexiq-theme') as Theme | null;
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        setThemeState(saved);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  }, [mounted]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, systemTheme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('reflexiq-theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const isDarkMode = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  return (
    <ThemeContext.Provider value={{ theme, systemTheme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

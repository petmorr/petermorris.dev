
import { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return stored === 'dark' || (!stored && prefersDark);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return (
      <div className="fixed left-5 top-5 z-50 flex items-center gap-3 max-sm:hidden">
        {/* Current theme indicator */}
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-gray-900 dark:text-gray-100 shadow-lg">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>

        {/* Toggle button - shows CURRENT mode icon, not next mode */}
        <button
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onClick={toggle}
            className="rounded-full p-2 transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-lg"
        >
          {isDark ? (
              <Moon className="h-6 w-6 text-gray-100" />
          ) : (
              <Sun className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </div>
  );
};
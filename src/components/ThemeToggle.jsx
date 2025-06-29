import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored === 'dark' || (!stored && prefersDark);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="fixed right-5 top-5 z-50 rounded-full p-2 transition-colors duration-300 max-sm:hidden"
    >
      {isDark
        ? <Sun  className="h-6 w-6 text-yellow-300" />
        : <Moon className="h-6 w-6 text-blue-900"  />}
    </button>
  );
};

import React, { useEffect, useState } from 'react';

const storageKey = 'gmcf-theme';

type Theme = 'dark' | 'light';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem(storageKey) as Theme) || null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="ml-3 w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239]"
    >
      {isDark ? (
        // Sun icon
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9.66-3.54l1.41-1.41-1.79-1.8-1.41 1.42 1.79 1.79zM20 13h3v-2h-3v2zM11 1v3h2V1h-2zM4.22 18.36l1.41 1.41 1.8-1.79-1.42-1.41-1.79 1.79zM17.66 4.84l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>
      ) : (
        // Moon icon
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.99 9.99 0 00-8.94 5.56A9 9 0 1012 2z"/></svg>
      )}
    </button>
  );
};

export default ThemeToggle;



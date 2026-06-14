import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sleepscore.theme';

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(STORAGE_KEY) ?? 'dark';
}

export function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
  }
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme() {
  const current = getStoredTheme();
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  return next;
}

/** React hook — exposes the active theme and a toggle. */
export function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggle, isLight: theme === 'light', isDark: theme === 'dark' };
}

import { useCallback, useEffect, useRef, useState } from 'react';

/* ---------- Theme ---------- */
export type Theme = 'dark' | 'light';
const THEME_KEY = 'vp-theme';

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Writes the theme to the DOM. Safe to call repeatedly. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f7fb' : '#07070d');
}

const FADE_MS = 450;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? systemTheme());
  const animTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  /**
   * Switches theme with a quick cross-fade of every theme colour (they are registered `@property`
   * values, see index.css). The page stays live during the fade, so the cursor and scrolling never
   * freeze. With reduced motion the switch is instant.
   */
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    const root = document.documentElement;
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      // The class is on only while switching, so first paint never animates
      root.classList.add('theme-anim');
      window.clearTimeout(animTimer.current);
      animTimer.current = window.setTimeout(() => root.classList.remove('theme-anim'), FADE_MS + 150);
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}

/* ---------- Hash router (zero dependencies, works on any static host) ---------- */
function currentPath(): string {
  const h = window.location.hash.replace(/^#/, '');
  return h.startsWith('/') ? h : '/';
}

export function useRoute(): string {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

/** Go to a route ("/work/mercury") or to a section on the home page ("/#stack"). */
export function go(target: string) {
  if (target.startsWith('/#')) {
    const id = target.slice(2);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (currentPath() !== '/') {
      window.location.hash = '/';
      setTimeout(scroll, 60);
    } else {
      scroll();
    }
    return;
  }
  window.location.hash = target;
  window.scrollTo({ top: 0 });
}

/* ---------- Experience duration ---------- */
export function yearsSince(iso: string, now = new Date()): number {
  const start = new Date(iso);
  if (Number.isNaN(start.getTime())) return 1;
  const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  return Math.max(0, Math.floor(months / 12));
}

import { Moon, Search, Sun } from 'lucide-react';
import { go } from '../lib/app';
import type { Theme } from '../lib/app';
import { links, profile } from '../lib/content';
import { Kbd } from './ui';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

const sections = [
  { label: 'Work', target: '/#work' },
  { label: 'Stack', target: '/#stack' },
  { label: 'Journey', target: '/#journey' },
  { label: 'Contact', target: '/#contact' },
];

export function Nav({ theme, onToggleTheme, onOpenPalette }: Props) {
  return (
    <header className="sticky top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
      <nav className="glass mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full pl-3 pr-2 sm:pl-4" aria-label="Main">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            go('/');
          }}
          className="flex items-center gap-2 font-mono text-sm font-semibold"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/50 bg-accent/10 text-xs text-accent">vp</span>
          <span>{profile.name.toLowerCase().replace(' ', '.')}</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => go(s.target)}
                  className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  {s.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={links.resume}
                target="_blank"
                rel="noopener"
                className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-ink/10 hover:text-ink"
              >
                Resume
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={onOpenPalette}
            className="glass-soft hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink sm:flex"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <Kbd>Ctrl K</Kbd>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            className="glass-soft grid h-9 w-9 place-items-center rounded-full text-muted hover:text-ink sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="glass-soft grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-ink"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

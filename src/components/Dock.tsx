import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Briefcase, GitBranch, House, Layers, Mail } from 'lucide-react';
import { go, useRoute } from '../lib/app';

type Id = 'home' | 'work' | 'stack' | 'journey' | 'contact';

const items: { id: Id; label: string; target: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Home', target: '/', icon: <House className="h-5 w-5" /> },
  { id: 'work', label: 'Work', target: '/#work', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'stack', label: 'Stack', target: '/#stack', icon: <Layers className="h-5 w-5" /> },
  { id: 'journey', label: 'Journey', target: '/#journey', icon: <GitBranch className="h-5 w-5" /> },
  { id: 'contact', label: 'Contact', target: '/#contact', icon: <Mail className="h-5 w-5" /> },
];

const SECTIONS = ['work', 'stack', 'journey', 'contact'] as const;

/** Which home-page section is currently scrolled into view. */
function useScrollSection(enabled: boolean): Id {
  const [active, setActive] = useState<Id>('home');

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: Id = atBottom ? 'contact' : 'home';
      if (!atBottom) {
        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [enabled]);

  return active;
}

/** iOS-style floating tab bar for phones. */
export function Dock() {
  const route = useRoute();
  const onHome = route === '/';
  const scrolled = useScrollSection(onHome);
  const active: Id = onHome ? scrolled : route.startsWith('/work/') ? 'work' : 'home';

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <ul className="glass mx-auto flex max-w-sm items-stretch justify-between gap-0.5 rounded-full p-1.5">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="flex-1">
              <button
                type="button"
                onClick={() => go(i.target)}
                aria-current={on ? 'page' : undefined}
                className={`flex min-h-[48px] w-full flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-colors duration-300 ${
                  on ? 'bg-ink/10 text-accent' : 'text-muted'
                }`}
              >
                {i.icon}
                <span>{i.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

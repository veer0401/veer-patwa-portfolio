import { useCallback, useEffect, useState } from 'react';
import { useRoute, useTheme } from './lib/app';
import { links, profile } from './lib/content';
import { CommandPalette } from './components/CommandPalette';
import { Dock } from './components/Dock';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { CaseStudyPage, NotFound } from './pages/CaseStudyPage';
import { Home } from './pages/Home';

function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 pb-28 text-sm text-muted sm:flex-row sm:items-center sm:px-6 md:pb-8">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="flex gap-4">
          <a href={links.github} target="_blank" rel="noopener" className="hover:text-ink">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noopener" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${links.email}`} className="hover:text-ink">Email</a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const route = useRoute();
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, [contenteditable="true"]');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let page;
  const caseMatch = route.match(/^\/work\/([\w-]+)$/);
  if (route === '/') page = <Home />;
  else if (caseMatch) page = <CaseStudyPage slug={caseMatch[1]} />;
  else page = <NotFound />;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>
      <div className="page-top" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="glow absolute inset-0" />
      </div>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0c0a24]"
      >
        Skip to content
      </a>
      <Nav theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {page}
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} onToggleTheme={toggle} />
      <Dock />
      <Cursor />
    </div>
  );
}

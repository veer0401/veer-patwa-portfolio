import { useState } from 'react';
import { Terminal, Menu, X, FileText, Command } from 'lucide-react';
import profileData from '../../data/profile.json';
import linksData from '../../data/links.json';
import { useIDEStore } from '../../store/ideStore';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const toggleCommandPalette = useIDEStore((s) => s.toggleCommandPalette);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Focus', href: '#focus' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)] group-hover:border-emerald-400/60 transition-colors overflow-hidden">
            <img
              src="/logo.png"
              alt="Veer Patwa Logo"
              className="w-full h-full object-contain p-0.5"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                }
              }}
            />
            <span style={{ display: 'none' }}>VP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-zinc-100 font-mono group-hover:text-emerald-300 transition-colors">
              {profileData.name.toUpperCase()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Java & Backend Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}

          {linksData.resume && (
            <a
              href={linksData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded border border-zinc-700/60 hover:border-zinc-500 bg-zinc-800/40 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Resume
            </a>
          )}

          {/* Quick command palette trigger */}
          <button
            onClick={toggleCommandPalette}
            title="Command Palette (Ctrl+K / Cmd+K)"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-zinc-800 transition-all flex items-center gap-1 text-[11px] font-mono"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-zinc-500">⌘K</span>
          </button>

          {/* Explore DEV.OS CTA */}
          <button
            onClick={() => setViewMode('devos')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Explore DEV.OS</span>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setViewMode('devos')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 text-xs font-mono"
          >
            <Terminal className="w-3 h-3" />
            DEV.OS
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/60"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0d1117] px-4 pt-3 pb-5 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-mono text-zinc-300 hover:text-emerald-400 py-2 border-b border-zinc-900/80"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2.5">
            {linksData.resume && (
              <a
                href={linksData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-zinc-200 bg-zinc-850 border border-zinc-700 rounded"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                View Resume
              </a>
            )}

            <button
              onClick={() => {
                setMobileOpen(false);
                setViewMode('devos');
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 rounded shadow-[0_0_12px_rgba(16,185,129,0.2)]"
            >
              <Terminal className="w-4 h-4" />
              Launch DEV.OS Interactive IDE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

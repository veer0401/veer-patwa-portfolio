import { useState } from 'react';
import { Terminal, Menu, X, FileText, Command, Sun, Moon } from 'lucide-react';
import profileData from '../../data/profile.json';
import linksData from '../../data/links.json';
import { useIDEStore } from '../../store/ideStore';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const toggleCommandPalette = useIDEStore((s) => s.toggleCommandPalette);
  const theme = useIDEStore((s) => s.theme);
  const toggleTheme = useIDEStore((s) => s.toggleTheme);

  const isLight = theme === 'light';

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
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-200 ${
      isLight
        ? 'border-slate-200 bg-white/95 text-slate-800 shadow-sm'
        : 'border-[#21262d] bg-[#0d1117]/95 text-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-sm font-bold transition-colors overflow-hidden ${
            isLight
              ? 'border-emerald-600/30 bg-emerald-50 text-emerald-700 shadow-sm group-hover:border-emerald-500'
              : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] group-hover:border-emerald-400/60'
          }`}>
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
            <span className={`text-sm font-semibold tracking-wide font-mono transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-zinc-100 group-hover:text-emerald-300'
            }`}>
              {profileData.name.toUpperCase()}
            </span>
            <span className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Java & Backend Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs font-mono uppercase tracking-wider transition-colors py-1 ${
                isLight ? 'text-slate-600 hover:text-emerald-600' : 'text-zinc-400 hover:text-emerald-400'
              }`}
            >
              {item.label}
            </a>
          ))}

          {linksData.resume && (
            <a
              href={linksData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 py-1 px-2.5 rounded border transition-all ${
                isLight
                  ? 'text-slate-700 hover:text-slate-900 border-slate-300 hover:border-slate-400 bg-slate-100/80 shadow-xs'
                  : 'text-zinc-300 hover:text-white border-zinc-700/60 hover:border-zinc-500 bg-zinc-800/40'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              Resume
            </a>
          )}

          {/* Quick command palette trigger */}
          <button
            onClick={toggleCommandPalette}
            title="Command Palette (Ctrl+K / Cmd+K)"
            className={`p-1.5 rounded transition-all flex items-center gap-1 text-[11px] font-mono border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-300'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border-zinc-800'
            }`}
          >
            <Command className="w-3.5 h-3.5" />
            <span className={`hidden lg:inline ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>⌘K</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            aria-label="Toggle Theme"
            className={`p-1.5 rounded-md border transition-all flex items-center justify-center cursor-pointer ${
              isLight
                ? 'border-amber-400/50 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:border-amber-500'
                : 'border-zinc-700 bg-zinc-800/60 text-amber-400 hover:bg-zinc-700/60 hover:text-amber-300'
            }`}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-slate-700" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Explore DEV.OS CTA */}
          <button
            onClick={() => setViewMode('devos')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded border text-xs font-mono font-medium transition-all cursor-pointer ${
              isLight
                ? 'border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 shadow-xs'
                : 'border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
            }`}
          >
            <Terminal className={`w-3.5 h-3.5 animate-pulse ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>Explore DEV.OS</span>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick theme toggle on mobile header */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            aria-label="Toggle Theme"
            className={`p-1.5 rounded border transition-all flex items-center justify-center ${
              isLight
                ? 'border-slate-300 bg-slate-100 text-slate-700'
                : 'border-zinc-800 bg-zinc-900/80 text-amber-400'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => setViewMode('devos')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono ${
              isLight
                ? 'border-emerald-600/40 bg-emerald-50 text-emerald-700'
                : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
            }`}
          >
            <Terminal className="w-3 h-3" />
            DEV.OS
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded border ${
              isLight
                ? 'text-slate-700 hover:text-slate-900 border-slate-300 bg-slate-100'
                : 'text-zinc-400 hover:text-white border-zinc-800 bg-zinc-900/60'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 pt-3 pb-5 space-y-3 ${
          isLight ? 'border-slate-200 bg-white' : 'border-zinc-800 bg-[#0d1117]'
        }`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-mono py-2 border-b transition-colors ${
                isLight
                  ? 'text-slate-700 hover:text-emerald-700 border-slate-100'
                  : 'text-zinc-300 hover:text-emerald-400 border-zinc-900/80'
              }`}
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2.5">
            {/* Theme switcher inside mobile drawer */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono rounded border transition-colors ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-zinc-850 border-zinc-700 text-zinc-300'
              }`}
            >
              <span className="flex items-center gap-2">
                {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
                Theme
              </span>
              <span className={`font-semibold uppercase tracking-wider text-[11px] ${
                isLight ? 'text-emerald-600' : 'text-emerald-400'
              }`}>
                {theme} Mode
              </span>
            </button>

            {linksData.resume && (
              <a
                href={linksData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-2 text-xs font-mono rounded border ${
                  isLight
                    ? 'text-slate-800 bg-slate-100 border-slate-300'
                    : 'text-zinc-200 bg-zinc-850 border-zinc-700'
                }`}
              >
                <FileText className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                View Resume
              </a>
            )}

            <button
              onClick={() => {
                setMobileOpen(false);
                setViewMode('devos');
              }}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-mono rounded border ${
                isLight
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-500'
                  : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              }`}
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


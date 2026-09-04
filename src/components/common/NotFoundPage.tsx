import React from 'react';
import { useIDEStore } from '../../store/ideStore';
import { ArrowLeft, Home, Terminal, AlertTriangle, Compass } from 'lucide-react';
import profileData from '../../data/profile.json';

export const NotFoundPage: React.FC = () => {
  const setViewMode = useIDEStore((s) => s.setViewMode);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/404';

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      handleGoHome();
    }
  };

  const handleGoHome = () => {
    setViewMode('hr-portfolio');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleGoDevOs = () => {
    setViewMode('devos');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/?view=devos');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080A0D] text-slate-200 flex flex-col justify-between p-4 sm:p-8 font-mono select-none">
      {/* Top Bar Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#1C2636]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain p-0.5"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-wide">
              {profileData.name.toUpperCase()}
            </span>
            <p className="text-[11px] text-zinc-500">
              Java & Backend Engineer
            </p>
          </div>
        </div>

        <button
          onClick={handleGoHome}
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-2xl mx-auto w-full py-12 text-center space-y-6">
        {/* Error Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/30 text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>HTTP 404 • RESOURCE_NOT_FOUND</span>
        </div>

        {/* Big 404 Typography */}
        <div className="relative">
          <div className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-800 select-none">
            404
          </div>
          <div className="text-sm sm:text-base font-semibold text-emerald-400 tracking-wider uppercase mt-1">
            Endpoint Mapping Not Found
          </div>
        </div>

        {/* Java Exception Simulation Card */}
        <div className="text-left bg-[#0B0F14] border border-[#1C2636] rounded-lg p-4 text-xs font-mono overflow-x-auto shadow-xl">
          <div className="text-zinc-500 pb-2 border-b border-zinc-800/80 flex items-center justify-between text-[11px]">
            <span>org.springframework.web.servlet.DispatcherServlet</span>
            <span className="text-amber-400">NO_HANDLER_FOUND</span>
          </div>
          <div className="pt-3 space-y-1 text-slate-300">
            <div className="text-rose-400">
              com.veerpatwa.exception.ResourceNotFoundException:
            </div>
            <div className="text-zinc-400 pl-4">
              Failed to resolve requested URI: <span className="text-amber-300">"{currentPath}"</span>
            </div>
            <div className="text-zinc-500 pl-4 text-[11px]">
              at org.springframework.web.servlet.DispatcherServlet.noHandlerFound(DispatcherServlet.java:1284)
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-lg mx-auto">
          The requested page or route does not exist in the routing table. You can return to the previous page, explore the recruiter portfolio, or launch the interactive DEV.OS environment.
        </p>

        {/* 3 Core Action Navigation Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Button 1: Previous Page */}
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <span>Go to Previous Page</span>
          </button>

          {/* Button 2: Home HR View */}
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <Home className="w-4 h-4" />
            <span>Go to HR View (Home)</span>
          </button>

          {/* Button 3: DEV.OS Mode */}
          <button
            onClick={handleGoDevOs}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Explore DEV.OS Mode</span>
          </button>
        </div>

        {/* Quick section jumps */}
        <div className="pt-6 border-t border-[#1C2636] flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 font-sans">
          <span className="flex items-center gap-1 text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-emerald-400" /> Jump directly to:
          </span>
          <a href="/#experience" onClick={handleGoHome} className="hover:text-emerald-400 transition-colors">Experience</a>
          <span>•</span>
          <a href="/#projects" onClick={handleGoHome} className="hover:text-emerald-400 transition-colors">Projects</a>
          <span>•</span>
          <a href="/#skills" onClick={handleGoHome} className="hover:text-emerald-400 transition-colors">Skills</a>
          <span>•</span>
          <a href="/#contact" onClick={handleGoHome} className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full pt-6 border-t border-[#1C2636] text-center text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} {profileData.name} • All systems operational</span>
      </footer>
    </div>
  );
};

import { Terminal } from 'lucide-react';
import profileData from '../../data/profile.json';
import { useIDEStore } from '../../store/ideStore';

export function Footer() {
  const setViewMode = useIDEStore((s) => s.setViewMode);

  return (
    <footer className="border-t border-[#21262d] bg-[#070a0e] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900/60 flex items-center justify-center overflow-hidden shrink-0">
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
            <span className="text-sm font-bold text-white font-mono">
              {profileData.name}
            </span>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {profileData.title} • {profileData.specialization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span>Data-driven via JSON Architecture</span>
          <span>•</span>
          <button
            onClick={() => setViewMode('devos')}
            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>DEV.OS Mode</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

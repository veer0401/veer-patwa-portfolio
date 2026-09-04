import { Terminal } from 'lucide-react';
import profileData from '../../data/profile.json';
import linksData from '../../data/links.json';
import { useIDEStore } from '../../store/ideStore';
import { GithubIcon, LinkedinIcon, WhatsAppIcon, InstagramIcon } from '../common/SocialIcons';

export function Footer() {
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  return (
    <footer className={`border-t py-12 transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-white text-slate-800' : 'border-[#21262d] bg-[#070a0e] text-zinc-400'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded border flex items-center justify-center overflow-hidden shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-100' : 'border-zinc-800 bg-zinc-900/60'
          }`}>
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
            <span className={`text-sm font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {profileData.name}
            </span>
            <p className={`text-xs font-mono mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              {profileData.title} • {profileData.specialization}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-4 text-xs font-mono ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
          <div className="flex items-center gap-3">
            {linksData.github && (
              <a
                href={linksData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-zinc-400 hover:text-white'}`}
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {linksData.linkedin && (
              <a
                href={linksData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isLight ? 'text-slate-500 hover:text-blue-700' : 'text-zinc-400 hover:text-[#4DA3FF]'}`}
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {linksData.whatsapp && (
              <a
                href={linksData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isLight ? 'text-slate-500 hover:text-emerald-700' : 'text-zinc-400 hover:text-emerald-400'}`}
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}
            {linksData.instagram && (
              <a
                href={linksData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isLight ? 'text-slate-500 hover:text-fuchsia-700' : 'text-zinc-400 hover:text-fuchsia-400'}`}
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
          </div>
          <span>•</span>
          <button
            onClick={() => setViewMode('devos')}
            className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
              isLight ? 'text-emerald-700 hover:text-emerald-800' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>DEV.OS Mode</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

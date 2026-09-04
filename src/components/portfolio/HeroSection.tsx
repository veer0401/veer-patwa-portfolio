import { Terminal, Download, ArrowDown, ShieldCheck, Sparkles } from 'lucide-react';
import profileData from '../../data/profile.json';
import linksData from '../../data/links.json';
import { calculateExperience } from '../../utils/experience';
import { useIDEStore } from '../../store/ideStore';
import { HeroInteractiveConsole } from './HeroInteractiveConsole';

export function HeroSection() {
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';
  const expDuration = calculateExperience(profileData.careerStartDate);

  const heroTags = isLight
    ? [
        { label: `Java ${profileData.javaVersion}`, color: 'border-amber-400/60 text-amber-800 bg-amber-50' },
        { label: 'Spring Boot', color: 'border-emerald-400/60 text-emerald-800 bg-emerald-50' },
        { label: 'Microservices', color: 'border-blue-400/60 text-blue-800 bg-blue-50' },
        { label: 'DSA & System Design', color: 'border-purple-400/60 text-purple-800 bg-purple-50' },
      ]
    : [
        { label: `Java ${profileData.javaVersion}`, color: 'border-amber-500/30 text-amber-300 bg-amber-950/20' },
        { label: 'Spring Boot', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/20' },
        { label: 'Microservices', color: 'border-blue-500/30 text-blue-300 bg-blue-950/20' },
        { label: 'DSA & System Design', color: 'border-purple-500/30 text-purple-300 bg-purple-950/20' },
      ];

  return (
    <section id="about" className={`relative pt-12 pb-20 md:pt-20 md:pb-24 overflow-hidden border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-white' : 'border-[#21262d] bg-transparent'
    }`}>
      {/* Subtle grid background */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isLight ? 'opacity-[0.05]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: isLight
            ? `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`
            : `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Personal Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7">
            {/* Status Pill & Dynamic Experience Pill */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-medium transition-colors ${
                isLight
                  ? 'border-emerald-600/30 bg-emerald-50 text-emerald-700'
                  : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
              }`}>
                <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
                <span>{profileData.status}</span>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
                isLight
                  ? 'border-slate-300 bg-slate-100 text-slate-700'
                  : 'border-zinc-700 bg-zinc-900/80 text-zinc-300'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <span>{expDuration.formatted}</span>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
                isLight
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
              }`}>
                <Sparkles className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                <span>JVM 21 Ecosystem</span>
              </div>
            </div>

            {/* Primary Heading */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-mono transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {profileData.name}
              </h1>
              <p className={`text-xl sm:text-2xl font-semibold font-mono tracking-wide ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                {profileData.title}
              </p>
              <p className={`text-base sm:text-lg font-mono ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}>
                {profileData.specialization}
              </p>
            </div>

            {/* Value Proposition */}
            <p className={`mt-5 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-xl ${
              isLight ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              Building backend systems and solving complex engineering problems through practical software development.
              Focused on high-volume data retrieval, decoupled microservice architectures, and robust APIs.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm font-mono transition-all cursor-pointer ${
                  isLight
                    ? 'border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    : 'border border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
                <span>View My Work</span>
              </a>

              {linksData.resume && (
                <a
                  href={linksData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-medium text-sm font-mono transition-all ${
                    isLight
                      ? 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
                      : 'border-zinc-700 hover:border-zinc-500 bg-zinc-850 hover:bg-zinc-800 text-zinc-100'
                  }`}
                >
                  <Download className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  <span>Download Resume</span>
                </a>
              )}

              <button
                onClick={() => setViewMode('devos')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm font-medium transition-all cursor-pointer ${
                  isLight
                    ? 'border-emerald-600/40 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 shadow-xs'
                    : 'border-emerald-500/40 bg-zinc-900/90 hover:bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Explore DEV.OS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Developer Console (5 cols) */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <HeroInteractiveConsole />
          </div>
        </div>

        {/* Key Core Tags */}
        <div className={`mt-10 pt-8 border-t flex flex-wrap items-center gap-2.5 sm:gap-3 ${
          isLight ? 'border-slate-200' : 'border-zinc-800/80'
        }`}>
          <span className={`text-xs font-mono uppercase tracking-wider mr-2 ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}>
            Core Competencies:
          </span>
          {heroTags.map((tag) => (
            <span
              key={tag.label}
              className={`px-3 py-1 rounded text-xs font-mono border ${tag.color} transition-colors`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

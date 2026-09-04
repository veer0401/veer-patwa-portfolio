import { Terminal, Download, ArrowDown, ShieldCheck, Sparkles } from 'lucide-react';
import profileData from '../../data/profile.json';
import linksData from '../../data/links.json';
import { calculateExperience } from '../../utils/experience';
import { useIDEStore } from '../../store/ideStore';

export function HeroSection() {
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const expDuration = calculateExperience(profileData.careerStartDate);

  const heroTags = [
    { label: `Java ${profileData.javaVersion}`, color: 'border-amber-500/30 text-amber-300 bg-amber-950/20' },
    { label: 'Spring Boot', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/20' },
    { label: 'Microservices', color: 'border-blue-500/30 text-blue-300 bg-blue-950/20' },
    { label: 'DSA & System Design', color: 'border-purple-500/30 text-purple-300 bg-purple-950/20' },
  ];

  return (
    <section id="about" className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#21262d]">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Status Pill & Dynamic Experience Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{profileData.status}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{expDuration.formatted}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-400 text-xs font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>JVM 21 Ecosystem</span>
          </div>
        </div>

        {/* Primary Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-mono">
            {profileData.name}
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-emerald-400 font-mono tracking-wide">
            {profileData.title}
          </p>
          <p className="text-base sm:text-lg font-mono text-zinc-400">
            {profileData.specialization}
          </p>
        </div>

        {/* Value Proposition */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
          Building backend systems and solving complex engineering problems through practical software development.
          Focused on high-volume data retrieval, decoupled microservice architectures, and robust APIs.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-sm font-mono shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
            <span>View My Work</span>
          </a>

          {linksData.resume && (
            <a
              href={linksData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 hover:border-zinc-500 bg-zinc-850 hover:bg-zinc-800 text-zinc-100 font-medium text-sm font-mono transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Resume</span>
            </a>
          )}

          <button
            onClick={() => setViewMode('devos')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-emerald-500/40 bg-zinc-900/90 hover:bg-emerald-950/40 text-emerald-400 font-mono text-sm font-medium shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Explore DEV.OS (Interactive IDE)</span>
          </button>
        </div>

        {/* Key Core Tags */}
        <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mr-2">
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

import React from 'react';
import profileData from '../../../data/profile.json';
import projectsData from '../../../data/projects.json';
import skillsData from '../../../data/skills.json';
import linksData from '../../../data/links.json';
import { calculateExperience } from '../../../utils/experience';
import { useIDEStore } from '../../../store/ideStore';
import { Coffee, Layers, ArrowRight, Bot, Download, ArrowLeft } from 'lucide-react';

export const ReadmeView: React.FC = () => {
  const { openFile, toggleAgent, setViewMode } = useIDEStore();
  const exp = calculateExperience(profileData.careerStartDate);
  const featured = projectsData.projects.find((p) => p.featured) || projectsData.projects[0];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-8 font-mono select-text">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Return to HR view banner */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs">
          <span className="text-zinc-300">
            Viewing <strong>DEV.OS IDE Mode</strong>. You can switch back to the HR overview at any time.
          </span>
          <button
            onClick={() => setViewMode('hr-portfolio')}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to HR Overview</span>
          </button>
        </div>

        {/* Header Title */}
        <div className="pb-6 border-b border-[#1C2636]">
          <div className="flex items-center gap-2 text-[#F89820] text-xs uppercase tracking-widest mb-1">
            <Coffee className="w-4 h-4" />
            <span>JAVA BACKEND SYSTEM REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-sm sm:text-base text-emerald-400 mt-1 font-semibold">
            {profileData.title} • {profileData.specialization}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#F89820]/10 text-[#F89820] border border-[#F89820]/30">
              Java {profileData.javaVersion} LTS
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#6DB33F]/10 text-[#6DB33F] border border-[#6DB33F]/30">
              Spring Boot
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#4DA3FF]/10 text-[#4DA3FF] border border-[#4DA3FF]/30">
              Microservices
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
              DSA & System Design
            </span>
          </div>
        </div>

        {/* Summary paragraph */}
        <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] leading-relaxed text-sm text-slate-300">
          <p>{profileData.summary}</p>
        </div>

        {/* Current Role & Stack Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              CAREER EXPERIENCE & STATUS
            </div>
            <div className="text-slate-200 font-semibold text-sm">
              {profileData.title}
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              {exp.formatted} ({exp.detailed})
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#4ADE80]">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              {profileData.status}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              PRIMARY SKILLS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.primary.map((st) => (
                <span
                  key={st}
                  className="px-2 py-1 rounded text-xs bg-[#10151C] text-slate-200 border border-[#1C2636]"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Project Banner */}
        {featured && (
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-emerald-500/30">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              FEATURED REPOSITORY
            </div>
            <h3 className="text-base font-bold text-white font-mono">{featured.name}</h3>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{featured.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featured.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() =>
              openFile(
                '/src/projects/InventoryMedicalPOS.java',
                'InventoryMedicalPOS.java',
                'coffee',
                'java'
              )
            }
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>[ VIEW INVENTORY POS ]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleAgent}
            className="px-4 py-2 rounded bg-[#10151C] hover:bg-[#141B24] border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>[ ASK DEV AGENT ]</span>
          </button>

          <button
            onClick={() =>
              openFile(
                '/architecture/microservices.arch',
                'microservices.arch',
                'network',
                'architecture'
              )
            }
            className="px-4 py-2 rounded bg-[#10151C] hover:bg-[#141B24] border border-[#1C2636] hover:border-slate-500 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#4DA3FF]" />
            <span>[ ARCHITECTURE ]</span>
          </button>

          {linksData.resume && (
            <a
              href={linksData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#10151C] hover:bg-[#141B24] border border-[#1C2636] hover:border-slate-500 text-slate-300 text-xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>[ DOWNLOAD RESUME ]</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

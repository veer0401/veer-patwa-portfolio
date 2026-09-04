import React from 'react';
import experienceData from '../../../data/experience.json';
import { GitCommit, GitBranch, Calendar, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExperienceView: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <GitCommit className="w-4 h-4" />
            <span className="font-semibold">Experience.java</span>
            <span className="text-slate-400">• src/experience/Experience.java</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-mono">
            VERIFIED CAREER TIMELINE
          </span>
        </div>

        {/* Timeline representation */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1C2636] space-y-8 my-4">
          {experienceData.experiences.map((exp, idx) => {
            const isCognizant = exp.company.toLowerCase().includes('cognizant');

            return (
              <div key={idx} className="relative group">
                {/* Commit node icon */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-[#080A0D] border-2 ${
                  isCognizant ? 'border-emerald-400' : 'border-zinc-500'
                } flex items-center justify-center`}>
                  <span className={`w-2 h-2 rounded-full ${isCognizant ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                </div>

                {/* Commit Card */}
                <div className={`p-4 sm:p-5 rounded-lg bg-[#0B0F14] border ${
                  isCognizant ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.06)]' : 'border-[#1C2636]'
                } transition-all space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#1C2636] pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mb-1">
                        <GitBranch className="w-3 h-3" /> git log: {exp.company.toLowerCase()}-branch
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-slate-100">
                        {exp.role}
                      </h2>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <Building className="w-3 h-3 text-emerald-400" />
                        <span>{exp.company}</span>
                        {exp.current && (
                          <span className="px-2 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-semibold px-2.5 py-1 rounded bg-[#10151C] text-emerald-400 border border-[#1C2636] w-fit sm:w-auto mt-2 sm:mt-0 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.startDate} — {exp.endDate || 'Present'}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {exp.description}
                  </p>

                  {/* Cognizant Special Architecture Box */}
                  {isCognizant && (
                    <div className="p-3.5 rounded bg-[#080d14] border border-emerald-500/20 text-xs">
                      <div className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <span>Architecture Modernization:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono mb-2">
                        <span className="px-2 py-0.5 rounded bg-red-950/30 border border-red-500/30 text-red-300">
                          RMI Legacy
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                        <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
                          Microservices & REST APIs
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px] font-sans">
                        Working with ~250K records and ~250–260 MB payload data retrieval under 1 minute without expected timeouts.
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Engineering Deliverables:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="pt-2 border-t border-[#1C2636] flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 uppercase mr-1">Stack:</span>
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#080A0D] text-emerald-300 border border-emerald-500/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import skillsData from '../../../data/skills.json';
import profileData from '../../../data/profile.json';
import { Coffee, Layers, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const JavaStackView: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>(skillsData.primary[0]);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-[#F89820]">
            <Coffee className="w-4 h-4" />
            <span className="font-semibold">JavaStack.java</span>
            <span className="text-slate-400">• src/skills/JavaStack.java</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
            JAVA {profileData.javaVersion} RUNTIME STACK
          </span>
        </div>

        {/* Primary Stack Grid */}
        <div className="p-5 rounded-lg bg-[#0B0F14] border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Primary Engineering Competencies (Click to Inspect)
            </h2>
            <span className="text-[10px] text-zinc-400">Core Stack</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skillsData.primary.map((skill) => {
              const isSelected = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border-zinc-800 bg-[#080d14] hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white font-mono">{skill}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Core Competency</div>
                </button>
              );
            })}
          </div>

          {/* Selected Skill Detail */}
          <div className="mt-4 p-4 rounded bg-[#080A0D] border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
            <div>
              <span className="text-white font-bold">{selectedSkill}</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Evaluated for enterprise-grade performance, low latency, and maintainable software design.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px]">
              Active Skill
            </span>
          </div>
        </div>

        {/* Categorized Skills Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Java Ecosystem */}
          <div className="p-5 rounded-lg bg-[#0B0F14] border border-amber-500/30 space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              Java 21 Core Disciplines
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {skillsData.categories.java.map((item) => (
                <div key={item} className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-[#080A0D] border border-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spring Ecosystem */}
          <div className="p-5 rounded-lg bg-[#0B0F14] border border-emerald-500/30 space-y-3">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Spring Framework & Persistence
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {skillsData.categories.spring.map((item) => (
                <div key={item} className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-[#080A0D] border border-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Architecture */}
          <div className="p-5 rounded-lg bg-[#0B0F14] border border-blue-500/30 space-y-3">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Backend Architecture & Design
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {skillsData.categories.backend.map((item) => (
                <div key={item} className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-[#080A0D] border border-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database, DevOps & Subdued Stack */}
          <div className="p-5 rounded-lg bg-[#0B0F14] border border-zinc-800 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Database & DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...skillsData.categories.database, ...skillsData.categories.devops].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded text-xs bg-[#080A0D] border border-zinc-700 text-zinc-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Secondary Supporting Tech (Subdued)
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...skillsData.categories.frontend, ...skillsData.categories.other].map((item) => (
                  <span key={item} className="px-2 py-0.5 rounded text-[11px] bg-[#080A0D] border border-zinc-850 text-zinc-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

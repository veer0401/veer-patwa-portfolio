import { Code2, Terminal, Shield, Sparkles } from 'lucide-react';
import skillsData from '../../data/skills.json';

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 border-b border-[#21262d] bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-2">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            Skills & Stack
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
            Prioritized by depth of backend knowledge, with Java 21, Spring Boot, and low-level system engineering at the core.
          </p>
        </div>

        {/* 1. PRIMARY SKILLS - Strongest Visual Emphasis */}
        <div className="mb-12 p-6 sm:p-7 rounded-xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-zinc-900/50 shadow-[0_0_30px_rgba(16,185,129,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
              Primary Engineering Competencies (Core Strength)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {skillsData.primary.map((skill) => (
              <div
                key={skill}
                className="px-4 py-3 rounded-lg border border-emerald-500/30 bg-[#0c1514] hover:border-emerald-400 hover:bg-emerald-950/40 transition-all flex items-center gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-sm sm:text-base font-bold text-white font-mono">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Categorized Skills with Strict Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JAVA ECOSYSTEM (High Prominence) */}
          <div className="p-5 rounded-lg border border-amber-500/30 bg-[#120f0a]/60">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Java Deep-Dive</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.java.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded text-xs font-mono border border-amber-500/30 bg-amber-950/20 text-amber-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SPRING ECOSYSTEM (High Prominence) */}
          <div className="p-5 rounded-lg border border-emerald-500/30 bg-[#0a1410]/60">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Spring Ecosystem</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.spring.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded text-xs font-mono border border-emerald-500/30 bg-emerald-950/20 text-emerald-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* BACKEND & ARCHITECTURE */}
          <div className="p-5 rounded-lg border border-blue-500/30 bg-[#0a111a]/60">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold mb-3">
              Backend & System Design
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.backend.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded text-xs font-mono border border-blue-500/30 bg-blue-950/20 text-blue-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* DATABASE & DEVOPS */}
          <div className="p-5 rounded-lg border border-zinc-800 bg-[#0e1217]">
            <div className="mb-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
                Database (Relational)
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.categories.database.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded text-xs font-mono border border-cyan-500/30 bg-cyan-950/20 text-cyan-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
                DevOps & Version Control
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.categories.devops.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded text-xs font-mono border border-zinc-700 bg-zinc-850 text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. SUBDUED SECONDARY SKILLS (Frontend & Other) */}
        <div className="mt-6 p-4 sm:p-5 rounded-lg border border-zinc-800/80 bg-zinc-950/40">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
            Secondary & Supporting Technologies (Subdued)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-2">Frontend:</span>
            {skillsData.categories.frontend.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-400"
              >
                {item}
              </span>
            ))}
            <span className="text-xs font-mono text-zinc-400 mx-2">•</span>
            <span className="text-xs font-mono text-zinc-400 mr-2">Other:</span>
            {skillsData.categories.other.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

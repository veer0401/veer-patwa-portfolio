import { Code2, Terminal, Shield, Sparkles } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useIDEStore } from '../../store/ideStore';

export function SkillsSection() {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  return (
    <section id="skills" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-white' : 'border-[#21262d] bg-[#0d1117]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-2 transition-colors ${
            isLight ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <Code2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Skills & Stack
          </h2>
          <p className={`mt-2 text-sm font-sans max-w-2xl ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Prioritized by depth of backend knowledge, with Java 21, Spring Boot, and low-level system engineering at the core.
          </p>
        </div>

        {/* 1. PRIMARY SKILLS - Strongest Visual Emphasis */}
        <div className={`mb-12 p-6 sm:p-7 rounded-xl border transition-all ${
          isLight
            ? 'border-emerald-600/30 bg-gradient-to-b from-emerald-50/50 to-white shadow-sm'
            : 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-zinc-900/50 shadow-[0_0_30px_rgba(16,185,129,0.06)]'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${
              isLight ? 'text-emerald-800' : 'text-emerald-300'
            }`}>
              Primary Engineering Competencies (Core Strength)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {skillsData.primary.map((skill) => (
              <div
                key={skill}
                className={`px-4 py-3 rounded-lg border transition-all flex items-center gap-2.5 ${
                  isLight
                    ? 'border-emerald-300 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 shadow-xs'
                    : 'border-emerald-500/30 bg-[#0c1514] hover:border-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
                <span className={`text-sm sm:text-base font-bold font-mono ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Categorized Skills with Strict Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JAVA ECOSYSTEM (High Prominence) */}
          <div className={`p-5 rounded-lg border transition-colors ${
            isLight ? 'border-amber-300 bg-amber-50/30' : 'border-amber-500/30 bg-[#120f0a]/60'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 flex items-center gap-2 ${
              isLight ? 'text-amber-800' : 'text-amber-300'
            }`}>
              <Shield className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
              <span>Java Deep-Dive</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.java.map((item) => (
                <span
                  key={item}
                  className={`px-2.5 py-1 rounded text-xs font-mono border ${
                    isLight
                      ? 'border-amber-300 bg-white text-amber-900'
                      : 'border-amber-500/30 bg-amber-950/20 text-amber-200'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SPRING ECOSYSTEM (High Prominence) */}
          <div className={`p-5 rounded-lg border transition-colors ${
            isLight ? 'border-emerald-300 bg-emerald-50/30' : 'border-emerald-500/30 bg-[#0a1410]/60'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 flex items-center gap-2 ${
              isLight ? 'text-emerald-800' : 'text-emerald-300'
            }`}>
              <Terminal className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>Spring Ecosystem</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.spring.map((item) => (
                <span
                  key={item}
                  className={`px-2.5 py-1 rounded text-xs font-mono border ${
                    isLight
                      ? 'border-emerald-300 bg-white text-emerald-900'
                      : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* BACKEND & ARCHITECTURE */}
          <div className={`p-5 rounded-lg border transition-colors ${
            isLight ? 'border-blue-300 bg-blue-50/30' : 'border-blue-500/30 bg-[#0a111a]/60'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isLight ? 'text-blue-800' : 'text-blue-300'
            }`}>
              Backend & System Design
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.categories.backend.map((item) => (
                <span
                  key={item}
                  className={`px-2.5 py-1 rounded text-xs font-mono border ${
                    isLight
                      ? 'border-blue-300 bg-white text-blue-900'
                      : 'border-blue-500/30 bg-blue-950/20 text-blue-200'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* DATABASE & DEVOPS */}
          <div className={`p-5 rounded-lg border transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50/70' : 'border-zinc-800 bg-[#0e1217]'
          }`}>
            <div className="mb-4">
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}>
                Database (Relational)
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.categories.database.map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      isLight
                        ? 'border-cyan-300 bg-white text-cyan-900'
                        : 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}>
                DevOps & Version Control
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.categories.devops.map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800'
                        : 'border-zinc-700 bg-zinc-850 text-zinc-300'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. SUBDUED SECONDARY SKILLS (Frontend & Other) */}
        <div className={`mt-6 p-4 sm:p-5 rounded-lg border transition-colors ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-zinc-800/80 bg-zinc-950/40'
        }`}>
          <span className={`text-[11px] font-mono uppercase tracking-wider block mb-2 ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}>
            Secondary & Supporting Technologies (Subdued)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-mono mr-2 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Frontend:</span>
            {skillsData.categories.frontend.map((item) => (
              <span
                key={item}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                  isLight
                    ? 'border-slate-200 bg-white text-slate-600'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                }`}
              >
                {item}
              </span>
            ))}
            <span className={`text-xs font-mono mx-2 ${isLight ? 'text-slate-400' : 'text-zinc-400'}`}>•</span>
            <span className={`text-xs font-mono mr-2 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Other:</span>
            {skillsData.categories.other.map((item) => (
              <span
                key={item}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                  isLight
                    ? 'border-slate-200 bg-white text-slate-600'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                }`}
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

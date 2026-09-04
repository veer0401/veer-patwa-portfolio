import { Building2, Calendar, MapPin, ArrowRight, Database, Server, CheckCircle2 } from 'lucide-react';
import experienceData from '../../data/experience.json';
import { useIDEStore } from '../../store/ideStore';

export function ExperienceSection() {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  return (
    <section id="experience" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-slate-50/60' : 'border-[#21262d] bg-[#090d13]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-2 transition-colors ${
            isLight ? 'border-slate-300 bg-white text-slate-700 shadow-xs' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <span>CAREER LOG</span>
          </div>
          <h2 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Professional Experience
          </h2>
          <p className={`mt-2 text-sm font-sans max-w-2xl ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Real-world software development experience focused on legacy system modernization, high-volume data retrieval pipelines, and microservice architectures.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-10">
          {experienceData.experiences.map((exp, idx) => {
            const isCognizant = exp.company.toLowerCase().includes('cognizant');

            return (
              <div
                key={exp.company + idx}
                className={`rounded-lg border transition-all ${
                  isCognizant
                    ? isLight
                      ? 'border-emerald-600/40 bg-white shadow-sm'
                      : 'border-emerald-500/40 bg-zinc-900/60 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                    : isLight
                    ? 'border-slate-200 bg-white shadow-xs'
                    : 'border-zinc-800 bg-zinc-900/30'
                } p-6 sm:p-8`}
              >
                {/* Header row */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
                  isLight ? 'border-slate-200' : 'border-zinc-800/80'
                }`}>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Building2 className={`w-5 h-5 ${
                        isCognizant
                          ? (isLight ? 'text-emerald-700' : 'text-emerald-400')
                          : (isLight ? 'text-slate-500' : 'text-zinc-400')
                      }`} />
                      <h3 className={`text-xl font-bold font-mono ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono border font-semibold ${
                          isLight
                            ? 'border-emerald-600/40 bg-emerald-50 text-emerald-800'
                            : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                        }`}>
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-mono mt-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                      {exp.role}
                    </p>
                  </div>

                  <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${
                    isLight ? 'text-slate-600' : 'text-zinc-400'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Calendar className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                      {exp.startDate} — {exp.endDate ? exp.endDate : 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className={`mt-4 text-sm sm:text-base leading-relaxed font-sans ${
                  isLight ? 'text-slate-700' : 'text-zinc-300'
                }`}>
                  {exp.description}
                </p>

                {/* Cognizant Special Visual Modernization Flow */}
                {isCognizant && (
                  <div className={`mt-6 p-4 sm:p-5 rounded-md border transition-colors ${
                    isLight
                      ? 'border-emerald-200 bg-slate-50/80'
                      : 'border-emerald-500/20 bg-[#080d14]'
                  }`}>
                    <div className={`text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2 ${
                      isLight ? 'text-emerald-800 font-semibold' : 'text-emerald-400'
                    }`}>
                      <Server className="w-4 h-4" />
                      <span>Architecture Modernization Transition</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center py-2">
                      {/* Legacy Architecture Box */}
                      <div className={`p-3.5 rounded border ${
                        isLight
                          ? 'border-rose-300 bg-rose-50 text-slate-800'
                          : 'border-red-500/30 bg-red-950/20 text-zinc-200'
                      }`}>
                        <span className={`text-[11px] font-mono font-bold block ${
                          isLight ? 'text-rose-700' : 'text-red-400'
                        }`}>
                          LEGACY ARCHITECTURE
                        </span>
                        <span className={`text-sm font-mono block mt-1 font-semibold ${
                          isLight ? 'text-slate-900' : 'text-zinc-200'
                        }`}>
                          Java RMI Monolith
                        </span>
                        <span className={`text-xs mt-1 block ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}>
                          JVM-to-JVM tightly coupled remote calls
                        </span>
                      </div>

                      {/* Transition Flow Arrow */}
                      <div className="flex flex-col items-center justify-center py-1">
                        <div className={`flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border ${
                          isLight
                            ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                            : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30'
                        }`}>
                          <span>MODERNIZATION</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-[10px] font-mono mt-1 text-center ${
                          isLight ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Decoupled Service Migration
                        </span>
                      </div>

                      {/* Microservices Box */}
                      <div className={`p-3.5 rounded border ${
                        isLight
                          ? 'border-emerald-300 bg-emerald-50 text-slate-800'
                          : 'border-emerald-500/30 bg-emerald-950/20 text-zinc-200'
                      }`}>
                        <span className={`text-[11px] font-mono font-bold block ${
                          isLight ? 'text-emerald-800' : 'text-emerald-400'
                        }`}>
                          TARGET ARCHITECTURE
                        </span>
                        <span className={`text-sm font-mono block mt-1 font-semibold ${
                          isLight ? 'text-slate-900' : 'text-zinc-200'
                        }`}>
                          Microservices & REST APIs
                        </span>
                        <span className={`text-xs mt-1 block ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}>
                          Scalable, modular service boundaries
                        </span>
                      </div>
                    </div>

                    {/* Scale & Data Retrieval Callout */}
                    <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                      isLight ? 'border-slate-200' : 'border-zinc-800'
                    }`}>
                      <div className={`flex items-center gap-2 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                        <Database className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                        <span>High-volume data processing declared target:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded border ${
                          isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-zinc-850 border-zinc-700 text-zinc-200'
                        }`}>
                          ~250K records
                        </span>
                        <span className={`px-2.5 py-1 rounded border ${
                          isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-zinc-850 border-zinc-700 text-zinc-200'
                        }`}>
                          250–260 MB data payload
                        </span>
                        <span className={`px-2.5 py-1 rounded border font-semibold ${
                          isLight
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                            : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        }`}>
                          &lt; 1 minute retrieval
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mt-5">
                    <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}>
                      Key Responsibilities & Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm font-sans ${
                          isLight ? 'text-slate-700' : 'text-zinc-300'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isLight ? 'text-emerald-600' : 'text-emerald-400'
                          }`} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-2 ${
                    isLight ? 'border-slate-200' : 'border-zinc-800/80'
                  }`}>
                    <span className={`text-xs font-mono mr-2 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Technologies:</span>
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-1 rounded text-xs font-mono border ${
                          isLight
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-emerald-500/20 bg-emerald-950/20 text-emerald-300'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Building2, Calendar, MapPin, ArrowRight, Database, Server, CheckCircle2 } from 'lucide-react';
import experienceData from '../../data/experience.json';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 border-b border-[#21262d] bg-[#090d13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-2">
            <span>CAREER LOG</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            Professional Experience
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
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
                    ? 'border-emerald-500/40 bg-zinc-900/60 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                    : 'border-zinc-800 bg-zinc-900/30'
                } p-6 sm:p-8`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Building2 className={`w-5 h-5 ${isCognizant ? 'text-emerald-400' : 'text-zinc-400'}`} />
                      <h3 className="text-xl font-bold text-white font-mono">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-semibold">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-zinc-300 mt-1">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {exp.startDate} — {exp.endDate ? exp.endDate : 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Cognizant Special Visual Modernization Flow */}
                {isCognizant && (
                  <div className="mt-6 p-4 sm:p-5 rounded-md border border-emerald-500/20 bg-[#080d14]">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      <span>Architecture Modernization Architecture Transition</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center py-2">
                      {/* Legacy Architecture Box */}
                      <div className="p-3.5 rounded border border-red-500/30 bg-red-950/20">
                        <span className="text-[11px] font-mono text-red-400 font-bold block">
                          LEGACY ARCHITECTURE
                        </span>
                        <span className="text-sm font-mono text-zinc-200 block mt-1">
                          Java RMI Monolith
                        </span>
                        <span className="text-xs text-zinc-400 mt-1 block">
                          JVM-to-JVM tightly coupled remote calls
                        </span>
                      </div>

                      {/* Transition Flow Arrow */}
                      <div className="flex flex-col items-center justify-center py-1">
                        <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                          <span>MODERNIZATION</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 mt-1 text-center">
                          Decoupled Service Migration
                        </span>
                      </div>

                      {/* Microservices Box */}
                      <div className="p-3.5 rounded border border-emerald-500/30 bg-emerald-950/20">
                        <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                          TARGET ARCHITECTURE
                        </span>
                        <span className="text-sm font-mono text-zinc-200 block mt-1">
                          Microservices & REST APIs
                        </span>
                        <span className="text-xs text-zinc-400 mt-1 block">
                          Scalable, modular service boundaries
                        </span>
                      </div>
                    </div>

                    {/* Scale & Data Retrieval Callout */}
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span>High-volume data processing declared target:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-zinc-850 border border-zinc-700 text-zinc-200">
                          ~250K records
                        </span>
                        <span className="px-2.5 py-1 rounded bg-zinc-850 border border-zinc-700 text-zinc-200">
                          250–260 MB data payload
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-semibold">
                          &lt; 1 minute retrieval
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Key Responsibilities & Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 mr-2">Technologies:</span>
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-xs font-mono border border-emerald-500/20 bg-emerald-950/20 text-emerald-300"
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

import { GraduationCap, Calendar } from 'lucide-react';
import educationData from '../../data/education.json';

export function EducationSection() {
  return (
    <section id="education" className="py-20 border-b border-[#21262d] bg-[#090d13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            Education
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
            Formal engineering and computer science foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {educationData.education.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-zinc-800 bg-[#0d121a] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  {item.degree || 'Bachelor of Engineering / Technology'}
                </h3>
                {item.field && (
                  <p className="text-sm font-mono text-emerald-400 mt-1">
                    {item.field}
                  </p>
                )}
                {item.institution && (
                  <p className="text-sm text-zinc-300 mt-1">
                    {item.institution}
                  </p>
                )}
                {item.cgpa && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
                    <span>CGPA: {item.cgpa}</span>
                    <span className="text-zinc-500 font-normal">/ 10.0</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span>{item.startYear} — {item.endYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

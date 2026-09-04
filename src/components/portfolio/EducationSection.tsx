import { GraduationCap, Calendar } from 'lucide-react';
import educationData from '../../data/education.json';
import { useIDEStore } from '../../store/ideStore';

export function EducationSection() {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  return (
    <section id="education" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-slate-50/60' : 'border-[#21262d] bg-[#090d13]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-2 transition-colors ${
            isLight ? 'border-slate-300 bg-white text-slate-700 shadow-xs' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <GraduationCap className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Education
          </h2>
          <p className={`mt-2 text-sm font-sans max-w-2xl ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Formal engineering and computer science foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {educationData.education.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-zinc-800 bg-[#0d121a]'
              }`}
            >
              <div>
                <h3 className={`text-lg font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {item.degree || 'Bachelor of Engineering / Technology'}
                </h3>
                {item.field && (
                  <p className={`text-sm font-mono mt-1 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {item.field}
                  </p>
                )}
                {item.institution && (
                  <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                    {item.institution}
                  </p>
                )}
                {item.cgpa && (
                  <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-xs font-semibold ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  }`}>
                    <span>CGPA: {item.cgpa}</span>
                    <span className={`font-normal ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>/ 10.0</span>
                  </div>
                )}
              </div>

              <div className={`flex items-center gap-2 text-xs font-mono shrink-0 ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}>
                <Calendar className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                <span>{item.startYear} — {item.endYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

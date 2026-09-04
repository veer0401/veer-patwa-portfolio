import { Cpu, Binary, Server, Boxes, Layers, Database, ShieldCheck, Network } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useIDEStore } from '../../store/ideStore';

export function EngineeringFocusSection() {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  const iconMap: Record<string, typeof Cpu> = {
    'JAVA & JVM': Cpu,
    'SPRING BOOT & REST APIS': Server,
    'PROBLEM SOLVING & DSA': Binary,
    'BACKEND ENGINEERING': Network,
    'SYSTEM & LOW-LEVEL DESIGN': Layers,
    'DATABASE ENGINEERING': Database,
  };

  return (
    <section id="focus" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-slate-50/60' : 'border-[#21262d] bg-[#090d13]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-2 transition-colors ${
            isLight ? 'border-slate-300 bg-white text-slate-700 shadow-xs' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <Boxes className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>ENGINEERING ARCHITECTURE</span>
          </div>
          <h2 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Engineering Focus
          </h2>
          <p className={`mt-2 text-sm font-sans max-w-2xl ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Key disciplines where architectural rigor, problem solving, and backend system principles are applied.
          </p>
        </div>

        {/* Focus Grid (Truthful descriptions, zero fake percentages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.focusAreas.map((area) => {
            const IconComponent = iconMap[area.title] || ShieldCheck;

            return (
              <div
                key={area.title}
                className={`p-5 sm:p-6 rounded-lg border transition-all group ${
                  isLight
                    ? 'border-slate-200 hover:border-emerald-500/50 bg-white hover:bg-emerald-50/30 shadow-xs'
                    : 'border-zinc-800 hover:border-emerald-500/30 bg-[#0d121a] hover:bg-[#0f1622]'
                }`}
              >
                <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 group-hover:scale-105 transition-all ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700 group-hover:border-emerald-500'
                    : 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400 group-hover:border-emerald-500/40'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className={`text-sm font-bold font-mono tracking-wide mb-2 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {area.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

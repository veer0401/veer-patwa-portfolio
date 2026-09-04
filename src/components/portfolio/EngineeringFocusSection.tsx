import { Cpu, Binary, Server, Boxes, Layers, Database, ShieldCheck, Network } from 'lucide-react';
import skillsData from '../../data/skills.json';

export function EngineeringFocusSection() {
  const iconMap: Record<string, typeof Cpu> = {
    'JAVA & JVM': Cpu,
    'SPRING BOOT & REST APIS': Server,
    'PROBLEM SOLVING & DSA': Binary,
    'BACKEND ENGINEERING': Network,
    'SYSTEM & LOW-LEVEL DESIGN': Layers,
    'DATABASE ENGINEERING': Database,
  };

  return (
    <section id="focus" className="py-20 border-b border-[#21262d] bg-[#090d13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-2">
            <Boxes className="w-3.5 h-3.5 text-emerald-400" />
            <span>ENGINEERING ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            Engineering Focus
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
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
                className="p-5 sm:p-6 rounded-lg border border-zinc-800 hover:border-emerald-500/30 bg-[#0d121a] hover:bg-[#0f1622] transition-all group"
              >
                <div className="w-10 h-10 rounded border border-emerald-500/20 bg-emerald-950/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:border-emerald-500/40 group-hover:scale-105 transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-bold text-white font-mono tracking-wide mb-2">
                  {area.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
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

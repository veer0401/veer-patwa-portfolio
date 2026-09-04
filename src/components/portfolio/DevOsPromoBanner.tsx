import { Terminal, Code, Cpu, MessageSquareCode, ArrowRight } from 'lucide-react';
import { useIDEStore } from '../../store/ideStore';

export function DevOsPromoBanner() {
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  return (
    <section className={`py-16 transition-colors duration-200 ${
      isLight ? 'bg-gradient-to-b from-slate-50 to-white' : 'bg-gradient-to-b from-[#090d13] to-[#06080b]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-xl border p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all ${
          isLight
            ? 'border-emerald-600/30 bg-gradient-to-r from-emerald-50/60 via-white to-slate-50 shadow-md'
            : 'border-emerald-500/30 bg-[#0b1016] shadow-[0_0_40px_rgba(16,185,129,0.08)]'
        }`}>
          <div className="max-w-xl">
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border mb-3 ${
              isLight
                ? 'border-emerald-600/30 bg-emerald-50 text-emerald-800'
                : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
            }`}>
              <Terminal className="w-3.5 h-3.5" />
              <span>TECHNICAL INTERVIEWER MODE</span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-bold font-mono transition-colors ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Explore the Interactive DEV.OS
            </h3>

            <p className={`mt-3 text-sm leading-relaxed font-sans ${
              isLight ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              Dive into an interactive developer workspace equipped with a virtual Java repository file tree, terminal CLI, local intent Dev Agent, JVM architecture visualizer, and Spring microservices models.
            </p>

            <div className={`mt-5 flex flex-wrap gap-4 text-xs font-mono ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span className="flex items-center gap-1.5">
                <Code className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                Virtual File Explorer
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                Interactive CLI
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquareCode className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                Dev Agent Engine
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                JVM Architecture
              </span>
            </div>
          </div>

          <button
            onClick={() => setViewMode('devos')}
            className={`shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border font-mono font-bold text-sm transition-all cursor-pointer group ${
              isLight
                ? 'border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.3)]'
            }`}
          >
            <span>Launch DEV.OS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

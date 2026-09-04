import { Terminal, Code, Cpu, MessageSquareCode, ArrowRight } from 'lucide-react';
import { useIDEStore } from '../../store/ideStore';

export function DevOsPromoBanner() {
  const setViewMode = useIDEStore((s) => s.setViewMode);

  return (
    <section className="py-16 bg-gradient-to-b from-[#090d13] to-[#06080b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-emerald-500/30 bg-[#0b1016] p-8 sm:p-10 shadow-[0_0_40px_rgba(16,185,129,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>TECHNICAL INTERVIEWER MODE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              Explore the Interactive DEV.OS
            </h3>

            <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-sans">
              Dive into an interactive developer workspace equipped with a virtual Java repository file tree, terminal CLI, local intent Dev Agent, JVM architecture visualizer, and Spring microservices models.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                Virtual File Explorer
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Interactive CLI
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquareCode className="w-3.5 h-3.5 text-emerald-400" />
                Dev Agent Engine
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                JVM Architecture
              </span>
            </div>
          </div>

          <button
            onClick={() => setViewMode('devos')}
            className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-black font-mono font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all cursor-pointer group"
          >
            <span>Launch DEV.OS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

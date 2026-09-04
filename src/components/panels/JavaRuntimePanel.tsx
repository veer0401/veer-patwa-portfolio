import React, { useState } from 'react';
import { useIDEStore } from '../../store/ideStore';
import { Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const JavaRuntimePanel: React.FC = () => {
  const { isJvmPanelOpen, toggleJvmPanel } = useIDEStore();
  const [activeModule, setActiveModule] = useState<string>('heap');

  if (!isJvmPanelOpen) return null;

  const modules: Record<
    string,
    { title: string; desc: string; metrics: { label: string; value: string }[] }
  > = {
    heap: {
      title: 'JVM Memory Architecture (Heap & Non-Heap)',
      desc: 'OpenJDK memory topology with generational division between Young Generation (Eden + Survivor) and Tenured Old Gen.',
      metrics: [
        { label: 'Young Generation', value: 'Eden + S0/S1 Survivor' },
        { label: 'Old Generation', value: 'Tenured Long-Lived Objects' },
        { label: 'Metaspace', value: 'Native Class Metadata' },
        { label: 'Code Cache', value: 'Native JIT Compiled Code' },
        { label: 'Sizing Flags', value: '-Xms (Initial) / -Xmx (Max)' },
      ],
    },
    threads: {
      title: 'Threads & Concurrency (Project Loom)',
      desc: 'Java 21 Virtual Threads for lightweight, high-throughput concurrent I/O operations without OS thread starvation.',
      metrics: [
        { label: 'Virtual Thread API', value: 'Thread.ofVirtual().start()' },
        { label: 'Executor Model', value: 'Executors.newVirtualThreadPerTaskExecutor()' },
        { label: 'Carrier Threading', value: 'ForkJoinPool Work-Stealing' },
        { label: 'Concurrency Primitive', value: 'StructuredTaskScope / ScopedValue' },
        { label: 'Hardware Mapping', value: 'M:N User to OS Threads' },
      ],
    },
    gc: {
      title: 'Garbage Collector Architecture (G1GC & ZGC)',
      desc: 'Modern low-latency garbage collection algorithms minimizing stop-the-world pauses in production enterprise services.',
      metrics: [
        { label: 'Primary Collector', value: 'G1 (Garbage-First) LTS Default' },
        { label: 'Ultra-Low Latency', value: 'Generational ZGC (< 1ms pauses)' },
        { label: 'Compaction Strategy', value: 'Incremental Region-Based' },
        { label: 'Target SLA', value: '-XX:MaxGCPauseMillis=200' },
        { label: 'Allocation Model', value: 'TLAB (Thread-Local Allocation)' },
      ],
    },
    jit: {
      title: 'HotSpot JIT Compilation Architecture',
      desc: 'Tiered compilation pipeline dynamically optimizing frequently executed Java bytecode into native machine code.',
      metrics: [
        { label: 'Interpreter', value: 'Fast Bytecode Execution' },
        { label: 'Tier 1-3 (C1)', value: 'Client JIT with Method Profiling' },
        { label: 'Tier 4 (C2)', value: 'Server JIT Aggressive Optimizations' },
        { label: 'Optimizations', value: 'Inlining, Escape Analysis, Loop Unrolling' },
        { label: 'Compilation Target', value: 'Native Hardware Instructions' },
      ],
    },
  };

  const current = modules[activeModule] || modules['heap'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl bg-[#0B0F14] border border-[#1C2636] rounded-lg shadow-2xl overflow-hidden text-xs text-slate-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#080A0D] border-b border-[#1C2636]">
            <div className="flex items-center gap-2 text-[#F89820]">
              <Coffee className="w-4 h-4" />
              <span className="font-bold tracking-wider">JAVA 21 JVM TELEMETRY</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F89820]/15 text-[#F89820]">
                ONLINE
              </span>
            </div>

            <button
              onClick={toggleJvmPanel}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#141B24] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Module Selector Bar */}
          <div className="flex border-b border-[#1C2636] bg-[#06080B] text-slate-400">
            {(['heap', 'threads', 'gc', 'jit'] as const).map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(mod)}
                className={`flex-1 py-2.5 text-center font-medium tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeModule === mod
                    ? 'border-[#F89820] text-slate-100 bg-[#0B0F14]'
                    : 'border-transparent hover:text-slate-200'
                }`}
              >
                {mod.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">{current.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{current.desc}</p>
            </div>

            {/* Visual Bar for Memory */}
            {activeModule === 'heap' && (
              <div className="space-y-1.5 p-3 rounded bg-[#080A0D] border border-[#1C2636]">
                <div className="flex justify-between text-[11px]">
                  <span>Heap Utilization</span>
                  <span className="text-[#F89820] font-bold">324 MB / 512 MB</span>
                </div>
                <div className="h-2 w-full bg-[#10151C] rounded-full overflow-hidden border border-[#1C2636]">
                  <div className="h-full bg-gradient-to-r from-[#F89820] to-[#E76F00] w-[63%]" />
                </div>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              {current.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded bg-[#080A0D] border border-[#1C2636]/80 flex flex-col justify-between"
                >
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="text-xs font-bold text-slate-100 mt-1 font-mono">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#080A0D] border-t border-[#1C2636] flex items-center justify-between text-[11px] text-slate-400">
            <span>Runtime: OpenJDK 64-Bit Server VM</span>
            <span className="text-[#4ADE80]">GC: Optimal</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

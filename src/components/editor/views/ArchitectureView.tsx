import React, { useState } from 'react';
import architectureData from '../../../data/architecture.json';
import { Network, Server, ArrowDown, Cpu, Layers, ShieldCheck } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODERNIZATION' | 'LAYERED' | 'JVM'>('MODERNIZATION');

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Network className="w-4 h-4" />
            <span className="font-semibold">microservices.arch</span>
            <span className="text-slate-400">• Backend & System Architecture Specifications</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-mono">
            RMI MIGRATION • LAYERED SPRING • JVM
          </span>
        </div>

        {/* Tab Selection */}
        <div className="border-b border-[#1C2636] flex gap-2 text-xs">
          <button
            onClick={() => setActiveTab('MODERNIZATION')}
            className={`px-4 py-2 font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'MODERNIZATION'
                ? 'border-emerald-400 text-white bg-[#0B0F14]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            MODERNIZATION (RMI → MICROSERVICES)
          </button>
          <button
            onClick={() => setActiveTab('LAYERED')}
            className={`px-4 py-2 font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'LAYERED'
                ? 'border-emerald-400 text-white bg-[#0B0F14]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SPRING LAYERED ARCHITECTURE
          </button>
          <button
            onClick={() => setActiveTab('JVM')}
            className={`px-4 py-2 font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === 'JVM'
                ? 'border-emerald-400 text-white bg-[#0B0F14]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            JVM RUNTIME ARCHITECTURE
          </button>
        </div>

        {/* TAB 1: MODERNIZATION (RMI -> Microservices) */}
        {activeTab === 'MODERNIZATION' && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#0B0F14] border border-emerald-500/30 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                {architectureData.modernization.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {architectureData.modernization.description}
              </p>
            </div>

            {/* Visual Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Legacy RMI */}
              <div className="p-5 rounded-lg bg-[#0d1015] border border-red-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase">
                    {architectureData.modernization.legacy.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/30">
                    Legacy
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Protocol: {architectureData.modernization.legacy.protocol}
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                  {architectureData.modernization.legacy.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Microservices */}
              <div className="p-5 rounded-lg bg-[#0d1615] border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">
                    {architectureData.modernization.target.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                    Target State
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Protocol: {architectureData.modernization.target.protocol}
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                  {architectureData.modernization.target.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scale metric callout */}
            <div className="p-4 rounded-lg bg-[#090d14] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400">Declared Production Retrieval Benchmark:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-zinc-850 border border-zinc-700 text-zinc-200">
                  {architectureData.modernization.scaleMetric.records}
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-850 border border-zinc-700 text-zinc-200">
                  {architectureData.modernization.scaleMetric.payload}
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-semibold">
                  {architectureData.modernization.scaleMetric.latency}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAYERED SPRING BOOT ARCHITECTURE */}
        {activeTab === 'LAYERED' && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
              <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Clean Layered Backend Flow</span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Clear separation of concerns: Client Requests → REST Controllers → Domain Services → Persistence Repositories → MySQL Database.
              </p>
            </div>

            {/* Vertical Flow Diagram */}
            <div className="flex flex-col items-center space-y-2">
              {architectureData.layeredArchitecture.layers.map((layer, idx) => (
                <React.Fragment key={layer.id}>
                  <div className="w-full max-w-md p-4 rounded-lg bg-[#0d121a] border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{layer.name}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{layer.role}</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      Layer {idx + 1}
                    </span>
                  </div>

                  {idx < architectureData.layeredArchitecture.layers.length - 1 && (
                    <div className="flex flex-col items-center py-0.5 text-zinc-600">
                      <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: JVM RUNTIME ARCHITECTURE */}
        {activeTab === 'JVM' && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#0B0F14] border border-amber-500/30">
              <h2 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>JVM Internal Runtime Model (Educational / Architectural)</span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Architectural visualization of OpenJDK runtime subsystems.
              </p>
            </div>

            {/* ASCII / Visual Graph of JVM */}
            <div className="p-6 rounded-lg bg-[#070b10] border border-zinc-800 text-center font-mono">
              <div className="inline-block text-left text-xs text-emerald-400 leading-relaxed bg-[#0a0f16] p-4 rounded border border-zinc-800">
                <pre className="text-xs text-zinc-200">
{`             [ Heap Memory ]
                   │
[ Threads ] ─── [ JVM CORE ] ─── [ Garbage Collector (GC) ]
                   │
           [ ClassLoader ]
                   │
             [ JIT Engine ]`}
                </pre>
              </div>
            </div>

            {/* JVM Subsystem Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {architectureData.jvmComponents.map((comp) => (
                <div key={comp.name} className="p-4 rounded-lg bg-[#0d121a] border border-zinc-800">
                  <h3 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{comp.name}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

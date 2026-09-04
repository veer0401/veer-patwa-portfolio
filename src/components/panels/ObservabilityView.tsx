import React from 'react';
import { useIDEStore } from '../../store/ideStore';
import { Server, X, CheckCircle2, ShieldCheck, Cpu, Database, HardDrive, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profileData from '../../data/profile.json';
import experienceData from '../../data/experience.json';
import projectsData from '../../data/projects.json';

export const ObservabilityView: React.FC = () => {
  const { isObservabilityOpen, toggleObservability } = useIDEStore();

  if (!isObservabilityOpen) return null;

  // Real client environment facts
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Desktop Environment';
  const platform = userAgent.includes('Win')
    ? 'Windows (x64)'
    : userAgent.includes('Mac')
    ? 'macOS'
    : userAgent.includes('Linux')
    ? 'Linux'
    : 'Web Browser';
  const protocol = typeof window !== 'undefined' ? window.location.protocol.toUpperCase().replace(':', '') : 'HTTPS';

  // Cognizant modernization facts from experience.json
  const cognizantExp = experienceData.experiences.find((e: { company: string }) => e.company.toLowerCase().includes('cognizant'));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-[#0B0F14] border border-[#1C2636] rounded-lg shadow-2xl overflow-hidden text-xs text-slate-300 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#080A0D] border-b border-[#1C2636]">
            <div className="flex items-center gap-2 text-emerald-400">
              <Server className="w-4 h-4" />
              <span className="font-bold tracking-wider">SYSTEM ENVIRONMENT & RUNTIME MATRIX</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isOnline ? 'CLIENT CONNECTED' : 'OFFLINE MODE'}
              </span>
            </div>

            <button
              onClick={toggleObservability}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#141B24] cursor-pointer"
              title="Close Matrix"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Verified Specification Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded bg-[#080A0D] border border-[#1C2636]">
                <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#F89820]" />
                  TARGET RUNTIME
                </div>
                <div className="text-base sm:text-lg font-bold text-[#F89820] mt-1">
                  Java {profileData.javaVersion} LTS
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Spring Boot 3.x</div>
              </div>

              <div className="p-3 rounded bg-[#080A0D] border border-[#1C2636]">
                <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-emerald-400" />
                  CLIENT PLATFORM
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                  {platform}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Protocol: {protocol}</div>
              </div>

              <div className="p-3 rounded bg-[#080A0D] border border-[#1C2636]">
                <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#4DA3FF]" />
                  DATA ARCHITECTURE
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-1">
                  JSON SSOT
                </div>
                <div className="text-[10px] text-[#4DA3FF] mt-0.5">Centralized Schema</div>
              </div>

              <div className="p-3 rounded bg-[#080A0D] border border-[#1C2636]">
                <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  SECURITY / STATUS
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                  {profileData.status}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Full-Time Available</div>
              </div>
            </div>

            {/* Cognizant Real Engineering Scale Specifications */}
            {cognizantExp && (
              <div className="p-4 rounded-lg bg-[#080A0D] border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Production Engineering Benchmark (Cognizant Modernization)
                  </h2>
                  <span className="text-[10px] text-slate-400">Legacy RMI to Microservices</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Migrated high-load monolithic backend from legacy Java RMI communication to Spring Boot REST microservices.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0B0F14] border border-[#1C2636]">
                    <div className="text-[10px] text-slate-400">Batch Processing Volume</div>
                    <div className="text-sm font-bold text-white mt-0.5">~250,000 Records</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">High-volume payload</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#0B0F14] border border-[#1C2636]">
                    <div className="text-[10px] text-slate-400">Payload Data Size</div>
                    <div className="text-sm font-bold text-white mt-0.5">250 – 260 MB</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Structured transmission</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#0B0F14] border border-[#1C2636]">
                    <div className="text-[10px] text-slate-400">Execution Duration SLA</div>
                    <div className="text-sm font-bold text-[#F89820] mt-0.5">&lt; 1 Minute</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Modernized throughput</div>
                  </div>
                </div>
              </div>
            )}

            {/* Software Repositories Matrix */}
            <div className="p-4 rounded-lg bg-[#080A0D] border border-[#1C2636] space-y-3">
              <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#4DA3FF]" />
                Software Repositories & Execution Status
              </h2>

              <div className="space-y-2">
                {projectsData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded bg-[#0B0F14] border border-[#1C2636]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{proj.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                          {proj.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-sans">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400">
                        {proj.technologies.slice(0, 2).join(' • ')}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          proj.featured
                            ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {proj.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Factual Architectural Disclaimer */}
            <div className="p-3 rounded bg-[#080A0D] border border-[#1C2636] text-[11px] text-slate-400 leading-relaxed font-sans">
              <span className="text-emerald-400 font-mono font-semibold">[ Truthful Portfolio Guarantee ]: </span>
              All specifications displayed across DEV.OS reflect authentic engineering accomplishments, verified project codebases, and documented benchmarks. Zero simulated traffic curves, fabricated live telemetry, or arbitrary percentage ratings are utilized.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

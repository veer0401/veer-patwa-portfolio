import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIDEStore } from '../store/ideStore';
import { Cpu } from 'lucide-react';
import profileData from '../data/profile.json';

const bootSteps = [
  { text: 'Loading Java Runtime... ✓', delay: 150 },
  { text: 'Loading developer profile... ✓', delay: 400 },
  { text: 'Loading experience... ✓', delay: 700 },
  { text: 'Loading projects... ✓', delay: 1050 },
  { text: 'Starting DEV.OS... ✓', delay: 1400 },
  { text: 'SYSTEM READY', delay: 1750 },
];

export const BootSequence: React.FC = () => {
  const setBooted = useIDEStore((s) => s.setBooted);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
        setProgress(Math.round(((index + 1) / bootSteps.length) * 100));
      }, step.delay);
      timers.push(timer);
    });

    const completionTimer = setTimeout(() => {
      setBooted(true);
    }, 2100);
    timers.push(completionTimer);

    return () => timers.forEach(clearTimeout);
  }, [setBooted]);

  const handleSkip = () => {
    setBooted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06080b] font-mono text-slate-300 select-none overflow-hidden">
      <div className="absolute inset-0 bg-radial from-[#101926]/40 via-transparent to-black pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative z-10 w-full max-w-lg mx-4 p-7 rounded-lg border border-[#1C2636] bg-[#0B0F14]/90 backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C2636]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain p-0.5"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                  }
                }}
              />
              <Cpu style={{ display: 'none' }} className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-slate-100 flex items-center gap-2">
                DEV.OS <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300 font-normal">JAVA 21</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">{profileData.name.toUpperCase()} WORKSPACE</p>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="px-3 py-1 text-xs text-slate-300 hover:text-white border border-[#28374D] hover:border-emerald-400 rounded bg-[#10151C] hover:bg-[#141B24] transition-all flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <span>[ SKIP ]</span>
          </button>
        </div>

        {/* Boot Terminal Log View */}
        <div className="my-5 space-y-2 text-xs min-h-[140px] font-mono">
          <div className="text-zinc-500 text-[11px] mb-2 font-bold tracking-wider">
            INITIALIZING DEV.OS...
          </div>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2.5"
            >
              <span className={i === logs.length - 1 && log === 'SYSTEM READY' ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                {log}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM INITIALIZATION
            </span>
            <span className="text-emerald-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#10151C] overflow-hidden border border-[#1C2636]">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

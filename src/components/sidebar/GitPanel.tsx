import React from 'react';
import { gitCommits } from '../../data/experience';
import { useIDEStore } from '../../store/ideStore';
import { GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import linksData from '../../data/links.json';

export const GitPanel: React.FC = () => {
  const openFile = useIDEStore((s) => s.openFile);

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs">
      <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#1C2636] flex items-center justify-between bg-slate-100/50 dark:bg-transparent">
        <span>SOURCE CONTROL</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          CLEAN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Branch Info */}
        <div className="p-2.5 rounded bg-white dark:bg-[#080A0D] border border-slate-200 dark:border-[#1C2636] shadow-2xs">
          <div className="flex items-center justify-between text-slate-800 dark:text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <GitBranch className="w-3.5 h-3.5 text-amber-600 dark:text-[#F89820]" />
              main
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">up to date</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Origin: <code className="text-slate-800 dark:text-slate-300">{linksData.github ? linksData.github.replace('https://', '') : 'github.com/veerpatwa'}</code>
          </div>
        </div>

        {/* Repository Truthful Metrics */}
        <div>
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            REPOSITORY SPECIFICATIONS
          </div>
          <div className="space-y-1 text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#1C2636]/60 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400">3 Software Projects</span>
              <span className="text-emerald-600 dark:text-[#4ADE80] font-mono text-[11px]">Synced</span>
            </div>
            <div className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#1C2636]/60 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400">2 Professional Roles</span>
              <span className="text-blue-600 dark:text-[#4DA3FF] font-mono text-[11px]">Documented</span>
            </div>
            <div className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#1C2636]/60 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400">24+ Java & Spring Skills</span>
              <span className="text-amber-600 dark:text-[#F89820] font-mono text-[11px]">Indexed</span>
            </div>
          </div>
        </div>

        {/* Git Commit History */}
        <div>
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>MILESTONE COMMITS</span>
            <button
              onClick={() => openFile('/src/experience/Experience.java', 'Experience.java')}
              className="text-blue-600 dark:text-[#4DA3FF] hover:underline flex items-center gap-0.5 text-[10px]"
            >
              Experience log <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="space-y-2.5 border-l border-slate-200 dark:border-[#1C2636] pl-3 ml-1.5">
            {gitCommits.map((c) => (
              <div
                key={c.hash}
                onClick={() => openFile('/src/experience/Experience.java', 'Experience.java')}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-[#F89820] transition-colors">
                  <span className="font-mono text-[10px] text-blue-600 dark:text-[#4DA3FF] shrink-0">{c.hash}</span>
                  <span className="text-[11px] font-medium leading-tight">{c.message}</span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{c.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

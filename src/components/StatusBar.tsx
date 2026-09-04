import React from 'react';
import { useIDEStore } from '../store/ideStore';
import { Coffee, GitBranch, Radio } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { toggleJvmPanel, toggleObservability, activeTabId } = useIDEStore();

  const getLanguage = () => {
    if (activeTabId.endsWith('.java')) return 'Java 21';
    if (activeTabId.endsWith('.xml')) return 'XML';
    if (activeTabId.endsWith('.arch')) return 'Architecture';
    if (activeTabId.endsWith('.md')) return 'Markdown';
    return 'PlainText';
  };

  return (
    <footer className="h-6 bg-[#06080B] border-t border-[#1C2636] flex items-center justify-between px-3 text-[10px] text-slate-400 select-none z-30 font-mono">
      {/* Left items */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-slate-300">
          <GitBranch className="w-3 h-3 text-[#F89820]" />
          <span>main</span>
        </div>

        <button
          onClick={toggleObservability}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>System Matrix: ACTIVE</span>
        </button>

        <button
          onClick={toggleJvmPanel}
          className="hidden sm:flex items-center gap-1 text-[#F89820] hover:underline cursor-pointer"
        >
          <Coffee className="w-3 h-3" />
          <span>Java Runtime: 21 LTS</span>
        </button>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-slate-500">JSON SSOT</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">LF</span>
        <span className="text-slate-300 font-medium">{getLanguage()}</span>

        <div className="flex items-center gap-1 text-[#4DA3FF]">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>DEV.OS</span>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { useIDEStore } from '../store/ideStore';
import {
  Files,
  Search,
  Zap,
  Network,
  Coffee,
  GitBranch,
  Bot,
  Terminal as TerminalIcon,
  Activity,
} from 'lucide-react';
import type { SidebarPanel } from '../types';

export const ActivityBar: React.FC = () => {
  const {
    activePanel,
    setActivePanel,
    isSidebarOpen,
    isAgentOpen,
    toggleAgent,
    isTerminalOpen,
    toggleTerminal,
    toggleObservability,
  } = useIDEStore();

  const navItems: { id: SidebarPanel; label: string; icon: React.ReactNode }[] = [
    { id: 'explorer', label: 'Explorer (Files)', icon: <Files className="w-5 h-5" /> },
    { id: 'search', label: 'Search Portfolio', icon: <Search className="w-5 h-5" /> },
    { id: 'projects', label: 'Backend Projects', icon: <Zap className="w-5 h-5 text-[#F89820]" /> },
    { id: 'architecture', label: 'System Architecture', icon: <Network className="w-5 h-5 text-[#4DA3FF]" /> },
    { id: 'skills', label: 'Java & Spring Stack', icon: <Coffee className="w-5 h-5 text-[#6DB33F]" /> },
    { id: 'git', label: 'Source Control & Commits', icon: <GitBranch className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-12 bg-[#06080B] border-r border-[#1C2636] flex flex-col justify-between items-center py-2 z-20 select-none">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {navItems.map((item) => {
          const isActive = activePanel === item.id && isSidebarOpen;
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all group cursor-pointer ${
                isActive
                  ? 'text-white bg-[#10151C]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0B0F14]'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#F89820] rounded-r" />
              )}
              {item.icon}

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#141B24] border border-[#1C2636] text-slate-200 text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Agent, Terminal, Observability */}
      <div className="flex flex-col items-center gap-1.5 w-full border-t border-[#1C2636]/60 pt-2">
        {/* Dev Agent Toggle */}
        <button
          onClick={toggleAgent}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all group cursor-pointer ${
            isAgentOpen
              ? 'text-[#00D9FF] bg-[#10151C]'
              : 'text-slate-400 hover:text-[#00D9FF] hover:bg-[#0B0F14]'
          }`}
          title="DEV AGENT (AI Assistant)"
          aria-label="DEV AGENT"
        >
          {isAgentOpen && (
            <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#00D9FF] rounded-r" />
          )}
          <Bot className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#141B24] border border-[#1C2636] text-slate-200 text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            DEV AGENT (AI Assistant)
          </div>
        </button>

        {/* Terminal Toggle */}
        <button
          onClick={toggleTerminal}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all group cursor-pointer ${
            isTerminalOpen
              ? 'text-[#4ADE80] bg-[#10151C]'
              : 'text-slate-400 hover:text-[#4ADE80] hover:bg-[#0B0F14]'
          }`}
          title="Integrated Terminal"
          aria-label="Integrated Terminal"
        >
          <TerminalIcon className="w-5 h-5" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#141B24] border border-[#1C2636] text-slate-200 text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            Integrated Terminal ($)
          </div>
        </button>

        {/* System Environment Matrix dashboard */}
        <button
          onClick={toggleObservability}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-[#0B0F14] transition-all group cursor-pointer"
          title="System Environment & Architecture Matrix"
          aria-label="System Environment & Architecture Matrix"
        >
          <Activity className="w-5 h-5" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#141B24] border border-[#1C2636] text-slate-200 text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            System Environment Matrix
          </div>
        </button>
      </div>
    </aside>
  );
};

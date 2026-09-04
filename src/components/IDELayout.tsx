import React from 'react';
import { useIDEStore } from '../store/ideStore';
import { TopBar } from './TopBar';
import { ActivityBar } from './ActivityBar';
import { Sidebar } from './Sidebar';
import { EditorArea } from './editor/EditorArea';
import { DevAgent } from './agent/DevAgent';
import { Terminal } from './terminal/Terminal';
import { StatusBar } from './StatusBar';
import { CommandPalette } from './CommandPalette';
import { JavaRuntimePanel } from './panels/JavaRuntimePanel';
import { ObservabilityView } from './panels/ObservabilityView';
import { X } from 'lucide-react';

export const IDELayout: React.FC = () => {
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useIDEStore();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#080A0D] text-slate-300 font-mono select-none">
      {/* 1. Top Navigation Bar */}
      <TopBar />

      {/* 2. Main Middle Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Leftmost Activity Bar */}
        <ActivityBar />

        {/* Collapsible Sidebar (Desktop) */}
        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>

        {/* Mobile Slide-Over Drawer for Sidebar */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-72 bg-[#080A0D] h-full z-50 border-r border-[#1C2636] flex flex-col">
              <div className="p-3 border-b border-[#1C2636] flex items-center justify-between text-xs font-semibold text-slate-200">
                <span>DEV.OS WORKSPACE</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Central Workspace: Editor Area + Terminal */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <EditorArea />
          <Terminal />
        </div>

        {/* Right Dev Agent Panel */}
        <DevAgent />
      </div>

      {/* 3. Bottom Status Bar */}
      <StatusBar />

      {/* 4. Global Modals and Overlays */}
      <CommandPalette />
      <JavaRuntimePanel />
      <ObservabilityView />
    </div>
  );
};

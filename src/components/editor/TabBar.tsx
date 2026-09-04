import React, { useState, useEffect, useRef } from 'react';
import { useIDEStore } from '../../store/ideStore';
import type { Tab } from '../../types';
import { X, FileCode, FileText, Coffee, Leaf, Database, GitCommitHorizontal, Mail, Network } from 'lucide-react';

const getTabIcon = (fileName: string) => {
  if (fileName.endsWith('.java')) {
    if (fileName === 'SpringBoot.java') return <Leaf className="w-3.5 h-3.5 text-[#6DB33F]" />;
    if (fileName === 'Database.java') return <Database className="w-3.5 h-3.5 text-[#00D9FF]" />;
    if (fileName === 'Experience.java') return <GitCommitHorizontal className="w-3.5 h-3.5 text-[#FBBF24]" />;
    if (fileName === 'Contact.java') return <Mail className="w-3.5 h-3.5 text-[#4ADE80]" />;
    return <Coffee className="w-3.5 h-3.5 text-[#F89820]" />;
  }
  if (fileName.endsWith('.arch')) return <Network className="w-3.5 h-3.5 text-[#4DA3FF]" />;
  if (fileName.endsWith('.xml')) return <FileCode className="w-3.5 h-3.5 text-[#E76F00]" />;
  if (fileName.endsWith('.md')) return <FileText className="w-3.5 h-3.5 text-[#4DA3FF]" />;
  return <FileCode className="w-3.5 h-3.5 text-slate-400" />;
};

interface ContextMenuState {
  x: number;
  y: number;
  tabId: string;
}

export const TabBar: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeTab, closeOtherTabs, closeAllTabs } = useIDEStore();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContextMenu(null);
      }
    };

    if (contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId,
    });
  };

  const handleBarContextMenu = (e: React.MouseEvent) => {
    if (openTabs.length === 0) return;
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId: openTabs[0].id,
    });
  };

  return (
    <>
      <div
        onContextMenu={handleBarContextMenu}
        className="h-9 bg-[#06080B] border-b border-[#1C2636] flex items-center overflow-x-auto select-none no-scrollbar relative"
      >
        {openTabs.map((tab: Tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onContextMenu={(e) => handleContextMenu(e, tab.id)}
              className={`flex items-center gap-2 px-3 h-full border-r border-[#1C2636] text-xs cursor-pointer transition-colors relative group shrink-0 ${
                isActive
                  ? 'bg-[#0B0F14] text-slate-100 font-medium'
                  : 'bg-[#080A0D] text-slate-400 hover:text-slate-200 hover:bg-[#0B0F14]/60'
              }`}
            >
              {/* Active Indicator Top Line */}
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400" />
              )}

              {getTabIcon(tab.name)}
              <span className="truncate max-w-[140px]">{tab.name}</span>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-[#1C2636] p-0.5 rounded text-slate-400 hover:text-white transition-all cursor-pointer ml-1"
                title="Close Tab"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Right-click Context Menu */}
      {contextMenu && (
        <div
          ref={menuRef}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-50 min-w-[160px] bg-[#0B0F14] border border-[#1C2636] rounded-md shadow-2xl py-1 text-xs font-mono text-slate-300 select-none animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            onClick={() => {
              closeTab(contextMenu.tabId);
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-[#141B24] hover:text-emerald-400 flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Close</span>
            <span className="text-[10px] text-slate-500">⌘W</span>
          </button>

          {openTabs.length > 1 && (
            <button
              onClick={() => {
                closeOtherTabs(contextMenu.tabId);
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-[#141B24] hover:text-slate-100 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Close Others</span>
            </button>
          )}

          <div className="my-1 border-t border-[#1C2636]" />

          <button
            onClick={() => {
              closeAllTabs();
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Close All</span>
            <span className="text-[10px] text-rose-400/60">⌘K ⌘W</span>
          </button>
        </div>
      )}
    </>
  );
};

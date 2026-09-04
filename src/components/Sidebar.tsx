import React from 'react';
import { useIDEStore } from '../store/ideStore';
import { FileExplorer } from './sidebar/FileExplorer';
import { SearchPanel } from './sidebar/SearchPanel';
import { GitPanel } from './sidebar/GitPanel';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { Coffee, Network, Zap } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activePanel, isSidebarOpen, openFile } = useIDEStore();

  if (!isSidebarOpen || !activePanel) return null;

  return (
    <aside className="w-64 bg-[#080A0D] border-r border-[#1C2636] flex flex-col h-full select-none z-10">
      {activePanel === 'explorer' && <FileExplorer />}
      {activePanel === 'search' && <SearchPanel />}
      {activePanel === 'git' && <GitPanel />}

      {/* Projects List Quick Panel */}
      {activePanel === 'projects' && (
        <div className="flex flex-col h-full overflow-hidden text-xs">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1C2636]">
            PROJECTS WORKSPACE
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() =>
                  openFile(
                    `/src/projects/${proj.fileName}`,
                    proj.fileName,
                    proj.fileName.endsWith('.cs') ? 'file-code' : 'coffee',
                    proj.fileName.endsWith('.cs') ? 'csharp' : 'java'
                  )
                }
                className="p-2.5 rounded bg-[#0B0F14] hover:bg-[#141B24] border border-[#1C2636]/80 hover:border-[#F89820]/60 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5 text-xs text-[#F89820]">
                    <Zap className="w-3.5 h-3.5" />
                    {proj.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                    {proj.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.stack.slice(0, 3).map((st: string) => (
                    <span
                      key={st}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-[#10151C] text-slate-300 border border-[#1C2636]"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture List Quick Panel */}
      {activePanel === 'architecture' && (
        <div className="flex flex-col h-full overflow-hidden text-xs">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1C2636]">
            SYSTEM ARCHITECTURES
          </div>
          <div className="p-2 space-y-2">
            <div
              onClick={() =>
                openFile(
                  '/architecture/microservices.arch',
                  'microservices.arch',
                  'network',
                  'architecture'
                )
              }
              className="p-3 rounded bg-[#0B0F14] hover:bg-[#141B24] border border-[#1C2636]/80 hover:border-[#4DA3FF]/60 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 text-[#4DA3FF] font-medium text-xs">
                <Network className="w-4 h-4" />
                microservices.arch
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Legacy RMI Monolith to Spring Boot Microservices Modernization & 5-Layer Backend Architecture.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Skills Category List */}
      {activePanel === 'skills' && (
        <div className="flex flex-col h-full overflow-hidden text-xs">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1C2636]">
            JAVA SKILL MATRIX
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {skills.map((cat) => (
              <div
                key={cat.name}
                onClick={() =>
                  openFile(
                    '/src/skills/JavaStack.java',
                    'JavaStack.java',
                    'coffee',
                    'java'
                  )
                }
                className="p-2.5 rounded bg-[#0B0F14] hover:bg-[#141B24] border border-[#1C2636]/80 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5 text-xs text-slate-200">
                    <Coffee className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {cat.items.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cat.items.slice(0, 4).map((sk: { name: string }) => (
                    <span
                      key={sk.name}
                      className="text-[9px] px-1 py-0.5 rounded bg-[#10151C] text-slate-400 border border-[#1C2636]"
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

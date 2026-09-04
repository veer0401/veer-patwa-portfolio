import React from 'react';
import { useIDEStore } from '../../store/ideStore';
import { TabBar } from './TabBar';
import { ReadmeView } from './views/ReadmeView';
import { AboutView } from './views/AboutView';
import { JavaStackView } from './views/JavaStackView';
import { SpringBootView } from './views/SpringBootView';
import { ProjectView } from './views/ProjectView';
import { ExperienceView } from './views/ExperienceView';
import { ContactView } from './views/ContactView';
import { PomXmlView } from './views/PomXmlView';
import { ArchitectureView } from './views/ArchitectureView';
import { ArchitectureView3D } from './views/ArchitectureView3D';
import { DatabaseView } from './views/DatabaseView';
import { fileViewMap } from '../../data/fileSystem';
import { Coffee, FileText, Code2, Terminal } from 'lucide-react';

export const EditorArea: React.FC = () => {
  const { activeTabId, openTabs, openFile, toggleTerminal } = useIDEStore();

  const renderContent = () => {
    if (openTabs.length === 0) {
      return (
        <div className="flex-1 h-full flex flex-col items-center justify-center p-6 text-center font-mono select-none bg-[#080A0D]">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Coffee className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-slate-200">No Open Editors</h2>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            Select a file from the explorer or jump directly to a primary workspace module:
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md">
            <button
              onClick={() => openFile('/README.md', 'README.md', 'file-text', 'markdown')}
              className="px-3 py-1.5 rounded bg-[#10151C] hover:bg-[#141B24] border border-[#1C2636] hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#4DA3FF]" />
              <span>README.md</span>
            </button>
            <button
              onClick={() =>
                openFile(
                  '/src/projects/InventoryMedicalPOS.java',
                  'InventoryMedicalPOS.java',
                  'coffee',
                  'java'
                )
              }
              className="px-3 py-1.5 rounded bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>InventoryMedicalPOS.java</span>
            </button>
            <button
              onClick={toggleTerminal}
              className="px-3 py-1.5 rounded bg-[#10151C] hover:bg-[#141B24] border border-[#1C2636] hover:border-slate-500 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Integrated Terminal</span>
            </button>
          </div>
        </div>
      );
    }

    const fileInfo = fileViewMap[activeTabId];

    if (!fileInfo) {
      if (activeTabId.startsWith('/src/projects/')) {
        const id = activeTabId.replace('/src/projects/', '').replace('.java', '').replace('.cs', '');
        return <ProjectView projectId={id} />;
      }
      return <ReadmeView />;
    }

    switch (fileInfo.viewType) {
      case 'readme':
        return <ReadmeView />;
      case 'about':
        return <AboutView />;
      case 'javastack':
        return <JavaStackView />;
      case 'springboot':
        return <SpringBootView />;
      case 'database':
        return <DatabaseView />;
      case 'project':
        return <ProjectView projectId={fileInfo.projectId || 'inventory-medical-pos'} />;
      case 'experience':
        return <ExperienceView />;
      case 'contact':
        return <ContactView />;
      case 'pomxml':
        return <PomXmlView />;
      case 'architecture':
        return <ArchitectureView />;
      case 'architecture3d':
        return <ArchitectureView3D />;
      default:
        return <ReadmeView />;
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#080A0D]">
      <TabBar />
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
    </main>
  );
};

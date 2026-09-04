import React, { useState } from 'react';
import { useIDEStore } from '../../store/ideStore';
import { fileSystem } from '../../data/fileSystem';
import type { FileNode } from '../../types';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  Coffee,
  Leaf,
  Database,
  GitCommitHorizontal,
  Mail,
  Network,
} from 'lucide-react';

const getFileIcon = (fileName: string, iconName?: string) => {
  if (iconName === 'coffee' || fileName.endsWith('.java')) {
    if (fileName === 'SpringBoot.java') return <Leaf className="w-3.5 h-3.5 text-[#6DB33F]" />;
    if (fileName === 'Database.java') return <Database className="w-3.5 h-3.5 text-[#00D9FF]" />;
    if (fileName === 'Experience.java') return <GitCommitHorizontal className="w-3.5 h-3.5 text-[#FBBF24]" />;
    if (fileName === 'Contact.java') return <Mail className="w-3.5 h-3.5 text-[#4ADE80]" />;
    return <Coffee className="w-3.5 h-3.5 text-[#F89820]" />;
  }
  if (fileName.endsWith('.arch')) {
    return <Network className="w-3.5 h-3.5 text-[#4DA3FF]" />;
  }
  if (fileName.endsWith('.xml')) {
    return <FileCode className="w-3.5 h-3.5 text-[#E76F00]" />;
  }
  if (fileName.endsWith('.md')) {
    return <FileText className="w-3.5 h-3.5 text-[#4DA3FF]" />;
  }
  return <FileCode className="w-3.5 h-3.5 text-slate-400" />;
};

const FileTreeItem: React.FC<{
  node: FileNode;
  level?: number;
  onFileSelect: (node: FileNode) => void;
  activePath: string;
}> = ({ node, level = 0, onFileSelect, activePath }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? true);

  if (node.type === 'folder') {
    return (
      <div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{ paddingLeft: `${level * 14 + 10}px` }}
          className="flex items-center gap-1.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#10151C] cursor-pointer text-xs rounded transition-colors"
        >
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          )}
          {isOpen ? (
            <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-[#4DA3FF]" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-blue-600 dark:text-[#4DA3FF]" />
          )}
          <span className="font-medium tracking-wide">{node.name}</span>
        </div>

        {isOpen && node.children && (
          <div className="flex flex-col">
            {node.children.map((child) => (
              <FileTreeItem
                key={child.path}
                node={child}
                level={level + 1}
                onFileSelect={onFileSelect}
                activePath={activePath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = activePath === node.path;

  return (
    <div
      onClick={() => onFileSelect(node)}
      style={{ paddingLeft: `${level * 14 + 18}px` }}
      className={`flex items-center gap-2 py-1 text-xs cursor-pointer rounded transition-colors group ${
        isSelected
          ? 'bg-emerald-50 dark:bg-[#141B24] text-emerald-950 dark:text-white font-medium border-l-2 border-emerald-600 dark:border-[#F89820]'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-[#10151C]'
      }`}
    >
      {getFileIcon(node.name, node.icon)}
      <span className="truncate">{node.name}</span>
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  const { openFile, activeTabId } = useIDEStore();

  const handleSelect = (node: FileNode) => {
    openFile(node.path, node.name, node.icon, node.language);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs">
      {/* Title */}
      <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-[#1C2636] bg-slate-100/50 dark:bg-transparent">
        <span>EXPLORER: JAVA-PORTFOLIO</span>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {fileSystem.map((root) => (
          <FileTreeItem
            key={root.path}
            node={root}
            onFileSelect={handleSelect}
            activePath={activeTabId}
          />
        ))}
      </div>
    </div>
  );
};

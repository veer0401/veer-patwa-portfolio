import React, { useState, useRef, useEffect } from 'react';
import { useIDEStore } from '../../store/ideStore';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2 } from 'lucide-react';

export const Terminal: React.FC = () => {
  const {
    isTerminalOpen,
    toggleTerminal,
    terminalLines,
    executeCommand,
    clearTerminal,
  } = useIDEStore();

  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines, isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput('');
  };

  return (
    <div
      className={`bg-[#06080B] border-t border-slate-200 dark:border-[#1C2636] flex flex-col font-mono text-xs select-text transition-all z-20 ${
        isExpanded ? 'h-96' : 'h-48'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="h-8 px-3 bg-slate-100 dark:bg-[#080A0D] border-b border-slate-200 dark:border-[#1C2636] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-[#4ADE80]" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">TERMINAL</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">veer@dev-os: ~ (zsh / bash)</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <button
            onClick={clearTerminal}
            className="p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141B24] rounded cursor-pointer"
            title="Clear Buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141B24] rounded cursor-pointer"
            title={isExpanded ? 'Restore' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleTerminal}
            className="p-1 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141B24] rounded cursor-pointer"
            title="Close Terminal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Console Buffer - Dedicated high contrast buffer */}
      <div
        className="terminal-console-buffer flex-1 overflow-y-auto p-3 space-y-1 select-text bg-[#0B0F14] text-slate-100"
        onClick={() => inputRef.current?.focus()}
      >
        {terminalLines.map((line) => {
          let lineClass = 'text-slate-300';
          if (line.type === 'input') lineClass = 'text-[#4DA3FF] font-semibold';
          if (line.type === 'error') lineClass = 'text-[#FF5C5C]';
          if (line.type === 'success') lineClass = 'text-[#4ADE80] font-semibold';
          if (line.type === 'system') lineClass = 'text-[#F89820]';

          return (
            <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${lineClass}`}>
              {line.content}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleSubmit} className="terminal-input-bar px-3 py-1.5 bg-[#080A0D] border-t border-[#1C2636] flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">veer@dev-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Try "help", "whoami", "skills", "projects", "java --version", "system"'
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-xs"
          autoFocus
        />
      </form>
    </div>
  );
};

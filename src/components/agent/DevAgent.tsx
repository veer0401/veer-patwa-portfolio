import React, { useState, useRef, useEffect } from 'react';
import { useIDEStore } from '../../store/ideStore';
import { suggestedQuestions } from '../../data/agentResponses';
import { Bot, Send, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const DevAgent: React.FC = () => {
  const {
    isAgentOpen,
    toggleAgent,
    agentState,
    agentMessages,
    sendAgentMessage,
  } = useIDEStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentMessages, agentState]);

  if (!isAgentOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || agentState !== 'IDLE') return;
    sendAgentMessage(input);
    setInput('');
  };

  const getStateBadge = () => {
    switch (agentState) {
      case 'ANALYZING':
        return <span className="text-[#FBBF24] animate-pulse">ANALYZING KNOWLEDGE BASE...</span>;
      case 'RESPONDING':
        return <span className="text-[#4DA3FF] animate-pulse">GENERATING RESPONSE...</span>;
      case 'EXECUTING':
        return <span className="text-[#4ADE80] animate-pulse">EXECUTING IDE ACTION...</span>;
      default:
        return <span className="text-[#4ADE80]">● ONLINE</span>;
    }
  };

  return (
    <aside className="w-80 sm:w-96 bg-white dark:bg-[#080A0D] border-l border-slate-200 dark:border-[#1C2636] flex flex-col h-full font-mono text-xs select-none z-20">
      {/* Header */}
      <div className="h-10 px-3 border-b border-slate-200 dark:border-[#1C2636] flex items-center justify-between bg-slate-50 dark:bg-[#06080B]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-[#00D9FF]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              DEV AGENT <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/15 text-cyan-700 dark:text-[#00D9FF]">AI</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[10px] font-semibold">{getStateBadge()}</div>
          <button
            onClick={toggleAgent}
            className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141B24] cursor-pointer"
            title="Close Dev Agent"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2 border-b border-slate-200 dark:border-[#1C2636] bg-slate-100/80 dark:bg-[#0B0F14]/50 overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
        {suggestedQuestions.slice(0, 4).map((q, i) => (
          <button
            key={i}
            onClick={() => sendAgentMessage(q)}
            disabled={agentState !== 'IDLE'}
            className="whitespace-nowrap px-2 py-1 rounded bg-white dark:bg-[#10151C] hover:bg-slate-100 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] text-[10px] text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-[#00D9FF] transition-colors cursor-pointer shrink-0 disabled:opacity-50 shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 select-text bg-slate-50/40 dark:bg-transparent">
        {agentMessages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 dark:text-slate-400">
                {isAgent ? (
                  <>
                    <Bot className="w-3 h-3 text-cyan-600 dark:text-[#00D9FF]" />
                    <span>DEV AGENT</span>
                  </>
                ) : (
                  <span>VISITOR</span>
                )}
              </div>

              <div
                className={`p-3 rounded-lg max-w-[90%] text-xs leading-relaxed ${
                  isAgent
                    ? 'bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#1C2636] text-slate-800 dark:text-slate-200 shadow-xs'
                    : 'bg-emerald-50 dark:bg-[#141B24] border border-emerald-200 dark:border-[#28374D] text-emerald-950 dark:text-[#00D9FF]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.action && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-[#1C2636] flex items-center gap-1 text-[10px] text-emerald-600 dark:text-[#4ADE80]">
                    <ChevronRight className="w-3 h-3" />
                    <span>IDE ACTION: {msg.action.replace('_', ' ').toUpperCase()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {agentState !== 'IDLE' && (
          <div className="flex items-center gap-2 p-2 text-[11px] text-amber-600 dark:text-[#F89820]">
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#F89820] animate-ping" />
            <span>Agent thinking & resolving IDE controllers...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-2 border-t border-slate-200 dark:border-[#1C2636] bg-slate-50 dark:bg-[#06080B] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, Java stack, architecture..."
          disabled={agentState !== 'IDLE'}
          className="flex-1 px-3 py-1.5 bg-white dark:bg-[#0B0F14] border border-slate-300 dark:border-[#1C2636] focus:border-cyan-500 rounded text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none text-xs disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || agentState !== 'IDLE'}
          className="px-3 py-1.5 rounded bg-cyan-100 dark:bg-[#00D9FF]/20 hover:bg-cyan-200 dark:hover:bg-[#00D9FF]/30 border border-cyan-300 dark:border-[#00D9FF]/50 text-cyan-800 dark:text-[#00D9FF] cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </aside>
  );
};

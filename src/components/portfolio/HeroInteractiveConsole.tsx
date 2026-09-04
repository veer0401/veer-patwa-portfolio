import React, { useState } from 'react';
import { Terminal, Play, Check, Layers, Cpu, Database, CheckCircle2, ArrowUpRight, Copy } from 'lucide-react';
import { useIDEStore } from '../../store/ideStore';

export const HeroInteractiveConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CODE' | 'ARCH' | 'SCALE'>('CODE');
  const [isRunning, setIsRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'controller' | 'service' | 'repo'>('service');
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const openFile = useIDEStore((s) => s.openFile);
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  const codeString = `@Component
public class VeerPatwa {
    final String role = "Software Developer";
    final String stack = "Java 21 • Spring Boot";
    final boolean ready = true;

    public boolean isAvailable() {
        return true;
    }
}`;

  const handleRunCode = () => {
    setIsRunning(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasExecuted(true);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInDevOs = () => {
    setViewMode('devos');
    openFile('/src/about/AboutDeveloper.java', 'AboutDeveloper.java', 'coffee', 'java');
  };

  return (
    <div className={`w-full rounded-xl border overflow-hidden font-mono select-none transition-all duration-200 ${
      isLight
        ? 'bg-white border-slate-300 shadow-lg'
        : 'bg-[#090D13] border-[#1C2636] shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
    }`}>
      {/* Console Window Topbar */}
      <div className={`flex items-center justify-between px-3.5 py-2.5 border-b text-xs transition-colors ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#06080B] border-[#1C2636]'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className={`ml-1 text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>console.java</span>
        </div>

        {/* Tab Switcher */}
        <div className={`flex items-center gap-1 p-0.5 rounded border transition-colors ${
          isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-[#0D1219] border-[#1C2636]'
        }`}>
          <button
            onClick={() => setActiveTab('CODE')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'CODE'
                ? (isLight ? 'bg-white text-emerald-800 shadow-xs' : 'bg-[#1C2636] text-emerald-300')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            CODE
          </button>
          <button
            onClick={() => setActiveTab('ARCH')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'ARCH'
                ? (isLight ? 'bg-white text-blue-700 shadow-xs' : 'bg-[#1C2636] text-[#4DA3FF]')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            ARCH
          </button>
          <button
            onClick={() => setActiveTab('SCALE')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'SCALE'
                ? (isLight ? 'bg-white text-amber-800 shadow-xs' : 'bg-[#1C2636] text-[#F89820]')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            SCALE
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Java Code Runner */}
      {activeTab === 'CODE' && (
        <div className="p-3.5 sm:p-4 space-y-3">
          <div className={`flex items-center justify-between text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              <Cpu className="w-3.5 h-3.5" />
              <span>OpenJDK 21 LTS</span>
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 transition-colors cursor-pointer text-[10px] sm:text-[11px] ${
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
              }`}
              title="Copy snippet"
            >
              {copied ? <Check className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Line-Numbered Mobile-Optimized Code Editor View */}
          <div className={`rounded-lg border p-2.5 sm:p-3 text-[11px] sm:text-xs leading-relaxed font-mono overflow-x-auto transition-colors ${
            isLight
              ? 'bg-slate-50/80 border-slate-200 text-slate-800'
              : 'bg-[#06080B] border-[#1C2636]/80 text-zinc-300'
          }`}>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>1</span>
              <span className={isLight ? 'text-amber-700 font-medium' : 'text-amber-400'}>@Component</span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>2</span>
              <span>
                <span className={isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}>public class</span>{' '}
                <span className={isLight ? 'text-emerald-800 font-bold' : 'text-emerald-300 font-semibold'}>VeerPatwa</span> {'{'}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>3</span>
              <span className="pl-3">
                <span className={isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}>final</span> String role ={' '}
                <span className={isLight ? 'text-emerald-700 font-medium' : 'text-emerald-400'}>"Software Developer"</span>;
              </span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>4</span>
              <span className="pl-3">
                <span className={isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}>final</span> String stack ={' '}
                <span className={isLight ? 'text-emerald-700 font-medium' : 'text-emerald-400'}>"Java 21 • Spring Boot"</span>;
              </span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>5</span>
              <span className="pl-3">
                <span className={isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}>final boolean</span> ready ={' '}
                <span className={isLight ? 'text-amber-700 font-medium' : 'text-amber-400'}>true</span>;
              </span>
            </div>
            <div className="flex items-center py-0.5">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>6</span>
              <span></span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>7</span>
              <span className="pl-3">
                <span className={isLight ? 'text-blue-700 font-medium' : 'text-blue-400'}>public boolean</span>{' '}
                <span className={isLight ? 'text-amber-700 font-semibold' : 'text-yellow-300'}>isAvailable</span>() {'{'}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>8</span>
              <span className="pl-6">
                <span className={isLight ? 'text-purple-700 font-medium' : 'text-purple-400'}>return</span>{' '}
                <span className={isLight ? 'text-amber-700 font-medium' : 'text-amber-400'}>true</span>;
              </span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>9</span>
              <span className="pl-3">{'}'}</span>
            </div>
            <div className="flex items-center">
              <span className={`w-5 select-none text-right pr-2 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>10</span>
              <span>{'}'}</span>
            </div>
          </div>

          {/* Execution Result Terminal Buffer */}
          {hasExecuted && (
            <div className={`p-2.5 rounded border text-[11px] space-y-1 animate-in fade-in duration-150 transition-colors ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-[#06080B] border-emerald-500/30 text-emerald-400'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>JVM Runtime Output:</span>
              </div>
              <p className={`text-[10px] ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                ✓ OpenJDK 21 ApplicationContext compiled in 0.4s
              </p>
              <p className={`text-[10px] font-semibold ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>
                ✓ Bean: VeerPatwa (READY_FOR_HIRE • Microservices)
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer disabled:opacity-50 ${
                isLight
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              }`}
            >
              <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
            </button>

            <button
              onClick={handleOpenInDevOs}
              className={`text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                isLight ? 'text-slate-600 hover:text-emerald-700' : 'text-zinc-400 hover:text-emerald-400'
              }`}
            >
              <span>Explore in DEV.OS</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive 3-Tier Spring Architecture */}
      {activeTab === 'ARCH' && (
        <div className="p-4 space-y-3">
          <div className={`text-[11px] flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-blue-700' : 'text-[#4DA3FF]'}`}>
              <Layers className="w-3.5 h-3.5" />
              <span>Spring Boot 3-Tier Topology</span>
            </span>
            <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Click layer to inspect</span>
          </div>

          {/* Interactive Layers */}
          <div className="space-y-1.5 text-xs">
            {/* Controller Layer */}
            <div
              onClick={() => setActiveLayer('controller')}
              className={`p-2.5 rounded border transition-all cursor-pointer ${
                activeLayer === 'controller'
                  ? (isLight ? 'border-blue-500 bg-blue-50 text-slate-900 shadow-xs' : 'border-[#4DA3FF] bg-[#101924] text-white')
                  : (isLight ? 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300' : 'border-[#1C2636] bg-[#06080B] text-zinc-400 hover:border-zinc-700')
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-[11px] ${isLight ? 'text-blue-700' : 'text-[#4DA3FF]'}`}>1. REST Controller Layer</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  isLight ? 'bg-blue-100 text-blue-800' : 'bg-[#4DA3FF]/10 text-[#4DA3FF]'
                }`}>@RestController</span>
              </div>
              {activeLayer === 'controller' && (
                <p className={`text-[10px] mt-1 font-sans leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Handles inbound HTTP requests, validation (@Valid), route mapping, and serialization.
                </p>
              )}
            </div>

            {/* Service Layer */}
            <div
              onClick={() => setActiveLayer('service')}
              className={`p-2.5 rounded border transition-all cursor-pointer ${
                activeLayer === 'service'
                  ? (isLight ? 'border-emerald-500 bg-emerald-50 text-slate-900 shadow-xs' : 'border-emerald-500 bg-[#0c1813] text-white')
                  : (isLight ? 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300' : 'border-[#1C2636] bg-[#06080B] text-zinc-400 hover:border-zinc-700')
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-[11px] ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>2. Domain Service Layer</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/10 text-emerald-400'
                }`}>@Service</span>
              </div>
              {activeLayer === 'service' && (
                <p className={`text-[10px] mt-1 font-sans leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Encapsulates business rules, transaction boundaries (@Transactional), and microservice coordination.
                </p>
              )}
            </div>

            {/* Repository Layer */}
            <div
              onClick={() => setActiveLayer('repo')}
              className={`p-2.5 rounded border transition-all cursor-pointer ${
                activeLayer === 'repo'
                  ? (isLight ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-xs' : 'border-amber-500 bg-[#1f170c] text-white')
                  : (isLight ? 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300' : 'border-[#1C2636] bg-[#06080B] text-zinc-400 hover:border-zinc-700')
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-[11px] ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>3. Data Persistence Layer</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/10 text-amber-400'
                }`}>@Repository</span>
              </div>
              {activeLayer === 'repo' && (
                <p className={`text-[10px] mt-1 font-sans leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Spring Data JPA & Hibernate ORM communicating with MySQL / PostgreSQL clusters with connection pooling.
                </p>
              )}
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px]">
            <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Clean Hexagonal Architecture</span>
            <button
              onClick={() => {
                setViewMode('devos');
                openFile('/architecture/microservices.arch', 'microservices.arch', 'network', 'architecture');
              }}
              className={`hover:underline flex items-center gap-0.5 text-[10px] ${
                isLight ? 'text-blue-700' : 'text-[#4DA3FF]'
              }`}
            >
              Full schematic <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Truthful Scale Benchmark */}
      {activeTab === 'SCALE' && (
        <div className="p-4 space-y-3">
          <div className={`text-[11px] flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-amber-800' : 'text-[#F89820]'}`}>
              <Database className="w-3.5 h-3.5" />
              <span>Cognizant Modernization Scale</span>
            </span>
            <span className={`text-[10px] font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Verified SLA</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`p-2.5 rounded border flex items-center justify-between transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#06080B] border-[#1C2636]'
            }`}>
              <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>Batch Data Volume</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>~250,000 Records</span>
            </div>

            <div className={`p-2.5 rounded border flex items-center justify-between transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#06080B] border-[#1C2636]'
            }`}>
              <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>Payload Size</span>
              <span className={`font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>250 – 260 MB</span>
            </div>

            <div className={`p-2.5 rounded border flex items-center justify-between transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#06080B] border-[#1C2636]'
            }`}>
              <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>Retrieval Duration</span>
              <span className={`font-bold font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>&lt; 1 Minute</span>
            </div>
          </div>

          <p className={`text-[10px] font-sans leading-relaxed pt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Successfully eliminated legacy Java RMI communication bottlenecks by introducing decoupled Spring Boot REST microservices.
          </p>
        </div>
      )}

      {/* Footer Info Bar */}
      <div className={`px-3.5 py-2 border-t flex items-center justify-between text-[10px] transition-colors ${
        isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-[#06080B] border-[#1C2636] text-zinc-500'
      }`}>
        <span className={`flex items-center gap-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
          <span>PORTFOLIO CONSOLE ACTIVE</span>
        </span>
        <button
          onClick={() => setViewMode('devos')}
          className={`flex items-center gap-1 transition-colors cursor-pointer ${
            isLight ? 'hover:text-slate-900 text-slate-600' : 'hover:text-zinc-300 text-zinc-500'
          }`}
        >
          <Terminal className="w-3 h-3" />
          <span>DEV.OS READY</span>
        </button>
      </div>
    </div>
  );
};

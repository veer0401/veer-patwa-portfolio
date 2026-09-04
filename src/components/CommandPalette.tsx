import React, { useState, useEffect } from 'react';
import { useIDEStore } from '../store/ideStore';
import { Search, ArrowRight, FileText, Coffee, Zap, Network, GitCommit, Bot, Terminal, Mail, ExternalLink, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import linksData from '../data/links.json';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    openFile,
    toggleTerminal,
    toggleAgent,
    setViewMode,
  } = useIDEStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateToSection = (id: string) => {
    setViewMode('hr-portfolio');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const actions = [
    {
      id: 'open-devos',
      title: 'Open DEV.OS',
      desc: 'Launch interactive developer workspace and virtual file system',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      run: () => setViewMode('devos'),
    },
    {
      id: 'open-hr-portfolio',
      title: 'Open HR Portfolio Overview',
      desc: 'Switch to executive HR-first portfolio presentation',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      run: () => setViewMode('hr-portfolio'),
    },
    {
      id: 'open-about',
      title: 'Open About',
      desc: 'Navigate to Veer Patwa profile and summary',
      icon: <Coffee className="w-4 h-4 text-amber-400" />,
      run: () => {
        navigateToSection('about');
        openFile('/src/about/AboutDeveloper.java', 'AboutDeveloper.java', 'coffee', 'java');
      },
    },
    {
      id: 'open-experience',
      title: 'Open Experience',
      desc: 'Cognizant modernization & BISAG-N career history',
      icon: <GitCommit className="w-4 h-4 text-emerald-400" />,
      run: () => {
        navigateToSection('experience');
        openFile('/src/experience/Experience.java', 'Experience.java', 'git-commit-horizontal', 'java');
      },
    },
    {
      id: 'open-projects',
      title: 'Open Projects',
      desc: 'Featured: Inventory Medical POS, Criminal Record Management, Java Shopping App',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      run: () => {
        navigateToSection('projects');
        openFile('/src/projects/InventoryMedicalPOS.java', 'InventoryMedicalPOS.java', 'coffee', 'java');
      },
    },
    {
      id: 'open-skills',
      title: 'Open Skills',
      desc: 'Java 21, Spring Boot, DSA, and backend engineering competencies',
      icon: <Code className="w-4 h-4 text-emerald-400" />,
      run: () => {
        navigateToSection('skills');
        openFile('/src/skills/JavaStack.java', 'JavaStack.java', 'coffee', 'java');
      },
    },
    {
      id: 'open-architecture',
      title: 'Open Architecture',
      desc: 'RMI to Microservices modernization & Spring layered backend model',
      icon: <Network className="w-4 h-4 text-blue-400" />,
      run: () => {
        navigateToSection('focus');
        openFile('/architecture/microservices.arch', 'microservices.arch', 'network', 'architecture');
      },
    },
    {
      id: 'open-contact',
      title: 'Open Contact',
      desc: 'Connect with Veer Patwa for engineering opportunities',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      run: () => {
        navigateToSection('contact');
        openFile('/src/contact/Contact.java', 'Contact.java', 'mail', 'java');
      },
    },
    ...(linksData.resume ? [{
      id: 'open-resume',
      title: 'Open Resume',
      desc: 'View or download Veer Patwa verified resume (PDF)',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      run: () => window.open(linksData.resume, '_blank'),
    }] : []),
    ...(linksData.github ? [{
      id: 'open-github',
      title: 'Open GitHub',
      desc: 'Visit developer GitHub profile and open-source repositories',
      icon: <ExternalLink className="w-4 h-4 text-zinc-400" />,
      run: () => window.open(linksData.github, '_blank'),
    }] : []),
    ...(linksData.linkedin ? [{
      id: 'open-linkedin',
      title: 'Open LinkedIn',
      desc: 'Connect on LinkedIn professional network',
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      run: () => window.open(linksData.linkedin, '_blank'),
    }] : []),
    ...(linksData.leetcode ? [{
      id: 'open-leetcode',
      title: 'Open LeetCode',
      desc: 'View algorithmic problem solving on LeetCode',
      icon: <ExternalLink className="w-4 h-4 text-amber-400" />,
      run: () => window.open(linksData.leetcode, '_blank'),
    }] : []),
    {
      id: 'toggle-terminal',
      title: 'Toggle Terminal CLI',
      desc: 'Open DEV.OS command line prompt',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      run: () => {
        setViewMode('devos');
        toggleTerminal();
      },
    },
    {
      id: 'toggle-agent',
      title: 'Ask DEV AGENT',
      desc: 'Local intent assistant for Veer Patwa portfolio',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      run: () => {
        setViewMode('devos');
        toggleAgent();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (isCommandPaletteOpen) {
        if (e.key === 'Escape') {
          setCommandPaletteOpen(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].run();
            setCommandPaletteOpen(false);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, filtered, selectedIndex, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4 font-mono select-none"
        onClick={() => setCommandPaletteOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[#0B0F14] border border-[#28374D] rounded-lg shadow-2xl overflow-hidden text-xs text-slate-300"
        >
          {/* Search Box */}
          <div className="flex items-center px-4 py-3 border-b border-[#1C2636] bg-[#080A0D]">
            <Search className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search portfolio..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-xs"
              autoFocus
            />
            <span className="text-[10px] text-slate-500 font-mono">ESC to exit</span>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs">
                No matching commands found.
              </div>
            ) : (
              filtered.map((action, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={action.id}
                    onClick={() => {
                      action.run();
                      setCommandPaletteOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#141B24] text-white border border-emerald-500/40'
                        : 'text-slate-300 hover:bg-[#10151C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {action.icon}
                      <div>
                        <div className="font-medium text-slate-200">{action.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{action.desc}</div>
                      </div>
                    </div>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

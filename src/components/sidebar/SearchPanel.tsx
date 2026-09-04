import React, { useState, useMemo } from 'react';
import { useIDEStore } from '../../store/ideStore';
import { Search, FileCode, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  subtitle: string;
  path: string;
  fileName: string;
  matchSnippet?: string;
}

const searchableItems: SearchResult[] = [
  { title: 'README.md', subtitle: 'Veer Patwa profile overview, core stack, role summary', path: '/README.md', fileName: 'README.md' },
  { title: 'AboutDeveloper.java', subtitle: 'Background, Java & backend engineering mindset', path: '/src/about/AboutDeveloper.java', fileName: 'AboutDeveloper.java' },
  { title: 'Experience.java', subtitle: 'Cognizant modernization & BISAG-N career timeline', path: '/src/experience/Experience.java', fileName: 'Experience.java' },
  { title: 'JavaStack.java', subtitle: 'Java 21, OOP, Collections, Streams, Concurrency, JVM', path: '/src/skills/JavaStack.java', fileName: 'JavaStack.java' },
  { title: 'SpringBoot.java', subtitle: 'Spring Boot, Spring Security, Spring Data JPA, REST APIs', path: '/src/skills/SpringBoot.java', fileName: 'SpringBoot.java' },
  { title: 'InventoryMedicalPOS.java', subtitle: 'Featured Project: Multi-tenant inventory, POS & billing system', path: '/src/projects/InventoryMedicalPOS.java', fileName: 'InventoryMedicalPOS.java' },
  { title: 'CriminalRecordManagement.cs', subtitle: 'Criminal record management & investigation workflows', path: '/src/projects/CriminalRecordManagement.cs', fileName: 'CriminalRecordManagement.cs' },
  { title: 'JavaShoppingApp.java', subtitle: 'Mobile shopping application developed in Java', path: '/src/projects/JavaShoppingApp.java', fileName: 'JavaShoppingApp.java' },
  { title: 'microservices.arch', subtitle: 'RMI to Microservices modernization & layered architecture', path: '/architecture/microservices.arch', fileName: 'microservices.arch' },
  { title: 'Contact.java', subtitle: 'Direct email, LinkedIn, GitHub, LeetCode coordinates', path: '/src/contact/Contact.java', fileName: 'Contact.java' },
  { title: 'pom.xml', subtitle: 'Maven build configuration & Spring Boot dependencies', path: '/pom.xml', fileName: 'pom.xml' },
];

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const openFile = useIDEStore((s) => s.openFile);

  const filtered = useMemo(() => {
    if (!query.trim()) return searchableItems;
    const q = query.toLowerCase();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs">
      <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1C2636]">
        SEARCH WORKSPACE
      </div>

      {/* Input */}
      <div className="p-3 border-b border-[#1C2636]">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search files, symbols, tech..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#080A0D] border border-[#1C2636] focus:border-emerald-500 rounded text-xs text-slate-200 placeholder-slate-500 outline-none"
            autoFocus
          />
        </div>
        <div className="mt-1.5 text-[10px] text-slate-400">
          {filtered.length} matching files
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((item) => (
          <div
            key={item.path}
            onClick={() => openFile(item.path, item.fileName)}
            className="p-2 rounded bg-[#0B0F14] hover:bg-[#141B24] border border-[#1C2636]/60 hover:border-emerald-500/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between text-slate-200 font-medium">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 group-hover:text-white">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                {item.title}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

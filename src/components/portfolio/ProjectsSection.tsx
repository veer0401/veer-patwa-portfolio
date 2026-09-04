import { useState } from 'react';
import { FolderGit2, Star, CheckCircle2, ChevronRight, Terminal, ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import type { ProjectItem } from '../../types/project';
import { ProjectModal } from './ProjectModal';
import { useIDEStore } from '../../store/ideStore';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const openFile = useIDEStore((s) => s.openFile);
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  const handleOpenInDevOs = (project: ProjectItem) => {
    setViewMode('devos');
    let filePath = '/src/projects/InventoryMedicalPOS.java';
    let fileName = 'InventoryMedicalPOS.java';
    let lang = 'java';

    if (project.id === 'criminal-record-management-system') {
      filePath = '/src/projects/CriminalRecordManagement.cs';
      fileName = 'CriminalRecordManagement.cs';
      lang = 'csharp';
    } else if (project.id === 'java-mobile-shopping-application') {
      filePath = '/src/projects/JavaShoppingApp.java';
      fileName = 'JavaShoppingApp.java';
    }

    openFile(filePath, fileName, 'coffee', lang);
  };

  const featured = projectsData.projects.find((p) => p.featured) || projectsData.projects[0];
  const otherProjects = projectsData.projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-white' : 'border-[#21262d] bg-[#0d1117]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-2 transition-colors ${
            isLight ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <FolderGit2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>SOFTWARE REPOSITORIES</span>
          </div>
          <h2 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Featured Projects
          </h2>
          <p className={`mt-2 text-sm font-sans max-w-2xl ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Software projects built with disciplined engineering principles, clean domain layers, and production-ready tech stacks.
          </p>
        </div>

        {/* Featured Project Showcase */}
        {featured && (
          <div className={`rounded-xl border p-6 sm:p-8 mb-10 transition-all ${
            isLight
              ? 'border-emerald-600/30 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-sm'
              : 'border-emerald-500/40 bg-gradient-to-b from-[#0e171b] to-[#0a0f14] shadow-[0_0_35px_rgba(16,185,129,0.08)]'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
              isLight ? 'border-slate-200' : 'border-zinc-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                  isLight
                    ? 'border-amber-400 bg-amber-50 text-amber-900'
                    : 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                }`}>
                  <Star className={`w-3.5 h-3.5 fill-amber-500 text-amber-500`} />
                  Primary Featured Project
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono border ${
                  isLight ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-zinc-700 bg-zinc-850 text-zinc-300'
                }`}>
                  {featured.type}
                </span>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-mono border font-medium ${
                isLight
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
              }`}>
                {featured.status}
              </span>
            </div>

            <div className="mt-6">
              <h3 className={`text-2xl sm:text-3xl font-bold font-mono transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {featured.name}
              </h3>
              <p className={`mt-3 text-sm sm:text-base leading-relaxed font-sans max-w-3xl ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}>
                {featured.description}
              </p>
            </div>

            {/* Declared Features */}
            {featured.features && featured.features.length > 0 && (
              <div className="mt-6">
                <span className={`text-xs font-mono uppercase tracking-wider block mb-2 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  System Architecture & Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featured.features.map((feat) => (
                    <div key={feat} className={`flex items-center gap-2 text-xs sm:text-sm font-sans ${
                      isLight ? 'text-slate-700' : 'text-zinc-200'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Badges */}
            <div className={`mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
              isLight ? 'border-slate-200' : 'border-zinc-800/80'
            }`}>
              <div className="flex flex-wrap items-center gap-2">
                {featured.technologies.map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      isLight
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(featured)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer ${
                    isLight
                      ? 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
                      : 'border-zinc-700 hover:border-zinc-500 bg-zinc-800 text-zinc-200'
                  }`}
                >
                  <span>Quick Spec</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenInDevOs(featured)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer ${
                    isLight
                      ? 'border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                      : 'border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Inspect in DEV.OS</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-lg border p-6 flex flex-col justify-between transition-all group ${
                isLight
                  ? 'border-slate-200 hover:border-slate-300 bg-slate-50/60 shadow-xs'
                  : 'border-zinc-800 hover:border-zinc-700 bg-[#0a0e14]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-zinc-700 bg-zinc-850 text-zinc-300'
                  }`}>
                    {proj.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    isLight
                      ? 'border-blue-300 bg-blue-50 text-blue-800'
                      : 'border-blue-500/30 bg-blue-950/30 text-blue-300'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <h4 className={`text-lg font-bold font-mono transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-400'
                }`}>
                  {proj.name}
                </h4>

                <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed font-sans ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  {proj.description}
                </p>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                        isLight ? 'border-slate-200 bg-white text-slate-700' : 'border-zinc-800 bg-zinc-900 text-zinc-300'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
                isLight ? 'border-slate-200' : 'border-zinc-800/80'
              }`}>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className={`transition-colors flex items-center gap-1 cursor-pointer ${
                    isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenInDevOs(proj)}
                  className={`transition-colors flex items-center gap-1 cursor-pointer ${
                    isLight ? 'text-emerald-700 hover:text-emerald-900' : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Open Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

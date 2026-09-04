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
    <section id="projects" className="py-20 border-b border-[#21262d] bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOFTWARE REPOSITORIES</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans max-w-2xl">
            Software projects built with disciplined engineering principles, clean domain layers, and production-ready tech stacks.
          </p>
        </div>

        {/* Featured Project Showcase */}
        {featured && (
          <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-b from-[#0e171b] to-[#0a0f14] p-6 sm:p-8 shadow-[0_0_35px_rgba(16,185,129,0.08)] mb-10">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border border-amber-500/40 bg-amber-950/30 text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Primary Featured Project
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono border border-zinc-700 bg-zinc-850 text-zinc-300">
                  {featured.type}
                </span>
              </div>
              <span className="px-3 py-1 rounded text-xs font-mono border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-medium">
                {featured.status}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                {featured.name}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-3xl">
                {featured.description}
              </p>
            </div>

            {/* Declared Features */}
            {featured.features && featured.features.length > 0 && (
              <div className="mt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  System Architecture & Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featured.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Badges */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {featured.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-xs font-mono border border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(featured)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono border border-zinc-700 hover:border-zinc-500 bg-zinc-800 text-zinc-200 transition-colors"
                >
                  <span>Quick Spec</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenInDevOs(featured)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 transition-colors"
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
              className="rounded-lg border border-zinc-800 hover:border-zinc-700 bg-[#0a0e14] p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-700 bg-zinc-850 text-zinc-300">
                    {proj.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono border border-blue-500/30 bg-blue-950/30 text-blue-300">
                    {proj.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                  {proj.name}
                </h4>

                <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenInDevOs(proj)}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
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

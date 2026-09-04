import { X, ExternalLink, Layers, CheckCircle2, Shield } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import type { ProjectItem } from '../../types/project';
import { useIDEStore } from '../../store/ideStore';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className={`relative w-full max-w-2xl rounded-lg border shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] transition-colors duration-200 ${
        isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-zinc-700 bg-[#0d1117] text-zinc-100'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-1.5 rounded transition-colors cursor-pointer ${
            isLight
              ? 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200'
              : 'text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800'
          }`}
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-medium border ${
              isLight
                ? 'border-emerald-600/30 bg-emerald-50 text-emerald-800'
                : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
            }`}>
              {project.status}
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono border ${
              isLight ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-zinc-700 bg-zinc-850 text-zinc-300'
            }`}>
              {project.type}
            </span>
            {project.featured && (
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                isLight
                  ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold'
                  : 'border-amber-500/40 bg-amber-950/30 text-amber-300'
              }`}>
                ★ Featured
              </span>
            )}
          </div>
          <h3 className={`text-2xl font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {project.name}
          </h3>
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h4 className={`text-xs font-mono uppercase tracking-wider mb-1 flex items-center gap-2 ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}>
            <Shield className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>Overview</span>
          </h4>
          <p className={`text-sm sm:text-base leading-relaxed font-sans ${
            isLight ? 'text-slate-600' : 'text-zinc-300'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-6">
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2 ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}>
              <Layers className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className={`px-3 py-1 rounded text-xs font-mono border ${
                    isLight
                      ? 'border-slate-200 bg-slate-100 text-slate-800'
                      : 'border-zinc-700 bg-zinc-850 text-zinc-200'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mt-6">
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}>
              Declared System Capabilities
            </h4>
            <ul className="space-y-2">
              {project.features.map((f, idx) => (
                <li key={idx} className={`flex items-center gap-2 text-sm font-sans ${
                  isLight ? 'text-slate-700' : 'text-zinc-300'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className={`mt-8 pt-6 border-t flex flex-wrap gap-3 ${
          isLight ? 'border-slate-200' : 'border-zinc-800'
        }`}>
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          ) : (
            <span className={`text-xs font-mono italic ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Source repository confidential / private
            </span>
          )}

          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-black font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

import { Mail, Code, FileText, Phone, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import linksData from '../../data/links.json';
import profileData from '../../data/profile.json';

export function ContactSection() {
  const hasLinks = linksData.email || linksData.linkedin || linksData.github || linksData.leetcode || linksData.phone || linksData.resume;

  return (
    <section id="contact" className="py-20 border-b border-[#21262d] bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMUNICATION CHANNEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight">
            Let&apos;s Connect
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            Interested in discussing software development, backend engineering, system architecture, or full-time opportunities?
          </p>

          <p className="mt-2 text-sm text-zinc-400 font-mono">
            Candidate Status: <span className="text-emerald-400">{profileData.status}</span>
          </p>

          {/* Action Links - Strictly only renders if populated in links.json */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {linksData.email && (
              <a
                href={`mailto:${linksData.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-mono text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Email</span>
              </a>
            )}

            {linksData.linkedin && (
              <a
                href={linksData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-blue-500/40 bg-blue-950/30 hover:bg-blue-900/40 text-blue-300 font-mono text-sm transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            )}

            {linksData.github && (
              <a
                href={linksData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 font-mono text-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}

            {linksData.leetcode && (
              <a
                href={linksData.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 font-mono text-sm transition-all"
              >
                <Code className="w-4 h-4 text-amber-400" />
                <span>LeetCode</span>
              </a>
            )}

            {linksData.resume && (
              <a
                href={linksData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-white font-mono text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Resume (PDF)</span>
              </a>
            )}

            {linksData.phone && (
              <a
                href={`tel:${linksData.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 font-mono text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{linksData.phone}</span>
              </a>
            )}

            {!hasLinks && (
              <div className="p-4 rounded border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400">
                Contact coordinates are configurable in <code className="text-emerald-400">src/data/links.json</code>.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

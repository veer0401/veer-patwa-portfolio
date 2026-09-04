import { Mail, Code, FileText, Phone, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from '../common/SocialIcons';
import linksData from '../../data/links.json';
import profileData from '../../data/profile.json';
import { useIDEStore } from '../../store/ideStore';

export function ContactSection() {
  const theme = useIDEStore((s) => s.theme);
  const isLight = theme === 'light';

  const hasLinks =
    linksData.email ||
    linksData.linkedin ||
    linksData.github ||
    linksData.whatsapp ||
    linksData.instagram ||
    linksData.leetcode ||
    linksData.phone ||
    linksData.resume;

  return (
    <section id="contact" className={`py-20 border-b transition-colors duration-200 ${
      isLight ? 'border-slate-200 bg-white' : 'border-[#21262d] bg-[#0d1117]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono mb-3 transition-colors ${
            isLight ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
          }`}>
            <MessageSquare className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>COMMUNICATION CHANNEL</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold font-mono tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Let&apos;s Connect
          </h2>

          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-sans ${
            isLight ? 'text-slate-600' : 'text-zinc-300'
          }`}>
            Interested in discussing software development, backend engineering, system architecture, or full-time opportunities?
          </p>

          <p className={`mt-2 text-sm font-mono ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Candidate Status: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'}>{profileData.status}</span>
          </p>

          {/* Action Links - Strictly only renders if populated in links.json */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {linksData.email && (
              <a
                href={`mailto:${linksData.email}`}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 shadow-xs'
                    : 'border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300'
                }`}
              >
                <Mail className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>Email ({linksData.email})</span>
              </a>
            )}

            {linksData.github && (
              <a
                href={linksData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-xs'
                    : 'border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-zinc-200'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub (veer0401)</span>
              </a>
            )}

            {linksData.whatsapp && (
              <a
                href={linksData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 shadow-xs'
                    : 'border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300'
                }`}
              >
                <WhatsAppIcon className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>WhatsApp (veerpatwa_)</span>
              </a>
            )}

            {linksData.instagram && (
              <a
                href={linksData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-fuchsia-300 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-900 shadow-xs'
                    : 'border-fuchsia-500/40 bg-fuchsia-950/30 hover:bg-fuchsia-900/40 text-fuchsia-300'
                }`}
              >
                <InstagramIcon className={`w-4 h-4 ${isLight ? 'text-fuchsia-700' : 'text-fuchsia-400'}`} />
                <span>Instagram (veerpatwa_)</span>
              </a>
            )}

            {linksData.linkedin && (
              <a
                href={linksData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 shadow-xs'
                    : 'border-blue-500/40 bg-blue-950/30 hover:bg-blue-900/40 text-blue-300'
                }`}
              >
                <LinkedinIcon className={`w-4 h-4 ${isLight ? 'text-blue-700' : 'text-blue-400'}`} />
                <span>LinkedIn</span>
              </a>
            )}

            {linksData.leetcode && (
              <a
                href={linksData.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 shadow-xs'
                    : 'border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300'
                }`}
              >
                <Code className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>LeetCode</span>
              </a>
            )}

            {linksData.resume && (
              <a
                href={linksData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
                    : 'border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-white'
                }`}
              >
                <FileText className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>Resume (PDF)</span>
              </a>
            )}

            {linksData.phone && (
              <a
                href={`tel:${linksData.phone}`}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded border font-mono text-sm transition-all ${
                  isLight
                    ? 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-xs'
                    : 'border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-zinc-200'
                }`}
              >
                <Phone className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>{linksData.phone}</span>
              </a>
            )}

            {!hasLinks && (
              <div className={`p-4 rounded border text-xs font-mono ${
                isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
              }`}>
                Contact coordinates are configurable in <code className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>src/data/links.json</code>.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

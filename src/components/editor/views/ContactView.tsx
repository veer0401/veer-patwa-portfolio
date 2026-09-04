import React, { useState } from 'react';
import profileData from '../../../data/profile.json';
import linksData from '../../../data/links.json';
import { useIDEStore } from '../../../store/ideStore';
import { Mail, Check, Copy, ExternalLink, Send, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from '../../common/SocialIcons';

export const ContactView: React.FC = () => {
  const { isAgentOpen } = useIDEStore();
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formInput, setFormInput] = useState({ name: '', email: '', message: '' });

  const codeString = `package com.veerpatwa.contact;

/**
 * Direct Communication & Network Coordinates.
 * Veer Patwa — Software Developer (Java & Backend Engineering)
 */
public class Contact {

    private final String developer = "${profileData.name}";
    private final String role      = "${profileData.title}";
    private final String status    = "${profileData.status}";
    private final String email     = "${linksData.email || 'Configured via links.json'}";
    private final String github    = "${linksData.github || 'Configured via links.json'}";
    private final String linkedin  = "${linksData.linkedin || 'Configured via links.json'}";
    private final String instagram = "${linksData.instagram || 'Configured via links.json'}";
    private final String whatsapp  = "${linksData.whatsapp || 'Configured via links.json'}";

    public boolean isAvailableForHire() {
        return true;
    }
}`;

  const handleCopyEmail = () => {
    if (!linksData.email) return;
    navigator.clipboard.writeText(linksData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.message.trim()) return;

    if (linksData.email) {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formInput.name || 'Visitor'}`);
      const body = encodeURIComponent(
        `From: ${formInput.name || 'Anonymous'}\n` +
        `Contact Email: ${formInput.email || 'Not provided'}\n\n` +
        `Inquiry Details:\n${formInput.message}\n`
      );
      window.location.href = `mailto:${linksData.email}?subject=${subject}&body=${body}`;
    }

    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setFormInput({ name: '', email: '', message: '' });
    }, 6000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Mail className="w-4 h-4" />
            <span className="font-semibold">Contact.java</span>
            <span className="text-slate-400">• src/contact/Contact.java</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-mono">
            STATUS: {profileData.status.toUpperCase()}
          </span>
        </div>

        {/* Code representation */}
        <div className="rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
            <span>Source: Contact.java</span>
            <span>Java 21</span>
          </div>

          <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed">
            <code>
              {codeString.split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="w-8 select-none text-slate-500 shrink-0 text-right pr-3">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.includes('public class') || line.includes('private final') || line.includes('return ')
                        ? 'text-blue-400'
                        : line.includes('"')
                        ? 'text-emerald-400'
                        : line.includes('//') || line.includes('/*') || line.includes(' *')
                        ? 'text-slate-500 italic'
                        : 'text-slate-200'
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Action Links - Adaptive grid with auto-fit for DevAgent open/close states */}
        <div
          className={`grid gap-2.5 sm:gap-3 ${
            isAgentOpen
              ? 'grid-cols-1 min-[480px]:grid-cols-2 min-[1180px]:grid-cols-3'
              : 'grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
          }`}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}
        >
          {linksData.email && (
            <a
              href={`mailto:${linksData.email}`}
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title={`Email: ${linksData.email}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    Direct Email
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    {linksData.email}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition-colors" />
            </a>
          )}

          {linksData.linkedin && (
            <a
              href={linksData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title="LinkedIn Profile"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    LinkedIn
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    in/veer-patwa
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 transition-colors" />
            </a>
          )}

          {linksData.github && (
            <a
              href={linksData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-slate-400/60 dark:hover:border-slate-400/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title="GitHub Profile"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-slate-500/10 border border-slate-500/30 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors truncate">
                    GitHub
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    veer0401
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0 transition-colors" />
            </a>
          )}

          {linksData.whatsapp && (
            <a
              href={linksData.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title="WhatsApp Chat"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    WhatsApp
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    @veerpatwa_
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition-colors" />
            </a>
          )}

          {linksData.instagram && (
            <a
              href={linksData.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-fuchsia-500/60 dark:hover:border-fuchsia-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title="Instagram Profile"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center shrink-0 text-fuchsia-600 dark:text-fuchsia-400 group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors truncate">
                    Instagram
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    @veerpatwa_
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 shrink-0 transition-colors" />
            </a>
          )}

          {linksData.leetcode && (
            <a
              href={linksData.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-amber-500/60 dark:hover:border-amber-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0"
              title="LeetCode Profile"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Code className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                    LeetCode
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    DSA Problem Solving
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 shrink-0 transition-colors" />
            </a>
          )}

          {linksData.email && (
            <button
              onClick={handleCopyEmail}
              className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B0F14] hover:bg-slate-50 dark:hover:bg-[#141B24] border border-slate-200 dark:border-[#1C2636] hover:border-amber-500/60 dark:hover:border-amber-500/60 transition-all duration-200 flex items-center justify-between gap-2 group shadow-2xs min-w-0 cursor-pointer text-left"
              title="Copy Email Address"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                    {copied ? 'Copied to Clipboard!' : 'Copy Email'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    {linksData.email}
                  </div>
                </div>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 transition-colors ${
                copied
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {copied ? 'COPIED' : 'COPY'}
              </span>
            </button>
          )}
        </div>

        {/* Message Dispatch Socket Simulator */}
        <div className="p-5 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-4">
          <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span>TRANSMIT INQUIRY / RECRUITMENT SPECIFICATION</span>
            <span className="text-[10px] text-emerald-400 font-mono">CHANNEL: READY</span>
          </div>

          {msgSent ? (
            <div className="p-4 rounded bg-[#080A0D] border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Inquiry prepared! Your mail client has been opened to dispatch this message directly to {linksData.email || 'Veer Patwa'}.</span>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={formInput.name}
                    onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                    placeholder="e.g. Hiring Manager"
                    className="w-full px-3 py-1.5 bg-[#080A0D] border border-[#1C2636] focus:border-emerald-500 rounded text-slate-200 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Return Email</label>
                  <input
                    type="email"
                    required
                    value={formInput.email}
                    onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                    placeholder="recruiter@company.com"
                    className="w-full px-3 py-1.5 bg-[#080A0D] border border-[#1C2636] focus:border-emerald-500 rounded text-slate-200 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Inquiry / Opportunity Details</label>
                <textarea
                  rows={3}
                  required
                  value={formInput.message}
                  onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                  placeholder="We are looking for a Java Backend Developer with Spring Boot & microservices expertise..."
                  className="w-full p-3 bg-[#080A0D] border border-[#1C2636] focus:border-emerald-500 rounded text-slate-200 outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>[ TRANSMIT INQUIRY ]</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

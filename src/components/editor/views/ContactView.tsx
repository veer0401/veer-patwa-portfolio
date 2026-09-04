import React, { useState } from 'react';
import profileData from '../../../data/profile.json';
import linksData from '../../../data/links.json';
import { Mail, Check, Copy, ExternalLink, Send, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../common/SocialIcons';

export const ContactView: React.FC = () => {
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

        {/* Action Links - Truthfully rendered from links.json */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {linksData.email && (
            <a
              href={`mailto:${linksData.email}`}
              className="p-3 rounded-lg bg-[#0B0F14] hover:bg-[#141B24] border border-emerald-500/40 text-slate-200 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>[ EMAIL ]</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </a>
          )}

          {linksData.linkedin && (
            <a
              href={linksData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-[#0B0F14] hover:bg-[#141B24] border border-blue-500/40 text-slate-200 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>[ LINKEDIN ]</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </a>
          )}

          {linksData.github && (
            <a
              href={linksData.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-[#0B0F14] hover:bg-[#141B24] border border-zinc-700 text-slate-200 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <GithubIcon className="w-4 h-4" />
                <span>[ GITHUB ]</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </a>
          )}

          {linksData.leetcode && (
            <a
              href={linksData.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-[#0B0F14] hover:bg-[#141B24] border border-amber-500/40 text-slate-200 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Code className="w-4 h-4 text-amber-400" />
                <span>[ LEETCODE ]</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </a>
          )}

          {linksData.email && (
            <button
              onClick={handleCopyEmail}
              className="p-3 rounded-lg bg-[#0B0F14] hover:bg-[#141B24] border border-zinc-700 text-slate-200 flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-400" />
                )}
                <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
              </div>
              <span className="text-[10px] text-slate-400 truncate max-w-[80px]">{linksData.email}</span>
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

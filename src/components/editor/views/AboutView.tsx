import React from 'react';
import profileData from '../../../data/profile.json';
import skillsData from '../../../data/skills.json';
import { calculateExperience } from '../../../utils/experience';
import { Coffee, Code, CheckCircle, Terminal } from 'lucide-react';

export const AboutView: React.FC = () => {
  const exp = calculateExperience(profileData.careerStartDate);

  const codeString = `package com.veerpatwa.about;

/**
 * Veer Patwa — Software Developer
 * Specialization: Java & Backend Engineering
 */
public class VeerPatwa {

    private final String role = "${profileData.title}";
    private final String primaryStack = "Java ${profileData.javaVersion} + Spring Boot";
    private final String experience = "${exp.formatted}";
    private final String status = "${profileData.status}";

    public String focus() {
        return "${profileData.specialization}";
    }

    public String[] primarySkills() {
        return new String[] {
            ${skillsData.primary.map((s) => `"${s}"`).join(',\n            ')}
        };
    }
}`;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-[#F89820]">
            <Coffee className="w-4 h-4" />
            <span className="font-semibold">AboutDeveloper.java</span>
            <span className="text-slate-400">• package com.veerpatwa.about</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20">
            OPENJDK {profileData.javaVersion} VERIFIED
          </span>
        </div>

        {/* Code representation */}
        <div className="rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
            <span>Source: /src/about/AboutDeveloper.java</span>
            <span>Java {profileData.javaVersion}</span>
          </div>

          <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed">
            <code>
              {codeString.split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="w-8 select-none text-slate-400 shrink-0 text-right pr-3">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.includes('public class') || line.includes('private final') || line.includes('package ')
                        ? 'text-[#4DA3FF]'
                        : line.includes('"')
                        ? 'text-[#6DB33F]'
                        : line.includes('//') || line.includes('/*') || line.includes(' *')
                        ? 'text-slate-400 italic'
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

        {/* Engineering Principles & Focus */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
            <h2 className="text-xs font-semibold text-[#F89820] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> Engineering Mindset
            </h2>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#4ADE80] shrink-0 mt-0.5" />
                <span><strong>Clean Architecture:</strong> Decoupled service boundaries, single responsibility, maintainable OOP.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#4ADE80] shrink-0 mt-0.5" />
                <span><strong>High-Volume Data:</strong> Scaled data retrieval pipelines with sub-minute performance constraints.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#4ADE80] shrink-0 mt-0.5" />
                <span><strong>Microservice Evolution:</strong> Practical migration from monolithic/RMI to decoupled REST microservices.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
            <h2 className="text-xs font-semibold text-[#4DA3FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Developer Profile
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-400">Name:</span> <span className="text-white font-semibold">{profileData.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Role:</span> <span className="text-emerald-400">{profileData.title}</span>
              </div>
              <div>
                <span className="text-slate-400">Experience:</span> <span className="text-slate-200">{exp.formatted} ({exp.detailed})</span>
              </div>
              <div>
                <span className="text-slate-400">Specialization:</span> <span className="text-slate-200">{profileData.specialization}</span>
              </div>
              <div>
                <span className="text-slate-400">Summary:</span> <span className="text-slate-300">{profileData.summary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

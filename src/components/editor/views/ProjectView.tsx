import React, { useState } from 'react';
import projectsData from '../../../data/projects.json';
import { Zap, CheckCircle, ExternalLink, Code, Layers, FileText } from 'lucide-react';
import { GithubIcon } from '../../common/SocialIcons';

interface ProjectViewProps {
  projectId: string;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ projectId }) => {
  const project = projectsData.projects.find((p) => p.id === projectId) || projectsData.projects[0];
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'CODE' | 'SPEC'>('OVERVIEW');

  // Short readable code snippet
  const getCodeSnippet = () => {
    if (project.id === 'inventory-medical-pos') {
      return `package com.veerpatwa.pos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Inventory Medical POS & Billing Engine
 * Multi-tenant architecture for medical & retail workflows.
 */
@SpringBootApplication
@EnableJpaRepositories
public class InventoryMedicalPosApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryMedicalPosApplication.class, args);
    }
}`;
    } else if (project.id === 'criminal-record-management-system') {
      return `namespace CriminalRecordManagement
{
    using System;
    using System.Threading.Tasks;

    /// <summary>
    /// Criminal Record Management System for investigation agencies.
    /// Built with C# and ASP.NET.
    /// </summary>
    public class RecordInvestigationService
    {
        public async Task ProcessCaseWorkflowAsync(string caseId)
        {
            // Case lifecycle and record workflows
            await Task.CompletedTask;
        }
    }
}`;
    } else {
      return `package com.veerpatwa.shopping;

/**
 * Java Mobile Shopping Application
 * Mobile shopping workflow built using Java.
 */
public class ShoppingApplication {

    public static void main(String[] args) {
        System.out.println("Starting Java Mobile Shopping Application...");
    }
}`;
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">PROJECT WORKSPACE</span>
              <span className="text-slate-400">• {project.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              {project.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              STATUS: {project.status.toUpperCase()}
            </span>
            <span className="text-[11px] text-zinc-400">
              {project.type}
            </span>
          </div>
        </div>

        {/* Stack Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-2">TECH STACK:</span>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded text-xs bg-[#0B0F14] text-emerald-300 border border-emerald-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Sub-Tabs: OVERVIEW | CODE | SPEC */}
        <div className="border-b border-[#1C2636] flex gap-2 text-xs">
          {(['OVERVIEW', 'CODE', 'SPEC'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
                activeSubTab === tab
                  ? 'border-emerald-400 text-slate-100 bg-[#0B0F14]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeSubTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-3">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Project Overview
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="p-5 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
                  Declared Architecture Capabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded bg-[#10151C] hover:bg-[#141B24] border border-[#1C2636] text-slate-200 text-xs flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Deployment</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: CODE */}
        {activeSubTab === 'CODE' && (
          <div className="rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                Source Sample
              </span>
              <span>{project.technologies[0] || 'Code'}</span>
            </div>

            <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed">
              <code>
                {getCodeSnippet().split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 select-none text-slate-500 shrink-0 text-right pr-3">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.startsWith('@')
                          ? 'text-amber-400'
                          : line.includes('public class') || line.includes('namespace') || line.includes('package ')
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
        )}

        {/* Tab 3: SPEC */}
        {activeSubTab === 'SPEC' && (
          <div className="p-5 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-4">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Repository Specifications
            </h3>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500">Repository Identifier:</span>
                <span className="text-zinc-200 font-mono">{project.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500">Project Classification:</span>
                <span className="text-zinc-200">{project.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500">Current Phase:</span>
                <span className="text-emerald-400">{project.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500">Primary Language:</span>
                <span className="text-zinc-200">{project.technologies[0]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

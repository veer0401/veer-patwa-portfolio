import React from 'react';
import { Leaf, Layers, Shield, Database, Cpu } from 'lucide-react';
import skillsData from '../../../data/skills.json';

export const SpringBootView: React.FC = () => {
  const codeString = `package com.veerpatwa.profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Spring Boot Architecture Configuration
 * Enterprise microservices, REST APIs, and database persistence.
 */
@SpringBootApplication
@EnableJpaRepositories
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`;

  const architectureLayers = [
    {
      title: 'REST API & Web MVC',
      desc: 'Controllers, DTO Validation, Global Exception Handling, HTTP status semantics.',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      badge: 'REST APIs',
    },
    {
      title: 'Spring Security',
      desc: 'Authentication filters, authorization controls, and secure endpoint protection.',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      badge: 'Auth Security',
    },
    {
      title: 'Service & Domain Layer',
      desc: 'Transactional business logic (@Transactional), domain models, and service decomposition.',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      badge: 'Domain Logic',
    },
    {
      title: 'Spring Data JPA & MySQL',
      desc: 'Repository interfaces, entity mappings, query handling, and transactional database persistence.',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      badge: 'Persistence',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Leaf className="w-4 h-4" />
            <span className="font-semibold">SpringBoot.java</span>
            <span className="text-slate-400">• src/skills/SpringBoot.java</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
            SPRING BOOT 3.x SPECIFICATION
          </span>
        </div>

        {/* Code + Architecture Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Code Snippet */}
          <div className="lg:col-span-7 rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
              <span>Source: Application.java</span>
              <span>Java 21 • Spring Boot</span>
            </div>

            <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed flex-1">
              <code>
                {codeString.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 select-none text-slate-500 shrink-0 text-right pr-3">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.startsWith('@')
                          ? 'text-emerald-400 font-semibold'
                          : line.includes('public class') || line.includes('public static') || line.includes('import ')
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

          {/* Right: Spring Architecture Stack */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center justify-between">
              <span>Spring Architecture Topology</span>
              <span className="text-[10px] text-emerald-400 font-mono">4 Layers</span>
            </div>

            <div className="space-y-2">
              {architectureLayers.map((layer) => (
                <div
                  key={layer.title}
                  className="p-3 rounded bg-[#0B0F14] border border-[#1C2636] hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-100">
                      {layer.icon}
                      <span>{layer.title}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10151C] text-emerald-400 border border-emerald-500/30">
                      {layer.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                    {layer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Declared Spring Technologies */}
        <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636]">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Spring Technologies in Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillsData.categories.spring.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded text-xs bg-[#080A0D] border border-emerald-500/30 text-emerald-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

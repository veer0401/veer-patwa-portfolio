import type { ExperienceEntry } from '../types';
import experienceData from './experience.json';

// Single Source of Truth: Experience mapped directly from experience.json
export const experience: ExperienceEntry[] = experienceData.experiences.map((e, idx) => ({
  id: `exp-${idx + 1}`,
  year: e.current ? `${e.startDate?.slice(0, 4) || '2025'} – Present` : `${e.startDate?.slice(0, 4) || '2025'} – ${e.endDate?.slice(0, 4) || '2025'}`,
  role: e.role,
  company: e.company,
  highlights: e.highlights || [e.description],
  technologies: e.technologies || [],
}));

// Real truthful repository commit milestones
export const gitCommits = [
  { hash: "7f4a10c", message: "feat(portfolio): implement HR-First personal portfolio & DEV.OS IDE workspace", time: "Recent", branch: "main" },
  { hash: "3e8b5d2", message: "feat(pos): configure Spring Boot 3 multi-tenant medical inventory & billing engine", time: "Milestone", branch: "main" },
  { hash: "9a2c4e1", message: "perf(migration): modernize legacy RMI to Spring Boot REST microservices (~250K records)", time: "Milestone", branch: "main" },
  { hash: "1d6f8a3", message: "feat(crms): build C# ASP.NET criminal record investigation lifecycle modules", time: "Milestone", branch: "main" },
  { hash: "5b7e2c9", message: "feat(mobile): implement Java Android shopping catalog & SQLite offline cart", time: "Milestone", branch: "main" },
  { hash: "8c3d1f4", message: "ci: configure Maven build, Docker multi-stage containerization & verification pipelines", time: "Milestone", branch: "main" },
  { hash: "2a9e7b6", message: "docs: formalize JVM memory architecture and 5-layer Spring Boot flow specifications", time: "Milestone", branch: "main" },
];

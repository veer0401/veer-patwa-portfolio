export * from './profile';
export * from './experience';
export * from './project';
export * from './skill';
export * from './education';
export * from './links';
export * from './architecture';
export * from './site';

// ── File System ──────────────────────────────────────────────

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  icon?: string;
  language?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

// ── Editor ───────────────────────────────────────────────────

export interface Tab {
  id: string;
  name: string;
  path: string;
  language?: string;
  icon?: string;
  isActive?: boolean;
}

export type ViewType =
  | 'readme'
  | 'about'
  | 'javastack'
  | 'springboot'
  | 'backend'
  | 'systemdesign'
  | 'project'
  | 'experience'
  | 'contact'
  | 'pomxml'
  | 'architecture'
  | 'architecture3d'
  | 'jvm'
  | 'observability'
  | 'resume'
  | 'code';

// ── Sidebar ──────────────────────────────────────────────────

export type SidebarPanel =
  | 'explorer'
  | 'search'
  | 'projects'
  | 'architecture'
  | 'skills'
  | 'terminal'
  | 'agent'
  | 'git';

// ── Agent ────────────────────────────────────────────────────

export type Intent =
  | 'about'
  | 'java'
  | 'spring'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'architecture'
  | 'contact'
  | 'github'
  | 'resume'
  | 'system'
  | 'database'
  | 'unknown';

export type AgentAction =
  | 'open_about'
  | 'open_java'
  | 'open_spring'
  | 'open_skills'
  | 'open_projects'
  | 'open_experience'
  | 'open_architecture'
  | 'open_contact'
  | 'open_resume'
  | 'open_database'
  | 'system_status';

export interface AgentResponse {
  text: string;
  action?: AgentAction;
}

export type AgentState =
  | 'IDLE'
  | 'LISTENING'
  | 'ANALYZING'
  | 'RESPONDING'
  | 'EXECUTING';

export interface AgentMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  action?: AgentAction;
  state?: AgentState;
  timestamp: number;
}

// ── Terminal ─────────────────────────────────────────────────

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
  timestamp?: number;
}

// ── Command Palette ──────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => void;
  keywords?: string[];
}

// ── Boot ─────────────────────────────────────────────────────

export interface BootStep {
  label: string;
  status: 'pending' | 'loading' | 'done';
  duration: number;
}

export type AppViewMode = 'hr-portfolio' | 'devos' | 'not-found';

// ── Backward Compatible / Visualizer Types ───────────────────

export interface ArchNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'broker';
  connections: string[];
}

export interface ProjectMetrics {
  requests: string;
  latency: string;
  uptime: string;
  throughput: string;
}

export interface Project {
  id: string;
  name: string;
  fileName: string;
  status: string;
  description: string;
  stack: string[];
  architecture?: ArchNode[];
  features?: string[];
  metrics?: Partial<ProjectMetrics> | Record<string, string>;
  liveUrl?: string;
  sourceUrl?: string;
  codeSnippet?: string;
}

export interface ExperienceEntry {
  id: string;
  year: string;
  role: string;
  company: string;
  highlights: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: 'advanced' | 'intermediate' | 'familiar';
  years?: number;
  related?: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  items: Skill[];
}

export interface ServiceNode {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'broker';
  x: number;
  y: number;
  stack?: string[];
  connections: string[];
  description?: string;
}

export type ThemeMode = 'dark' | 'light';


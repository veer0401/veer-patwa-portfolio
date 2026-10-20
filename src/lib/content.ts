import profile from '../data/profile.json';
import links from '../data/links.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import education from '../data/education.json';

export { profile, links, projects, skills, education };

export interface Metric {
  value: string;
  label: string;
}

export interface CaseSection {
  heading: string;
  body?: string[];
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  kicker: string;
  role: string;
  period: string;
  status: string;
  summary: string;
  stack: string[];
  metrics: Metric[];
  diagram: 'migration' | 'platform' | null;
  sections: CaseSection[];
}

/*
 * Case studies are written at a public-safe level: goals, approach and outcomes.
 * Client-internal designs and detailed product features are intentionally left out.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'mercury',
    title: 'Mercury Rewrite',
    kicker: 'Cognizant · American Airlines',
    role: 'Programmer Analyst Trainee',
    period: 'Mar 2026 – Present',
    status: 'In progress',
    summary:
      'Part of the team moving a legacy Java RMI, in-memory system onto Java microservices backed by Couchbase.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Couchbase', 'Angular', 'REST APIs', 'Agentic AI'],
    metrics: [
      { value: '250K', label: 'fares loaded into the UI' },
      { value: '42M', label: 'records in the source dataset' },
      { value: '40–50', label: 'columns per fare' },
    ],
    diagram: 'migration',
    sections: [
      {
        heading: 'Context',
        body: [
          'A large airline platform ran on Java RMI, with most of its working data held in memory and cache. The rewrite moves it to Java microservices with Couchbase as the data layer.',
          'I joined the project in March 2026, straight after three months of Java and Angular training.',
        ],
      },
      {
        heading: 'The hard problem',
        body: [
          'Users need to see a very large set of fares, each with 40 to 50 columns, and sort by any column. The database could not sort on every one of those columns.',
        ],
      },
      {
        heading: 'What I did',
        bullets: [
          'Proved a working approach: a proof of concept that retrieves 250K fares out of a 42-million-record Couchbase dataset and renders them in the UI, so sorting works on every column.',
          'Built an agentic mesh proof of concept by extending an open-source repository with custom AI agents. The team now uses them to speed up development.',
          'Owned a feature end to end. A design discussion during that work led me to create ops-core, a framework that other modules of the project now reuse.',
        ],
      },
      {
        heading: 'Outcome',
        body: ['Written recognition from the Project Manager for the quality of delivery as a fresher.'],
      },
      {
        heading: 'A note on detail',
        body: [
          'This is client work, so I only share goals, approach and outcomes. Internal designs, screens and code are not published.',
        ],
      },
    ],
  },
  {
    slug: 'inventra',
    title: 'Inventra',
    kicker: 'Personal product · In development',
    role: 'Designer and sole developer',
    period: 'Aug 2026 – Present',
    status: 'Active development',
    summary:
      'An offline-first, multi-tenant platform for pharmacies, designed and built end to end by one person.',
    stack: ['Java 17', 'Spring Boot 4', 'PostgreSQL', 'React', 'TypeScript', 'Tauri', 'Docker'],
    metrics: [
      { value: '17', label: 'backend modules' },
      { value: '267', label: 'passing backend tests' },
      { value: '9', label: 'shared frontend packages' },
      { value: '19', label: 'database migrations' },
    ],
    diagram: 'platform',
    sections: [
      {
        heading: 'Why I built it',
        body: [
          'Business software often stops working when the internet does, and gets messy when several businesses share one system. I wanted a platform that keeps working offline and keeps every customer’s data separate.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'A modular Java backend (Spring Boot, PostgreSQL) with 17 modules and tenant-isolated data.',
          'A React web app and a Tauri desktop app that share one UI codebase through a runtime adapter.',
          'The desktop app queues work in a local SQLite database and syncs to the server idempotently when the connection returns.',
          'A pnpm and Turborepo monorepo with 9 shared packages.',
        ],
      },
      {
        heading: 'Engineering practice',
        bullets: [
          'I audited my own repository for module dependency cycles and for drift between backend contracts and TypeScript types, and logged what I found.',
          '267 backend tests pass, and the frontend packages have Vitest suites.',
        ],
      },
      {
        heading: 'Status',
        body: [
          'In active development. The repository is private for now and a link will be added when it is public. Detailed product features are not shared yet.',
        ],
      },
    ],
  },
  {
    slug: 'crime-vault',
    title: 'Crime Vault',
    kicker: 'Academic project',
    role: 'Developer',
    period: 'Jan 2025 – Apr 2025',
    status: 'Completed',
    summary: 'A secure, role-based case management system built on .NET 8.',
    stack: ['.NET 8', 'C#', 'ASP.NET Identity', 'Entity Framework', 'MS SQL Server'],
    metrics: [],
    diagram: null,
    sections: [
      {
        heading: 'Overview',
        body: [
          'A system for crime tracking and case management where what you can see depends on your role.',
        ],
        bullets: [
          'Role-based access control with access-controlled dashboards.',
          'Team assignments and case management.',
          'Internal messaging with activity logging, and secure file uploads.',
        ],
      },
    ],
  },
];

export interface TimelineItem {
  when: string;
  title: string;
  where: string;
  note: string;
}

export const timeline: TimelineItem[] = [
  {
    when: 'Aug 2026',
    title: 'Started Inventra',
    where: 'Personal product',
    note: 'Designing and building an offline-first, multi-tenant platform end to end.',
  },
  {
    when: 'Mar 2026',
    title: 'Joined Mercury Rewrite',
    where: 'Cognizant · American Airlines',
    note: 'Fares proof of concept, agentic mesh proof of concept, and the ops-core framework.',
  },
  {
    when: 'Nov 2025',
    title: 'Programmer Analyst Trainee',
    where: 'Cognizant',
    note: 'Three months of Java and Angular training, then onto a client project.',
  },
  {
    when: 'Feb – May 2025',
    title: 'Intern',
    where: 'BISAG-N, Gandhinagar',
    note: 'Built a quantum-resistant VPN with Kyber and Dilithium on StrongSwan.',
  },
  {
    when: '2021 – 2025',
    title: 'B.Tech, Computer Science and Engineering',
    where: 'Indus University, Ahmedabad',
    note: 'CGPA 9.05.',
  },
];

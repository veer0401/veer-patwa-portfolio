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
    slug: 'migration',
    title: 'Legacy-to-Microservices Migration',
    kicker: 'Cognizant',
    role: 'Programmer Analyst Trainee',
    period: 'Mar 2026 – Present',
    status: 'In progress',
    summary:
      'Part of the team moving a legacy Java RMI, in-memory system onto Java microservices backed by Couchbase.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Couchbase', 'Angular', 'Agentic AI'],
    metrics: [
      { value: '250K', label: 'fares loaded into the UI' },
      { value: '~8x', label: 'faster than the database query (~8 min to ~45–60 s)' },
      { value: '3', label: 'modules reusing the ops-core framework' },
    ],
    diagram: 'migration',
    sections: [
      {
        heading: 'Context',
        body: [
          'A large enterprise platform ran on Java RMI, with most of its working data held in memory and cache. The rewrite moves it to Java microservices with Couchbase as the data layer.',
          'I joined the project in March 2026, straight after three months of Java and Angular training.',
        ],
      },
      {
        heading: 'The hard problem',
        body: [
          'Users need to see a very large set of fares, each with 30+ columns, and sort and filter by any column. A draft table would have broken sorting and filtering, and the legacy approach of holding the data in server memory or cache was one the client did not want to repeat.',
        ],
      },
      {
        heading: 'What I did',
        bullets: [
          'Proved a working approach: a proof of concept that loads 250K fares out of a 42-million-record Couchbase dataset straight into the UI, so sorting and filtering work on every column.',
          'Replaced an expensive row-by-partition query (about 8 minutes for 250K rows in the Couchbase console) with Couchbase key-value lookups and in-memory deduplication in Java. Database to UI now takes roughly 45 to 60 seconds.',
          'Built an agentic mesh by extending an open-source repository with custom AI agents. Business analysts and developers use it to generate user stories and estimate effort from core-logic difficulty, turning roughly two days of analyst work into about an hour and a day of developer estimation into about thirty minutes (approximate figures).',
          'Owned the Marketlist feature end to end. A design discussion during that work led me to create ops-core, a framework now used by three modules, with more planned.',
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
    period: 'May 2026 – Present',
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
];

export interface TimelineItem {
  when: string;
  title: string;
  where: string;
  note: string;
}

export const timeline: TimelineItem[] = [
  {
    when: 'May 2026',
    title: 'Started Inventra',
    where: 'Personal product',
    note: 'Designing and building an offline-first, multi-tenant platform end to end.',
  },
  {
    when: 'Mar 2026',
    title: 'Joined the migration project',
    where: 'Cognizant',
    note: 'Fares proof of concept, agentic mesh, and the ops-core framework.',
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

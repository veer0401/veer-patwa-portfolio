import { ArrowDown } from 'lucide-react';

/* Generic architecture diagrams. They use theme variables so they work in both themes. */

const box = {
  fill: 'color-mix(in srgb, var(--ink) 6%, transparent)',
  stroke: 'color-mix(in srgb, var(--ink) 20%, transparent)',
  strokeWidth: 1.5,
} as const;
const accentBox = {
  fill: 'color-mix(in srgb, var(--accent) 12%, transparent)',
  stroke: 'var(--accent)',
  strokeWidth: 1.5,
} as const;
const label = { fill: 'var(--ink)', fontSize: 13, fontWeight: 600 } as const;
const sub = { fill: 'var(--muted)', fontSize: 11 } as const;
const arrow = { stroke: 'var(--muted)', strokeWidth: 1.5, fill: 'none', markerEnd: 'url(#arr)' } as const;

function Defs() {
  return (
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
      </marker>
    </defs>
  );
}

export function MigrationDiagram() {
  return (
    <svg
      className="diagram w-full"
      viewBox="0 0 760 190"
      role="img"
      aria-label="Migration from a Java RMI in-memory system to Java microservices on Couchbase, feeding a sortable UI"
    >
      <Defs />
      <rect x="10" y="40" width="200" height="100" rx="10" {...box} />
      <text x="110" y="82" textAnchor="middle" {...label}>Legacy</text>
      <text x="110" y="102" textAnchor="middle" {...sub}>Java RMI</text>
      <text x="110" y="118" textAnchor="middle" {...sub}>in-memory / cache</text>

      <path d="M214 90 H292" {...arrow} />
      <text x="253" y="80" textAnchor="middle" {...sub}>migrate</text>

      <rect x="296" y="40" width="210" height="100" rx="10" {...accentBox} />
      <text x="401" y="82" textAnchor="middle" {...label}>Java microservices</text>
      <text x="401" y="102" textAnchor="middle" {...sub}>Couchbase data layer</text>
      <text x="401" y="118" textAnchor="middle" {...sub}>42M records</text>

      <path d="M510 90 H558" {...arrow} />
      <text x="534" y="80" textAnchor="middle" {...sub}>250K</text>

      <rect x="562" y="40" width="188" height="100" rx="10" {...box} />
      <text x="656" y="82" textAnchor="middle" {...label}>UI</text>
      <text x="656" y="102" textAnchor="middle" {...sub}>40–50 columns</text>
      <text x="656" y="118" textAnchor="middle" {...sub}>sort on any column</text>
    </svg>
  );
}

export function PlatformDiagram() {
  return (
    <svg
      className="diagram w-full"
      viewBox="0 0 760 290"
      role="img"
      aria-label="Web and desktop clients share one UI, talk to a modular Spring Boot API backed by PostgreSQL; the desktop queues work offline and syncs"
    >
      <Defs />
      {/* clients */}
      <rect x="10" y="20" width="150" height="56" rx="10" {...box} />
      <text x="85" y="46" textAnchor="middle" {...label}>Web app</text>
      <text x="85" y="63" textAnchor="middle" {...sub}>React</text>

      <rect x="10" y="130" width="150" height="56" rx="10" {...box} />
      <text x="85" y="156" textAnchor="middle" {...label}>Desktop app</text>
      <text x="85" y="173" textAnchor="middle" {...sub}>Tauri</text>

      <rect x="10" y="224" width="150" height="50" rx="10" {...box} />
      <text x="85" y="246" textAnchor="middle" {...label}>Local queue</text>
      <text x="85" y="263" textAnchor="middle" {...sub}>SQLite</text>

      {/* shared ui bracket */}
      <rect x="196" y="60" width="130" height="90" rx="10" {...box} />
      <text x="261" y="98" textAnchor="middle" {...label}>Shared UI</text>
      <text x="261" y="116" textAnchor="middle" {...sub}>9 packages</text>
      <text x="261" y="132" textAnchor="middle" {...sub}>runtime adapter</text>

      <path d="M164 48 L192 90" {...arrow} />
      <path d="M164 158 L192 124" {...arrow} />
      <path d="M85 190 V220" {...arrow} />

      {/* api */}
      <rect x="380" y="60" width="180" height="90" rx="10" {...accentBox} />
      <text x="470" y="98" textAnchor="middle" {...label}>Spring Boot API</text>
      <text x="470" y="116" textAnchor="middle" {...sub}>17 modules</text>
      <text x="470" y="132" textAnchor="middle" {...sub}>JWT · multi-tenant</text>
      <path d="M330 105 H376" {...arrow} />

      {/* db */}
      <rect x="610" y="60" width="140" height="90" rx="10" {...box} />
      <text x="680" y="98" textAnchor="middle" {...label}>PostgreSQL</text>
      <text x="680" y="116" textAnchor="middle" {...sub}>19 migrations</text>
      <text x="680" y="132" textAnchor="middle" {...sub}>tenant-isolated</text>
      <path d="M564 105 H606" {...arrow} />

      {/* offline sync */}
      <path d="M164 249 H470 V154" {...arrow} strokeDasharray="5 4" />
      <text x="320" y="240" textAnchor="middle" {...sub}>idempotent sync when back online</text>
    </svg>
  );
}

/* ---------- Phone versions: the SVGs above get too small to read, so stack the same story vertically ---------- */

function Node({ title, lines, accent }: { title: string; lines: string[]; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${accent ? 'border-accent bg-accent/10' : 'border-ink/15 bg-ink/5'}`}>
      <p className="font-mono text-sm font-semibold">{title}</p>
      {lines.map((l) => (
        <p key={l} className="font-mono text-xs text-muted">
          {l}
        </p>
      ))}
    </div>
  );
}

function Link({ label, dashed }: { label?: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1.5 pl-6 font-mono text-xs text-muted">
      <ArrowDown className={`h-4 w-4 ${dashed ? 'opacity-60' : ''}`} aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}

export function MigrationFlow() {
  return (
    <div role="img" aria-label="Migration from a Java RMI in-memory system to Java microservices on Couchbase, feeding a sortable UI">
      <Node title="Legacy" lines={['Java RMI', 'in-memory / cache']} />
      <Link label="migrate" />
      <Node accent title="Java microservices" lines={['Couchbase data layer', '42M records']} />
      <Link label="250K fares" />
      <Node title="UI" lines={['40–50 columns', 'sort on any column']} />
    </div>
  );
}

export function PlatformFlow() {
  return (
    <div role="img" aria-label="Web and desktop clients share one UI and talk to a Spring Boot API backed by PostgreSQL; the desktop queues work offline and syncs">
      <div className="grid grid-cols-2 gap-2">
        <Node title="Web app" lines={['React']} />
        <Node title="Desktop app" lines={['Tauri']} />
      </div>
      <Link />
      <Node title="Shared UI" lines={['9 packages', 'runtime adapter']} />
      <Link />
      <Node accent title="Spring Boot API" lines={['17 modules', 'JWT · multi-tenant']} />
      <Link />
      <Node title="PostgreSQL" lines={['19 migrations', 'tenant-isolated']} />
      <div className="mt-4 rounded-2xl border border-dashed border-ink/25 px-4 py-3">
        <p className="font-mono text-sm font-semibold">Offline queue</p>
        <p className="font-mono text-xs text-muted">Desktop keeps working offline in local SQLite and syncs idempotently when it is back online.</p>
      </div>
    </div>
  );
}

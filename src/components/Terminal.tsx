import { useEffect, useState } from 'react';

interface Line {
  cmd: string;
  out: string[];
}

const lines: Line[] = [
  { cmd: 'whoami', out: ['veer patwa · backend engineer'] },
  { cmd: 'cat stack.txt', out: ['java · spring boot · couchbase · react'] },
  { cmd: 'ls work/', out: ['mercury-rewrite/  inventra/'] },
  { cmd: 'status', out: ['● open to opportunities'] },
];

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** A small faux terminal that types itself once. Static when motion is reduced. */
export function Terminal() {
  const total = lines.reduce((n, l) => n + l.cmd.length, 0);
  const [typed, setTyped] = useState(() => (reduced() ? total : 0));

  useEffect(() => {
    if (typed >= total) return;
    const id = setTimeout(() => setTyped((t) => t + 1), typed === 0 ? 700 : 42);
    return () => clearTimeout(id);
  }, [typed, total]);

  const rendered = lines.map((line, i) => {
    const before = lines.slice(0, i).reduce((n, l) => n + l.cmd.length, 0);
    const shown = Math.max(0, Math.min(line.cmd.length, typed - before));
    const done = shown === line.cmd.length;
    const started = shown > 0 || i === 0;
    return { line, shown, done, started, key: i };
  });
  const activeIndex = rendered.findIndex((r) => !r.done);

  return (
    <div className="glass overflow-hidden rounded-3xl" aria-label="Terminal introduction">
      <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-muted">veer@portfolio: ~</span>
      </div>
      <div className="min-h-[216px] space-y-3 p-4 sm:p-5 font-mono text-[13px] leading-relaxed">
        {rendered.map(({ line, shown, done, started, key }) =>
          started ? (
            <div key={key}>
              <div>
                <span className="text-accent">$</span>{' '}
                <span className={key === activeIndex ? 'cursor' : ''}>{line.cmd.slice(0, shown)}</span>
              </div>
              {done && line.out.map((o) => (
                <div key={o} className={o.startsWith('●') ? 'text-accent' : 'text-muted'}>
                  {o}
                </div>
              ))}
            </div>
          ) : null,
        )}
        {activeIndex === -1 && (
          <div>
            <span className="text-accent">$</span> <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

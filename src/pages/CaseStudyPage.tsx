import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { go } from '../lib/app';
import { caseStudies } from '../lib/content';
import { MigrationDiagram, MigrationFlow, PlatformDiagram, PlatformFlow } from '../components/Diagrams';
import { Chip, Reveal } from '../components/ui';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold">That page does not exist</h1>
      <button type="button" onClick={() => go('/')} className="mt-6 text-accent underline underline-offset-4">
        Back to home
      </button>
    </div>
  );
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const study = caseStudies[index];

  useEffect(() => {
    if (study) document.title = `${study.title} · Veer Patwa`;
    return () => {
      document.title = 'Veer Patwa | Backend Engineer';
    };
  }, [study]);

  if (!study) return <NotFound />;
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="mx-auto max-w-3xl px-4 pb-8 pt-6 sm:px-6 sm:py-16">
      <button
        type="button"
        onClick={() => go('/#work')}
        className="inline-flex items-center gap-1.5 py-2 font-mono text-xs text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> all work
      </button>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{study.kicker}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{study.title}</h1>
        <p className="mt-4 text-lg text-muted">{study.summary}</p>
        <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:divide-y-0 sm:py-4">
          <div className="flex items-baseline justify-between gap-4 py-2.5 sm:block sm:py-0">
            <dt className="font-mono text-xs text-muted">role</dt>
            <dd className="text-right font-medium sm:mt-0.5 sm:text-left">{study.role}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2.5 sm:block sm:py-0">
            <dt className="font-mono text-xs text-muted">period</dt>
            <dd className="text-right font-medium sm:mt-0.5 sm:text-left">{study.period}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2.5 sm:block sm:py-0">
            <dt className="font-mono text-xs text-muted">status</dt>
            <dd className="text-right font-medium sm:mt-0.5 sm:text-left">{study.status}</dd>
          </div>
        </dl>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {study.stack.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>
      </header>

      {study.metrics.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="glass rounded-2xl p-4">
              <dt className="font-mono text-2xl font-bold text-accent">{m.value}</dt>
              <dd className="mt-1 text-xs text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {study.diagram && (
        <Reveal className="glass mt-8 rounded-3xl p-4 sm:mt-10 sm:p-6">
          <div className="hidden sm:block">{study.diagram === 'migration' ? <MigrationDiagram /> : <PlatformDiagram />}</div>
          <div className="sm:hidden">{study.diagram === 'migration' ? <MigrationFlow /> : <PlatformFlow />}</div>
        </Reveal>
      )}

      <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
        {study.sections.map((s) => (
          <Reveal key={s.heading}>
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">{s.heading}</h2>
              {s.body?.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-ink/90">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-ink/90">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      <nav className="mt-16 pt-2" aria-label="Next case study">
        <button
          type="button"
          onClick={() => go(`/work/${next.slug}`)}
          className="glass glass-hover group flex w-full items-center justify-between rounded-3xl p-6 text-left"
        >
          <span>
            <span className="block font-mono text-xs text-muted">next</span>
            <span className="text-lg font-bold">{next.title}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
        </button>
      </nav>
    </article>
  );
}

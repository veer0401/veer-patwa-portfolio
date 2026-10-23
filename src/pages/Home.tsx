import { ArrowDownToLine, ArrowRight, Mail } from 'lucide-react';
import { go, yearsSince } from '../lib/app';
import { caseStudies, education, links, profile, projects, skills, timeline } from '../lib/content';
import { Terminal } from '../components/Terminal';
import { Chip, CountUp, Reveal, SectionHeader } from '../components/ui';

function Hero() {
  const years = Math.max(1, yearsSince(profile.careerStartDate));
  return (
    <section className="relative">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-6 sm:gap-12 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 glass-soft rounded-full px-3.5 py-1.5 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.status} · {years}+ yr experience
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Backend engineer.
            <br />
            <span className="text-accent">Scale first,</span> then ship it end to end.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted sm:mt-6 sm:text-lg">
            Java microservices at enterprise scale by day. A full offline-first platform,{' '}
            <button type="button" onClick={() => go('/work/inventra')} className="text-ink underline decoration-accent/60 underline-offset-4 hover:decoration-accent">
              Inventra
            </button>
            , by night.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => go('/#work')}
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:py-3"
            >
              View work <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener"
              className="glass glass-hover inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:py-3"
            >
              Resume <ArrowDownToLine className="h-4 w-4" />
            </a>
          </div>
        </div>
        <Terminal />
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-6xl px-4 sm:px-6">
      <dl className="glass grid grid-cols-2 gap-2 rounded-3xl p-3 sm:p-4 lg:grid-cols-4">
        {[
          { v: <CountUp to={250} suffix="K" />, l: 'fares loaded to the UI from 42M records' },
          { v: <span>ops-core</span>, l: 'framework reused across project modules' },
          { v: <CountUp to={17} />, l: 'backend modules in Inventra, built solo' },
          { v: <CountUp to={267} />, l: 'passing backend tests' },
        ].map((m, i) => (
          <Reveal key={i} delay={i * 70} className="px-3 py-3 sm:px-5">
            <dt className="whitespace-nowrap font-mono text-2xl font-bold text-accent sm:text-4xl">{m.v}</dt>
            <dd className="mt-1 text-sm text-muted">{m.l}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function Work() {
  const [migration, inventra] = caseStudies;
  const other = projects.projects.find((p) => p.id === 'java-mobile-shopping-application');
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader id="work" label="work" title="Selected work" intro="Two projects I am proudest of, plus an earlier one. Open a case study for the approach and outcomes." />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        {[migration, inventra].map((c, i) => (
          <Reveal key={c.slug} delay={i * 80}>
            <button
              type="button"
              onClick={() => go(`/work/${c.slug}`)}
              className="glass glass-hover group flex h-full w-full flex-col rounded-3xl p-5 text-left sm:p-7"
            >
              <p className="font-mono text-xs text-accent">{c.kicker}</p>
              <h3 className="mt-2 text-2xl font-bold">{c.title}</h3>
              <p className="mt-2 flex-1 text-muted">{c.summary}</p>
              {c.metrics.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {c.metrics.slice(0, 3).map((m) => (
                    <li key={m.label} className="text-sm">
                      <span className="font-mono font-bold text-ink">{m.value}</span>{' '}
                      <span className="text-muted">{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.stack.slice(0, 5).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 sm:grid-cols-2">
        {other && (
          <Reveal delay={80}>
            <div className="glass flex h-full flex-col rounded-3xl p-5 sm:p-6">
              <p className="font-mono text-xs text-muted">{other.type}</p>
              <h3 className="mt-1 text-lg font-bold">{other.name}</h3>
              <p className="mt-1 text-sm text-muted">{other.description}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeader id="stack" label="stack" title="What I work with" intro="Grouped by what I use it for. Everything here is something I have used in a project and can talk through." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <div className="glass h-full rounded-3xl p-5 sm:p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader id="journey" label="journey" title="How I got here" />
      <ol className="relative ml-2 border-l border-ink/15">
        {timeline.map((t, i) => (
          <li key={t.when + t.title} className="relative pb-9 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_var(--accent)]" aria-hidden="true" />
            <Reveal delay={i * 50}>
              <p className="font-mono text-xs text-accent">{t.when}</p>
              <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
              <p className="text-sm text-muted">{t.where}</p>
              <p className="mt-1 max-w-xl text-muted">{t.note}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-10 font-mono text-xs text-muted">
        certifications: {education.certifications.join(' · ')}
      </p>
    </section>
  );
}

function Contact() {
  const items = [
    { label: 'Email', href: `mailto:${links.email}`, text: links.email },
    { label: 'LinkedIn', href: links.linkedin, text: 'veer-patwa' },
    { label: 'GitHub', href: links.github, text: 'veer0401' },
  ];
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeader id="contact" label="contact" title="Let’s talk" intro="Open to backend and full-stack roles. The quickest way to reach me is email." />
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              target={i.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              className="glass glass-hover inline-flex w-full items-center gap-3 rounded-full px-5 py-3.5 text-sm sm:w-auto sm:py-3"
            >
              {i.label === 'Email' && <Mail className="h-4 w-4 text-accent" />}
              <span className="font-mono text-xs text-muted">{i.label}</span>
              <span className="font-medium">{i.text}</span>
            </a>
          ))}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold sm:w-auto sm:py-3"
          >
            Download resume <ArrowDownToLine className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Stack />
      <Journey />
      <Contact />
    </>
  );
}

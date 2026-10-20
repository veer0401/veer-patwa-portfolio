import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Fades content in once it scrolls into view. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Counts up to `to` the first time it is visible. */
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || n === to) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 900;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center glass-soft rounded-full px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

/** Mono "// label" eyebrow plus heading used at the top of every section. */
export function SectionHeader({ id, label, title, intro }: { id?: string; label: string; title: string; intro?: string }) {
  return (
    <header id={id} className="mb-7 max-w-2xl sm:mb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{`// ${label}`}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-muted">{intro}</p>}
    </header>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="glass-soft rounded-md px-1.5 py-0.5 font-mono text-[11px] text-muted">{children}</kbd>
  );
}

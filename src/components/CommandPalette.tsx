import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown, ArrowUp, Briefcase, Check, Copy, CornerDownLeft, Download, ExternalLink,
  FileText, GitBranch, House, Layers, Mail, Search, SunMoon, Tag,
} from 'lucide-react';
import { go } from '../lib/app';
import { caseStudies, links, skills } from '../lib/content';
import { Kbd } from './ui';

type Group = 'Navigate' | 'Case studies' | 'Actions' | 'Stack';

interface Command {
  id: string;
  label: string;
  group: Group;
  icon: ReactNode;
  keywords: string[];
  /** Skill entries stay out of the default list and only appear when you search. */
  searchOnly?: boolean;
  /** Keep the palette open after running (used for "copy email"). */
  keepOpen?: boolean;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

const ic = 'h-4 w-4 shrink-0';

function isSubsequence(needle: string, hay: string) {
  let i = 0;
  for (const ch of hay) if (ch === needle[i] && ++i === needle.length) return true;
  return needle.length === 0;
}

/** Weighted match: label start > word start > label substring > keyword > loose fuzzy. 0 = no match. */
function score(c: Command, q: string): number {
  const label = c.label.toLowerCase();
  const hay = `${label} ${c.keywords.join(' ').toLowerCase()}`;
  let total = 0;
  for (const t of q.toLowerCase().split(/\s+/).filter(Boolean)) {
    if (label.startsWith(t)) total += 100;
    else if (label.split(/[\s\-/.()]+/).some((w) => w.startsWith(t))) total += 70;
    else if (label.includes(t)) total += 50;
    else if (hay.includes(t)) total += 25;
    else if (t.length >= 3 && isSubsequence(t, label)) total += 8;
    else return 0;
  }
  return total;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return <>{text}</>;
  const lower = text.toLowerCase();
  const mask = new Array<boolean>(text.length).fill(false);
  for (const t of tokens) {
    const at = lower.indexOf(t);
    if (at >= 0) for (let i = at; i < at + t.length; i++) mask[i] = true;
  }
  const out: ReactNode[] = [];
  let i = 0;
  while (i < text.length) {
    let j = i;
    while (j < text.length && mask[j] === mask[i]) j++;
    const chunk = text.slice(i, j);
    out.push(
      mask[i] ? (
        <mark key={i} className="bg-transparent font-semibold text-accent">
          {chunk}
        </mark>
      ) : (
        <span key={i}>{chunk}</span>
      ),
    );
    i = j;
  }
  return <>{out}</>;
}

export function CommandPalette({ open, onClose, onToggleTheme }: Props) {
  return open ? <Palette onClose={onClose} onToggleTheme={onToggleTheme} /> : null;
}

function Palette({ onClose, onToggleTheme }: Omit<Props, 'open'>) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: 'home', label: 'Home', group: 'Navigate', icon: <House className={ic} />, keywords: ['top', 'start'], run: () => go('/') },
      { id: 'work', label: 'Selected work', group: 'Navigate', icon: <Briefcase className={ic} />, keywords: ['projects', 'portfolio'], run: () => go('/#work') },
      { id: 'stack', label: 'Stack', group: 'Navigate', icon: <Layers className={ic} />, keywords: ['skills', 'technologies', 'tools'], run: () => go('/#stack') },
      { id: 'journey', label: 'Journey', group: 'Navigate', icon: <GitBranch className={ic} />, keywords: ['timeline', 'experience', 'education', 'about'], run: () => go('/#journey') },
      { id: 'contact', label: 'Contact', group: 'Navigate', icon: <Mail className={ic} />, keywords: ['email', 'hire', 'reach'], run: () => go('/#contact') },
    ];
    const cases: Command[] = caseStudies.map((c) => ({
      id: `cs-${c.slug}`,
      label: c.title,
      group: 'Case studies',
      icon: <FileText className={ic} />,
      keywords: [c.kicker, c.summary, c.role, ...c.stack],
      run: () => go(`/work/${c.slug}`),
    }));
    const actions: Command[] = [
      { id: 'resume', label: 'Open resume (PDF)', group: 'Actions', icon: <Download className={ic} />, keywords: ['cv', 'download'], run: () => window.open(links.resume, '_blank', 'noopener') },
      { id: 'theme', label: 'Toggle light / dark theme', group: 'Actions', icon: <SunMoon className={ic} />, keywords: ['dark', 'light', 'mode'], run: onToggleTheme },
      {
        id: 'email',
        label: 'Copy email address',
        group: 'Actions',
        icon: <Copy className={ic} />,
        keywords: ['mail', 'clipboard', links.email],
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(links.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        },
      },
      { id: 'linkedin', label: 'Open LinkedIn', group: 'Actions', icon: <ExternalLink className={ic} />, keywords: ['social', 'profile'], run: () => window.open(links.linkedin, '_blank', 'noopener') },
      { id: 'github', label: 'Open GitHub', group: 'Actions', icon: <ExternalLink className={ic} />, keywords: ['code', 'social', 'profile'], run: () => window.open(links.github, '_blank', 'noopener') },
    ];
    const stack: Command[] = skills.groups.flatMap((g) =>
      g.items.map((item) => ({
        id: `skill-${item}`,
        label: item,
        group: 'Stack' as const,
        icon: <Tag className={ic} />,
        keywords: [g.title, 'skill', 'stack'],
        searchOnly: true,
        run: () => go('/#stack'),
      })),
    );
    return [...nav, ...cases, ...actions, ...stack];
  }, [onToggleTheme]);

  const q = query.trim();
  const results = useMemo(() => {
    if (!q) return commands.filter((c) => !c.searchOnly);
    return commands
      .map((c, i) => ({ c, s: score(c, q), i }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((r) => r.c);
  }, [commands, q]);

  const safeActive = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [safeActive, results]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    cmd.run();
    if (!cmd.keepOpen) onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(results.length ? (safeActive + 1) % results.length : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(results.length ? (safeActive - 1 + results.length) % results.length : 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(safeActive);
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  // Group headers only in the default (empty query) view
  const showHeaders = !q;
  const rows: ReactNode[] = [];
  results.forEach((c, i) => {
    if (showHeaders && results[i - 1]?.group !== c.group) {
      rows.push(
        <li key={`h-${c.group}`} role="presentation" className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted first:pt-1">
          {c.group}
        </li>,
      );
    }
    const isActive = i === safeActive;
    rows.push(
      <li key={c.id} role="option" id={`pal-opt-${i}`} aria-selected={isActive} data-active={isActive}>
        <button
          type="button"
          tabIndex={-1}
          onMouseMove={() => setActive(i)}
          onClick={() => runAt(i)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 sm:py-2.5 text-left text-sm transition-colors ${
            isActive ? 'bg-ink/10 text-ink pointer-coarse:bg-transparent pointer-coarse:text-muted' : 'text-muted'
          }`}
        >
          <span className={isActive ? 'text-accent' : 'text-muted'}>
            {c.id === 'email' && copied ? <Check className={ic} /> : c.icon}
          </span>
          <span className="flex-1 truncate">
            {c.id === 'email' && copied ? 'Copied to clipboard' : <Highlight text={c.label} query={q} />}
          </span>
          {(!showHeaders || isActive) && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
              {isActive && showHeaders ? <CornerDownLeft className="h-3.5 w-3.5 pointer-coarse:hidden" /> : c.group}
            </span>
          )}
        </button>
      </li>,
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 light:bg-slate-900/10 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-4 sm:pt-[14vh]"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search and commands"
        className="glass-strong w-full max-w-xl overflow-hidden rounded-3xl"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-5">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="pal-list"
            aria-activedescendant={results.length ? `pal-opt-${safeActive}` : undefined}
            aria-label="Search pages, projects and tech"
            placeholder="Search pages, projects, tech…"
            autoComplete="off"
            spellCheck={false}
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted sm:text-sm"
          />
          <span className="hidden sm:inline">
            <Kbd>esc</Kbd>
          </span>
          <button type="button" onClick={onClose} className="rounded-full px-3 py-2 text-sm font-medium text-accent sm:hidden">
            Close
          </button>
        </div>

        <ul ref={listRef} id="pal-list" role="listbox" className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li role="presentation" className="px-4 py-10 text-center text-sm text-muted">
              <p>
                No results for <span className="font-mono text-ink">“{q}”</span>
              </p>
              <p className="mt-1 text-xs">Try “couchbase”, “spring”, “resume” or “contact”.</p>
            </li>
          ) : (
            rows
          )}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-ink/10 bg-ink/5 px-5 py-2.5 text-[11px] text-muted">
          <span className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" /> navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> select
            </span>
          </span>
          <span>{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}

# Portfolio Redesign Plan (2026)

Status: proposal, nothing implemented. Written 2026-10-21 for `portfolio2`.

## 1. Where the site is today

| Area | Current state | Problem |
|---|---|---|
| Look | Dark, green-on-black "terminal" theme, mono headings, code-window hero | Looks like most developer portfolios; says "developer" but not what you did |
| Story | Sections list facts (Experience, Projects, Focus, Skills) | Proof is buried in small bullets; the migration project and Inventra are the strongest material and look like minor cards |
| Structure | HR-first page plus an optional DEV.OS IDE mode | DEV.OS is clever but blocked on mobile and holds hard-coded claims (Redis, Spring Batch) |
| Performance | One JS bundle, 1.6 MB (about 440 KB gzip), three.js and Monaco inside | Slow first load on mobile data, bad for a portfolio that recruiters open on phones |
| Content hygiene | Java 21 everywhere, fixed hero text | Some claims don't match the resume |

Keep: the data-driven JSON setup, the dark/light toggle, the DEV.OS idea, the resume button.

## 2. Positioning (decide this first)

One sentence the whole site serves:

> "Backend engineer who ships: Java microservices at enterprise scale by day, a full offline-first pharmacy ERP by night."

Three proof points, always visible above the fold or one scroll away:
1. **250K fares from 42M records** in the UI (migration project).
2. **ops-core**, a framework other modules reuse.
3. **Inventra**: 17 modules, 267 tests, solo.

Audiences in order: recruiters (30 seconds), hiring managers (3 minutes), engineers (deep dive). The page order follows that.

## 3. Design direction: "calm, precise, evidence-first"

Moves away from hacker-terminal green toward a quieter, product-grade look.

- **Layout:** a bento grid for the overview, then long-form case studies. Wide margins, one strong column of text, generous spacing.
- **Colour:** neutral base plus one accent. Proposed tokens:
  - Dark: background `#0B0D10`, surface `#12151A`, border `#222831`, text `#E8EAED`, muted `#9AA3AE`.
  - Light: background `#FAFAF9`, surface `#FFFFFF`, border `#E5E7EB`, text `#14171A`.
  - Accent: one hue (emerald `#34D399` kept for continuity, or indigo `#6366F1`; decide in the mockup stage). Use it only for links, focus rings, key numbers.
  - Keep contrast at WCAG AA or better in both themes.
- **Type:** one variable sans for everything (Inter or Geist), a mono (JetBrains Mono or Geist Mono) only for code, numbers and labels. Today mono is used for headings, which hurts readability. Scale: 14 / 16 / 20 / 28 / 44 / 64, with tight tracking on large headings.
- **Numbers as heroes:** big tabular figures for "250K", "42M", "17 modules", "267 tests".
- **Imagery:** real artefacts instead of decoration: an architecture diagram (RMI to microservices), a sketch of the Inventra POS screen, a sync-flow diagram. Inventra screenshots from your own app are the best asset you have.
- **Motion:** subtle and purposeful. Fade/translate on scroll (150-250 ms), animated number count-up once, hover states, view transitions between sections. Respect `prefers-reduced-motion`. No auto-playing 3D in the main page.
- **Theme:** system default, toggle kept, both palettes designed together (not an afterthought).

## 4. Information architecture

```
/                 Home: hero, proof strip, 3 featured work cards, short about, contact
/work/migration   Case study: Legacy-to-microservices migration (Cognizant)
/work/inventra    Case study: Inventra
/work/crime-vault Short case study
/about            Story, skills grouped by use, education
/resume           In-page resume view + PDF download
/dev              DEV.OS (optional IDE mode), lazy loaded
```

Single-page anchors can stay for the home page; case studies become real routes so they can be linked from the resume and LinkedIn.

## 5. Page designs

### Home
1. **Nav:** name, Work, About, Resume, theme toggle, "Contact" button. Sticky, blurred background.
2. **Hero:** headline (the positioning sentence, 2 lines), one supporting line, two buttons ("See my work", "Download resume"), availability pill. Right side: a compact, real artefact (a live "fares POC" mini diagram or an Inventra screenshot), not a fake code window.
3. **Proof strip:** four numbers in a row with one-line captions.
4. **Selected work:** two large cards (migration project, Inventra), each with outcome, stack chips and "Read case study". Crime Vault as a smaller row.
5. **How I work:** three short points drawn from real examples (design for scale, reuse through frameworks, tests before ship).
6. **Stack:** grouped by what you use them for, not a wall of chips (Backend, Data, Frontend, Delivery). Show only things you can talk about in an interview.
7. **Contact:** email, LinkedIn, GitHub, resume. Short and direct.

### Case study template (migration project, Inventra)
- Header: role, timeline, stack, team size, status.
- **Context:** one paragraph of the problem.
- **Challenge:** what made it hard (sorting 40-50 columns the database could not do; offline writes that must merge safely).
- **What I built:** 3-5 decisions, each with a short "why" and a diagram.
- **Results:** numbers and recognition.
- **What I would do next / what I learned.**
- For Inventra add: architecture diagram, module map (from `docs/audit/02_MODULE_MAP.md`), test counts, screenshots, GitHub/demo links when they exist.

Client confidentiality: Client work at Cognizant must stay at the level already on your resume. No internal system names beyond what you are allowed to share, no screenshots, no code. Check with your manager if unsure.

### DEV.OS
- Keep as an Easter egg for engineers, reached by "Explore DEV.OS" and a keyboard shortcut.
- **Lazy-load it** (separate chunk) so three.js and Monaco never slow the main page.
- Remove or verify every claim in it (Redis, Redisson, Spring Batch, replication).
- Add a simple mobile fallback instead of a blocker: a read-only file list.

## 6. Engineering plan

| Goal | How |
|---|---|
| Faster first load | Route-level `React.lazy`, move DEV.OS, three.js and Monaco into lazy chunks; target under 200 KB gzip for the home route |
| Core Web Vitals | LCP under 2.0 s on mobile, CLS under 0.05, INP under 200 ms; self-host fonts with `font-display: swap`, preload the primary font; use AVIF/WebP and sized images |
| Accessibility | Semantic landmarks, visible focus rings, AA contrast, keyboard-reachable everything, reduced-motion support, alt text; test with axe |
| SEO and sharing | Per-route titles and descriptions, JSON-LD `Person`, generated Open Graph image per case study, sitemap, `robots.txt` |
| Design tokens | Move colours, spacing and type into Tailwind 4 `@theme` CSS variables so both themes share one source |
| Content | Keep JSON as the single source of truth; add `caseStudies/*.md(x)` for long-form pages |
| Quality gates | `tsc`, `oxlint`, Lighthouse CI on the preview build, Playwright smoke test for the nav, theme toggle and resume link |
| Analytics | Privacy-friendly page views and resume-download counts (Plausible or Umami); no cookie banner needed |
| Deploy | Netlify previews per branch; custom domain; redirect old anchors |

Libraries already in the project: React 19, Vite 8, Tailwind 4, framer-motion, lucide-react, zustand. Add `react-router` for routes. Consider removing recharts if unused.

## 7. Phases

| Phase | Work | Output | Effort |
|---|---|---|---|
| 0 | Decide positioning, accent colour, and what Cognizant details you may show | Sign-off on section 2 and section 5 notes | 0.5 day |
| 1 | Capture assets: Inventra screenshots, architecture diagrams, a clean headshot or logo | Asset folder | 1-2 days |
| 2 | Design tokens, type, components (nav, cards, chips, number tiles) in a small style page | `/styleguide` route | 1-2 days |
| 3 | Build Home with new hero, proof strip, work cards | New home, old site kept behind `/legacy` until done | 2-3 days |
| 4 | Case study routes (migration, Inventra, Crime Vault) | 3 pages | 2-3 days |
| 5 | Lazy-load DEV.OS, clean its content, mobile fallback | Performance target met | 1-2 days |
| 6 | Accessibility, SEO, OG images, analytics, Lighthouse CI | Release checklist green | 1 day |
| 7 | Deploy, update LinkedIn, GitHub README and resume links | Live site | 0.5 day |

Total: about 9-14 working days; a strong version of Home plus the Inventra case study is possible in 4-5 days.

## 8. Decisions needed from you

1. Accent colour: keep emerald or switch to indigo or another hue?
2. Keep the terminal personality (as a small detail) or go fully clean and product-like?
3. What may you say publicly about the Cognizant client project?
4. Can you share Inventra screenshots, and will you make its repo or a demo public?
5. Keep the name "DEV.OS" and the IDE mode, or retire it?
6. Do you want a blog or notes section later (for example write-ups of the fares POC approach)?

## 9. Success criteria

- A recruiter understands who you are and sees one hard number within 10 seconds.
- Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO (mobile).
- Home route under 200 KB gzip JS; DEV.OS loads only on demand.
- Every claim on the site matches the resume and is something you can explain in an interview.

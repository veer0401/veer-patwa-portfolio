# Veer Patwa - Portfolio

Personal portfolio: a fast, terminal-flavoured, evidence-first site built with React 19, Vite and Tailwind CSS 4.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run lint       # oxlint
npm run preview    # serve the production build
```

If the production build runs out of memory on a low-RAM machine, limit parallelism:
`RAYON_NUM_THREADS=2 npx vite build`.

## Structure

```
src/
  App.tsx                  App shell: nav, hash routes, command palette, footer
  index.css                Design tokens (dark default + light), base styles, utilities
  lib/app.ts               Theme hook, tiny hash router, helpers
  lib/content.ts           Case studies and timeline (public-safe wording), typed data exports
  data/*.json              Single source of truth: profile, links, skills, education, experience, projects
  components/              Nav, CommandPalette (Ctrl/Cmd+K or "/"), Terminal, Diagrams, ui primitives
  pages/                   Home, CaseStudyPage (+ NotFound)
public/resume/             veer-patwa-resume.pdf (linked from every Resume button)
docs/DESIGN_PLAN.md        Design plan and decisions
```

Routes use the URL hash (`#/work/mercury`), so the site works on any static host with no rewrite rules.

## Look and feel

An iOS-style frosted-glass theme over a soft drifting aurora background, in dark (default) and light.

- Tokens live in `src/index.css` (`--glass*`, `--orb-*`). Use `.glass` for panels, `.glass-strong` for overlays, `.glass-soft` for chips and keys, `.glass-hover` for interactive cards, `.btn-primary` for the main action.
- Glass falls back to solid surfaces when `backdrop-filter` is unsupported or `prefers-reduced-transparency` is set. Motion (orb drift, hover lift, reveals) stops under `prefers-reduced-motion`.
- Keep `backdrop-filter` to a handful of large surfaces (nav, cards, terminal, palette); small elements use the blur-free `.glass-soft`.
- **Theme switch:** a quick 0.45 s cross-fade of every theme colour (each is a registered `@property` in `src/index.css`, toggled via a short-lived `theme-anim` class in `useTheme`). The page stays live during the fade, so the cursor never freezes; with reduced motion the switch is instant, and browsers without `@property` support switch instantly. `index.html` applies the saved theme before first paint, so nothing animates on load.
- **Pointer:** `src/components/Cursor.tsx` is an iPadOS-style cursor (translucent dot that morphs around buttons and links, becomes a bar over text fields, squeezes on press). Mouse only; touch devices and reduced-motion users keep native behaviour or instant movement. The native cursor is hidden only after the first real mouse movement.
- **Phones (below 768px):** an iOS-style floating tab bar (`src/components/Dock.tsx`) replaces the nav links and highlights the section you are in; the top bar is just logo, search and theme. Case-study diagrams switch to readable vertical flows (`MigrationFlow`, `PlatformFlow` in `Diagrams.tsx`), the search opens as a full-width sheet with a Close button, spacing is tighter, and blur and background motion are reduced to save battery. Hover effects only apply on devices that can hover, and safe-area insets are respected on notched phones.

## Content rules

- Case studies share goals, approach and outcomes only. No client-internal designs, screens or code, and no detailed product features.
- The Inventra repository link is intentionally empty until the repo is made public (`src/data/projects.json`).
- Every claim should match the resume and be something that can be explained in an interview.

## Updating the resume

Replace `public/resume/veer-patwa-resume.pdf`; the path is set in `src/data/links.json`.

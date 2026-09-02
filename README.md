# Dual Engine

A personal site with two tabs and, behind the second one, two engines.

**Landing (`/`)** — minimal, typographic, neutral-950. Two tabs:

- **Home** — bio, CV link, and Email / LinkedIn / X handles.
- **Enter My World** — the Dual Engine chooser.

**The two engines**

- **The Architect** (`/architect`) — how things get built. Monospace,
  blueprint grid, full LaTeX, syntax-highlighted code, schematics and spec
  tables.
- **The Observer** (`/observer`) — why people believe what they believe.
  Editorial serif, warm accent, pull quotes and diary fragments.

They share one neutral ground (neutral-950 / neutral-900, neutral-800 borders)
and are told apart by accent, texture and typography rather than by different
backgrounds. The two are bridged by **synaptic links** (inline cross-hemisphere references
with hover previews) and **margin notes** (raw diary observations running in the
gutter beside a technical argument).

---

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion 11 ·
MDX via `next-mdx-remote/rsc` · `remark-math` + `rehype-katex` ·
`rehype-pretty-code` (Shiki)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build; all entries are prerendered (SSG)
npm run typecheck
```

---

## Architecture

```
app/
  layout.tsx              root shell, fonts, ThemeProvider, LensToggle
  globals.css             ALL colour tokens + both prose environments
  page.tsx                the whole landing: both tabs + your details
  architect/page.tsx      Architect index    architect/[slug]/page.tsx
  observer/page.tsx       Observer index     observer/[slug]/page.tsx
components/
  ThemeProvider.tsx       lens context; paints data-lens on <html>
  LensToggle.tsx          floating pill switcher (⌘J / Ctrl+J to flip)
  SynapticLink.tsx        inline cross-hemisphere bridge + preview card
  MarginNote.tsx          gutter diary note (collapsible below 1280px)
  Schematic.tsx           bordered plate for ASCII / SVG system diagrams
  SpecTable.tsx           structured technical data, aligned numerics
  Axiom.tsx               numbered first-principles statement
  DiaryFragment.tsx       timestamped raw diary block
lib/
  content.ts              filesystem content layer (gray-matter + reading-time)
  mdx.tsx                 the single MDX pipeline for both hemispheres
content/
  architect/*.mdx
  observer/*.mdx
public/
  cv.pdf                  placeholder — replace with your real CV
```

## Make it yours

Everything personal lives in one block at the top of `app/page.tsx`, marked
`EDIT ME`: name, monogram, role line, intro, bio paragraphs, CV path and the
Email / LinkedIn / X links. Two are placeholders marked `TODO` — replace them:

```ts
{ label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", … }
{ label: "X",        href: "https://x.com/your-handle",               … }
```

Then drop your real CV at `public/cv.pdf` (served from `/cv.pdf`).

`app/page.tsx` is a client component, so it cannot export `metadata` — the
site title and description live in `app/layout.tsx`.

### Theming

Every colour lives once, in `globals.css`, as an RGB triplet:

```css
--architect-bg / --architect-text / --architect-accent / --architect-edge …
--observer-bg / --observer-text / --observer-accent / --observer-edge …
```

`--bg`, `--text`, `--accent`, `--edge` are the *active lens*. A single
attribute switches them:

```html
<section data-lens="observer"> … </section>
```

This is how an Observer card can be embedded inside an Architect page (see the
"entangled entry" footers) without any duplicated CSS. Tailwind reads these
through the `surface / ink / accent / edge` colour tokens, and the absolute
`architect-*` / `observer-*` scales exist for places where both engines appear
at once (the Dual Engine cards, the lens toggle).

### The landing tabs

`app/page.tsx` holds the whole landing: a sticky tab bar, the Home view and
the Dual Engine view. Swapping tabs changes no route, so the engine chooser
never costs a navigation. The active tab is mirrored into the URL hash
(`/#world`), which makes it linkable and makes Back behave as expected. The
underline travels with a shared `layoutId`; the views cross-fade with
`AnimatePresence mode="wait"`.

The two engine cards sit in a single bordered plate split by a 1px gutter.
Hovering one dims the other to 45% and reveals its texture — blueprint grid
for the Architect, a warm bloom for the Observer. Below `md` they stack.

### Renamed from "The Rigor"

`/rigor` and `/rigor/:slug` permanently redirect to `/architect` (see
`next.config.mjs`), so any link already in the wild keeps working.

---

## Writing an entry

Drop an `.mdx` file into `content/architect/` or `content/observer/`.

```mdx
---
title: "The Thermal Ceiling of Ambition"
dek: "One line of standfirst, used on the index and in metadata."
date: "2026-07-14"
tags: ["thermodynamics", "deeptech"]
confidence: "load-bearing"      # Architect only: speculative | working | load-bearing
flavour: "cold dopamine"        # Observer only: the emotional register
entangledWith: "founder-survival"   # slug in the OTHER hemisphere
draft: false
---
```

`entangledWith` renders a full-width card at the foot of the entry, styled in
the opposite hemisphere's palette, linking to its twin.

### Components available in MDX

| Component | Use |
|---|---|
| `<SynapticLink href note title>` | inline bridge to the other hemisphere |
| `<MarginNote label tone>` | gutter note; `tone="spec"` for clinical |
| `<Axiom n="1">` | numbered first-principles statement |
| `<SpecTable title rows>` | structured technical data |
| `<Schematic id caption>` | bordered plate for ASCII / SVG diagrams |
| `<DiaryFragment at place>` | timestamped raw diary block |

**Inline vs block matters in MDX.** A JSX tag that starts a line is parsed as a
*block*. To keep a `SynapticLink` inside a sentence, put text before it on the
same line:

```mdx
So the real question is why <SynapticLink href="/observer/founder-survival"
note="…">an irrational drive overrides a settled number</SynapticLink>, in
people who can clearly compute it.
```

### Math

`remark-math` + `rehype-katex`. Inline `$E = mc^2$`, display `$$ … $$`.
Display blocks are framed by the active lens (`.katex-display` in
`globals.css`) and scroll horizontally on narrow screens.

### Code

Fenced blocks go through Shiki. Add a title with
` ```python title="thermal_ceiling.py" `.

---

## Notes

- **Fonts** load via `<link>` so the build never needs network access at
  compile time. To self-host with `next/font`, follow the commented block at
  the top of `app/layout.tsx`.
- **`/cv.pdf` is a placeholder** generated so the link does not 404 in dev.
  Replace it.
- **The margin rail** is reserved with `xl:pr-60` on the `<article>` (not in
  `.with-rail`), because Tailwind's padding utilities would otherwise win the
  cascade. If you change the article width, change both.
- Entries are fully prerendered via `generateStaticParams`, so the site
  deploys as static output on Vercel or anywhere else.

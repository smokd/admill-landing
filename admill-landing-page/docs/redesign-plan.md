# ADMill Website — Redesign & Implementation Plan

Status: **draft for review**. Scope: the Next.js marketing site in `admill-landing-page/`
(static export, deployed to admill.co.zw).

---

## 1. Current-state audit

### 1.1 What already works
- Clear information architecture: Hero → positioning → capabilities → industries → approach → projects → technologies → FAQ → contact.
- 10 solution pages + 6 industry pages, breadcrumbs, sitemap, JSON-LD schema, GTM + Matomo.
- Custom navy/gold icon set, working contact form (honeypot + timing spam guard).
- Consistent copy voice; strong technical positioning.

### 1.2 Issues found

**Bugs / correctness**
1. **Hero media is broken.** `app/page.js:170` renders
   `<video src="/eng.jpg" poster="/eng.jpg">` — a `<video>` pointing at a JPEG. The element
   can never play; it silently falls back to the poster. Either use the real
   `public/security-hero.mp4` or drop the `<video>` and use an image.
2. **Footer "Solutions" list is plain text**, not links, and has grown to 10 items. It should
   link to `/solutions/...` like the rest of the site.

**Performance**
3. **Images are unoptimised by design.** `next.config.ts` sets `images.unoptimized: true`
   (required for static export), so every file in `public/` is served raw. Current offenders:
   `hh.png` 782 KB, `turn.png` 629 KB, `mtgs.jpg` 576 KB, `eng.jpg` 556 KB, `board.webp` 370 KB.
   A single homepage load can pull several MB.
4. No explicit `priority`/`sizes` strategy across sections; hero image is not preloaded.

**Design / UX**
5. **Hero is washed out.** A `bg-white/85` overlay sits over the background, so the "hero image"
   is barely visible — the page opens as text on near-white.
6. **Almost no imagery below the hero.** Capabilities = icons only; industries = text only;
   approach = text only. The site reads as a document, not a premium engineering brand.
7. **Projects grid** is decent but flat: uniform cards, no hover state, no case-study detail.
8. **No trust layer**: no logos, stats, certifications, or testimonials.
9. **10 capability cards** in a 3-column grid → orphaned final row (layout imbalance).
10. Repetitive rhythm: every section is `py-24` text + grid, which flattens hierarchy.

### 1.3 Section inventory (`app/page.js`)
Hero · Partner strip · Capabilities (10) · Industries (6) · Approach (5 steps) ·
Projects (6) · Technologies · FAQ (5) · Contact · Footer.

---

## 2. Design direction

Keep the established brand (red `#CC0000`, navy, white, Inter). Move it from
**document-like** to **premium engineering brand**.

Principles
- **Photography-first**, like the reference sites (Linear/Cohere/Tesla feel): fewer, larger,
  better-composed images; darker, higher-contrast sections; generous negative space.
- **Alternate surface tones** (white → near-white → navy) so sections read as distinct chapters.
- **One idea per band.** Split dense sections; let imagery carry weight.
- **Restraint.** No new accent colours; red stays the single CTA signal.

Concrete changes
- Hero: full-bleed dark media (navy-tinted, not white-washed), headline over it, tighter overlay.
- New **"Capabilities in the field"** band: 3–4 large photos with short labels.
- Industries: convert to **image cards** (photo + label + link).
- Projects: richer case-study cards — larger image, tag chips, hover lift, and room for a
  detail page later.
- Add a **stats/trust strip** (years, projects, systems commissioned, sectors) — honest numbers.
- Tighten the capabilities grid to a balanced count (see §5, T9).

---

## 3. Image & media strategy

Two tracks, because the photo pipeline is not ready yet:

**Track A — real photography** (preferred end state)
- Generated externally per `docs/image-asset-brief.md`, dropped into `public/`.
- Serve via a shared `<Media>` component (below) so swapping is one file.

**Track B — branded placeholder graphics** (buildable now)
- Ship an on-brand **SVG placeholder** system so every image slot looks intentional from day one,
  with no broken/empty boxes and no external stock.
- Each placeholder is a navy/gold blueprint-style graphic with the slot's purpose labelled
  (e.g. "Switchgear room — 4:3"), plus the target filename, so the build doubles as a shot list.

**Component: `components/media-frame.js`**
```
<Media src="/solar-storage.jpg" alt="Commercial solar and battery storage"
       label="Renewable energy" ratio="4/3" tone="dark" />
```
- If `src` resolves to a real file → renders `next/image` (with `sizes`, `priority` for hero).
- If `src` is omitted → renders the branded SVG placeholder.
- Enforces a consistent aspect ratio (`16/9`, `2/1`, `4/3`) to prevent layout shift (CLS).
- Swapping placeholder → photo is a one-line change per slot.

**Performance rules**
- Compress source images before committing (target ≤ 200 KB photo, ≤ 120 KB card).
- Prefer WebP/AVIF sources; keep 2× max dimension reasonable.
- Hero image: `priority` + `fetchPriority="high"`.
- Everything below the fold: default lazy loading, explicit `sizes`.

---

## 4. Phased implementation plan

### Phase 0 — Quick fixes (DONE)
- **T1** ✅ Hero media fixed: `<video src="/eng.jpg">` replaced with `<NextImage fill priority fetchPriority="high">`.
- **T2** ✅ Footer solutions are now links, generated from the solutions array.
- **T3** ✅ Images compressed in place (~3.0 MB → ~1.1 MB): eng 543→303, mtgs 562→113,
  hh 763→253, turn 615→258, board 362→82, lds 102→71, byd 25→20 KB.
  Reusable script: `scripts/optimize-images.mjs`.
- **T4** ✅ Hero image gets `priority` + `fetchPriority="high"` + `sizes="100vw"`.

### Phase 1 — Media foundation
- **T5** Build `components/media-frame.js` (`next/image` + SVG placeholder fallback + ratio).
- **T6** Build the branded placeholder SVG (navy/gold, label + target filename, light/dark tones).
- **T7** Wire `Media` into the projects grid first (pilot), verify zero layout shift.

### Phase 2 — Homepage revamp
- **T8** Rework hero: dark full-bleed media, reduced overlay, refined type scale, two CTAs.
- **T9** Rebuild capabilities section: balanced grid (e.g. 8 cards, 4×2) + a
  "See all solutions →" link to `/solutions`.
- **T10** New "Capabilities in the field" photo band (3–4 `Media` slots).
- **T11** Convert industries to image cards (`Media`).
- **T12** Upgrade projects to case-study cards: larger image, tag chips, hover state.
- **T13** Add stats/trust strip (honest figures only).

### Phase 3 — Inner pages
- **T14** Apply `Media` + placeholder to solution and industry page headers.
- **T15** Cross-link new solutions into relevant industry pages (`related-solutions`).
- **T16** Add a photo to each solution page hero.

### Phase 4 — Polish
- **T17** Colour-contrast + focus-state audit (WCAG AA).
- **T18** Motion pass (respect `prefers-reduced-motion`).
- **T19** Image weight budget check in CI; Lighthouse baseline.
- **T20** Optional: per-project case-study pages (`/projects/[slug]`).

---

## 5. File-level task map

| Task | Files |
| --- | --- |
| T1 hero media | `app/page.js` |
| T2 footer links | `app/page.js` |
| T3 image compression | `public/*` (binary) |
| T5/T6 Media + placeholder | `components/media-frame.js` (new), `public/placeholders/*` |
| T8–T13 homepage | `app/page.js` |
| T14–T16 inner pages | `app/solutions/**`, `app/industries/**` |
| T17–T18 a11y/motion | `app/globals.css`, components |
| T20 case studies | `app/projects/**` (new) |

---

## 6. Swapping placeholders for real photos

1. Generate the image per `docs/image-asset-brief.md`.
2. Drop it in `admill-landing-page/public/` with the brief's filename.
3. In the relevant `<Media src="...">`, set `src` to that path.
4. Placeholder disappears automatically; `next/image` takes over.

No layout, CSS, or component changes required.

---

## 7. Suggested order

Phase 0 → Phase 1 → Phase 2, then reassess. Phase 0 is largely bug-fix and low risk; Phase 1
unblocks everything visual; Phase 2 delivers the visible "revamp" with placeholder graphics in
place until real photography lands.

# ADMill Systems — Website Image Asset Brief

Production brief for the ADMill website image collection. This file is for use with an
image-generation tool (Midjourney, Adobe Firefly, DALL·E, Stable Diffusion, etc.).
ADMill's logo, typography and icons are added separately in the site — no text, logos,
watermarks or fabricated branding may appear inside any generated image.

## Shared art direction (prepend to every photo prompt)

> Photorealistic premium corporate engineering photography, modern and architectural,
> luxury corporate aesthetic, cinematic depth, physically plausible lighting, sharp
> technical detail, realistic materials and shadows, excellent dynamic range,
> professional colour grading. Palette: deep navy blue, midnight blue, charcoal,
> cool steel grey, crisp white, restrained champagne-gold highlights. Southern African
> (Zimbabwe) context. No text, no logo, no watermark, no oversaturation, no lens flare,
> no sci-fi effects, no cluttered composition.

When people appear: professional African engineers/technicians, appropriate PPE and
workwear, authentic actions and environments. Do not imply they are actual ADMill employees.

## Required assets

Save generated files into `admill-landing-page/public/` using the filenames below so they
slot straight into the site.

### 1. Homepage hero — `hero-engineering.jpg`
- **Composition:** 16:9 (also render a 2:1 crop for ultra-wide). Wide cinematic angle.
- **Prompt:** Modern glass-and-steel engineering/technology facility at blue hour, subtle
  rooftop solar infrastructure, visible technical equipment, warm architectural lighting,
  midnight-blue shadows with restrained champagne-gold highlights. Building positioned on
  the **right**, generous darker negative space on the **left** for headline + CTA buttons.
  Engineering excellence, energy resilience, intelligent infrastructure.
- **Mobile note:** keep the building inside the right 60% so a centre crop still reads.

### 2. Electrical engineering — `electrical-switchroom.jpg`
- **Composition:** 4:3.
- **Prompt:** Professionally installed low-voltage switchgear room — accurate circuit
  breakers, copper busbars, distribution panels, neatly routed cables, realistic electrical
  components. Clean industrial environment, deep navy + steel-grey palette, subtle warm
  light, precise technical detail, high-end commercial photography.

### 3. Renewable energy & backup power — `solar-storage.jpg`
- **Composition:** 4:3.
- **Prompt:** Commercial solar photovoltaic installation with modern power-conversion
  (inverter) equipment and battery energy storage, a modern industrial/commercial facility
  in Zimbabwe/Southern Africa. Realistic panel geometry, technically plausible wiring,
  natural golden-hour light, restrained navy-and-gold grading, clean composition.

### 4. Building management & automation — `bms-control-room.jpg`
- **Composition:** 4:3.
- **Prompt:** Contemporary building control room with BMS dashboards, HVAC monitoring,
  electrical metering and system diagrams; a professional engineer reviewing the controls
  (from behind/side, screen content not readable). Realistic interfaces, restrained
  blue-toned aesthetic.

### 5. Industrial automation — `industrial-automation-cabinet.jpg`
- **Composition:** 4:3.
- **Prompt:** Industrial control cabinet with PLCs, motor-control equipment, instrumentation,
  organised wiring and automation hardware. Technically credible equipment, clean
  professionally engineered installation.

### 6. Electronic security & fire systems — `security-fire.jpg`
- **Composition:** 4:3.
- **Prompt:** Premium commercial security installation — access control readers, CCTV
  infrastructure, alarm monitoring equipment and fire detection components. Reliable,
  integrated, professional installation.

### 7. About ADMill — `team-collaboration.jpg`
- **Composition:** 4:3 or 16:9.
- **Prompt:** Documentary-style corporate photograph of three African electrical and systems
  engineers collaborating over technical drawings and a tablet inside a modern technical
  facility. Appropriate PPE, professional navy workwear, realistic electrical cabinets in the
  background, natural expressions, authentic teamwork, sophisticated blue + warm-gold lighting.
  **Do not imply these are actual ADMill employees.**

### 8. Project portfolio — individual images
- **Composition:** 4:3 each, consistent premium colour grade across the set.
- **Subjects (one image each):** commercial electrical installation; generator + automatic
  transfer switch (ATS) installation; solar power system; building automation; industrial
  controls. Each must read as a genuine engineering project photograph.

### 9. Service icons — ✅ DONE (vector, in repo)
Production SVG set at `admill-landing-page/public/icons/`:
`electrical-engineering.svg`, `renewable-energy.svg`, `building-management.svg`,
`industrial-automation.svg`, `electronic-security.svg`, `fire-safety.svg`,
`networking.svg`, `systems-integration.svg`.
Midnight navy (`#12233F`) strokes with champagne-gold (`#C6A24B`) accents, uniform 1.6px
stroke weight on a 24×24 viewBox, transparent background, no text. Legible 24–64px.

## Colour tokens (match the site theme)

| Token            | Hex       | Use                                    |
| ---------------- | --------- | -------------------------------------- |
| Midnight navy    | `#12233F` | Primary strokes, icon outlines, deep shadow |
| Deep navy        | `#0A1730` | Hero shadows, backgrounds              |
| Champagne gold   | `#C6A24B` | Restrained accent highlights           |
| Charcoal         | `#1A1A1A` | Text / dark neutrals                   |
| Steel grey       | `#6B7280` | Muted text, secondary surfaces         |

## Integration notes

- Hero: replace the homepage hero background/layer in `admill-landing-page/app/page.js`.
- Service cards: each icon maps 1:1 to the service list in the site footer and services grid.
- Keep file sizes reasonable — use `next/image` for the photos so Next serves optimised
  WebP/AVIF automatically from the files dropped into `public/`.

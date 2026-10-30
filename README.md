# Portfolio — Vishnu Prasath K

A personal portfolio in midnight navy, muted teal and soft ice blue. Scrolling moves a camera slowly around one quiet workstation whose monitor shows a live request-path diagram; the content sits on top in editorial typography, with glass panels reserved for technical diagrams. A white, printable **Resume Mode** is built in for recruiters.

**Stack:** Next.js 16 (App Router, static export-friendly) · React 19 · TypeScript · Three.js / React Three Fiber / drei · Framer Motion · Tailwind CSS v4 · lucide-react

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical, OpenGraph and JSON-LD URLs are absolute.

## Hosting (GitHub Pages)

The site is a static export (`output: "export"` → `out/`). `.github/workflows/pages.yml` builds it on every push to `main`
(and the working branch) with `NEXT_PUBLIC_BASE_PATH=/<repo>` and publishes `out/` to the `gh-pages` branch.

Live URL: **https://vishnu2298.github.io/vishnuprasath_resume/**

If the site 404s after the first run, enable Pages once: *Settings → Pages → Build and deployment → Source: Deploy from a branch → `gh-pages` / `(root)`*.

## Before deploying

1. **`data/profile.ts` → `links`** — GitHub is set; add LinkedIn and email if you want them public. Empty links are hidden.
2. **Resume PDF** — drop a file in `public/` and set `links.resume` (e.g. `"/resume.pdf"`). Without it, "Download resume" opens Resume Mode and the print dialog (Save as PDF), which has a light print stylesheet.
3. **Optional portrait** — put a photo in `public/` (about 4:5, e.g. `public/portrait.jpg`) and set `profile.portrait = "/portrait.jpg"`. It appears in the hero in a glass frame; when empty, the hero uses the workstation scene.
4. **Review the content** in `/data`. Employer, client and school names are intentionally left out, and nothing claims metrics.

## Editing content

All copy lives in `/data`. Components only render it.

| File | What it holds |
| --- | --- |
| `data/profile.ts` | Name, roles, hero copy, optional portrait, location, education, links, SEO title/description |
| `data/journey.ts` | The six-stage progression (Application → Backend → Data & Search → Recommendations → AI → Leadership), "From code to systems" |
| `data/stack.ts` | Engineering stack levels, galaxy nodes/edges, the request path and the decision at each layer |
| `data/projects.ts` | Case studies (`featured` + `decision`), earlier enterprise work, personal products (`labStage`) |
| `data/thinking.ts` | Problems → approaches, principles, AI before/after pipelines, architecture pattern copy |
| `data/experience.ts` | Roles, leadership, smaller lab experiments, lab stage names |
| `data/code.ts` | Illustrative code on the laptop screen and the monitor diagram nodes |

Project `status` values are `Professional Experience`, `Selected Engineering Experience`, `Currently Building`, `Architecture / Product Exploration` or `Concept → Building`. Personal products use `labStage` on a Concept → Exploring → Building → Shipped track instead of percentages.

## Structure

```
app/                 layout (fonts, metadata, JSON-LD), page, OG/Twitter images, robots, sitemap
components/
  3d/                World (background canvas), CameraRig, FrameDriver, Workstation,
                     ScrollDirector, InteractiveStage, screens (canvas textures)
  hero/  timeline/  skills/  architecture/  projects/  experience/  ai/  lab/  contact/
  navigation/        Nav (desktop + mobile bottom bar), ModeToggle, Footer
  resume/            Resume Mode
  providers/         ModeProvider (Experience/Resume, ?mode=resume deep link), MotionProvider
  ui/                Section, Reveal, Flow, TiltCard, BrandIcons
data/                all content
lib/                 world state (scroll → chapter), device tier, canvas text helpers
```

## How the 3D works

- **One background world.** `components/3d/World.tsx` is a single fixed canvas. `ScrollDirector` measures every `[data-chapter]` section and turns scroll position into a continuous chapter value. `CameraRig` interpolates between per-chapter camera keyframes. To retune a shot, edit `desktop` / `portraitOverrides` in `CameraRig.tsx`.
- **Readability.** Each chapter has a shade level (`DIM` in `ScrollDirector.tsx`), so text never depends on what the 3D layer is doing.
- **Interactive canvases** (Tech Galaxy, Architecture Lab) mount only near the viewport, stop rendering off-screen, and pause the background world while they're visible. Only one render loop runs at a time.
- **No avatar.** An earlier primitive-built character was removed: it read as artificial. The hero uses the workstation scene, or a real photo via `profile.portrait`.

## Performance

- Hero text is server-rendered and paints immediately. Three.js loads in a separate chunk after `requestIdleCallback`, over a CSS poster that also serves as the no-WebGL fallback.
- `frameloop="demand"` plus an fps budget: up to 60fps in visual chapters, 30fps when dimmed behind text, 0 while paused.
- No external textures, models or HDRIs. Screens and labels are drawn to 2D canvases, and keycaps and pulses are instanced.
- Device tier (`lib/device.ts`): phones and low-core or low-memory devices get a lower DPR, no antialiasing and no floor grid.
- Framer Motion is loaded via `LazyMotion` with `domAnimation`, and reveals animate only transform and opacity.

## Accessibility

- Skip link, landmark structure and a single `h1`, with `h2` per section.
- The journey timeline is an ARIA tab list with arrow/Home/End keys. Mode and pattern switches are radio groups. Project details use a native `<dialog>`.
- Every 3D visualization has a DOM equivalent: the galaxy has category filters plus an "All technologies" list, and the architecture lab has a pattern flow list and keyboard-operable rotate/zoom buttons.
- `prefers-reduced-motion`: the world renders static frames only on chapter change, the camera snaps instead of gliding, and CSS and Framer animations are disabled.

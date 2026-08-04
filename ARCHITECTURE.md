# Architecture — ATA Tech Hub

## High-Level Overview

```
Browser
  └── Vite Dev Server / Static CDN
        └── React SPA (single HTML shell)
              └── src/App.tsx (all UI components)
                    └── External services (WhatsApp, LinkedIn, Google Fonts, Google Drive, picsum)
```

There is no backend, no database, no API server, and no authentication. This is a fully static client-side app.

---

## Frontend Architecture

### Entry Points

| File | Role |
|------|------|
| `index.html` | HTML shell; sets page title, OG/Twitter meta tags, loads `/src/main.tsx` |
| `src/main.tsx` | Mounts `<App />` into `#root` with React 19 `createRoot` |
| `src/App.tsx` | All components and business logic |
| `src/index.css` | Global styles, Tailwind theme tokens, utility classes |

### Component Structure (all in `src/App.tsx`)

```
App
├── ConfirmationModal        — intercepts outbound external clicks
├── Navbar                   — fixed top nav, scroll-aware glassmorphism, mobile drawer
├── Hero                     — above-the-fold headline + CTAs
├── SocialProof              — infinite-scroll client name ticker
├── Services                 — 6-card service grid
├── Portfolio                — infinite-scroll project image carousel
├── Founders                 — 3-card founder grid with LinkedIn CTAs
├── Process                  — numbered vertical timeline (5 steps)
├── Trust                    — 4-item icon+label stat block
├── Comparison               — 3-column pros/cons table
├── FAQ                      — accordion (single-open)
├── FinalCTA                 — full-width gold banner
├── Footer                   — links + copyright
├── StickyCTA                — mobile-only fixed bottom WhatsApp bar
└── WhatsAppPopup            — floating popup (shows at 5s, repeats every 25s)
```

### State Management
No global state. Each component manages its own local state with `useState`. The only cross-component state flow is:

- `App` owns `modalOpen`, `pendingUrl`, and `whatsappPopupOpen`
- `handleClientClick(url)` is passed as a prop to `SocialProof` and `Portfolio` to trigger the confirmation modal

### Routing
None — single-page with hash-based anchor links (`#services`, `#work`, `#about`, `#process`). No React Router.

### Animations
Framer Motion (`motion/react`) is used throughout:
- Page load fade-ins on `Hero`
- `whileHover={{ y: -5 }}` lift on cards
- `AnimatePresence` for modal and popup mount/unmount transitions
- `motion.div animate={{ x: ["0%", "-50%"] }}` for infinite CSS scroll on `SocialProof` and `Portfolio`

### Styling
Tailwind CSS v4 is used via the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed). Custom design tokens are declared in `src/index.css` using the `@theme` block:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-midnight` | `#121212` | Page background |
| `--color-gold` | `#D4AF37` | Primary accent |
| `--color-parchment` | `#F5F5F5` | Primary text |
| `--color-whatsapp` | `#25D366` | WhatsApp green |
| `--color-slate-blue` | `#4A5568` | Borders, muted elements |
| `--font-sans` | Inter | Body text |
| `--font-display` | Space Grotesk | Headings |

---

## Backend Architecture
None.

---

## External Services

| Service | URL Pattern | Purpose | Failure Mode |
|---------|------------|---------|-------------|
| Google Drive | `lh3.googleusercontent.com/d/...` | Logo image | Shows fallback text via `onError` |
| picsum.photos | `picsum.photos/seed/...` | Placeholder avatars | Broken images |
| External client sites | Various | Portfolio images | Broken images |
| Google Fonts | `fonts.googleapis.com` | Typography | System font fallback |
| WhatsApp | `wa.me/...` | Lead CTA | Opens WhatsApp app |
| LinkedIn | `linkedin.com/in/...` | Founder profiles | Opens LinkedIn |

---

## Data Flow

```
User clicks "Chat on WhatsApp"
  → If direct link: opens wa.me in new tab
  → If via SocialProof/Portfolio card: triggers handleClientClick(url)
      → App sets pendingUrl + opens ConfirmationModal
          → User confirms → window.open(pendingUrl)
          → User cancels → modal closes, nothing opens
```

---

## Build Pipeline

```
npm run build
  └── vite build
        ├── Processes src/App.tsx + imports via esbuild + rollup
        ├── Applies Tailwind CSS transforms
        ├── Inlines env vars from .env.local via `define`
        └── Outputs dist/
              ├── index.html        (~2 kB)
              ├── assets/index.js   (~354 kB / 111 kB gzipped)
              └── assets/index.css  (~28 kB / 5.7 kB gzipped)
```

---

## Security Considerations

1. **No user input handled server-side** — attack surface is minimal.
2. **`GEMINI_API_KEY` is exposed client-side** via Vite's `define` block in `vite.config.ts`. If Gemini features are ever added, the key will be visible in the browser bundle. Use a backend proxy instead.
3. **External link confirmation modal** — all outbound portfolio/client links go through a confirmation step, preventing unintentional navigation.
4. **`rel="noopener noreferrer"`** is set on all `target="_blank"` links — prevents tab-napping.
5. **No `eval`, no `dangerouslySetInnerHTML`** — no XSS risk from hardcoded content.

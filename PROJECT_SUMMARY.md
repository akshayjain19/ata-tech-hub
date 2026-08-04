# Project Summary — ATA Tech Hub

## Project Overview
ATA Tech Hub is a marketing landing page for a tech consultancy that builds websites, software, and custom solutions for small-to-medium businesses. The page is designed to convert visitors into WhatsApp leads.

## Business Problem Being Solved
SMBs that need quality tech work face a painful tradeoff: freelancers are unreliable, traditional agencies are slow and expensive. ATA Tech Hub positions itself in the gap — founder-led, fast, outcome-driven.

## Product Goals
- Drive inbound leads via WhatsApp
- Build credibility through portfolio and founder profiles
- Establish trust via comparison, FAQ, and social proof sections

## Target Users
- Startup founders and SMB owners in India and globally
- Non-technical decision-makers evaluating tech partners

## Current Implementation Status
**Complete** — the site is production-ready as a static SPA.

---

## Major Completed Features

| Feature | Status |
|---------|--------|
| Navbar (desktop + mobile drawer) | Complete |
| Hero section with WhatsApp CTA | Complete |
| Animated client name ticker | Complete |
| Services grid (6 services) | Complete |
| Portfolio carousel (5 projects) | Complete |
| Founders section (3 founders) | Complete |
| 5-step process timeline | Complete |
| Trust/stats block | Complete |
| Comparison table | Complete |
| FAQ accordion | Complete |
| Final CTA banner | Complete |
| Sticky mobile WhatsApp button | Complete |
| WhatsApp popup (timed) | Complete |
| External link confirmation modal | Complete |

## Features Not Yet Started
- Contact form / lead capture form
- Blog or case studies section
- Analytics integration (Google Analytics, Mixpanel, etc.)
- A/B testing
- Internationalisation / multi-language support
- Dark/light theme toggle

---

## Current Architecture
Single-page React application, client-side rendered. No backend. All data is hardcoded in `src/App.tsx`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animations | Framer Motion (`motion/react`) |
| Icons | `lucide-react` |
| Fonts | Inter + Space Grotesk (Google Fonts CDN) |
| Package manager | npm |

## Folder Structure
```
ata-tech-hub/
├── src/
│   ├── App.tsx          # Entire application — all components live here
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles + Tailwind theme tokens
├── index.html           # HTML shell + SEO meta tags + OG tags
├── vite.config.ts       # Vite config, Tailwind plugin, env passthrough
├── tsconfig.json        # TypeScript config
├── package.json
├── package-lock.json
├── metadata.json        # AI Studio app metadata
└── .env.example         # Environment variable template
```

## Database
None. All content is hardcoded.

## APIs and Integrations

| Integration | Purpose | Status |
|-------------|---------|--------|
| WhatsApp deep link | Lead CTA | Active |
| LinkedIn URLs | Founder profiles | Active |
| Google Drive | Logo + images | Active (fragile — see Known Limitations) |
| picsum.photos | Avatar placeholders | Active |
| Google Fonts | Typography | Active |
| `@google/genai` | Listed in `package.json` | **Not used in code** |
| `express` / `dotenv` | Listed in `package.json` | **Not used in code** |

## Authentication Flow
None — fully public site.

## Deployment
Originally deployed via Google AI Studio to Cloud Run:
`https://ais-pre-2ch5xfl7grfmynenjnholx-584226648081.asia-southeast1.run.app`

For self-hosting: `npm run build` produces a `dist/` folder (353 kB JS, 28 kB CSS) deployable to any static host (Vercel, Netlify, Firebase Hosting, S3+CloudFront).

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Gemini AI API key (injected by AI Studio; not consumed by current code) |
| `APP_URL` | Canonical URL for OG meta tags |

**Never commit actual values. Copy `.env.example` to `.env.local` and fill in locally.**

---

## Known Limitations
1. **Google Drive image links** — the logo and some images are served from Google Drive share links. These can break if sharing permissions change.
2. **Fonts from CDN** — Google Fonts is loaded over the network; fails in offline/restricted environments.
3. **No analytics** — there is no way to measure conversion or traffic.
4. **WhatsApp popup interval is aggressive** — the popup re-appears every 25 seconds, which may hurt UX.
5. **Unused dependencies** — `@google/genai`, `express`, and `dotenv` are in `package.json` but unused.
6. **All content is hardcoded** — updating copy, portfolio items, or founders requires a code change and redeploy.

## Technical Debt
- All components are in a single 500+ line `App.tsx` file — should be split into a `components/` directory.
- No error boundaries around image-heavy sections.
- No CMS or admin interface — content updates require developer involvement.

## Future Roadmap
1. **Split components** — move each section into its own file under `src/components/`.
2. **Add CMS** — use Contentlayer, Sanity, or a simple JSON config for content management.
3. **Analytics** — add Google Analytics or PostHog.
4. **Lead form** — replace WhatsApp-only CTA with an in-page contact form that emails the founders.
5. **Case studies** — add detailed project pages linked from the portfolio section.
6. **CI/CD** — add GitHub Actions for build + deploy on push to `main`.

## Recommended Next Priorities
1. Remove unused dependencies (`@google/genai`, `express`, `dotenv`)
2. Replace Google Drive image links with hosted assets
3. Split `App.tsx` into component files
4. Add Google Analytics

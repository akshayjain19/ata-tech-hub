# Setup Guide — ATA Tech Hub

## Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- A terminal / shell

---

## Installation

```bash
# Clone the repository
git clone https://github.com/akshayjain19/ata-tech-hub.git
cd ata-tech-hub

# Install dependencies
npm install
```

---

## Environment Setup

```bash
# Copy the example env file
cp .env.example .env.local
```

Then open `.env.local` and fill in the values:

| Variable | Where to get it |
|----------|----------------|
| `GEMINI_API_KEY` | Google AI Studio → API Keys |
| `APP_URL` | Your deployed domain (e.g. `https://atatechhub.com`) |

> The current codebase does **not** consume `GEMINI_API_KEY` at runtime. It is inherited from the original AI Studio scaffolding. Leave it blank if you are not adding Gemini features.

---

## Local Development

```bash
npm run dev
```

The app starts at **http://localhost:3000** with hot-module replacement enabled.

> HMR is disabled when the `DISABLE_HMR=true` environment variable is set (used by AI Studio). In normal local development it is on.

---

## Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type-check (no emit) |
| `npm run clean` | Delete `dist/` |

---

## Production Deployment

### Static hosting (Vercel / Netlify / Firebase)

```bash
npm run build
# Upload the dist/ folder to your host
```

For Vercel:
```bash
npx vercel --prod
```

For Netlify — set build command to `npm run build` and publish directory to `dist`.

### Google Cloud Run (original deployment target)

The AI Studio deployment builds a container from the project root. The `APP_URL` env var is injected automatically by AI Studio at runtime.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Logo shows broken image | Google Drive share link expired | Host the logo in the repo under `public/` and update the `src` in `Navbar` |
| Fonts not loading | No internet access / firewall | Self-host the fonts or use system fonts as fallback |
| Build fails | Missing `node_modules` | Run `npm install` |
| Port 3000 already in use | Another process | Kill it or pass `--port 3001` to `vite` |

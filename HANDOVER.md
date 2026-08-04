# Developer Handover — ATA Tech Hub

## Current Progress
The site is **feature-complete** as a marketing landing page. Build passes, type-check passes. It is deployable today.

The active development branch is `claude/setup-pwj4v8`. It is 2 commits ahead of `main`:
1. `bc395b4` — Add package-lock.json
2. `df0350d` — Add Prakhar Patni as third founder

---

## Remaining Work

### High Priority
| Task | Notes |
|------|-------|
| Merge `claude/setup-pwj4v8` → `main` | PR not yet created |
| Update Prakhar Patni's role + bullets | Current values are placeholders |
| Replace Google Drive image links | Unstable; self-host in `public/` |
| Remove unused dependencies | `@google/genai`, `express`, `dotenv` |

### Medium Priority
| Task | Notes |
|------|-------|
| Add Google Analytics / PostHog | No visibility into traffic or conversions |
| Split `App.tsx` into components | 500+ line single file; difficult to maintain |
| Add GitHub Actions CI | Auto-build + type-check on PRs |

### Low Priority
| Task | Notes |
|------|-------|
| Self-host Google Fonts | Resilience against network restrictions |
| CMS for content | Currently all hardcoded; updates need a developer |
| Contact form | Currently WhatsApp-only |

---

## High-Priority Bugs
None blocking. The following are latent risks:

1. **Logo image** (`Navbar`) is loaded from `lh3.googleusercontent.com/d/1jm1YowbNOdo5KlWO77LFeFDiiuhplanE`. If the Google Drive sharing permission is revoked, the logo disappears. The `onError` handler falls back to text, so it's graceful but not ideal.

2. **Portfolio images** are loaded from client sites' own CDNs (`zuperior.com`, `fastio.in`, etc.). These are outside your control and can break or change without warning.

3. **WhatsApp popup re-fires every 25 seconds** regardless of how many times the user closes it. `clearInterval` is not called when the user dismisses; only the component unmount (page close) clears it.

---

## Known Issues
- `package.json` `name` is `react-example` (AI Studio default) — should be updated to `ata-tech-hub`
- `vite.config.ts` exposes `GEMINI_API_KEY` client-side via `define`. If Gemini features are added, this is a security issue — use a backend proxy instead

---

## Edge Cases
- The `SocialProof` ticker and `Portfolio` carousel both duplicate the data array (`[...items, ...items]`) to create seamless infinite scroll. If items are added, make sure the array still has enough items to fill the viewport before the loop point.
- The FAQ accordion only allows one item open at a time (`setOpenIndex(-1)` closes all). This is intentional.

---

## Assumptions Made
- Prakhar Patni's role and bullets were assigned as placeholders (`Growth + Partnerships`). These **must be reviewed** by the founders before the site goes live with the new section.
- The comparison section's "Freelancers" and "Traditional Agencies" columns use an `X` icon from `lucide-react` — this is imported at the top of `App.tsx` and also used as the mobile nav close button. Do not remove it.

---

## Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Google Drive image links break | Medium | High (logo disappears) | Self-host images in `public/` |
| Client portfolio sites go down | Low | Medium (broken carousel images) | Store snapshots locally |
| WhatsApp number changes | Low | High (all CTAs break) | Move `WHATSAPP_URL` to env var |

---

## Suggested Implementation Order for Next Developer
1. **Create PR**: `claude/setup-pwj4v8` → `main` and merge
2. **Fix Prakhar's bio**: Update role + bullets in `src/App.tsx` (line ~388)
3. **Remove unused deps**: `npm uninstall @google/genai express dotenv`
4. **Self-host logo**: Download logo PNG → `public/logo.png` → update `Navbar` `src`
5. **Split components**: Create `src/components/` and move each section out of `App.tsx`
6. **Add analytics**: Wrap in `useEffect` on `App` mount
7. **CI**: Add `.github/workflows/ci.yml` with `npm ci && npm run lint && npm run build`

---

## Estimated Effort

| Task | Estimate |
|------|---------|
| Merge PR + update Prakhar bio | 30 min |
| Remove unused deps | 15 min |
| Self-host images | 1 hour |
| Split App.tsx into components | 2–3 hours |
| Add analytics | 1 hour |
| GitHub Actions CI | 30 min |
| Contact form with email backend | 1–2 days |
| Full CMS integration | 3–5 days |

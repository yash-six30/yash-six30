# The Loveverse — Build Log

### Milestone 1: Project Scaffolding & Setup (2026-10-24)
- **Scaffolding:** Initialized Next.js 16 with TypeScript, Tailwind CSS v4, and App Router.
- **GitHub Pages Configuration:**
  - Configured `next.config.ts` for static export (`output: 'export'`), base path routing, and unoptimized image export.
  - Added `.github/workflows/deploy.yml` for automated GitHub Pages continuous deployment.
  - Added `.nojekyll` touch to build step to prevent Jekyll from skipping `_next` asset directory.
  - Added `gh-pages` script for direct manual deployment.
- **Core Packages:** Installed `motion`, `zustand`, `howler`, `canvas-confetti`, `@lottiefiles/dotlottie-react`, `lucide-react`.
- **Audio Update:** Integrated user soundtrack `birthday.mp3` via Howler.js HTML5 audio with soft ambient volume (0.22) and persistent mute toggle.
- **Card Section Polish:** Upgraded card swipe animations with spring physics, 3D perspective rotation tilt, washi-tape aesthetic, and smooth layered ascension.
- **Game Mechanics Update:** Increased Heart Garden requirement to 12 hearts and removed all skip/tap-to-reveal shortcuts across mini-games.
- **Living Ambient Background:** Added dynamic drifting cherry blossom petals, floating hearts, sparkles, and breathing gradient orbs to make the background feel alive.
- **Mountain Climb Expedition Roadmap:** Replaced the floating island with a visual mountain climb roadmap with 5 elevation checkpoints from Basecamp to The Love Summit.
- **Respectful & Loving Tone Update:** Replaced all informal words (tu, teri, tere, tujhe, tera) with affectionate and respectful words (tum, tumhari, tumhare, tumhe, tumhara) throughout the story and final letter.
- **Splash Screen Pacing & Spacing:** Adjusted countdown pacing to a comfortable 1200ms per count, increased Mochi bunny size to 170px, removed dialogue bubble, simplified dedication to "To My Cutu Pattutuu ❤️", and polished vertical breathing room.
- **Letter Stationery & Envelope Redesign:** Upgraded Invitation envelope with 3D wax seal and unfolding gold-trimmed parchment; refined Final Letter with deckle-edge paper and smooth page-turn transitions.
- **Ambient Background Layering & Opacity Fix:** Re-indexed `AmbientBackground` with `z-20 pointer-events-none` so it renders visibly above all scene background gradients, while lowering particle opacity to a faint, elegant 20–24% so it doesn't obstruct text or cards.
- **Build Verification:** Static export `npm run build` verified successfully producing static HTML in `out/`.

# THE LOVEVERSE — Antigravity IDE Master Implementation Plan

**Project:** Shailaja's Magical Birthday Adventure  
**Birthday / target launch:** Friday, 30 October 2026  
**Plan prepared:** 24 October 2026  
**Budget:** ₹0 (free tooling and individually license-checked free assets)  
**Experience:** Mobile-first, 3D-cute-fantasy × pink-coquette interactive story  
**Main character:** Mochi, an expressive white plush bunny with a satin pink bow  
**Content:** Eight photos; five relationship milestones; five mini-games; three digital love coupons; final personal letter  
**Primary deployment:** Vercel free tier, subject to its current terms and usage limits  
**Document status:** Build-ready specification; personal photos and final audio/animation selections remain to be supplied.

---

## 0. Instructions to the Antigravity coding agent

Read this entire file before modifying the repository. Treat it as the single source of truth for scope, scene flow, art direction, asset names, technical architecture, acceptance tests, and deployment. Implement in small verifiable milestones. Do not silently substitute generic UI icons, emoji, or mismatched stock art for the requested illustrated/animated world. Do not fabricate external asset URLs, licenses, or download success. If a real asset is not yet available, use a clearly labeled **temporary placeholder** with the exact required filename/path tracked in `ASSET_STATUS.md`; keep the application functional. Never claim an asset is complete unless its file exists and renders.

**Operating principles:**
1. Mobile-first, responsive, touch-first; desktop gets a centered cinematic story stage.
2. Build an emotionally coherent playable experience before optional 3D effects.
3. Use one coherent bunny character design and consistent 3D-style scene artwork.
4. Animate meaningful interactions; do not animate everything at full intensity continuously.
5. All games must have accessible alternative controls, retry, and skip; no hard dead ends.
6. Use only freely usable assets with recorded license and attribution requirements; don't assume every free-to-view asset is reusable.
7. Photos and messages are personal; do not publish them to a public repository or pretend a public Vercel URL is private.
8. Run lint, typecheck, production build, mobile tests, and asset validation after every major milestone.
9. Keep user-authored text in data files, never buried in components.
10. Do not introduce paid SaaS, authentication services, analytics, or backend dependencies without approval.

### Agent's first actions
- Inspect repo and existing package manager; do not overwrite work.
- Create `docs/ASSET_STATUS.md` from the manifest in section 8, with status `missing` for every real asset not present.
- Scaffold application, scene state machine, design tokens, responsive stage, and placeholder-backed asset loader.
- Implement scenes in priority order, test each one, then replace placeholders with real sourced/created assets.
- Keep a brief `docs/BUILD_LOG.md` listing completed work, blockers, and next steps.

---

## 1. Experience vision and non-negotiable quality bar

**Narrative:** Mochi has secretly built a magical world for Shailaja's birthday. He delivers an invitation, leads her through locations on a floating island, helps her gather heart charms and memories, reveals three love coupons and scratch-card messages, and finally delivers a heartfelt letter. The five personal milestones are meeting in a hospital, first video call, first scooty ride, first car ride, and first kiss.

**Desired feeling:** charming, funny, gently teasing, personal, warm, romantic, then emotional. **Not:** dashboard UI, generic pink cards, random emoji, overdone particle spam, mismatched mascot drawings, long unskippable intros, loud music, or impossible games.

**Experience length:** approximately 8–12 minutes, flexible for readers. **Scenes:** eight. **Mini-games:** five. **Photos:** eight. **Gift coupons:** three.

### Art bible
- Main colors: blush `#FFF5F8`, baby pink `#FBCFE8`, rose `#F472B6`, berry `#BE185D`, warm cream `#FFF0D9`, near-ink `#51263B`, soft gold `#E9C67B`.
- Lighting: warm, soft, diffused, gentle highlights; avoid high-contrast neon and cold hard shadows.
- Materials: plush fabric for Mochi, matte clay-like surfaces for architecture, satin for bows, soft glossy hearts, pearl accents, paper for memories.
- Shape language: round, puffy, toy-like, no sharp industrial geometry.
- Scene camera: consistent three-quarter/isometric or frontal storybook perspective; do not alternate between photorealism, anime, and flat-vector assets.
- Typography: Playfair Display for major romantic headings, Nunito for readable body and buttons; use font loading with fallbacks.
- Composition: clear central interaction zone, negative space for text, layered foreground/midground/background; respect safe areas and avoid obstructing faces/photos.
- Mascot continuity: white plush bunny; blush cheeks; large rounded dark eyes; pink satin bow on **one consistent ear**; fixed proportions and shading across states.
- Visual hierarchy: immersive art first, compact interface second; controls can be rounded but should feel integrated with the fantasy setting.

### Responsive breakpoints and stage
- Primary: 360×800, 375×812, 390×844, 412×915, 430×932 CSS pixels.
- Small: 320px width and short-height phones; test no clipping and scroll when needed.
- Tablet: 768px; desktop: 1280px+.
- Use `100dvh` where appropriate, `env(safe-area-inset-*)`, and sensible minimum heights.
- Desktop stage max-width approximately 480–560px for game interactions; decorative wide background around it.
- Never depend on hover, drag-only input, microphone permission, or sound.

---

## 2. Story architecture and exact navigation

Scene IDs and progression:

| Order | Scene ID | Scene title | Interaction | Unlock condition |
|---|---|---|---|---|
| 1 | `invitation` | Magical Invitation | Open envelope | Start button / open seal |
| 2 | `island` | The Floating Island | Tap unlocked location | Invitation completed |
| 3 | `heart-garden` | Catch My Hearts | Tap hearts | 12 hearts, or skip |
| 4 | `memory-cottage` | Memory Cottage | Browse photos + 3×3 puzzle | Puzzle complete, reveal, or skip |
| 5 | `birthday-cafe` | Birthday Café | Decorate cake + extinguish candles | All candles out |
| 6 | `gift-castle` | Gift Castle | Three clue/gift reveals | Three gifts opened |
| 7 | `secret-garden` | Scratch Cards | Scratch/reveal three cards | All cards revealed |
| 8 | `final-letter` | Final Letter | Read personal letter | Secret Garden completed |

**Navigation design:** On first play, Mochi guides linear chapter progression. `island` functions as a hub; previously unlocked locations remain revisitable. A tiny ribbon progress indicator shows completed locations, not arbitrary percentage. The user may return to the island and replay scenes without losing gifts. The final letter remains available after unlock. A restart action requires confirmation.

**Scene transitions:** fade/scale current scene, ribbon wipe, layered particles, enter next environment, then Mochi gesture. Typical transition 0.7–1.2s; provide reduced-motion fallback with instant/fade navigation. Avoid large video transitions.

### Universal scene chrome
- Compact top-left home/island button when applicable.
- Top-right music on/off, accessible name and state.
- Small progress ribbon / charm inventory.
- Skip/retry/replay controls for mini-games.
- Loading indicator or skeleton if a required asset is still decoding.
- Focus management on scene change, accessible live announcement of scene name.

---

## 3. Scene-by-scene production specification

### 3.1 Invitation (`invitation`)
**Art:** moving blush clouds, floating golden dust, oversized pink envelope with heart wax seal, Mochi foreground.  
**Choreography:** 0–1.5s clouds part; 1.5–3s Mochi hops carrying envelope; 3–4.5s playful stumble/recovery; 4.5–6s envelope glows; wait indefinitely for tap.  
**Copy:** `Psst… Shailaja! You've got very special mail. 💌` / `Mochi has a little birthday surprise for you. Ready?`  
**Interactions:** Tap seal or large `Open my letter` control; envelope opens; invitation message unfolds; `Enter the Loveverse` advances.  
**Acceptance:** Works with keyboard Enter/Space; no auto-advance; mute control works; skipped intro still reveals correct content.

### 3.2 Floating Island (`island`)
**Art:** one coherent pre-rendered fantasy island with Heart Garden, Memory Cottage, Birthday Café, Gift Castle, Secret Garden. Clouds drift in layered parallax; subtle floating heart balloons and flower petals.  
**Interactions:** Five large transparent or illustrated hotspot buttons positioned using normalized percentages; unlocked locations pulse subtly; locked ones show friendly clue and never impersonate buttons that work. Mochi guides the next recommended destination.  
**Behavior:** On initial arrival, guide to Heart Garden. When a chapter is completed, return to island or offer `Continue to next place` with optional hub view.  
**Acceptance:** Hotspots remain aligned across aspect ratios; each has a visible label and accessible button; no hotspots behind phone notch.

### 3.3 Heart Garden (`heart-garden`)
**Art:** cherry blossoms, garden arch, floating pink and gold hearts, small heart-shaped collector charm, Mochi cheering.  
**Game:** 20-second round, target 12 successful heart taps. Spawn 1–3 tappable hearts at a time within safe playfield; keep hit area at least 44×44px. Gold hearts may award 2 hearts, but score cap is 12. No negative penalties.  
**Compliments:** Show one at 3, 6, 9, and 12 collected hearts; configurable messages.  
**Win:** freeze spawns, play heart-burst Lottie, show `You caught them all… but you've had my heart all along.`, award `heart-charm`.  
**Loss:** retry or `Collect with Mochi` (skip) without shaming.  
**Acceptance:** No runaway intervals or timers after unmount; pointer and keyboard support; deterministic score; no double-count from multi-touch.

### 3.4 Memory Cottage (`memory-cottage`)
**Art:** cozy pink cottage interior, shelf, scrapbook, fairy lights, eight Polaroid cards.  
**Photo sequence:** 8 photos, each with title, caption, optional date; first five are milestones, last three are placeholders until selected. Tap to flip Polaroid and read message. Swipe or arrow controls to navigate.  
**Puzzle:** Use one chosen photo (default photo 8) as a 3×3 **tile-swap** puzzle, not a sliding puzzle. Randomize tiles with Fisher–Yates, prevent initially solved shuffle; tap two tiles to swap; track completion by index. Offer `Show me the memory` reveal.  
**Win:** Polaroid assembles, golden edge sparkles, award `memory-keepsake`.  
**Acceptance:** Photos display in correct aspect ratio without face cropping; alt text; touch and keyboard tile selection; reset/reveal; no image fetch errors.

### 3.5 Birthday Café (`birthday-cafe`)
**Art:** pastel café, cake on a table, Mochi wheeling cake cart, animated candles, toppings.  
**Interactions:** Choose 2–3 decorations (strawberry, cherry, bow, heart topper); place them using buttons (not mandatory drag). Place 3 candles. Tap each candle to extinguish. Optional microphone mode only if requested by user action, permission granted, and robust audio-level detection implemented; **tap is the default and complete path**.  
**Choreography:** warm candle flicker; after last candle, 0.3s dim, 0.5s smoke wisps, 1.2s stars/confetti; wish message.  
**Copy:** `Close your eyes and make a wish, Shailaja. ✨` / `I hope all the beautiful things you're wishing for find their way to you.`  
**Reward:** `wish-charm`.  
**Acceptance:** Cake works without mic; no autoplay sound; candle states persist; can replay.

### 3.6 Gift Castle (`gift-castle`)
**Art:** plush velvet cushions, 3 ornate gift boxes, pearl and ribbon decorations, Mochi pointing.  
**Interaction:** Three sequential clue cards, each with a hint and `Reveal gift` fallback. Clues should be sweet rather than strict security questions; never gate on obscure dates not provided.  
**Gift 1:** Unlimited Hugs Coupon — `Redeem whenever you need a hug, comfort, or no reason at all. Valid forever.`  
**Gift 2:** Your Choice Date Night — `You choose the place, food, movie, and plan. I'll make it special. Redeem when we're both free.`  
**Gift 3:** Princess Treatment Day — `A day dedicated to your favorite things, surprises, and extra love. We'll pick a day together.`  
**Choreography:** wiggle box, loosen bow, pop lid, glow, float coupon.  
**Acceptance:** Each gift is uniquely claimable; coupon can be saved as PNG or printed via browser, no fake backend redemption; gifts persist locally.

### 3.7 Secret Garden (`secret-garden`)
**Art:** moonlit pink garden, 3 scratch tickets, glowing lanterns, petals.  
**Scratch mechanic:** Canvas 2D opaque foil overlay, pointer stroke with round cap; use devicePixelRatio for sharpness; pointer capture; calculate erased fraction on a throttled/low-resolution sample grid (not every frame). Auto-reveal when roughly 65% erased; also provide visible `Reveal` button.  
**Cards:** `You're my favorite notification`, `One extra-long hug is waiting for you`, `I'd choose you all over again`.  
**Reward:** final golden envelope after all three revealed.  
**Acceptance:** Scratch works on iOS Safari and Android Chrome; scrolling not accidentally blocked outside canvas; pointercancel handled; keyboard reveal works.

### 3.8 Final Letter (`final-letter`)
**Art:** island at dusk transitioning to a starry pink sky, Mochi carrying gold-edged envelope, personal photo montage, soft floating hearts.  
**Flow:** cinematic 8–15s intro with `Skip animation`; letter opens; show 5 short readable sections, each with next/previous and a relevant photo; never auto-scroll text while reading. Final page shows `Happy Birthday, Shailaja ❤️` and optional closing photo.  
**Actions:** `Read again`, `Return to our memories`, `Save letter` (render printable HTML or export PNG/PDF only if implemented and tested).  
**Acceptance:** Entire letter readable with large text settings; no clipping; final photo and personal copy load; keyboard navigation works.

---

## 4. Personalized copy and content data

All text is editable in `src/content/` (or equivalent), with no invented factual dates. Tone: warm Hinglish/English-neutral unless user later specifies language; do not fabricate what either person felt or said.

### Eight photo slots

| Photo | ID | Heading | Event / use | Content status |
|---|---|---|---|---|
| 01 | `hospital` | Where It All Began | Meeting in hospital | Caption drafted; photo missing |
| 02 | `video-call` | The First Video Call | First video call | Caption drafted; photo missing |
| 03 | `scooty` | Two Hearts, One Scooty | First scooty ride | Caption drafted; photo missing |
| 04 | `car` | My Favorite Passenger | First car ride | Caption drafted; photo missing |
| 05 | `kiss` | That Special Moment | First kiss | Caption drafted; photo missing |
| 06 | `smile` | My Favorite Smile | Portrait/candid | Placeholder caption/photo |
| 07 | `chaos` | Our Little Chaos | Funny shared moment | Placeholder caption/photo |
| 08 | `together` | Us, Just Being Us | Favorite couple photo; puzzle/finale | Placeholder caption/photo |

**Suggested caption placeholders:**
- Hospital: `Of all the places in the world, our story began in a hospital. Somehow, that ordinary day became the start of something special.`
- First video call: `That first call became one of the little moments I still love remembering.`
- Scooty ride: `I wish that road had been a little longer.`
- Car ride: `The destination mattered less than having you there.`
- First kiss: `Some memories don't need many words. This is one of mine.`
- Photo 6: `[Write one specific thing about her smile.]`
- Photo 7: `[Add an actual inside joke or funny incident.]`
- Photo 8: `[Write what you love about being together.]`

### Final letter — editable starter draft

> **To My Shailaja ❤️**
>
> Happy Birthday, my love.
>
> I wanted to give you something different this year—not just a present, but a tiny world made from the memories we've shared and the moments I want to remember.
>
> Sometimes I think about how unexpectedly our story began. Of all places, we met in a hospital. And then there was our first video call, our first scooty ride, our first car ride, and our first kiss. Each became part of a story that means so much to me.
>
> I love those big milestones, but I also love the little things: the conversations, the teasing, the laughter, and the ordinary moments that feel special because you're there.
>
> I hope this birthday brings you joy, peace, confidence, new opportunities, and everything your heart is quietly wishing for. I hope I can be someone who makes the difficult days easier and the happy days even happier.
>
> I can't promise every day will be perfect. But I do want to keep making memories with you, one little adventure at a time.
>
> Happy Birthday, Shailaja. Thank you for being part of my life. Here's to all the chapters we haven't lived yet.
>
> **With all my love,**  
> **Your favorite person (hopefully 😌💕)**

**Review required:** Personalize phrasing before launch; the developer should not treat these generic emotional lines as verified autobiographical claims.

### Data models

```ts
type SceneId =
  | 'invitation' | 'island' | 'heart-garden' | 'memory-cottage'
  | 'birthday-cafe' | 'gift-castle' | 'secret-garden' | 'final-letter';

type Memory = {
  id: string;
  title: string;
  image: string;
  alt: string;
  caption: string;
  date?: string;
};

type Coupon = {
  id: 'hugs' | 'date-night' | 'princess-day';
  title: string;
  description: string;
  terms: string;
  art: string;
};

type AdventureState = {
  version: number;
  currentScene: SceneId;
  unlockedScenes: SceneId[];
  completedGames: string[];
  openedGifts: string[];
  revealedScratchCards: string[];
  collectedCharms: string[];
  musicEnabled: boolean;
  completed: boolean;
};
```

Use a data-driven scene registry for chapter title, scene component, asset bundle, unlock condition, and next chapter. Implement `canEnterScene()` and idempotent `completeGame()` / `awardReward()` to prevent duplicate unlocks. Never trust `localStorage` as secure access control.

---

## 5. Technical stack and engineering standards

| Concern | Selection | Why |
|---|---|---|
| App | Next.js App Router, React, TypeScript | Static-friendly deployment and typed components |
| Styling | Tailwind CSS + CSS variables | Responsive tokens and custom illustrated UI |
| Motion | `motion` (`motion/react`) | Entrance, exit, gesture, spring orchestration |
| Lottie | `@lottiefiles/dotlottie-react` | Render downloaded `.lottie` assets |
| Mascot | Transparent WebP sequences or Lottie; Rive only if compatible free deployment/license | Consistent animated character |
| State | Zustand `persist` | Local progress, no backend |
| Sound | Howler.js | Loop, fade, mute, sound effects |
| Scratch | Canvas 2D | Precise pointer-driven reveal |
| Confetti | `canvas-confetti` or lightweight custom canvas | Controlled celebration |
| Images | Next.js `Image`, local WebP/AVIF | Performance and responsive sizes |
| Hosting | Vercel free tier | HTTPS and simple deployments |
| Tests | Vitest + Testing Library + Playwright | Logic and browser behavior |
| Quality | ESLint + TypeScript strict | Catch implementation defects |

### Setup commands

```bash
npx create-next-app@latest shailaja-loveverse --typescript --tailwind --eslint --app
cd shailaja-loveverse
npm install motion @lottiefiles/dotlottie-react zustand howler canvas-confetti
npm install -D @types/howler @types/canvas-confetti vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test
```

Check current package documentation if installation APIs have changed. Do not blindly install paid packages or dependencies that are not actually used.

### Suggested repository layout

```text
shailaja-loveverse/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/
│   ├── components/
│   │   ├── world/       # IslandMap, Hotspot, ParallaxLayer
│   │   ├── mascot/      # Mochi, state controller
│   │   ├── scenes/      # Eight scene components
│   │   ├── games/       # Five game components
│   │   ├── effects/     # Lottie, particles, transitions
│   │   ├── memories/    # Polaroid, MemoryBook, Puzzle
│   │   ├── gifts/       # Coupon, Reveal, SaveCoupon
│   │   └── ui/          # Music, progress, dialog, controls
│   ├── content/
│   │   ├── config.ts
│   │   ├── memories.ts
│   │   ├── coupons.ts
│   │   ├── messages.ts
│   │   └── letter.ts
│   ├── store/adventure.ts
│   ├── lib/scene-machine.ts
│   ├── lib/assets.ts
│   ├── lib/audio.ts
│   ├── hooks/
│   └── styles/tokens.css
├── public/
│   ├── art/scenes/
│   ├── art/objects/
│   ├── art/mascot/
│   ├── art/ui/
│   ├── animations/
│   ├── photos/
│   └── audio/
├── tests/unit/
├── tests/e2e/
├── docs/
│   ├── ASSET_STATUS.md
│   ├── ASSET_LICENSES.md
│   ├── BUILD_LOG.md
│   └── QA_CHECKLIST.md
└── README.md
```

### Performance rules
- Aim for **<2 MB initial compressed asset transfer excluding optional music**; validate rather than claim success.
- Preload only current scene plus next scene's key artwork; lazy-load later chapters.
- Keep 3D-style environments pre-rendered; no always-running full 3D engine in P0.
- Use transform/opacity animation where possible, avoid large blur/filter animations.
- Cap simultaneous decorative particles and stop timers/audio when hidden/unmounted.
- Decode photos efficiently; avoid multiple large 4K originals in memory.
- Pause animated decorations with `prefers-reduced-motion` and document visibility.
- Sound begins **only after user gesture**, persistent mute control, and smooth scene-based fades.
- Target smooth interaction on representative midrange Android Chrome and iPhone Safari; measure rather than guarantee 60 FPS.
- Avoid layout shift by reserving art aspect ratios.

### Accessibility rules
- All interactive hotspots and game controls must be real `<button>` elements or equivalents with proper semantics.
- Minimum target size 44×44 CSS px.
- Keyboard access and visible focus ring; escape closes dialogs.
- Reduced motion mode, no flashing effects, readable contrast and scalable text.
- Puzzle supports click/tap tile selection, not drag-only.
- Scratch has `Reveal` alternative; cake has tap alternative to microphone.
- Announce progress and completion through a polite live region; avoid noisy repeated announcements.
- No button that intentionally becomes permanently impossible to click.

### Privacy and security
- No analytics, tracking pixels, or external form submissions by default.
- Treat photos and personal letter as sensitive; a static public website is **not private**. Use only content the couple is comfortable sharing via URL; if stronger privacy is required, add an actual access-control solution or host privately (requires a separate design decision).
- Keep source repository private; do not commit original high-resolution photos or metadata-heavy originals.
- Strip EXIF metadata and optimize photos before publishing.
- Disable search indexing via robots metadata, while explicitly noting this does **not** provide access control.
- Avoid storing private data in browser logs or third-party analytics.
- Record every third-party asset's original URL, creator, license, attribution, and download date.

---

## 6. Motion and sound direction

### Global motion language
- Primary spring: friendly, medium bounce, no aggressive overshoot.
- Scene transition: 0.7–1.2 seconds; intro may be longer but skippable.
- Idle loops: gentle 3–7 second cycles with small offsets.
- Tap feedback: immediate scale-down/up under 200ms; sound optional.
- Rewards: layered reveal with sparkle and one strong focus object.
- Letter: calmer motion, slower fades, minimal distractions.

### Mochi animation state machine
`idle`, `blink`, `wave`, `hop`, `point`, `surprised`, `giggle`, `celebrate`, `hug`, `carry-envelope`, `deliver-letter`, `sleep`.

Rules: idle by default; transient actions return to idle; avoid overlapping mutually exclusive states; don't require custom Rive runtime for MVP. For transparent sequence animations, store state as a `.webp` sequence or `.lottie` when available; fallback to static consistent `mochi-idle.webp` with Motion transforms.

### Sound design
- One instrumental romantic background loop, **licensed for interactive website use**.
- SFX: envelope open, bunny hop, heart pop, success chime, candle extinguish, gift open, paper flip, scratch reveal, finale shimmer.
- Duck music under important sound effects; do not overlap excessive sounds.
- Volume defaults low (~20–30% perceived level); store user choice.
- Never embed music from commercial songs without rights.

---

## 7. Asset sourcing, generation, and licensing workflow

**Asset strategy:** Use one consistent generated/illustrated 3D-look set for hero backgrounds and Mochi, supplemented with license-checked Lottie animations for generic effects. A coherent static image with tasteful animated layers is preferable to inconsistent real-time 3D models.

### Potential free libraries (check individual asset terms)
- **LottieFiles:** https://lottiefiles.com/ — hearts, confetti, sparkles, envelope/gift effects; verify each asset's license and whether downloads are free.
- **Pixabay Music:** https://pixabay.com/music/ — search `romantic piano`, `soft instrumental`, `gentle music box`; preview and retain license evidence; review restrictions on distribution and any content-identification notices.
- **Mixkit SFX:** https://mixkit.co/free-sound-effects/ — chimes, pops, paper and magic; check exact license for interactive website use.
- **Sketchfab:** https://sketchfab.com/ — 3D reference models; use only downloadable models with compatible licenses and required attribution.
- **Poly Pizza:** https://poly.pizza/ — optional free 3D prop models; inspect model-specific licenses.
- **Google Fonts:** https://fonts.google.com/ — Playfair Display, Nunito; self-host if appropriate.
- **Spline:** https://spline.design/ — optional, only if current free-plan export/embedding and performance permit.
- **Rive:** https://rive.app/ — optional custom mascot rig; verify current production-runtime terms before adopting.

**No asset has been downloaded or licensed by this plan.** All names below are required local deliverables, not claims that a particular free library has those exact files. The developer must either source compatible real assets or create cohesive originals, and log provenance.

### Free asset decision procedure
1. Search exact keywords, preview candidate, inspect actual license and usage limitations.
2. Confirm export/download is free and allows embedding in an interactive public website.
3. Verify art style matches the art bible; reject mismatched assets even if free.
4. Download local copy; record source URL, author, license, attribution, date in `ASSET_LICENSES.md`.
5. Optimize, test render on mobile, add to manifest and mark `ready`.
6. If unsuitable, create original compatible artwork/animation instead of inserting generic substitutes.

### Consistent asset generation prompts

**Global style prefix for all original scene images:**
> Premium adorable 3D clay/plush fantasy game art, pink coquette aesthetic, soft warm studio lighting, satin ribbons, pearls, blush pink and warm cream palette, rounded toy-like forms, subtle depth, clean polished materials, magical sparkles, cohesive children's storybook game environment, no text, no watermark, high-quality composition, gentle cinematic depth, consistent perspective and lighting.

**Mochi character sheet:**
> One identical tiny white plush bunny mascot with big rounded dark eyes, rosy cheeks, short fluffy tail, soft fabric texture, and a satin pink bow tied on its [choose left or right] ear. Produce clean full-body reference views and consistent expressions: idle, wave, hop, point, surprised, giggle, celebrate, hug, carrying envelope, delivering letter, sleepy. Keep proportions, bow location, eyes, lighting, and colors unchanged. Plain background or transparent cutout. No text.

**Island hero:**
> A floating pink fantasy island seen from a stable three-quarter storybook camera, with five clearly separated landmarks: heart garden, cozy memory cottage, birthday cake café, gift castle, moonlit secret garden. Soft cloud sea, cherry blossoms, satin bows, glowing paths, floating balloons. Leave clean negative space for tappable hotspot labels. No people, no text, no watermark.

**Scene variants:** Use global prefix and request matching camera angle, coherent light and material palette, clear safe central game area, and no baked-in UI text. Generate each scene as background plus separable foreground elements when possible.

**Important:** A single rendered image cannot supply actual interactive elements or transparent animation states. Those must be implemented with code or exported as separate assets.

---

## 8. COMPLETE ASSET MANIFEST — exact paths and acceptance

**Legend:** P0 = required for launch; P1 = polish; P2 = optional. `GEN` = create consistent original; `SRC` = source from licensed library; `USER` = supplied photo/text; `CODE` = create with SVG/CSS/Canvas. All files must be present or have an explicit placeholder/fallback entry. Targets are budgets, not measured file sizes.

### 8A. Environment art — 11 files

| ID | Priority | File | Source | Format / suggested dimensions | Usage |
|---|---|---|---|---|---|
| ENV01 | P0 | `public/art/scenes/invitation-clouds.webp` | GEN | WebP 1440×1920 | Invitation background |
| ENV02 | P0 | `public/art/scenes/island-day.webp` | GEN | WebP 1440×1920 | Main interactive map |
| ENV03 | P0 | `public/art/scenes/heart-garden.webp` | GEN | WebP 1440×1920 | Heart game |
| ENV04 | P0 | `public/art/scenes/memory-cottage.webp` | GEN | WebP 1440×1920 | Scrapbook |
| ENV05 | P0 | `public/art/scenes/birthday-cafe.webp` | GEN | WebP 1440×1920 | Cake |
| ENV06 | P0 | `public/art/scenes/gift-castle.webp` | GEN | WebP 1440×1920 | Gifts |
| ENV07 | P0 | `public/art/scenes/secret-garden.webp` | GEN | WebP 1440×1920 | Scratch cards |
| ENV08 | P0 | `public/art/scenes/finale-night.webp` | GEN | WebP 1440×1920 | Letter finale |
| ENV09 | P1 | `public/art/scenes/clouds-foreground.webp` | GEN | Transparent WebP 1440×1920 | Parallax foreground |
| ENV10 | P1 | `public/art/scenes/petals-overlay.webp` | GEN | Transparent WebP 1440×1920 | Petal layer |
| ENV11 | P1 | `public/art/scenes/island-dusk.webp` | GEN | WebP 1440×1920 | Finale transition |

**Export note:** Keep original master art separately; create responsive AVIF/WebP variants as appropriate. Each scene should generally aim for 150–400KB compressed where visually acceptable, but measure.

### 8B. Mochi mascot — 13 files

| ID | Priority | File | Source | Format | State |
|---|---|---|---|---|---|
| M01 | P0 | `public/art/mascot/mochi-idle.webp` | GEN | Transparent WebP | Base fallback |
| M02 | P0 | `public/art/mascot/mochi-wave.webp` | GEN | Transparent WebP | Greeting |
| M03 | P0 | `public/art/mascot/mochi-hop.webp` | GEN | Transparent WebP | Movement |
| M04 | P0 | `public/art/mascot/mochi-point.webp` | GEN | Transparent WebP | Guide |
| M05 | P0 | `public/art/mascot/mochi-surprised.webp` | GEN | Transparent WebP | Reaction |
| M06 | P0 | `public/art/mascot/mochi-celebrate.webp` | GEN | Transparent WebP | Win |
| M07 | P0 | `public/art/mascot/mochi-envelope.webp` | GEN | Transparent WebP | Intro |
| M08 | P0 | `public/art/mascot/mochi-letter.webp` | GEN | Transparent WebP | Finale |
| M09 | P1 | `public/art/mascot/mochi-blink.webp` | GEN | Transparent WebP | Idle variation |
| M10 | P1 | `public/art/mascot/mochi-giggle.webp` | GEN | Transparent WebP | Funny response |
| M11 | P1 | `public/art/mascot/mochi-hug.webp` | GEN | Transparent WebP | Emotional reaction |
| M12 | P1 | `public/art/mascot/mochi-sleep.webp` | GEN | Transparent WebP | Easter egg |
| M13 | P1 | `public/animations/mochi-idle.lottie` | GEN/SRC | Lottie | Actual loop if consistent |

**MVP behavior:** M01–M08 are distinct static poses animated with Motion. Full bespoke animated poses are P1, not required to block launch.

### 8C. Interactive props and decorations — 25 files

| ID | Priority | File | Source | Format | Usage |
|---|---|---|---|---|---|
| OBJ01 | P0 | `public/art/objects/envelope-closed.webp` | GEN | Transparent WebP | Intro |
| OBJ02 | P0 | `public/art/objects/envelope-open.webp` | GEN | Transparent WebP | Intro reveal |
| OBJ03 | P0 | `public/art/objects/wax-seal.webp` | GEN | Transparent WebP | Envelope button |
| OBJ04 | P0 | `public/art/objects/heart-pink.webp` | GEN | Transparent WebP | Heart game |
| OBJ05 | P0 | `public/art/objects/heart-gold.webp` | GEN | Transparent WebP | Bonus heart |
| OBJ06 | P0 | `public/art/objects/heart-charm.webp` | GEN | Transparent WebP | Reward |
| OBJ07 | P0 | `public/art/objects/polaroid-frame.webp` | GEN | Transparent WebP | Memory frame |
| OBJ08 | P0 | `public/art/objects/scrapbook-open.webp` | GEN | Transparent WebP | Memory book |
| OBJ09 | P0 | `public/art/objects/cake-base.webp` | GEN | Transparent WebP | Cake |
| OBJ10 | P0 | `public/art/objects/cake-candle.webp` | GEN/CODE | Transparent WebP/SVG | Candle |
| OBJ11 | P0 | `public/art/objects/cake-strawberry.webp` | GEN | Transparent WebP | Topping |
| OBJ12 | P0 | `public/art/objects/cake-cherry.webp` | GEN | Transparent WebP | Topping |
| OBJ13 | P0 | `public/art/objects/cake-heart-topper.webp` | GEN | Transparent WebP | Topping |
| OBJ14 | P0 | `public/art/objects/wish-charm.webp` | GEN | Transparent WebP | Reward |
| OBJ15 | P0 | `public/art/objects/gift-box-closed.webp` | GEN | Transparent WebP | Gift stage |
| OBJ16 | P0 | `public/art/objects/gift-box-open.webp` | GEN | Transparent WebP | Gift reveal |
| OBJ17 | P0 | `public/art/objects/golden-key.webp` | GEN | Transparent WebP | Clue stage |
| OBJ18 | P0 | `public/art/objects/coupon-frame.webp` | GEN | Transparent WebP | Coupon art |
| OBJ19 | P0 | `public/art/objects/scratch-card-frame.webp` | GEN | Transparent WebP | Scratch frame |
| OBJ20 | P0 | `public/art/objects/scratch-foil.webp` | GEN/CODE | PNG/SVG texture | Scratch overlay |
| OBJ21 | P0 | `public/art/objects/golden-envelope.webp` | GEN | Transparent WebP | Finale |
| OBJ22 | P0 | `public/art/objects/letter-paper.webp` | GEN | Transparent WebP | Letter |
| OBJ23 | P1 | `public/art/objects/pink-ribbon.webp` | GEN | Transparent WebP | Transitions |
| OBJ24 | P1 | `public/art/objects/pearl-bow.webp` | GEN | Transparent WebP | Decoration |
| OBJ25 | P1 | `public/art/objects/balloon-heart.webp` | GEN | Transparent WebP | Island decoration |

### 8D. Lottie and effect animations — 12 files

| ID | Priority | File | Source | Search terms / role |
|---|---|---|---|---|
| ANI01 | P0 | `public/animations/heart-burst.lottie` | SRC/GEN | heart burst, love explosion |
| ANI02 | P0 | `public/animations/magic-sparkles.lottie` | SRC/GEN | magic sparkles, fairy dust |
| ANI03 | P0 | `public/animations/confetti.lottie` | SRC/GEN | pastel confetti, celebration |
| ANI04 | P0 | `public/animations/gift-reveal.lottie` | SRC/GEN | gift opening, surprise |
| ANI05 | P0 | `public/animations/candle-flame.lottie` | SRC/GEN/CODE | candle flame; CSS fallback |
| ANI06 | P1 | `public/animations/envelope-open.lottie` | SRC/GEN | envelope opening |
| ANI07 | P1 | `public/animations/smoke-wisp.lottie` | SRC/GEN/CODE | candle smoke |
| ANI08 | P1 | `public/animations/flower-bloom.lottie` | SRC/GEN | pink flower blooming |
| ANI09 | P1 | `public/animations/heart-float.lottie` | SRC/GEN/CODE | floating heart |
| ANI10 | P1 | `public/animations/star-twinkle.lottie` | SRC/GEN/CODE | stars |
| ANI11 | P1 | `public/animations/ribbon-transition.lottie` | SRC/GEN/CODE | satin ribbon wipe |
| ANI12 | P1 | `public/animations/success-charm.lottie` | SRC/GEN | magic reward reveal |

**Fallback:** When no stylistically compatible, license-checked Lottie exists, implement equivalent lightweight Motion/CSS/SVG effects. Never import a visually unrelated animation just to fill the manifest.

### 8E. UI illustrations and chapter stickers — 14 files

| ID | Priority | File | Source | Use |
|---|---|---|---|---|
| UI01 | P0 | `public/art/ui/progress-ribbon.svg` | CODE/GEN | Progress display |
| UI02 | P0 | `public/art/ui/scene-plaque.svg` | CODE/GEN | Scene headings |
| UI03 | P0 | `public/art/ui/button-primary.svg` | CODE/GEN | Illustrated button treatment |
| UI04 | P0 | `public/art/ui/button-secondary.svg` | CODE/GEN | Secondary button |
| UI05 | P0 | `public/art/ui/music-on.svg` | CODE | Sound control |
| UI06 | P0 | `public/art/ui/music-off.svg` | CODE | Sound control |
| UI07 | P0 | `public/art/ui/lock.svg` | CODE/GEN | Locked scene |
| UI08 | P0 | `public/art/ui/sticker-hospital.svg` | CODE/GEN | Hospital memory |
| UI09 | P0 | `public/art/ui/sticker-video-call.svg` | CODE/GEN | Video-call memory |
| UI10 | P0 | `public/art/ui/sticker-scooty.svg` | CODE/GEN | Scooty memory |
| UI11 | P0 | `public/art/ui/sticker-car.svg` | CODE/GEN | Car memory |
| UI12 | P0 | `public/art/ui/sticker-kiss-heart.svg` | CODE/GEN | First-kiss memory |
| UI13 | P1 | `public/art/ui/heart-cursor.svg` | CODE | Decorative pointer |
| UI14 | P1 | `public/art/ui/achievement-badge.svg` | CODE/GEN | Completed scenes |

SVG buttons must be decorative backgrounds for semantic HTML buttons; never replace text with inaccessible images.

### 8F. Personal photos — 8 files

| ID | Priority | File | Photo |
|---|---|---|---|
| PH01 | P0 | `public/photos/01-hospital.webp` | Meeting in hospital |
| PH02 | P0 | `public/photos/02-video-call.webp` | First video call |
| PH03 | P0 | `public/photos/03-scooty.webp` | First scooty ride |
| PH04 | P0 | `public/photos/04-car.webp` | First car ride |
| PH05 | P0 | `public/photos/05-first-kiss.webp` | First kiss or symbolic alternative |
| PH06 | P0 | `public/photos/06-smile.webp` | Favorite smile |
| PH07 | P0 | `public/photos/07-chaos.webp` | Funny shared moment |
| PH08 | P0 | `public/photos/08-together.webp` | Favorite couple photo / puzzle |

**Photo workflow:** obtain user-approved images; preserve originals outside public folder; crop consciously; strip EXIF; export optimized WebP/AVIF (usually 100–250KB each); provide descriptive alt text. If a specific moment has no literal photo, use another approved couple photo and avoid falsely presenting it as an image of that event.

### 8G. Audio — 10 files

| ID | Priority | File | Source | Purpose |
|---|---|---|---|---|
| AUD01 | P0 | `public/audio/romantic-loop.mp3` | SRC | Licensed romantic instrumental loop |
| AUD02 | P1 | `public/audio/envelope-open.mp3` | SRC | Paper reveal |
| AUD03 | P1 | `public/audio/mochi-hop.mp3` | SRC | Mascot bounce |
| AUD04 | P1 | `public/audio/heart-pop.mp3` | SRC | Collect heart |
| AUD05 | P1 | `public/audio/success-chime.mp3` | SRC | Reward |
| AUD06 | P1 | `public/audio/candle-out.mp3` | SRC | Extinguish |
| AUD07 | P1 | `public/audio/gift-open.mp3` | SRC | Gift |
| AUD08 | P1 | `public/audio/page-turn.mp3` | SRC | Scrapbook |
| AUD09 | P1 | `public/audio/scratch-reveal.mp3` | SRC | Card reveal |
| AUD10 | P1 | `public/audio/finale-shimmer.mp3` | SRC | Letter |

**Music selection criteria:** royalty-free *and* suitable for embedding in an interactive website; gentle piano/music-box texture; no vocals; unobtrusive; loopable; low volume. Do not assume any one Pixabay track has been selected. Record track title, author, URL, license and any attribution.

### 8H. Fonts — 2 families

| ID | Priority | Family | Source | Use |
|---|---|---|---|---|
| FONT01 | P0 | Playfair Display | Google Fonts | Headings / letter |
| FONT02 | P0 | Nunito | Google Fonts | Body / controls |

Use a supported Next.js font loader; don't copy or redistribute unrelated proprietary font files.

### Asset counts and gates
- Environments: **11** (8 P0, 3 P1).
- Mascot files: **13** (8 P0, 5 P1).
- Props: **25** (22 P0, 3 P1).
- Lottie/effects: **12** (5 P0, 7 P1).
- UI/stickers: **14** (12 P0, 2 P1).
- Personal photos: **8** (8 P0).
- Audio: **10** (1 P0, 9 P1).
- Font families: **2** (2 P0).
- **Total named asset entries: 95.** Some `CODE` assets are generated programmatically, and several P1 items can be deferred.

**P0 gating clarification:** The user-facing experience must include every P0 visual concept, but not every listed image must be independently illustrated if the same effect can be implemented accessibly with CSS/SVG and the manifest documents that substitution. Placeholder art is acceptable during development, **not** at final visual QA unless explicitly approved.

---

## 9. Detailed implementation phases for Antigravity

### Phase A — Foundation and data (P0)
**Tasks:** scaffold Next.js; create theme tokens; install dependencies; define content schemas; create scene registry/state machine; implement Zustand persistence with versioning; add asset manifest and fallback loader; build global stage, music toggle, accessible controls; create error boundary and loading fallback.

**Definition of done:** `npm run lint`, `npx tsc --noEmit`, `npm run build` pass; scene registry and progression unit tests pass; all eight scenes render a safe placeholder.

### Phase B — Invitation, Mochi, and island (P0)
**Tasks:** build animated invitation and envelope interaction; implement Mochi component with static pose + Motion; build island art, hotspots, unlocks, ribbon progress; transitions and sound enablement.

**Definition of done:** fresh user can open invitation and enter island; Heart Garden unlocks; all hotspots have valid touch and keyboard targets; 360px and 390px screens fit.

### Phase C — Games 1 and 2 (P0)
**Tasks:** implement heart spawner, scoring, timer, win/skip/retry; memory scrapbook with eight slots, flip interaction, navigation; tile-swap puzzle and reveal fallback; reward persistence.

**Definition of done:** both games complete without errors; rewards only once; reload resumes; missing personal photos display clearly marked development placeholders.

### Phase D — Games 3, 4, and 5 (P0)
**Tasks:** cake toppings and candle state; optional mic only after core tap path is stable; gift clue/reveal logic and three coupon views; scratch canvas with threshold/reveal alternative.

**Definition of done:** all three games completable by touch and keyboard; coupons printable/saveable if those controls exist; no permission required; scratch doesn't block page scrolling outside playfield.

### Phase E — Finale and personalization (P0)
**Tasks:** final letter in five readable sections; letter/photo choreography; add 8 user photos, final captions, birthday text; replay and return navigation; no auto-advance while reading.

**Definition of done:** from fresh state user can reach and read the entire letter; all photos and captions correct; no placeholder copy visible in final build.

### Phase F — Polish and asset integration (P1)
**Tasks:** replace art placeholders with consistent final images; add compatible Lottie assets; integrate audio and low-volume SFX; optimize image sizes and animation concurrency; refine scene transitions and bunny reactions.

**Definition of done:** consistent art, no missing assets, mobile performance acceptable, music works only after user gesture, reduced-motion support validated.

### Phase G — QA and release (P0)
**Tasks:** test real devices; run Playwright smoke tests; audit keyboard navigation, mobile overflow, console errors, 404s, asset licensing, image metadata, private content; deploy preview; obtain final user approval; deploy production and verify URL.

**Definition of done:** all critical tests pass, final assets and letter approved, no broken links, deployed URL opens on phone, no unlicensed media.

---

## 10. Six-day delivery schedule (24–30 October 2026)

| Date | Must finish | Can defer |
|---|---|---|
| **Oct 24** | Repo scaffold, architecture, state machine, manifest, asset generation started | Optional 3D |
| **Oct 25** | Final Mochi design, core environments, invitation, island, heart game | Detailed character rig |
| **Oct 26** | Memory Cottage, 8 photo integration or temporary slots, puzzle, cake | Mic blowing |
| **Oct 27** | Gift Castle, coupons, scratch cards | Extra sound effects |
| **Oct 28** | Finale letter, full end-to-end flow, real asset replacements | Hidden Easter eggs |
| **Oct 29** | Full mobile QA, accessibility, performance, license audit, preview and deployment | Decorative animation extras |
| **Oct 30** | Verify production link and birthday experience | New features / risky refactors |

**Critical path:** actual personal photos, coherent Mochi and environment artwork, playable navigation, five mini-games, letter. **Stop adding features on Oct 29.**

---

## 11. Testing matrix and acceptance criteria

### Automated checks
- TypeScript strict typecheck.
- ESLint clean.
- Production build succeeds.
- Unit tests for unlock progression, reward idempotency, puzzle solved state, heart score, scratch reveal threshold, persisted state migration.
- Playwright happy path: invitation → island → heart game → memory puzzle → cake → gifts → scratch → finale.
- Playwright alternate path: skip each game, mute audio, reload mid-journey, revisit unlocked scene, restart with confirmation.

### Device/browser matrix
| Device profile | Browser | Checks |
|---|---|---|
| 360×800 Android | Chrome | layout, touch, FPS, game hit areas |
| 390×844 iPhone | Safari | safe areas, scratch canvas, audio gesture |
| 320px narrow | Mobile emulation | no clipping, readable controls |
| 768px tablet | Safari/Chrome | scaling and touch |
| 1440px desktop | Chrome/Firefox | centered stage, keyboard |
| Reduced-motion preference | Any | animations reduced, functionality intact |

### Release blockers
- Any missing/broken P0 asset without approved fallback.
- Inability to finish a game or reach final letter.
- Photos accidentally swapped, stretched, or exposed through unintended repository/public index.
- Autoplay audio without gesture, impossible-to-mute music.
- Console exceptions, uncaught image/audio failures, broken deployment.
- Unverified or incompatible license on included third-party asset.
- Final letter contains unapproved personal claims or placeholder text.
- Critical controls unusable by touch or keyboard.

### Performance acceptance
- Measure initial transfer, Largest Contentful Paint, interaction responsiveness, and frame stability on real/representative mobile devices.
- Set provisional goals: compressed initial art/data under 2MB excluding optional music; main scene interactions feel responsive; no long main-thread stalls; no major layout shifts.
- If goals fail, remove P1 particle layers/3D first, not story content or controls.

---

## 12. Deployment and handoff

1. Use private Git repository.
2. Keep `public/photos` out of public-source distribution unless user explicitly approves; note deployed static assets remain accessible to anyone who knows their URLs.
3. Set `robots` to noindex/nofollow and supply appropriate metadata; do not mistake this for authentication.
4. Build and deploy a preview on Vercel; test the **actual** preview URL on mobile data and Wi-Fi.
5. Confirm fonts, all 8 photos, sound opt-in, scene unlocks, puzzle, scratch, coupons, and final letter.
6. Final deployment: production URL and optional custom domain (domain itself may cost money, so free default subdomain preferred).
7. Preserve final asset source/license registry and `BUILD_LOG.md` for handoff.
8. Provide one-line launch instructions and a short shareable birthday invitation message.

### Optional birthday invitation message
> Shailaja, Mochi has been preparing a tiny surprise for you. 🎀🐰 Open this when you have a few quiet minutes. Happy Birthday, my love ❤️ [website link]

---

## 13. Antigravity prompt sequence — paste one phase at a time

### Prompt 1 — Foundation
> Read `LOVEVERSE_ANTIGRAVITY_IMPLEMENTATION_PLAN.md` completely. Scaffold the Next.js TypeScript project and implement the app shell, design tokens, responsive story stage, scene registry, state machine, Zustand persistence, asset loader with explicit placeholders, and all eight scene skeletons. Create `docs/ASSET_STATUS.md`, `docs/ASSET_LICENSES.md`, and `docs/BUILD_LOG.md`. Do not fabricate assets. Run lint, typecheck, and production build. Report exact files changed and any blockers.

### Prompt 2 — Invitation and island
> Implement Phase B exactly as specified: Mochi pose-based component with consistent character asset contract, animated envelope, opening interaction, and floating island with five accessible hotspots and progression. Use Motion for choreography and licensed Lottie only if downloaded. Verify mobile at 360px/390px, keyboard, and reduced-motion. Run tests and report asset gaps.

### Prompt 3 — Heart Garden and Memory Cottage
> Implement Phase C: playable 20-second 12-heart game with skip/retry and charm reward; eight-card photo scrapbook with flip/navigation; solvable 3×3 tile-swap memory puzzle with reveal alternative. Make completion idempotent and persistent. Write tests for timers, scores, shuffling, and reward state. Do not silently invent personal photos.

### Prompt 4 — Cake, gifts, scratch cards
> Implement Phase D: cake decoration and three tappable candles; three clue-driven gift reveals with the exact coupon copy; Canvas 2D scratch cards with pointer support, progress threshold, and accessible Reveal buttons. No microphone requirement. Add tests and verify touch handling on mobile.

### Prompt 5 — Finale and personalization
> Implement Phase E: golden envelope, reader-controlled five-section final letter, selected photos, calm music transition, replay/revisit options. Store letter and captions in content files. Use placeholders only where user media is missing and surface those in `ASSET_STATUS.md`. Run complete end-to-end navigation tests.

### Prompt 6 — Final assets and release
> Execute Phases F and G. Integrate actual license-checked art/Lottie/audio from the manifest, optimize images, validate responsive/mobile/keyboard/reduced-motion behavior, run all tests and production build, audit personal content and asset licenses, prepare Vercel preview, and generate a release checklist. Never claim readiness with missing P0 assets or untested interactions.

---

## 14. Decisions and missing user inputs

### Already decided
- Name: **Shailaja**.
- Birthday: **30 October 2026**.
- Art style: **3D Cute Fantasy / Pink Coquette**.
- Mascot: **Mochi, cute white bunny with pink bow**.
- Games: **Catch Hearts, Memory Puzzle, Birthday Cake, Secret Gifts, Scratch Cards**.
- Personal photos: **8**.
- Memories: **hospital meeting, first video call, first scooty ride, first car ride, first kiss**.
- Gifts: **romantic digital coupons**.
- Music: **soft romantic royalty-free instrumental**.
- Finale: **heartfelt love letter**.
- Budget: **free tools/assets only**.

### Still needed before final personalization
1. Eight approved photos (five milestone-related where available, three favorite extras).
2. Whether any photo should be excluded from a public static deployment; explicit comfort with access by link.
3. Confirm/correct milestone captions; optionally provide dates and inside jokes.
4. Approve or revise the final letter and sign-off.
5. Approve the exact free background music track after listening; record license.
6. Choose which ear holds Mochi's bow, then keep it consistent (default: bunny's left ear).
7. Optional: specify language preference for playful dialogue (English vs Hinglish).

### Final project acceptance statement
The Loveverse is complete only when Shailaja can open the deployed link on a phone, meet Mochi, navigate the magical island, finish or skip all five games, view eight correctly matched memories, unlock all three coupons, and read the full approved birthday letter—with cohesive illustrated assets, optional music, reliable saved progress, and no broken interactions.

---

**End of master implementation plan.**

# Design System: BioTest Diagnostics4.0

> **Version:** 1.0.0 | **Status:** Active | **Last updated:** 2026-08-05
>
> This file is the single source of truth for the BioTest visual design system.
> Drop it into any project root and tell your AI agent "build UI that matches this DESIGN.md."
> Covers three surfaces: the Internal Servicing Workspace, the Patient booking experience, and the Partner/referral portal.

---

## Section 1 — Visual Theme & Atmosphere

BioTest's visual language rests on a tension between two blues that are deliberately not the same blue: a deep, near-black navy that carries the brand's existing trust equity (extracted directly from BioTest's own marketing), and a distinct clinical teal that does all of the platform's action-taking. The navy says "this is a credentialed diagnostic facility" — it anchors headers, chrome, and text. The teal says "do this now" — book, submit, release — and never appears as decoration. Where competitors in this category converge on a single blue for everything, splitting these two roles is what keeps BioTest legible as an operational tool rather than a brochure. The typographic anchors follow the same logic: Manrope carries the bold, geometric confidence of the existing wordmark at display sizes, while Public Sans — deliberately not Inter or IBM Plex, both now the default face of every 2026 healthcare app — carries body and UI text with accessibility-grade legibility.

The platform serves three distinct audiences across three surfaces: BioTest's own staff running a live servicing queue (speed and density matter more than warmth), patients booking and tracking a diagnostic visit (trust and reassurance matter more than density), and referring clinicians and their front-desk staff submitting and tracking requests (professional efficiency, B2B in tone). The visual language must flex across all three without losing a shared identity.

**Key characteristics:**
- Navy `#14305C` as the dominant anchor — headings, primary text, chrome, dark-panel fills
- Clinical teal `#0E7C7F` exclusively for actions — primary CTAs, active states, release/submit affordances — never decorative
- Mist canvas `#F7F9FC` as the light-mode page field — a cool near-white, not a warm cream (this category is clinical-trust, not lifestyle-warm)
- The flyer's original brighter blue survives only as `accent/azure` — a legacy decorative tint, never a CTA
- 8px base grid, 4px half-step permitted only in the Internal Workspace's dense tables
- No decorative gradients on primary surfaces
- High-contrast, accessible pairings throughout (WCAG AA minimum, AAA target for body text)
- Dark mode is surface-specific, not platform-wide (see Intentional Deviations)
- Tabular figures on every numeric value in reports and queues — a functional requirement, not a style choice

**Intentional deviations:**

| Topic | Public brand (source of truth) | This system | Rationale |
|---|---|---|---|
| Accent color | Flyer uses a brighter blue, same hue family as the navy primary | Introduces a distinct teal (`#0E7C7F`) as the sole action color; the flyer's blue becomes a decorative-only legacy tint | Research (Phase 1) found the flyer's accent doesn't differentiate from its own primary — Medicai's category-standout move was exactly this kind of hue split |
| Dark mode | Not present in any BioTest marketing material | Internal Servicing Workspace supports full dark mode (toggle); Patient and Partner surfaces are light-only | Clinical/patient-facing categories don't default to dark (confirmed via Cerba Lancet and general healthcare-UI research); the Internal Workspace's Linear-inspired power-user positioning is the one place it earns its keep |

---

## Section 2 — Color Palette & Roles

### Primary Brand

| Name | Hex | OKLCH (approx) | Role |
|---|---|---|---|
| Ink (navy) | `#14305C` | oklch(0.290 0.085 258) | Primary brand anchor — text, chrome, headings |
| Clinical teal | `#0E7C7F` | oklch(0.480 0.090 195) | Action layer — CTAs, active states, links |

### Primary Scale — `ink` (11 steps)

| Token | Hex | Use |
|---|---|---|
| ink/50 | `#E7EBF2` | Faint tint backgrounds, hover on light surfaces |
| ink/100 | `#CFD9E8` | Decorative tint, disabled chrome |
| ink/200 | `#A9BAD6` | Borders on navy-adjacent components |
| ink/300 | `#7C93BB` | Muted icons on light surfaces |
| ink/400 | `#5773A0` | Secondary text on light surfaces |
| ink/500 | `#14305C` | Brand anchor (see above) |
| ink/600 | `#102647` | Hover state for navy chrome elements |
| ink/700 | `#0C1D37` | Active/pressed navy chrome |
| ink/800 | `#08142A` | Deep panel fill (matches flyer's advanced-services sidebar) |
| ink/900 | `#05101C` | Internal Workspace dark-mode canvas / darkest panel |
| ink/950 | `#020810` | Rarely used — maximum contrast text on teal |

### Accent Scale — `teal` (11 steps)

| Token | Hex | Use |
|---|---|---|
| teal/50 | `#EAF6F6` | Tint background behind success-adjacent CTAs |
| teal/100 | `#D3EDEC` | Decorative tint |
| teal/200 | `#ABDCDB` | Disabled CTA background |
| teal/300 | `#7CC7C6` | Icon accents |
| teal/400 | `#4FB0AE` | Link / active accent |
| teal/500 | `#0E7C7F` | Primary CTA |
| teal/600 | `#0C6668` | CTA hover |
| teal/700 | `#0A5456` | CTA active/pressed |
| teal/800 | `#084244` | Dark-mode CTA adjustment |
| teal/900 | `#063134` | Rarely used |
| teal/950 | `#052526` | Rarely used |

### Neutral Scale — `slate` (11 steps, cool-aligned to navy hue)

| Token | Hex | Use |
|---|---|---|
| slate/50 | `#F9FAFB` | Near-white surfaces |
| slate/100 | `#EDEFF2` | Table row alternation |
| slate/200 | `#D3D7DE` | Default borders |
| slate/300 | `#B6BCC6` | Strong borders, dividers |
| slate/400 | `#9DA4B0` | Placeholder text |
| slate/500 | `#7C8494` | Muted text, disabled labels |
| slate/600 | `#6B7383` | Secondary text |
| slate/700 | `#5C6472` | Body text on light surfaces (alt to ink/500 for less emphasis) |
| slate/800 | `#4E5562` | Dark-mode secondary text |
| slate/900 | `#414753` | Dark-mode surface-1 |
| slate/950 | `#363B44` | Dark-mode surface-2 |

### Semantic Colors

| Name | Hex | Surface Hex | Text Hex | Use |
|---|---|---|---|---|
| Success | `#1F8A4C` | `#E4F6EA` | `#155C33` | Released, approved states |
| Warning | `#B4740F` | `#FDF1DD` | `#7A4E0A` | Recapture, pending, SLA at risk |
| Error | `#C4293B` | `#FBE4E7` | `#8C1B28` | Failed submission, validation error |
| Info | `#2A5FBF` | `#E4EBFA` | `#1D3F80` | Informational banners, guidance |

### Segment Identity Tokens

| Surface | Segment(s) | Accent Token | Hex | Role |
|---|---|---|---|---|
| Internal Servicing Workspace | Front Desk, Lab Technician, Lab Owner | `ink/900` chrome + `teal/500` action | `#05101C` / `#0E7C7F` | Navy sidebar chrome; teal on release/submit actions only |
| Patient (DXP) | Patient | `teal/500` | `#0E7C7F` | Primary CTA color throughout; warmest micro-copy tone of the three surfaces |
| Partners (RFP) | Doctor/Consultant, Referral Front Desk | `ink/500` chrome + `teal/500` action | `#14305C` / `#0E7C7F` | Navy-forward professional chrome; teal CTA for consistency with the other two surfaces |

**Usage rules:** Segment accent tokens apply only to active nav indicators, primary CTA buttons, and section badge borders. Never use a segment accent as body text color. Never mix `accent/azure` (legacy) with `teal` in the same component — pick one role per surface, teal for anything actionable.

### Surface Layers — Light Mode

| Layer | Hex | Use |
|---|---|---|
| mist (page canvas) | `#F7F9FC` | Page background, all 3 surfaces |
| paper (surface-1) | `#FFFFFF` | Default card / sidebar background |
| float (surface-2) | `#FFFFFF` + shadow-md | Elevated card, dropdown |
| overlay (surface-3) | `#FFFFFF` + shadow-lg | Modal, overlay |
| panel (surface-dark) | `#05101C` (ink/900) | Hero bands, the advanced-services-style dark panel |

### Surface Layers — Dark Mode (Internal Servicing Workspace only)

| Layer | Hex / Value | Use |
|---|---|---|
| Page background | `#05101C` (ink/900) | Dark-mode canvas |
| Surface-1 | `#0C1D37` (ink/700) | Cards, sidebar |
| Surface-2 | `#102647` (ink/600) | Elevated cards, dropdowns |
| Surface-3 | `rgba(255,255,255,0.06)` border on surface-2 | Modals, hover/active panels |
| Borders | `rgba(255,255,255,0.10)` → `rgba(255,255,255,0.22)` | Subtle → strong |
| Text-primary | `#F7F9FC` | Primary dark-mode text |
| Text-secondary | `slate/300` equivalent, `#B6BCC6` | Secondary dark-mode text |
| Text-tertiary | `slate/500` equivalent, `#7C8494` | Muted dark-mode text |

---

## Section 3 — Typography Rules

```css
--font-sans: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-display: "Manrope", "Public Sans", sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace;
```

**Font weight strategy:** Public Sans — 400 (body), 600 (labels, emphasis). No weight below 400 anywhere, for legibility on lower-end Android devices common in the Patient/Partner mobile-first usage pattern. Manrope — 700 (Heading L/M/S), 800 (Display XL/L only). Substitution rule: if 800 is unavailable, use 700 with no visual size compensation.

**OpenType features:**
```css
/* General text */
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
/* Numeric data — queue tables, report measurements, order IDs */
font-feature-settings: "kern" 1, "tnum" 1;
```
Apply `tnum` to every numeric value inside the Servicing Queue, Operations Dashboard, and any report/measurement display — this is the tabular-figures requirement from Phase 1 research, not a style preference.

**Letter-spacing progression:**

| Size | Tracking | Ratio |
|---|---|---|
| 48px (Display XL) | -0.96px | -0.02em |
| 36px (Display L) | -0.36px | -0.01em |
| 28px (Heading L) | -0.28px | -0.01em |
| 22px and below | 0 | 0 |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Public+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

**Type Scale:**

| Role | Typeface | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| Display XL | Manrope | 48px | 800 | 1.1 | -0.96px | Patient/Partner front-door hero only |
| Display L | Manrope | 36px | 700 | 1.15 | -0.36px | Front-door section headers |
| Heading 1 | Manrope | 28px | 700 | 1.2 | -0.28px | Page titles |
| Heading 2 | Manrope | 22px | 600 | 1.25 | 0 | Section headers |
| Heading 3 | Manrope | 18px | 600 | 1.3 | 0 | Card/panel titles |
| Body L | Public Sans | 16px | 400 | 1.5 | 0 | Primary reading text |
| Body M | Public Sans | 14px | 400 | 1.5 | 0 | Secondary text, table cells |
| Label M | Public Sans | 13px | 600 | 1.3 | 0.02em | Form labels, uppercase tags |
| Caption | Public Sans | 12px | 400 | 1.4 | 0 | Meta text, timestamps |
| Code M | IBM Plex Mono | 14px | 400 (tnum) | 1.5 | 0 | Order IDs, report figures |
| Code S | IBM Plex Mono | 12px | 400 (tnum) | 1.4 | 0 | Inline data, table figures |

**Typography Principles:**
- Headings are always `ink/500` or darker — never teal (teal is reserved for action, not hierarchy)
- No uppercase body text — Label M is the only role permitted uppercase treatment, and only for short tags/badges
- Report and queue numerals always carry `tnum` — a misaligned column of measurements is a real clinical-adjacent risk, not a cosmetic one
- Display-scale type is reserved for the two pre-login front doors (Patient, Partners) — the Internal Workspace never uses anything above Heading 1

---

## Section 4 — Component Stylings

### 4.1 Buttons

**Primary (teal):**
```
Background:      #0E7C7F (teal/500)
Text:            #FFFFFF
Border:          none
Border-radius:   8px (radius-lg)
Padding:         10px 20px (MD), 6px 14px (SM), 14px 28px (LG)
Font:            14px / 600 / Public Sans
Hover:           #0C6668 (teal/600)
Active:          #0A5456 (teal/700)
Focus ring:      0 0 0 3px rgba(14,124,127,0.35)
Disabled:        background #ABDCDB (teal/200), text #FFFFFF, cursor not-allowed
Shadow:          0 1px 2px rgba(5,16,28,0.08)
```

**Outline (navy):**
```
Background:      transparent
Text:            #14305C (ink/500)
Border:          1px solid #A9BAD6 (ink/200)
Border-radius:   8px
Padding:         10px 20px
Font:            14px / 600 / Public Sans
Hover:           background #E7EBF2 (ink/50)
Active:          background #CFD9E8 (ink/100)
Focus ring:      0 0 0 3px rgba(20,48,92,0.25)
Disabled:        border #D3D7DE, text #9DA4B0
```

**Ghost:**
```
Background:      transparent
Text:            #14305C
Border:          none
Padding:         10px 16px
Hover:           background #F7F9FC (mist)
```

**Destructive:**
```
Background:      #C4293B
Text:            #FFFFFF
Hover:           #A81F30
Active:          #8C1B28
Focus ring:      0 0 0 3px rgba(196,41,59,0.30)
```

**Button Sizes:**

| Size | Height | Padding H | Font size | Icon size |
|---|---|---|---|---|
| SM | 32px | 14px | 13px | 16px |
| MD | 40px | 20px | 14px | 18px |
| LG | 48px | 28px | 16px | 20px |

### 4.2 Navigation

**Desktop left sidebar (Internal Servicing Workspace):**
- Background: `#FFFFFF` (light) / `#0C1D37` ink/700 (dark)
- Width: 240px expanded, 64px collapsed
- Header: logo + wordmark, 64px height, bottom border `1px solid slate/200`
- Section label: Label M, `slate/500`, uppercase, 0.02em tracking
- Nav item (inactive): Body M, `ink/500`, 40px height, 12px horizontal padding
- Nav item (hover): background `ink/50`
- Nav item (active): background `teal/50`, left border 3px `teal/500`, text `ink/700`
- Icon: 20px, follows nav item text color
- Role badge: pill, Label M, background `slate/100`, text `slate/700`
- Collapse toggle: bottom of sidebar, ghost button, 32px

**Top navigation bar (Patient, Partners front doors):**
- Background: `#FFFFFF`, bottom border `1px solid slate/200`
- Height: 64px
- Logo: left-aligned, 32px height
- Action area: right-aligned, primary CTA button (teal)

**Simple account nav (Patient/Partner post-login):**
- Horizontal tab row under topbar, Body M, active tab underlined 2px `teal/500`

**Dropdown / Context Menu:**
- Background `#FFFFFF`, border `1px solid slate/200`, border-radius 8px, shadow-md
- Item: Body M, 36px height, hover background `ink/50`
- Divider: `1px solid slate/100`

### 4.3 Cards

**Base Card:**
```
Background:     #FFFFFF (paper)
Border:         1px solid #D3D7DE (slate/200)
Border-radius:  8px (radius-lg)
Padding:        20px (layout-card-pad)
Shadow resting: 0 1px 2px rgba(5,16,28,0.06)
Shadow hover:   0 4px 12px rgba(5,16,28,0.10)
Transition:     box-shadow 200ms cubic-bezier(0.2,0,0.2,1)
Hover transform: none — shadow only, no lift, matches clinical-trust register (no playful bounce)
```

**Queue Order Card** (Servicing Queue, Internal Workspace):
- Inherits base card
- Status badge (top-right): pill, per Section 4.5
- Order ID: Code M, `slate/600`
- Source tag: Label M pill, `slate/100` background
- Department icon: 20px, `ink/400`
- Min-height: 88px

**Catalog Service Card** (Explore Services, all 3 tiers):
- Inherits base card
- SLA badge: pill, `teal/50` background, `teal/700` text
- Service name: Heading 3
- Department label: Caption, `slate/500`
- Min-height: 120px

**KPI Card** (Operations Dashboard):
- Inherits base card, no hover shadow change (not interactive)
- Metric value: Display L equivalent but Manrope 700 at 32px (dashboard-specific override)
- Metric label: Label M, `slate/600`
- Trend indicator: 14px icon + Code S figure, `success` or `error` color
- Min-height: 96px

### 4.4 Inputs & Forms

**Text Input:**
```
Default:   background #FFFFFF, border 1px solid slate/200, radius 6px (radius-md), height 40px, padding 10px 12px, Body M
Focus:     border 1px solid teal/500, ring 0 0 0 3px rgba(14,124,127,0.20)
Error:     border 1px solid error, helper text error-text below
Disabled:  background slate/50, text slate/400, cursor not-allowed
```

**Textarea:** inherits input, min-height 88px, resize vertical only

**Select:** inherits input, trailing chevron icon 16px `slate/500`, dropdown per 4.2 context-menu spec

**Checkbox / Radio:**
- Size: 18px
- Unchecked: border 1.5px `slate/300`
- Checked: background `teal/500`, checkmark `#FFFFFF`
- Focus ring: 0 0 0 3px rgba(14,124,127,0.25)

**Toggle / Switch:**
- Width 40px, height 22px, thumb 18px
- Track off: `slate/200`, track on: `teal/500`

**Search input:** leading icon 16px `slate/500`, clear button appears on input, 16px

**Form layout:**
- Label: Label M, `ink/500`, 6px below to input
- Helper text: Caption, `slate/500`
- Error message: Caption, `error-text`, below input with 4px gap
- Required indicator: teal asterisk, never red (red reserved for error state only)

### 4.5 Badges & Status Chips

```
Released:    background success-surface, text success-text, radius pill
Pending QA:  background warning-surface, text warning-text, radius pill
              (used sparingly — most orders skip straight to Released, per the no-review-gate model)
Recapture:   background warning-surface, text warning-text, radius pill
Rejected:    background error-surface, text error-text, radius pill
```

Pill spec: padding 4px 10px, font Label M, radius-full, icon 12px (optional, leading)

### 4.6 Modals & Overlays

```
Scrim:           rgba(5,16,28,0.52)
Modal:           background #FFFFFF, radius 12px (radius-xl), shadow-lg, max-width 480px (SM) / 640px (MD) / 800px (LG)
Header:          Heading 3, border-bottom 1px solid slate/200
Close button:    20px icon, slate/500, hover background slate/100
Footer:          padding 16px 24px, border-top 1px solid slate/200, flex justify-end, gap 12px
Animation:       scale(0.97) → scale(1) + opacity 0 → 1, 200ms cubic-bezier(0,0,0.2,1)
```

### 4.7 Toast / Snackbar

```
Background:      #FFFFFF, radius 8px, shadow-lg, max-width 360px, position bottom-right (Internal) / bottom-center (Patient/Partner mobile)
Success variant: left border 3px solid success
Error variant:   left border 3px solid error
Info variant:    left border 3px solid info
Duration:        auto-dismiss 4000ms, errors persist until dismissed
```

### 4.8 Tables (Servicing Queue, Operations Dashboard)

```
Header row:      background slate/50, Label M / slate/600, padding 10px 12px
Body row:        background #FFFFFF, hover slate/50, Body M / ink/500, padding 12px
Border:          1px solid slate/100 (row separator only, no vertical rules)
Sort indicator:  12px chevron icon, teal/500 when active
Empty state:     centered icon (32px, slate/300) + Body M caption + optional CTA
```

### 4.9 Avatars

```
XS: 20px circle    SM: 28px circle    MD: 36px circle    LG: 48px circle    XL: 64px circle
Background: ink/100 (placeholder), initials Label M / ink/600
Border: 2px solid #FFFFFF (on dark surfaces or stacked)
Stack overlap: -8px
```

---

## Section 5 — Spacing & Layout

**Base grid:** 8px — matches the "moderate density, generous whitespace" convention found in both researched competitors (Cerba Lancet, Medicai). A 4px half-step is permitted only inside the Internal Workspace's dense queue tables.

**Space scale:**

| Token | Value | Common use |
|---|---|---|
| space-1 | 4px | Icon-to-label gap |
| space-2 | 8px | Tight inline gaps |
| space-3 | 12px | Form field internal gaps |
| space-4 | 16px | Default component gap |
| space-5 | 20px | Card padding |
| space-6 | 24px | Section-internal gaps |
| space-8 | 32px | Section gap |
| space-10 | 40px | Page vertical padding |
| space-12 | 48px | Large section breaks |
| space-16 | 64px | Topbar height reference |
| space-20 | 80px | Hero vertical padding (front doors) |
| space-24 | 96px | Large hero sections |
| space-30 | 120px | Max hero padding, front-door only |

**Layout tokens:**

| Token | Value |
|---|---|
| layout-page-pad-x | 24px (16px mobile) |
| layout-page-pad-y | 32px |
| layout-page-pad-bottom | 96px |
| layout-section-gap | 32px |
| layout-card-pad | 20px |
| layout-card-pad-tight | 12px |
| layout-topbar-h | 64px |
| layout-sidebar-w | 240px |
| gap-row | 12px |
| gap-tiles | 16px |
| gap-section | 24px |

**Grid rules:** Internal Workspace: 12-column grid, max content width 1440px, sidebar fixed at 240px. Patient/Partner surfaces: 8-column grid on tablet+, single column under 768px, max content width 960px. Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide).

---

## Section 6 — Elevation & Shadows

```
shadow-xs:   0 1px 1px rgba(5,16,28,0.04)
shadow-sm:   0 1px 2px rgba(5,16,28,0.06)
shadow-md:   0 4px 12px rgba(5,16,28,0.10)
shadow-lg:   0 12px 32px rgba(5,16,28,0.16)
shadow-xl:   0 24px 48px rgba(5,16,28,0.20)
```

**Shadow color formula:** base shadow color is `rgba(5,16,28,N)` — derived from `ink/900`, the brand's own darkest step, not a generic black. Elevation increases opacity and spread together rather than using a dual-layer approach — keeps the system simpler given the platform's operational (not luxury-editorial) register.

**Elevation rules:** Page background — no shadow. Surface-1 (cards) — shadow-sm at rest, shadow-md on hover. Surface-2 (dropdowns, elevated cards) — shadow-md. Surface-3 (modals) — shadow-lg. Dark mode (Internal Workspace only) — shadows are ineffective on dark backgrounds; use `border: 1px solid rgba(255,255,255,0.10)` instead.

---

## Section 7 — Motion & Animation

**Duration tokens:**

| Token | Value | Use |
|---|---|---|
| motion-duration-instant | 0ms | State flips, color swaps |
| motion-duration-fast | 120ms | Micro-feedback: button press, checkbox tick |
| motion-duration-base | 200ms | Standard transitions: hover, show/hide |
| motion-duration-slow | 350ms | Drawer, accordion |
| motion-duration-page | 450ms | Full-screen transitions, route changes |
| motion-duration-progress | 550ms | Progress bars, loading indicators |

**Easing curves:**

| Token | Cubic-bezier | Use |
|---|---|---|
| motion-ease-standard | cubic-bezier(0.2, 0, 0.2, 1) | General transitions |
| motion-ease-decelerate | cubic-bezier(0, 0, 0.2, 1) | Entering elements |
| motion-ease-accelerate | cubic-bezier(0.4, 0, 1, 1) | Exiting elements |

**Motion principles:**
- These tokens are the Internal Workspace's native pace — Linear-inspired, snappy, utility-first. Patient and Partner surfaces should bias toward the upper end of `base` (220–250ms) rather than defining separate tokens — same system, calibrated slightly slower where reassurance matters more than speed.
- Animate only `transform` and `opacity` — never `width`, `height`, `top`, `left`.
- All animations respect `prefers-reduced-motion` — reduce to `motion-duration-instant` or disable entirely.
- Never use spring/bounce easing anywhere on the platform — it reads as playful, which undercuts clinical trust.
- State changes that carry information (order released, form submitted) are always instant + a toast — never delayed by decorative motion.

---

## Section 8 — Iconography

**Icon library:** Lucide, latest stable. Stroke style, 1.5px weight — no filled icons except status/semantic indicators (badges), which may use filled variants for stronger at-a-glance recognition in the queue.

**Icon size scale:**

| Token | Size | Use |
|---|---|---|
| icon-xs | 14px | Inline with small text, badges |
| icon-sm | 16px | Form field icons, small buttons |
| icon-md | 20px | Default UI icon size, navigation |
| icon-lg | 24px | Primary navigation, hero icon |
| icon-xl | 32px | Empty states |
| icon-2xl | 48px | Illustration-level icons, front-door marketing |

**Usage rules:** All icons from Lucide only — no mixing icon styles, ever. No emoji as structural icons anywhere (navigation, status, system controls) — this is a clinical-trust surface, not a consumer social product. Icon-only buttons require `aria-label`. Outline is the default; filled is reserved for status/semantic badges only. Icon color always follows the semantic or brand token in use — never a hardcoded hex in component code.

---

## Section 9 — Accessibility

**Contrast targets:**

| Text type | WCAG level | Minimum ratio |
|---|---|---|
| Body text (16px+) | AA | 4.5:1 |
| Large text (18px+ or 14px bold) | AA | 3:1 |
| Body text | AAA (target) | 7:1 |
| UI components and states | AA | 3:1 |

`ink/500` (`#14305C`) on `mist` (`#F7F9FC`) and on `#FFFFFF` both clear AAA. `teal/500` (`#0E7C7F`) on white clears AA for large text/UI components — body-size teal text is not used anywhere in the system for this reason (teal is buttons and icons, not paragraph text).

**Touch targets:** Mobile minimum 44×44pt (iOS) / 48×48dp (Android) — non-negotiable for the Patient and Partner mobile-first surfaces. Minimum 8px spacing between adjacent touch targets.

**Keyboard navigation:** Tab order matches visual reading order. All interactive elements carry a visible focus ring (2–4px offset, teal at 35–40% opacity — see button specs). Skip-to-content link required on all three web surfaces.

**Screen reader requirements:** Icon-only buttons require `aria-label`. All meaningful images require descriptive `alt` text. Form fields use `<label for="...">`. Status changes use `aria-live="polite"`; errors use `role="alert"`. Navigation landmarks (`<nav>`, `<main>`, `<aside>`) required on every page.

**Reduced motion:** All non-essential animation wrapped in `@media (prefers-reduced-motion: reduce)`, reduced to 0–50ms or disabled. State changes are never removed — only decorative motion is.

**Dynamic type / text scaling:** Body text minimum 16px (prevents iOS auto-zoom on form inputs — relevant given the Patient tier's mobile-first booking flow). Layouts remain functional at 200% browser zoom. No `px`-constrained containers that would clip scaled text.

**Color not as the only indicator:** Every status badge (Released, Recapture, Pending) carries a label, not just color. Error states carry an icon and text, never just a red border. Any future chart/analytics view must use pattern or shape differentiation alongside color.

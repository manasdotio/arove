# Velis Studio — Design System

This document outlines the design tokens, component architecture, and interactive behaviors for **Velis Studio**.

---

## 1. Color Palette

The color system is designed around warm, natural tones: a primary Terracotta, paired with off-black typography and a set of cohesive light gray surfaces.

| Token | CSS Variable / Value | Purpose |
| :--- | :--- | :--- |
| **Primary (Terracotta)** | `--color-primary` / `#B35C44` | Brand highlights, primary call-to-actions, active links |
| **On Primary** | `--color-on-primary` / `#FFFFFF` | Text color on primary background elements |
| **Background / Surface** | `--color-background` / `#F0EBE6` | Default background color of the body and sections |
| **Surface Dim** | `--color-surface-dim` / `#D0CBC6` | Muted background surfaces |
| **Surface Bright** | `--color-surface-bright` / `#F0EBE6` | Clean, highlighted surfaces |
| **Surface Container Lowest** | `--color-surface-container-lowest` / `#FFFFFF` | Lightest surfaces (lowest elevation container) |
| **Surface Container Low** | `--color-surface-container-low` / `#EAE5E0` | Cards and section containers |
| **Surface Container** | `--color-surface-container` / `#E4DFDA` | Intermediate container backdrop |
| **Surface Container High** | `--color-surface-container-high` / `#DED9D4` | Higher elevation backdrops |
| **Surface Container Highest** | `--color-surface-container-highest` / `#D8D3CE` | Accent border and outline-variant colors |
| **On Surface** | `--color-on-surface` / `#1B1C1C` | Primary body text and headers |
| **Outline** | `--color-outline` / `#7E7576` | Fine borders and borders |
| **Outline Variant** | `--color-outline-variant` / `#CFC4C5` | Subtle borders and decorative dividers |
| **Text Main** | `--color-text-main` / `#2D2926` | Deep off-black for headers and high-contrast text |

---

## 2. Typography

We use three primary font families to build depth and contrast:

1. **Body / UI Elements:** `Manrope` (Sans-Serif)
   - Clean, modern, highly legible at small sizes.
   - Weights: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold), `800` (Extra-bold).
2. **Display Headers:** `Archivo Narrow` (Sans-Serif)
   - Bold, condensed uppercase letters for an editorial fashion/design studio feel.
   - Weights: `400` (Regular), `700` (Bold).
3. **Serif Accent:** `Instrument Serif` (Serif, Italic)
   - Elegant, italicized serif fonts to contrast the bold Archivo headers.
   - Style: `Italic`.

### Typography Classes & Custom Sizes:
- **Display XL:** `120px` (line-height: `110px`, letter-spacing: `-0.04em`, font-weight: `700`)
- **Display LG:** `80px` (line-height: `84px`, letter-spacing: `-0.03em`, font-weight: `700`)
- **Headline LG:** `48px` (line-height: `52px`, letter-spacing: `-0.02em`, font-weight: `700`)

---

## 3. Spacing & Layout

- **Max Width:** `1440px` (`max-w-7xl` or standard wrapper)
- **Section Spacing (Vertical):** Responsive padding `py-12 sm:py-20 md:py-32` to tighten vertical flow on mobile while keeping it airy on desktop.
- **Horizontal Margins (Containers):** Responsive padding `px-4 sm:px-6` (16px on mobile, 24px on desktop) to maximize text and element layouts on small viewports.
- **Fine Borders:** Subtle translucent black borders (`border-black/5` or `rgba(0, 0, 0, 0.08)`)
- **Asymmetric Portfolio Grid:** The projects page uses an alternating asymmetric layout where every third project (starting with the first) spans the full width of the grid (`col-span-2`) with a cinematic widescreen aspect ratio (`aspect-[2/1]`) on desktop, while other projects are aligned side-by-side in balanced columns.

---

## 4. Animation & Interaction Rules

Following the Vercel Web Interface Guidelines, animations are kept subtle, polished, and compositor-friendly:

1. **Subtle Reveals:** Smooth fade-ins with custom `cubic-bezier` easing rather than aggressive spring effects.
2. **Transform & Opacity Only:** Animating changes to `transform` and `opacity` to maintain 60 FPS performance.
3. **Explicit Transitions:** No `transition-all`. List transit properties explicitly (e.g., `transition-[transform,opacity,background-color]`).
4. **Reduced Motion Support:** All interactive transitions and entrance animations must respond to media query `prefers-reduced-motion: reduce` by reverting to static displays or simple fading.
5. **Focus States:** Every button and interactive link must use a highly visible, custom focus indicator (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`).
6. **Cards & Buttons:** Cards lift and rotate slightly via a custom 3D tilt effect on hover (`rotateX` and `rotateY` coordinates calculated relative to cursor position in `useCardTilt`). Buttons scale slightly on click (`active:scale-98`).
7. **Accordions & Disclosures:** Roadmap and FAQ items expand using CSS Grid transitions (`grid-rows-[0fr]` to `grid-rows-[1fr]`) to animate their height smoothly without hardcoding heights or breaking container layouts.
8. **Budget & Service Planner:** Interactive multiselect tags and budget options update a live, compiling sentence preview describing the user's inquiry text in real-time.

---

## 5. Multi-Page Architecture & SEO Setup

To optimize for search engine crawling and performance, the application has been restructured into a multi-page routing architecture utilizing `react-router-dom` and a dynamic meta-tag injector:

1. **Routing Setup:**
   - **Home (`/`):** [Home.tsx](file:///home/manas/projects/arove/src/pages/Home.tsx) contains the hero presentation, selected case study teasers, expertise grids, testimonials, and global booking CTAs.
   - **Work (`/work`):** [Work.tsx](file:///home/manas/projects/arove/src/pages/Work.tsx) presents the full creations list of Velis Studio's portfolio.
   - **Services (`/services`):** [Services.tsx](file:///home/manas/projects/arove/src/pages/Services.tsx) houses detailed service highlights, process roadmap phases, and the interactive budget planner.
   - **About (`/about`):** [About.tsx](file:///home/manas/projects/arove/src/pages/About.tsx) outlines studio stats, creative showreels, client testimonials, and the FAQ accordion.
   - **Journal (`/journal`):** [Journal.tsx](file:///home/manas/projects/arove/src/pages/Journal.tsx) hosts article reviews, blog entries, design trends, and local marketing tips. The page is designed with a massive, left-aligned typography header (`text-[110px]` on desktop) and renders articles as large, widescreen vertical cards with huge headlines (`text-6xl`) and wide-angle `aspect-[21/9]` images.
   - **Contact (`/contact`):** [Contact.tsx](file:///home/manas/projects/arove/src/pages/Contact.tsx) provides a full-page custom booking form, direct email links, office address, and support hours.

2. **SEO Integration:**
   - The dynamic [SEO.tsx](file:///home/manas/projects/arove/src/components/SEO.tsx) component updates the page title, description tag, and canonical link in the `<head>` dynamically on every path transition, ensuring that crawler index bots map the page's metadata accurately.

3. **Navbar & Legibility Refinements:**
   - **Essential Links Only:** Unnecessary secondary blocks (Process, FAQ) have been removed from the top-level menu. The primary navigation contains: Home, Work, About, Journal, and Contact.
   - **High-Contrast Typography:** Font size is increased to `text-[13px]`, with `font-bold` and high-contrast `text-text-main` styling (deep off-black `#2D2926` in light mode, clean off-white `#f5f0eb` in dark mode) for maximum legibility.
   - **Persisted Active Indicators:** Standard underlines persist on active menu targets using the `.nav-link.active::after` selector, colored in brand Terracotta (`text-primary`).

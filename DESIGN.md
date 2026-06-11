# Velis Studio — Design System

This document outlines the design tokens, component architecture, and interactive behaviors for **Velis Studio**.

---

## 1. Color Palette

The color system is designed around warm, natural tones: a primary Terracotta, paired with off-black typography and a set of cohesive light gray surfaces.

| Token | CSS Variable / Value | Purpose |
| :--- | :--- | :--- |
| **Primary (Terracotta)** | `--color-primary` / `#B35C44` | Brand highlights, primary call-to-actions, active links |
| **On Primary** | `--color-on-primary` / `#FFFFFF` | Text color on primary background elements |
| **Background / Surface** | `--color-background` / `#FBF9F9` | Default background color of the body and sections |
| **Surface Dim** | `--color-surface-dim` / `#DBDAD9` | Muted background surfaces |
| **Surface Bright** | `--color-surface-bright` / `#FBF9F9` | Clean, highlighted surfaces |
| **Surface Container Lowest** | `--color-surface-lowest` / `#FFFFFF` | Darker surfaces (low elevation container) |
| **Surface Container Low** | `--color-surface-low` / `#F5F3F3` | Cards and section containers |
| **Surface Container** | `--color-surface-container` / `#EFEDED` | Intermediate container backdrop |
| **Surface Container High** | `--color-surface-high` / `#E9E8E7` | Higher elevation backdrops |
| **Surface Container Highest** | `--color-surface-highest` / `#E4E2E2` | Accent border and outline-variant colors |
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
- **Section Spacing (Vertical):** Responsive padding `py-16 sm:py-24 md:py-32` to tighten vertical flow on mobile while keeping it airy on desktop.
- **Horizontal Margins (Containers):** Responsive padding `px-4 sm:px-6` (16px on mobile, 24px on desktop) to maximize text and element layouts on small viewports.
- **Fine Borders:** Subtle translucent black borders (`border-black/5` or `rgba(0, 0, 0, 0.08)`)

---

## 4. Animation & Interaction Rules

Following the Vercel Web Interface Guidelines, animations are kept subtle, polished, and compositor-friendly:

1. **Subtle Reveals:** Smooth fade-ins with custom `cubic-bezier` easing rather than aggressive spring effects.
2. **Transform & Opacity Only:** Animating changes to `transform` and `opacity` to maintain 60 FPS performance.
3. **Explicit Transitions:** No `transition-all`. List transit properties explicitly (e.g., `transition-[transform,opacity,background-color]`).
4. **Reduced Motion Support:** All interactive transitions and entrance animations must respond to media query `prefers-reduced-motion: reduce` by reverting to static displays or simple fading.
5. **Focus States:** Every button and interactive link must use a highly visible, custom focus indicator (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`).
6. **Cards & Buttons:** Cards lift slightly (`group-hover:-translate-y-2 group-hover:shadow-lg transition-transform duration-500`). Buttons scale slightly on click (`active:scale-98`).

---
version: alpha
name: Editorial Engineering Craft
description: "Precision software craftsmanship meets editorial restraint. High-contrast typography, deep neutral canvas, and single emerald accent."
colors:
  primary: "#0F766E"
  primary-hover: "#115E59"
  accent: "#14B8A6"
  background: "#090D16"
  surface: "#0F172A"
  surface-card: "#131E36"
  text-primary: "#F8FAFC"
  text-muted: "#94A3B8"
  border: "#1E293B"
typography:
  display:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  h1:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  h2:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  code-sm:
    fontFamily: Geist Mono, monospace
    fontSize: 0.8125rem
    fontWeight: 500
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.text-primary}"
  card-surface:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
  card-border:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text-primary}"
  badge-status:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: 6px
  text-muted-meta:
    textColor: "{colors.text-muted}"
    backgroundColor: "{colors.surface}"
---

## Overview

A visual identity built for a senior software engineer portfolio. Rather than relying on generic AI templates (grid canvas backgrounds, neon radial glows, uniform bento grids), this system champions **editorial typography, deliberate hierarchy, and calm functional whitespace**.

- **Dial Settings**: `ENERGY: 2` / `RHYTHM: 2` / `MOTION: 1`
- **Key Motifs**: Fine-line architectural borders, high typographic scale contrast, monospaced metadata badges, purposeful micro-interactions.

## Colors

- **Primary (`#0F766E`)**: Deep emerald teal used strictly for primary call-to-actions and interactive anchors.
- **Accent (`#14B8A6`)**: Bright mint used sparingly as a live status beacon (hireable indicator) and active highlights.
- **Background (`#090D16`)**: Rich obsidian midnight slate that eliminates harsh pure black glare while maintaining deep contrast.
- **Surface (`#0F172A`) & Card (`#131E36`)**: Layered elevation tones providing distinct separation without relying on aggressive drop shadows.
- **Text Primary (`#F8FAFC`)**: High-legibility crisp off-white complying with WCAG AAA contrast ratio on dark backgrounds.
- **Text Muted (`#94A3B8`)**: Calibrated slate grey delivering a 7:1 contrast ratio for secondary metadata and narrative prose.

## Typography

- **Display**: High-impact editorial headline with tight negative letter tracking (`-0.035em`) for personal branding statement.
- **Body**: Generous line height (`1.6`) for effortless readability across desktop and mobile viewports.
- **Mono**: Reserved strictly for technical tags, dates, and architecture identifiers.

## Layout

- **Asymmetric Hierarchy**: The primary flagship project commands attention through a full-width showcase, preventing monotonous 3-card repetition.
- **Pacing**: Generous section spacing (`32px` to `48px`) creates clear visual breathing room between biography, technical repertoire, and project deep dives.
- **Responsive Padding**: Fluid padding adhering to minimum 44px tap targets for mobile usability.

## Elevation & Depth

- **Subtle Layering**: Visual depth is expressed through 1px border contrast (`#1E293B`) and surface color stepping rather than floating blurry drop shadows.
- **Single Ambient Depth**: Subtle top-radial ambient warmth instead of continuous canvas CPU loops.

## Shapes

- **Consistent Radius**: Rounded rectangles using `6px` for compact tags, `10px` for interactive buttons, and `16px` for structural cards.
- **Zero Pill Overuse**: Pill shapes (`9999px`) are reserved exclusively for status indicators.

## Components

- `button-primary`: Grounded interactive trigger with clear hover feedback and visible keyboard focus ring.
- `card-surface`: Architectural content container with subtle hover lift and border transition.

## Do's and Don'ts

### Do's
- Prioritize real content and project outcomes over decorative embellishments.
- Maintain consistent WCAG AA (minimum 4.5:1) color contrast in both dark and light modes.
- Use motion exclusively to communicate state changes or visual feedback.

### Don'ts
- Do not use continuous CPU-heavy canvas animation loops in the background.
- Do not use em dashes (`—`) in copy.
- Do not repeat identical card layouts across every section without content-driven variation.
- Do not use generic AI buzzwords or fabricated social proof.

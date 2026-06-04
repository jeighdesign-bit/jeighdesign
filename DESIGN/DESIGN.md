---
name: Lumina Creative
colors:
  surface: '#fbf8fe'
  surface-dim: '#dcd9de'
  surface-bright: '#fbf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f8'
  surface-container: '#f0edf2'
  surface-container-high: '#eae7ed'
  surface-container-highest: '#e4e1e7'
  on-surface: '#1b1b1f'
  on-surface-variant: '#484555'
  inverse-surface: '#303034'
  inverse-on-surface: '#f3f0f5'
  outline: '#797586'
  outline-variant: '#c9c4d7'
  surface-tint: '#613ede'
  primary: '#5e3bdb'
  on-primary: '#ffffff'
  primary-container: '#7858f5'
  on-primary-container: '#fffbff'
  inverse-primary: '#cabeff'
  secondary: '#006590'
  on-secondary: '#ffffff'
  secondary-container: '#2db8fe'
  on-secondary-container: '#004665'
  tertiary: '#5a5b68'
  on-tertiary: '#ffffff'
  tertiary-container: '#737381'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#481bc6'
  secondary-fixed: '#c8e6ff'
  secondary-fixed-dim: '#87ceff'
  on-secondary-fixed: '#001e2e'
  on-secondary-fixed-variant: '#004c6d'
  tertiary-fixed: '#e2e1f1'
  tertiary-fixed-dim: '#c6c5d4'
  on-tertiary-fixed: '#191b26'
  on-tertiary-fixed-variant: '#454652'
  background: '#fbf8fe'
  on-background: '#1b1b1f'
  surface-variant: '#e4e1e7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 160px
  unit: 8px
---

## Brand & Style

This design system is built for a high-end creative portfolio that bridges the gap between SaaS precision and artistic expression. The brand personality is **Visionary, Technical, and Fluid**. It targets tech-forward clients and brands looking for precision-grade design work, specifically in the sublimation and apparel space.

The visual style is a blend of **Minimalism** and **Glassmorphism**. It utilizes expansive white space to allow high-fidelity project imagery to breathe, while employing soft, iridescent gradients and translucent "glass" containers to evoke a sense of digital craftsmanship. The aesthetic mimics the clean, structured look of modern fintech apps but softens it with organic color transitions and refined typography.

## Colors

The palette is anchored by a sophisticated "Hyper-Violet" and "Electric Azure" duo, used primarily for accents, interactive states, and soft background blurs. 

- **Primary & Secondary:** These are often used as a linear gradient (45-degree angle) to represent the "flow" of sublimation ink and creative energy.
- **Surface Strategy:** The system uses a multi-layered light mode. The base is a pure white (#FFFFFF), with secondary surfaces using a very pale lilac-grey (#F8F9FD) to define structural segments without heavy borders.
- **Accents:** Vibrant gradients should be used sparingly for primary actions and "feature glows"—soft radial blurs positioned behind key portfolio pieces to create depth.

## Typography

The typography system relies on **Plus Jakarta Sans** for a friendly yet high-tech editorial feel. Headlines use tight letter-spacing and heavy weights to create a strong visual anchor.

**Inter** provides a highly legible, neutral foundation for long-form descriptions of project case studies and technical process explanations. **Hanken Grotesk** is used exclusively for labels, tags, and "overlines" (small text above headlines), adding a layer of technical precision that mirrors the detail-oriented nature of Illustrator and Photoshop work.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A generous 8px spacing unit dictates all internal component padding and margins.

- **Negative Space:** Section gaps are intentionally large (160px+) to ensure each project or service offering feels like a distinct gallery exhibit.
- **The "SaaS" Sidebar/Nav:** The navigation should feel like a floating utility bar, either centered at the top or anchored to a side, using a glassmorphic background blur to remain distinct from the content beneath it.
- **Alignment:** Content is generally center-aligned for hero sections to maximize impact, while case study details use a staggered left-right alignment to maintain rhythm.

## Elevation & Depth

This design system rejects traditional heavy shadows in favor of **Tonal Elevation** and **Atmospheric Blurs**.

- **Level 1 (Base):** Flat white background.
- **Level 2 (Cards):** Subsurface containers with a 1px border (#E2E8F0) and no shadow, or a very faint 20% opacity blur of the primary color.
- **Level 3 (Interactive):** Glassmorphic overlays with a `backdrop-filter: blur(12px)` and a white-transparent fill (80%).
- **Depth Cues:** Depth is primarily established through background "blobs"—large, low-opacity radial gradients of purple and blue that sit behind the main content layer.

## Shapes

The shape language is consistently **Rounded**, reflecting the fluidity of sublimation design. 

- **Containers:** Standard cards and input fields use a 0.5rem (8px) radius.
- **Feature Elements:** Large imagery and hero buttons use "rounded-xl" (1.5rem / 24px) to feel more approachable and modern.
- **Iconography:** Icons should be thick-stroked (2px) with rounded caps and joins, matching the geometry of the Plus Jakarta Sans typeface.

## Components

### Buttons
- **Primary:** Gradient fill (Primary to Secondary) with white text. High roundedness (24px). Subtle outer glow on hover.
- **Secondary:** Transparent background with a 1.5px gradient border. 

### Cards
Portfolio cards should feature "Full Bleed" imagery. On hover, a glassmorphic overlay should slide up or fade in, displaying the project title (Headline-MD) and tags (Label-Caps).

### Chips & Tags
Used for software (Illustrator/Photoshop) or project categories. Soft lilac background (#F0EFFF) with primary color text. Fully pill-shaped.

### Input Fields
Clean, minimalist design. 1px border that glows azure when focused. Labels always sit above the field in `label-caps` style.

### Image Gallery
Utilize a "Masonry" or "Bento" style grid for sublimation prints. Every image should have a very subtle inner stroke (0.5px white) to ensure it pops against any background color.

### The "Process" Timeline
A vertical or horizontal line component using the primary gradient, connecting different stages of the design process (Sketch -> Vector -> Mockup).
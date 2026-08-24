---
name: Urban Utility
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system centers on the concept of "Urban Utility"—a professional, airy, and trustworthy aesthetic designed for modern navigation and space management. It moves away from decorative glows and tech-heavy cyberpunk tropes in favor of high-contrast clarity, structural precision, and functional elegance.

The brand personality is efficient and reliable. The visual language employs a "Minimalism-Plus" approach: extreme white space and a restricted palette are punctuated by high-vibrancy emerald accents to signal action and success. The emotional response should be one of competence and calm, providing users with a sense of organized control over their physical environment.

## Colors

The palette is anchored by **Pure White (#FFFFFF)** to ensure maximum breathability and a sense of cleanliness. 

- **Primary Emerald (#10B981):** Used exclusively for primary actions, success states, and active indicators. It should never be used for large background fills; instead, it acts as a "highlighter" for the UI.
- **Deep Charcoal (#0F172A):** Provides the structural backbone. Used for all primary text, icons, and heavy borders to maintain high legibility and professional weight.
- **Neutral Slate (#F8FAFC):** Employed for subtle background shifts, such as card headers or inactive input fields, to provide depth without breaking the high-contrast rhythm.

**Gradients:** Use subtle linear gradients (Emerald to Transparent) only for depth in decorative backgrounds or soft "wash" effects behind primary data visualizations. Avoid radial glows or neon intensities.

## Typography

The typographic hierarchy relies on the interplay between the geometric confidence of **Outfit** for headings and the soft, legible efficiency of **Plus Jakarta Sans** for body and interface text.

Headings should use tight letter spacing and heavy weights to command attention. Body text prioritizes generous line heights (1.5x+) to enhance the "airy" feel. For utilitarian labels and badges, use **Plus Jakarta Sans** in a bold, uppercase style to ensure they are immediately distinguishable from standard prose.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The layout philosophy is "Container-First," where content is grouped into clearly defined white cards to manage visual noise.

- **Desktop:** 64px outer margins with 24px gutters.
- **Mobile:** 16px outer margins with 16px gutters.
- **Rhythm:** Use an 8px base unit. Vertical spacing between sections should be aggressive (48px to 80px) to reinforce the airy, professional aesthetic. Avoid crowding elements; when in doubt, increase the white space.

## Elevation & Depth

Depth is achieved through **Low-Contrast Outlines** and **Ambient Shadows** rather than glows. 

1.  **Level 0 (Base):** Pure White (#FFFFFF) background.
2.  **Level 1 (Cards/Containers):** White surface with a 1px border of Slate-200 (#E2E8F0) and a very soft, diffused shadow (Offset: 0, 4px; Blur: 20px; Opacity: 4% Black).
3.  **Level 2 (Interaction/Popovers):** White surface with a more pronounced shadow (Offset: 0, 10px; Blur: 30px; Opacity: 8% Black).

Transitions should be crisp. Avoid background blurs (glassmorphism) to maintain the clean, "urban utility" look.

## Shapes

The design system uses a **Rounded** shape language to soften the high-contrast professional look, making it feel more approachable.

- **Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Cards & Modals:** 1rem (16px) corner radius.
- **Badges/Tags:** Fully pill-shaped for immediate visual distinction from buttons.

Avoid sharp corners entirely to maintain the "trustworthy and modern" brand attribute.

## Components

- **Buttons:** 
    - **Primary:** Solid Emerald (#10B981) with White text. No gradients.
    - **Secondary:** White background with a 2px Charcoal (#0F172A) border and Charcoal text.
- **Inputs:** 1px Slate-200 borders. On focus, the border transitions to 2px Emerald (#10B981) with a 0% to 10% Emerald tinted shadow wash.
- **Badges:** Use high-contrast combinations. Active status: Emerald background with White text. Inactive/Neutral: Charcoal background with White text.
- **Lists:** Use 1px horizontal Slate-100 separators. Vertical padding should be generous (16px-24px per item).
- **Cards:** Always use a white background. No borders on the card itself if the shadow provides enough definition against the #F8FAFC page background.
- **Interactive Map Pins:** High-contrast Charcoal drops with an Emerald center dot to indicate utility and primary focus.
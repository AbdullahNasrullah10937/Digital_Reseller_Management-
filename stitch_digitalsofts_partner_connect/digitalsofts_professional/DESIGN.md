---
name: Digitalsofts Professional
colors:
  surface: '#f9f9ff'
  surface-dim: '#d1daf4'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8ff'
  surface-container-highest: '#d9e2fc'
  on-surface: '#121b2e'
  on-surface-variant: '#44474e'
  inverse-surface: '#273044'
  inverse-on-surface: '#edf0ff'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4b5e85'
  primary: '#00112e'
  on-primary: '#ffffff'
  primary-container: '#10264a'
  on-primary-container: '#7a8eb8'
  inverse-primary: '#b3c7f3'
  secondary: '#964900'
  on-secondary: '#ffffff'
  secondary-container: '#ff8928'
  on-secondary-container: '#642f00'
  tertiary: '#02122b'
  on-tertiary: '#ffffff'
  tertiary-container: '#172740'
  on-tertiary-container: '#7f8ead'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#b3c7f3'
  on-primary-fixed: '#021b3e'
  on-primary-fixed-variant: '#33476c'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb786'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#723600'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#b7c7e8'
  on-tertiary-fixed: '#0b1b35'
  on-tertiary-fixed-variant: '#384762'
  background: '#f9f9ff'
  on-background: '#121b2e'
  surface-variant: '#d9e2fc'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for a premium B2B SaaS environment, specifically tailored for a high-stakes partner portal. The personality is **Corporate & Modern**: it communicates reliability, authority, and industrial-scale capability. 

The aesthetic prioritizes clarity and functional density. It avoids the whimsical trends of consumer apps in favor of a "data-first" architecture. By utilizing deep navy structural elements and sharp orange accents, the system creates a high-contrast environment that guides the eye toward critical actions without sacrificing professional gravitas. The target audience—enterprise partners and administrators—expects a tool that feels like an extension of their professional workflow: precise, stable, and efficient.

## Colors

The color palette is anchored by **Primary Navy (#10264A)**, used for top-level navigation and structural headers to instill a sense of institutional security. **Secondary Navy (#091A33)** is reserved for the sidebar and immersive portal areas, providing a sophisticated backdrop for light-colored navigation items.

**Brand Orange (#F58220)** is the strategic catalyst. It is used sparingly but decisively for Call-to-Action (CTA) buttons, active navigation states, and critical notification badges. 

The interface sits on a cool **Background (#F6F8FB)** with elevated **Surface (#FFFFFF)** cards. Semantic colors (Success, Warning, Error, Info) follow industry standards but are calibrated for high legibility against white surfaces, ensuring that system statuses are immediately recognizable at a glance.

## Typography

This design system utilizes **Inter** across all roles to ensure a systematic, utilitarian feel that excels in data-heavy contexts.

- **Headlines:** Use SemiBold (600) weights with slightly tightened letter-spacing to create a "locked-in" professional look.
- **Body:** Standardized at 16px for primary reading, scaling down to 14px for secondary metadata or dense table rows.
- **Labels:** Small labels (12px) should use All-Caps or Medium weights with increased letter-spacing to clearly differentiate them from body text in forms and table headers.
- **Responsive Note:** On mobile devices, large display styles scale down to ensure content remains within the viewport without excessive wrapping.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. On desktop, the main content area is capped at 1440px, centered on the screen, or offset by a fixed 280px sidebar in portal views.

- **Grid:** A 12-column system with 24px gutters is standard for dashboard layouts.
- **Rhythm:** An 8px linear scale (with a 4px step for tight components) governs all padding and margins. 
- **Density:** The system balances "spaciousness" with "data-richness." High-level dashboard views use `lg` (24px) padding, while internal table cells and data grids use `sm` (8px) or `md` (16px) padding to maximize information density.
- **Responsive:** Mobile views collapse the 12-column grid into 1 or 2 columns, utilizing 16px side margins to maximize screen real estate for data tables.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Low-Contrast Outlines**.

1.  **The Canvas:** The background (#F6F8FB) acts as the lowest layer.
2.  **The Cards:** Surface containers (#FFFFFF) use a subtle 1px border (#E4E7EC) to define their boundaries. 
3.  **Shadows:** Shadows are used sparingly. When applied (e.g., to a focused card or a dropdown), they are extremely diffused: `0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)`.
4.  **Interaction:** Hover states for interactive cards should involve a slight shift in the shadow depth and a border color change to the Primary Navy or Brand Orange, rather than a physical lift.

## Shapes

The shape language is **Rounded**, striking a balance between the rigid "sharp" look of legacy enterprise software and the overly "bubbly" look of consumer apps.

- **Standard Radius:** 8px (0.5rem) for buttons, input fields, and small components.
- **Container Radius:** 12px to 16px for primary dashboard cards and modals to create a distinct framing effect for content.
- **Pill Radius:** Used exclusively for status indicators (tags/chips) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Brand Orange (#F58220) with White text. Bold, 8px radius.
- **Secondary:** White background with Primary Navy (#10264A) border and text.
- **Tertiary/Ghost:** No background or border. Primary Navy text.

### Tables & Data
- **High-End Tables:** No vertical borders. Horizontal dividers only (#E4E7EC). Row hover state uses Background color (#F6F8FB).
- **Metric Cards:** White surface, 12px radius. Include a 2px stroke sparkline in the bottom half (Success Green or Info Blue) to show trends.

### Status Pills
- **Style:** Light background tints of the semantic colors (e.g., Success Green at 10% opacity) with high-contrast bold text of the same color.

### Form Fields
- **Inputs:** 8px radius, 1px border (#E4E7EC). Labels are positioned above the input in `label-md` style.
- **Focus State:** 1px border shifts to Primary Navy with a 3px soft outer "halo" in a transparent navy tint.

### Portal Sidebar
- **Background:** Secondary Navy (#091A33). 
- **Nav Items:** Ghost white text at 70% opacity. Active state uses a vertical Brand Orange bar (4px wide) on the left edge and 100% white text opacity.
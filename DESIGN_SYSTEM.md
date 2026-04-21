# Design System Document: The Precision Engine

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Precision Engine."** 

This system rejects the generic "tech startup" aesthetic in favor of a high-end editorial experience that mirrors the grit and precision of motocross and firefighting. It is a visual celebration of craftsmanship—where heavy-duty reliability meets modern digital sophistication. We achieve this by moving away from standard grids and embracing a "Rugged Editorial" layout: intentional asymmetry, oversized technical typography, and deep, layered charcoals that feel like carbon fiber and brushed steel.

The goal is to convey an atmosphere of "operational excellence." It’s not just a website; it’s a high-performance tool for a business that handles custom embroidery and DTF printing with mechanical accuracy.

---

## 2. Colors: Tonal Depth & The High-Contrast Pulse
The palette is built on a foundation of "Obsidian" depths and "Emergency" accents. We utilize a high-contrast ratio to ensure the UI feels authoritative and crisp.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be defined solely through background color shifts. For example, a hero section using `surface` transitions into a feature section using `surface-container-low`. We define space through mass, not lines.

### Surface Hierarchy & Nesting
This design system treats the UI as a physical stack of materials. 
*   **Surface (Base):** `#131313` – The dark, matte floor of the application.
*   **Surface-Container Tiers:** Use `surface-container-lowest` to `highest` to create "nested" depth. 
    *   Place a `surface-container-highest` card inside a `surface-container-low` section to create natural, tactile importance without adding artificial shadows.
*   **The "Glass & Gradient" Rule:** To avoid a flat, "out-of-the-box" look, floating elements (like navigation bars or modals) should utilize Glassmorphism. Apply `surface` or `surface-bright` at 80% opacity with a heavy `backdrop-blur` (20px+).
*   **Signature Textures:** For primary CTAs, use a subtle linear gradient from `primary` (`#ffb3b1`) to `primary-container` (`#d42b3b`) at a 135-degree angle. This adds "visual soul" and a metallic sheen reminiscent of high-end machinery.

---

## 3. Typography: Machined Precision
We use a dual-typeface strategy to balance "Rugged" and "Professional."

*   **Display & Headlines (Space Grotesk):** This is our "Machined" font. It is technical, slightly industrial, and high-impact. Use `display-lg` for hero statements with tight letter-spacing (-2%) to mimic the branding on motocross gear.
*   **Body & Titles (Inter):** This is our "Operational" font. It provides neutral, high-legibility clarity. It ensures that while the headlines are bold, the transactional information (pricing, specs, order details) remains trustworthy and easy to digest.
*   **Hierarchy as Identity:** Use `label-md` in all-caps with increased letter-spacing (+10%) for small metadata or category tags. This creates an "architectural blueprint" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional "drop shadows" are often a crutch for poor layout. In this system, depth is achieved through **Tonal Layering.**

*   **The Layering Principle:** Rather than lifting an object with a shadow, we "carve" it out using the `surface-container` tokens. An element that needs to feel interactive should be one step lighter or darker than its parent container.
*   **Ambient Shadows:** If an element must float (e.g., a floating action button), shadows must be extra-diffused. Use the `on-surface` color at 6% opacity with a 32px blur and 8px Y-offset. This mimics natural, ambient light in a workshop, not a digital glow.
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the "Ghost Border" method: the `outline-variant` token at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent `surface-container-high` for overlays to let the "engine" of the background content peek through, maintaining a sense of place.

---

## 5. Components: Ruggedized Primitives

### Buttons
*   **Primary:** High-contrast gradient (`primary` to `primary-container`). Sharp corners (`DEFAULT: 0.25rem`). Text is `on-primary` and bold.
*   **Secondary:** `surface-container-highest` background with a `Ghost Border`.
*   **Tertiary:** No background. Text uses `tertiary` (`#ffba27`) to signal specialized actions.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines. 
*   **Execution:** Separate list items using 12px of vertical whitespace. For cards, use a subtle shift from `surface-container-low` to `surface-container-high` on hover to indicate interactivity.

### Input Fields
*   **Style:** Inputs should use `surface-container-lowest` to feel "recessed" into the interface. Use a 2px bottom-border of `primary` only when focused, creating a "gauge" effect.

### Chips & Tags
*   **Selection Chips:** Use `secondary-container` with `label-md` typography. These should look utilitarian equipment tags.

### Specialized Component: The "Status Strobe"
For 919designs, order statuses (e.g., "Printing," "Shipped") should use a small, glowing circular indicator using the `error_container` (for red) or `tertiary` (for orange/yellow) with a subtle pulse animation, mimicking a machine's status light.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use ample whitespace (`64px+` between major sections) to maintain a "Modern Editorial" feel.
*   **Do** lean into asymmetry. For example, a large `display-md` headline on the left can be balanced by a small `body-sm` block of text on the far right.
*   **Do** use high-quality imagery of fabrics and embroidery textures, letting the `on-surface` typography overlap the images slightly for a layered, premium look.

### Don't:
*   **Don't** use 100% opaque, high-contrast borders. It breaks the "Precision Engine" immersion.
*   **Don't** use standard blue for links. Stick to `primary` (Red) or `tertiary` (Orange/Yellow).
*   **Don't** use large border-radii. Anything over `xl` (`0.75rem`) feels too "soft" for this rugged aesthetic. Stick to `sm` and `md` for a technical, precision-cut feel.
*   **Don't** clutter the screen. If a piece of information isn't vital to the "Precision Engine" workflow, remove it or tuck it into a `surface-container-lowest` drawer.

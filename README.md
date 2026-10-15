# Hazardsecurity studio

Homepage for **hazardsecurity.xyz**: an independent studio building focused software for everyday jobs. Each product lives on its own subdomain (for example `sign.hazardsecurity.xyz` for HazardSign AI).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production: `npm run build && npm start`.

## Edit it

- `src/components/ui.tsx`: wordmark, buttons, and `PRODUCTS` (where each product's link points; update when a subdomain is connected).
- `src/components/Hero.tsx`: navigation, headline and the crossing hazard tapes (they drift and speed up with scroll).
- `src/components/Sections.tsx`: the tool shelf, principles and closing. To add a product, replace an "In the workshop" card with a live one.
- `src/app/globals.css`: colours, type scale and buttons.

## Design

- **Concept:** a workshop of everyday software. Caution-tape yellow `#ffd400` and ink `#0f0f0e` on bone `#efede6`; HazardSign keeps its own orange on its card.
- **Type:** Bricolage Grotesque (display, variable width and optical size) with Geist Mono for labels, via `next/font`.
- **Motion:** Motion (`motion/react`) with one house curve `cubic-bezier(.4,0,.05,1)`; masked word reveal and a highlighter swipe on the headline; hazard tapes driven by scroll velocity; letter-roll buttons with arrow swap. Reduced motion is respected.

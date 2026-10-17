# Royal Coffee — Ceylon's Lost Crown, Reclaimed

A concept website for an imaginary royal coffee house in Kandy, Sri Lanka, built around a real piece of history: in the 1870s Ceylon was one of the world's largest coffee producers, until coffee leaf rust destroyed the estates and the island turned to tea.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No UI or animation libraries — the illustrations and motion are hand-built with SVG and CSS.

## Highlights

- **The Royal Atelier** (`/atelier`) — an interactive drink builder. Pick shots, milk (including coconut), kithul treacle, Ceylon cinnamon, foam, ice and a finish, and an SVG glass fills layer by layer with animated transitions. Each creation gets a generated royal title (*"The Amber Duke"*, *"The Gilded Emperor of the Coast"*), a live price and flavour profile, and a shareable link (`?cup=…`).
- **Recipe-driven cup illustrations** — every drink on the menu is described as a stack of layers, and one `CupIllustration` component draws it as a labelled cross-section. The same engine powers the menu cards, product pages, cart thumbnails, the quiz and the Atelier.
- **Working cart** — React Context + `localStorage`, a slide-out drawer, quantity controls, and sizes.
- **Royal Decree checkout** — confirming an order produces a parchment decree that unfurls and is stamped with an animated wax seal. It can be printed.
- **"Which royal brew are you?"** — a three-question quiz on the home page that recommends a drink.
- **Heritage timeline** (`/heritage`) — a scroll-animated history of coffee in Ceylon.
- **Live opening status** — computed in Sri Lanka time (`Asia/Colombo`), whatever the visitor's timezone.
- Fully responsive, statically generated product pages, keyboard-friendly, and respects `prefers-reduced-motion`.

## Project structure

```
src/
  app/
    page.tsx              Home
    menu/                 Menu grid with filters + /menu/[slug] product pages
    atelier/              The drink builder
    heritage/             History timeline + credits
    cart/                 Checkout and the Royal Decree
  components/
    CupIllustration.tsx   SVG cross-section renderer
    ...
  context/CartContext.tsx
  data/menu.ts            Menu items and their layer recipes
  lib/
    ingredients.ts        Ingredient colours and price formatting
    atelier.ts            Builder options, pricing, naming and link encoding
```

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

---

A portfolio project by **Kalhara Batangala** — [LinkedIn](https://lk.linkedin.com/in/kalhara-batangala-2bb635213) · [GitHub](https://github.com/KalharaBatangala). Royal Coffee is not a real shop.

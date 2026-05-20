# Frontend Assessment

A frontend assessment built with **React + Vite**, implementing two exercises based on Figma designs.

---

Firstly Thanks for taking the time to review this submission.
---

## Live Demo
 
| Route | URL |
|-------|-----|
| Home | https://frontend-assessment.khaiphan882002.workers.dev/ |

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — build tool & dev server
- **Vitest + React Testing Library** — testing
- **SCSS Modules** — component-scoped styling
- **Tailwind CSS** — utility classes via @apply in SCSS
- **ESLint** — linting

---

## Requirements

- Node.js >= 18
- pnpm (recommended) or npm

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (port 5173)
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Hero/           # Hero section + infinite slider
│   ├── ProductCard/    # Product display
│   ├── SliderDots/     # Carousel dot indicators
│   ├── TabAccordion/   # Tabs (desktop) / Accordion (mobile)
│   └── Icons/          # SVG icons
├── data/               # Static JSON data
├── hooks/              # Custom React hooks
│   ├── useSlider.js
│   ├── useBreakpoint.js
│   └── useSliderTransition.js
├── pages/
│   ├── Exercise1.jsx   # Hero + product grid
│   └── Exercise2.jsx   # Tabs/Accordion
├── utils/
│   └── formatPrice.js
└── styles/
```

---

## Running Tests

```bash
# Watch mode
pnpm test

# Run once (CI)
pnpm test -- --run

# Interactive test UI
pnpm run test:ui

# With coverage report
pnpm test -- --coverage
```

---

## Exercises

### Exercise 1 — Responsive Page

- Matches the Figma design as closely as possible
- Fully responsive (mobile & desktop)
- Infinite loop slider with dot navigation and arrow buttons
- Responsive images using `<picture>` + `<source media>` for mobile/desktop
- Product grid: 2 columns on mobile, 4 columns on desktop

### Exercise 2 — Tabs & Accordion

- **Desktop:** displayed as Tabs
- **Mobile:** displayed as Accordion
- Only one tab/accordion open at a time
- First item open by default on load

---

## Figma Design

[View Figma](https://www.figma.com/design/OGS3UnHSQ22l0rXXsY7wnU/FE-Test?node-id=0-1&p=f&m=dev)

---

## Bonus — `('b' + 'a' + + 'a' + 'a').toLowerCase()` === `"banana"`

Breaking it down step by step:

```js
"b" +
  "a" + // → "ba"       (string concatenation)
  "a"; // → NaN        (unary + on 'a' = NaN)
"ba" + NaN; // → "baNaN"    (NaN coerced to string "NaN")
"baNaN" + "a"; // → "baNaNa"
"baNaNa".toLowerCase(); // → "banana" 🍌
```

The key is the **unary `+` operator** before the second `'a'`, which attempts to convert `'a'` to a number — resulting in `NaN`. When concatenated with a string, `NaN` becomes `"NaN"`.

---

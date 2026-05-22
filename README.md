# Frontend Assessment

A frontend assessment built with React + Vite, implementing two exercises based on the provided Figma design.

---

Thanks for taking the time to review this submission.

---

## Live Demo

| Route | URL |
|-------|-----|
| Home | https://frontend-assessment.khaiphan882002.workers.dev/ |

---

## Tech Stack

- React 19
- React Router DOM
- Swiper
- Vite
- Tailwind CSS
- Vitest + React Testing Library
- ESLint

---

## Requirements

- Node.js >= 18
- pnpm (recommended) or npm

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
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

```text
src/
|-- components/              # Reusable UI components
|   |-- BackToHomeButton.jsx
|   |-- Hero/                # Hero section + slider
|   |-- Icons/               # SVG icons
|   |-- ProductCard/         # Product grid and product cards
|   |-- SliderDots/          # Slider dot indicators
|   `-- TabAccordion/        # Tabs (desktop) / Accordion (mobile)
|-- data/                    # Static JSON data
|-- hooks/                   # Custom React hooks
|   `-- useMediaQuery.js
|-- layouts/
|   `-- MainLayout.jsx
|-- pages/
|   |-- Exercise1.jsx
|   |-- Exercise2.jsx
|   `-- HomePage.jsx
|-- utils/
|   `-- formatPrice.js
|-- App.jsx
|-- index.css
|-- main.jsx
`-- setupTests.js
```

---

## Running Tests

```bash
# Watch mode
pnpm test

# Run once
pnpm test -- --run

# Interactive UI
pnpm run test:ui
```

---

## Exercises

### Exercise 1 - Responsive Page

- Matches the Figma design as closely as possible
- Fully responsive on mobile and desktop
- Hero slider with arrows, dots, and swipe support
- Responsive images using `picture` and media sources
- Product grid: 2 columns on mobile, 4 columns on desktop

### Exercise 2 - Tabs and Accordion

- Desktop: rendered as tabs
- Mobile: rendered as accordion
- Only one item open at a time
- First item open by default

---

## Figma Design

[View Figma](https://www.figma.com/design/OGS3UnHSQ22l0rXXsY7wnU/FE-Test?node-id=0-1&p=f&m=dev)

---

## Bonus

```js
("b" + "a" + + "a" + "a").toLowerCase() === "banana";
```

Why it works:

- `+"a"` becomes `NaN`
- `"b" + "a"` becomes `"ba"`
- `"ba" + NaN` becomes `"baNaN"`
- `"baNaN" + "a"` becomes `"baNaNa"`
- `.toLowerCase()` becomes `"banana"`

---

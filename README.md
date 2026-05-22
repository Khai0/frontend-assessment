# Frontend Assessment

This repository contains my submission for the frontend assessment, built with React + Vite and implementing the required exercises based on the provided Figma design.

---

Thanks for taking the time to review this submission.

---

## Live Demo

| Route | URL                                                     |
| ----- | ------------------------------------------------------- |
| Home  | https://frontend-assessment.khaiphan882002.workers.dev/ |

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

## Component Architecture

### Component Structure

The project follows a component-based architecture to improve maintainability and reusability.

- `pages/` → route-level pages
- `components/` → reusable UI components
- `hooks/` → reusable logic
- `utils/` → helper functions
- `data/` → static JSON data

### Responsive Strategy

- Tailwind responsive utilities are used for layout adaptation.
- `useMediaQuery` switches between Tabs and Accordion layouts.
- `picture` element is used for responsive images.

### State Management

React local state (`useState`) is sufficient for this project scope and avoids unnecessary global state complexity.

---

## Data Sources

- **Exercise 1** reads from `slides.json` and `products.json`
- **Exercise 2** reads from `data.json`

---

## Hero / Slider

| Component       | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `Hero`          | Wrapper for Exercise 1. Manages slider state and connects the child components below. |
| `Slider`        | Carousel (Swiper) with autoplay, loop, swipe support, and responsive images.          |
| `HeadingBlock`  | Displays eyebrow text, heading, blurb, and CTA buttons.                               |
| `SliderButtons` | Previous / Next navigation buttons.                                                   |
| `SliderDots`    | Pagination dots, synchronized with the current slide index.                           |

---

## Product Listing

| Component        | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `ProductGrid`    | Product grid layout: 2 columns on mobile, 4 columns on desktop.                        |
| `ArcProductCard` | Product card displaying image, brand, product name, current price, and original price. |

---

## Tabs / Accordion

| Component      | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `TabAccordion` | Controller for Exercise 2. Automatically switches between Tab mode (≥ 768 px) and Accordion mode (< 768 px). |
| `Tabs`         | Desktop tab interface with `role="tablist"` and `role="tabpanel"` for accessibility.                         |
| `Accordion`    | Mobile accordion; only one item can be open at a time.                                                       |

---

## Layout / Navigation

| Component          | Description                              |
| ------------------ | ---------------------------------------- |
| `MainLayout`       | Page shell used across exercise routes.  |
| `BackToHomeButton` | Fixed button that navigates back to `/`. |

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

### Exercise 1 — Responsive Page

- [x] Matches the provided Figma design
- [x] Fully responsive layout
- [x] Hero slider with arrows and dots
- [x] Swipe support
- [x] Responsive images using `picture`
- [x] Product grid responsive layout

#### Implemented Features

- [x] Desktop view renders as **Tabs**
- [x] Mobile view renders as **Accordion**
- [x] Only one item can be expanded at a time
- [x] First item is expanded by default
- [x] Responsive switching using `useMediaQuery`

---

## Design Reference

Figma design used for implementation:

[View Figma Design](https://www.figma.com/design/OGS3UnHSQ22l0rXXsY7wnU/FE-Test?node-id=0-1&p=f&m=dev)

---

## Bonus

```js
("b" + "a" + +"a" + "a").toLowerCase() === "banana";
```

### Explanation

The expression works because JavaScript performs implicit type coercion.

- `+"a"` becomes `NaN`
- `"b" + "a"` becomes `"ba"`
- `"ba" + NaN` becomes `"baNaN"`
- `"baNaN" + "a"` becomes `"baNaNa"`
- `.toLowerCase()` becomes `"banana"`

---

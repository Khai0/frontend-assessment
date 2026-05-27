# Frontend Assessment

This repository contains my submission for the frontend assessment, built with React + Vite and implementing the required exercises based on the provided Figma design.

---

Thanks for taking the time to review this submission.

---

## Live Demo

| Route     | URL                                                              |
| --------- | ---------------------------------------------------------------- |
| Home      | https://frontend-assessment.khaiphan882002.workers.dev/          |
| Exercise1 | https://frontend-assessment.khaiphan882002.workers.dev/exercise1 |
| Exercise2 | https://frontend-assessment.khaiphan882002.workers.dev/exercise2 |

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


# Lint code
pnpm lint
```

---

## Project Structure

```text
.
|-- public/                     # Static assets served directly by Vite
|-- src/
|   |-- components/             # Reusable UI building blocks
|   |   |-- BackToHomeButton.jsx
|   |   |-- Hero/               # Hero banner, Swiper slider, heading block, nav buttons
|   |   |-- Icons/              # Shared SVG/icon helpers
|   |   |-- ProductCard/        # Product card and product grid components
|   |   |-- SliderDots/         # Slider pagination dots
|   |   `-- TabAccordion/       # Exercise 2 desktop tabs and mobile accordion
|   |-- data/                   # Static JSON content for both exercises
|   |   |-- data.json
|   |   |-- products.json
|   |   `-- slides.json
|   |-- layouts/
|   |   `-- MainLayout.jsx      # Shared page shell for exercise routes
|   |-- pages/                  # Route-level pages
|   |   |-- HomePage.jsx        # Entry page linking to each exercise
|   |   |-- Exercise1.jsx       # Hero slider + product grid page
|   |   `-- Exercise2.jsx       # Tabs / accordion page
|   |-- styles/
|   |   `-- typography.css      # Shared typography classes built with Tailwind @apply
|   |-- utils/
|   |   |-- formatPrice.js      # Price formatting helper
|   |   `-- sanitize.js         # DOMPurify wrapper for safe HTML rendering
|   |-- App.jsx                 # App routes and scroll handling
|   |-- index.css               # Global styles and Tailwind entry
|   |-- main.jsx                # React app bootstrap
|   `-- setupTests.js           # Test setup
|-- tailwind.config.js          # Tailwind theme tokens and custom config
|-- vite.config.js              # Vite configuration
`-- README.md
```

### Structure Notes

- `pages/` contains route components only; page-specific assembly happens here, while visual pieces stay inside `components/`.
- `components/Hero/` groups everything related to the Exercise 1 hero carousel so slider logic and presentation stay close together.
- `components/ProductCard/` isolates catalog UI for Exercise 1, making the grid and each card reusable and easier to test separately.
- `components/TabAccordion/` keeps the Exercise 2 responsive pattern together: `Tabs` for desktop, `Accordion` for mobile, and `TabAccordion` as the controller.
- `data/` stores mock content outside the UI so components stay presentation-focused.
- `styles/typography.css` centralizes repeated text styles using Tailwind `@apply`, which keeps JSX class lists shorter and more consistent.
- `utils/sanitize.js` is used before `dangerouslySetInnerHTML` so HTML content is filtered instead of rendered blindly.

---

## Component Architecture

### Component Structure

The project follows a component-based architecture to improve maintainability and reusability.

- `pages/` → route-level pages
- `components/` → reusable UI components
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

| Component     | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| `ProductGrid` | Product grid layout: 2 columns on mobile, 4 columns on desktop.                        |
| `ProductCard` | Product card displaying image, brand, product name, current price, and original price. |

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

## Exercises

### Exercise 1 — Responsive Page

- [x] Matches the provided Figma design
- [x] Fully responsive layout
- [x] Hero slider with arrows and dots
- [x] Swipe support
- [x] Responsive images using `picture`
- [x] Product grid responsive layout

### Exercise 2

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

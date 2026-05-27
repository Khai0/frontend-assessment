import clsx from "clsx";
import { Link } from "react-router-dom";

const exercises = [
  {
    id: "exercise-1",
    index: "01",
    title: "Exercise 1",
    description: "Build a responsive page based on the design.",
    note: "Hero slider and product grid.",
    cta: "Open page",
    path: "/exercise1",
    featured: true,
  },
  {
    id: "exercise-2",
    index: "02",
    title: "Exercise 2",
    description: "Show tabs on desktop and accordion on mobile from data.json.",
    note: "Tabs on desktop, accordion on mobile.",
    cta: "Open page",
    path: "/exercise2",
    featured: false,
  },
];

function HomeCard({ cta, description, featured, index, note, path, title }) {
  return (
    <Link
      to={path}
      className={clsx(
        "home-card group flex flex-col min-h-[260px]",
        "p-6 md:min-h-[300px] md:p-8",
        "border transition duration-200",
        "hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-bg",
        featured
          ? "home-card--featured border-blue-bg bg-blue-bg text-white"
          : "border-card-border bg-white text-text-primary",
      )}
    >
      <div className="home-card__header flex items-start justify-between gap-4">
        <span
          className={clsx(
            "home-card__index font-sans text-xs font-bold tracking-[0.2em]",
            featured ? "text-white/70" : "text-text-muted",
          )}
        >
          {index}
        </span>

        <span
          className={clsx(
            "home-card__badge inline-flex border px-3 py-1",
            "type-home-card-badge font-sans font-bold uppercase tracking-[0.18em]",
            featured
              ? "border-white/30 text-white/80"
              : "border-border-light text-content-muted",
          )}
        >
          {featured ? "Main" : "Extra"}
        </span>
      </div>

      <h2 className="home-card__title type-home-card-title mt-10 font-sans font-bold tracking-[-0.04em]">
        {title}
      </h2>

      <p
        className={clsx(
          "home-card__description mt-4 max-w-[26rem]",
          "font-rb text-base leading-7",
          featured ? "text-white/80" : "text-content-body",
        )}
      >
        {description}
      </p>

      <p
        className={clsx(
          "home-card__note mt-3 font-rb text-sm",
          featured ? "text-white/55" : "text-content-muted",
        )}
      >
        {note}
      </p>

      <div className="home-card__footer mt-auto flex items-end justify-between gap-4 pt-10">
        <span
          className={clsx(
            "home-card__path font-sans text-xs font-bold tracking-[0.14em]",
            featured ? "text-white/55" : "text-text-muted",
          )}
        >
          {path}
        </span>

        <span
          className={clsx(
            "home-card__cta inline-flex items-center gap-2 border-b pb-1",
            "font-sans text-sm font-bold uppercase tracking-[0.12em]",
            featured
              ? "border-white text-white"
              : "border-text-frame2 text-text-frame2",
          )}
        >
          {cta}
          <span aria-hidden="true">+</span>
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="home min-h-screen bg-accordion-bg px-5 py-10 text-text-primary md:px-8 lg:px-10 lg:py-14">
      <div className="home__container mx-auto max-w-6xl border border-card-border bg-gray-bg">
        <div className="home__header border-b border-card-border p-6 md:p-8">
          <span className="home__eyebrow font-sans text-xs font-bold uppercase tracking-[0.24em] text-text-frame2">
            Frontend test
          </span>

          <h1 className="home__title type-home-page-title mt-6 max-w-3xl font-sans font-bold tracking-[-0.05em] text-text-primary">
            Frontend Assessment
          </h1>

          <p className="home__subtitle mt-5 max-w-2xl font-rb text-base leading-7 text-content-body sm:text-lg">
            This page is only a small entry screen. Each exercise is opened on
            its own route.
          </p>
        </div>

        <div className="home__body border-t border-card-border p-5 md:p-8">
          <div className="home__grid grid gap-4 lg:grid-cols-2 lg:gap-6">
            {exercises.map((exercise) => (
              <HomeCard key={exercise.id} {...exercise} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

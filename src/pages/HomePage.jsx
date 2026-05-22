import { Link } from "react-router-dom";

const exercises = [
  {
    id: "exercise-1",
    title: "Exercise 1",
    description: "Build a responsive page based on the design.",
    cta: "Exercise 1",
    path: "/exercise1",
    featured: true,
  },
  {
    id: "exercise-2",
    title: "Exercise 2",
    description: "Show tabs on desktop and accordion on mobile from data.json.",
    cta: "Exercise 2",
    path: "/exercise2",
    featured: false,
  },
];

function HomeCard({ cta, description, featured, path, title }) {
  return (
    <Link
      to={path}
      className={`group flex min-h-[360px] flex-col items-center rounded-[2rem] border bg-white px-8 py-10 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-frame2 sm:min-h-[390px] sm:px-10 sm:py-12 ${
        featured ? "border-text-frame2" : "border-border-light"
      }`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-bg">
        <div className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="h-0.5 w-6 rounded-full bg-text-frame2" />
          <span className="h-0.5 w-6 rounded-full bg-text-frame2" />
          <span className="h-0.5 w-6 rounded-full bg-text-frame2" />
        </div>
      </div>

      <h2 className="mt-8 font-pp text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">
        {title}
      </h2>

      <p className="mt-5 max-w-[26rem] font-rb text-lg leading-8 text-text-muted">
        {description}
      </p>

      <span className="mt-10 inline-flex items-center justify-center rounded-2xl border border-text-frame2 px-7 py-4 font-pp text-lg font-medium text-text-frame2 transition duration-200 group-hover:bg-text-frame2 group-hover:text-white">
        {cta}
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-bg px-6 py-16 text-text-primary md:px-10 lg:py-24">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col justify-center">
        <div className="text-center">
          <h1 className="font-pp text-[3rem] font-semibold tracking-[-0.05em] text-text-primary sm:text-[4.25rem] lg:text-[5rem]">
            Frontend Assessment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-rb text-lg leading-8 text-text-muted sm:text-xl">
            Welcome to the frontend assessment exercises
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {exercises.map((exercise) => (
            <HomeCard key={exercise.id} {...exercise} />
          ))}
        </div>
      </div>
    </main>
  );
}

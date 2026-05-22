import { Link } from "react-router-dom";

export default function BackToHomeButton() {
  return (
    <div className="fixed top-4 right-4 z-30 md:top-6 md:right-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white px-2 py-2 pr-4 font-pp text-sm font-medium text-blue-bg shadow-sm transition duration-200 hover:border-blue-bg hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-bg focus-visible:outline-offset-2"
        aria-label="Back to home"
      >
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-bg text-base leading-none text-blue-bg"
          aria-hidden="true"
        >
          &larr;
        </span>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}

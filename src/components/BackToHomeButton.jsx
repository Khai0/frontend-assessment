import { Link } from "react-router-dom";

export default function BackToHomeButton() {
  return (
    <div className="back-to-home fixed top-4 right-4 z-30 md:top-6 md:right-6">
      <Link
        to="/"
        className="back-to-home__link inline-flex items-center gap-2 w-auto rounded-full border border-border-light bg-white px-2 py-2 pr-4 font-pp font-medium text-sm text-blue-bg shadow-sm transition duration-200 hover:border-blue-bg hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-bg focus-visible:outline-offset-2"
      >
        <span
          className="back-to-home__icon inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-bg text-base leading-none text-blue-bg"
          aria-hidden="true"
        >
          &larr;
        </span>
        <span className="back-to-home__label">Back to Home</span>
      </Link>
    </div>
  );
}

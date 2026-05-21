import { useState, useEffect } from "react";

/**
 * useMediaQuery
 *
 * Subscribe and respond to CSS media query changes.
 * Leverages window.matchMedia API to provide real-time
 * responsiveness to viewport / screen-orientation changes.
 *
 * @param {string} query - A valid CSS media query string
 * @returns {boolean} - true if the query currently matches
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query) {
  if (typeof window === "undefined") {
    throw new Error("useMediaQuery can only be used in a browser environment.");
  }

  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Sync immediately in case query changed between render and effect
    setMatches(mediaQueryList.matches);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      // Safari < 14 fallback
      mediaQueryList.addListener(handleChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
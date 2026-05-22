import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  // Shared across tests — listeners holds callbacks registered via addEventListener,
  // matches controls what matchMedia.matches returns at any given moment
  let listeners = [];
  let matches = false;

  beforeEach(() => {
    listeners = [];
    matches = false;

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      // Getter (not a plain value) so that when tests mutate the outer `matches`
      // variable, the mock reflects the new value immediately — without this,
      // the mock would capture `false` at creation time and never update
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: vi.fn((event, callback) => {
        // Only intercept "change" — that's all the hook should ever register
        if (event === "change") {
          listeners.push(callback); // collect so tests can fire them manually
        }
      }),
      removeEventListener: vi.fn((event, callback) => {
        if (event === "change") {
          // Remove by reference so each hook instance only removes its own callback
          listeners = listeners.filter((cb) => cb !== callback);
        }
      }),
    }));
  });

  it("should return initial match value", () => {
    matches = true; // must be set BEFORE renderHook — the hook reads matches on mount

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("should update when media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => {
      matches = true;

      // Manually fire every captured listener to simulate the browser's
      // MediaQueryList dispatching a "change" event — the hook's callback
      // calls setState internally, so this must stay inside act() to flush
      // React's re-render before the assertion below runs
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);
  });

  it("should cleanup listener on unmount", () => {
    // Fresh spy isolated to this test — the beforeEach mock's removeEventListener
    // is shared and harder to assert on directly, so we override it here
    const removeEventListener = vi.fn();

    window.matchMedia = vi.fn().mockImplementation(() => ({
      get matches() {
        return matches;
      },
      addEventListener: vi.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    unmount(); // triggers the useEffect cleanup function inside the hook

    // Confirms the hook called removeEventListener (not just let the listener leak)
    expect(removeEventListener).toHaveBeenCalled();
  });
});

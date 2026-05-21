// useMediaQuery.test.js
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

// ─── Helper: create mock matchMedia ─────────────────────────────────────────
function createMatchMedia(matches) {
  const listeners = new Set();

  const mql = {
    matches,
    media: "",
    onchange: null,
    addEventListener: vi.fn((_, cb) => listeners.add(cb)),
    removeEventListener: vi.fn((_, cb) => listeners.delete(cb)),
    addListener: vi.fn((cb) => listeners.add(cb)),      // Safari fallback
    removeListener: vi.fn((cb) => listeners.delete(cb)), // Safari fallback
    dispatchEvent: vi.fn(),
    // Helper to trigger a change event from tests
    _trigger: (newMatches) => {
      mql.matches = newMatches;
      listeners.forEach((cb) => cb({ matches: newMatches }));
    },
  };

  return mql;
}

// ─── Setup / Teardown ────────────────────────────────────────────────────────
describe("useMediaQuery", () => {
  let mockMql;

  beforeEach(() => {
    mockMql = createMatchMedia(false);
    window.matchMedia = vi.fn(() => mockMql);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── 1. Initial value ──────────────────────────────────────────────────────
  describe("initial value", () => {
    it("returns false when query does not match", () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(false);
    });

    it("returns true when query matches on mount", () => {
      mockMql = createMatchMedia(true);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(true);
    });
  });

  // ─── 2. Responds to viewport changes ──────────────────────────────────────
  describe("responds to viewport changes", () => {
    it("updates to true when query starts matching", () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(false);

      act(() => mockMql._trigger(true));

      expect(result.current).toBe(true);
    });

    it("updates to false when query stops matching", () => {
      mockMql = createMatchMedia(true);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(true);

      act(() => mockMql._trigger(false));

      expect(result.current).toBe(false);
    });

    it("handles multiple resize events correctly", () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      act(() => mockMql._trigger(true));
      expect(result.current).toBe(true);

      act(() => mockMql._trigger(false));
      expect(result.current).toBe(false);

      act(() => mockMql._trigger(true));
      expect(result.current).toBe(true);
    });
  });

  // ─── 3. Event listener lifecycle ──────────────────────────────────────────
  describe("event listener lifecycle", () => {
    it("registers addEventListener on mount", () => {
      renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(mockMql.addEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });

    it("removes addEventListener on unmount (no memory leak)", () => {
      const { unmount } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      unmount();

      expect(mockMql.removeEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });

    it("does not update state after unmount", () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result, unmount } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      unmount();

      // Triggering after unmount should not throw or update state
      act(() => mockMql._trigger(true));

      expect(result.current).toBe(false); // retains last value before unmount
    });
  });

  // ─── 4. Safari fallback (addListener / removeListener) ────────────────────
  describe("Safari fallback (addListener / removeListener)", () => {
    beforeEach(() => {
      // Simulate old Safari: no addEventListener on mql
      mockMql = createMatchMedia(false);
      delete mockMql.addEventListener;
      delete mockMql.removeEventListener;
      window.matchMedia = vi.fn(() => mockMql);
    });

    it("uses addListener when addEventListener is unavailable", () => {
      renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(mockMql.addListener).toHaveBeenCalledWith(expect.any(Function));
    });

    it("uses removeListener on unmount", () => {
      const { unmount } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      unmount();

      expect(mockMql.removeListener).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });
  });

  // ─── 5. Query prop changes ─────────────────────────────────────────────────
  describe("query changes", () => {
    it("calls matchMedia again when query prop changes", () => {
      const { rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: "(min-width: 768px)" } }
      );

      expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");

      rerender({ query: "(min-width: 1024px)" });

      expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
    });

    it("removes old listener and registers a new one when query changes", () => {
      const { rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: "(min-width: 768px)" } }
      );

      const callsBefore = mockMql.addEventListener.mock.calls.length;

      rerender({ query: "(min-width: 1024px)" });

      // Old effect cleanup should remove the previous listener
      expect(mockMql.removeEventListener).toHaveBeenCalled();
      // New effect should register a fresh listener
      expect(mockMql.addEventListener.mock.calls.length).toBeGreaterThan(
        callsBefore
      );
    });
  });

  // ─── 6. Exercise 2 breakpoints ────────────────────────────────────────────
  describe("Exercise 2 breakpoints", () => {
    it('returns true for "(min-width: 768px)" on desktop → renders Tabs', () => {
      mockMql = createMatchMedia(true);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(true);
    });

    it('returns false for "(min-width: 768px)" on mobile → renders Accordion', () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(false);
    });

    it("switches from mobile to desktop layout on resize", () => {
      mockMql = createMatchMedia(false);
      window.matchMedia = vi.fn(() => mockMql);

      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px)")
      );

      expect(result.current).toBe(false);

      act(() => mockMql._trigger(true));

      expect(result.current).toBe(true);
    });
  });

  // ─── 7. SSR guard ─────────────────────────────────────────────────────────
  describe("SSR guard", () => {
    it("throws an error when window is undefined", () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      expect(() => {
        renderHook(() => useMediaQuery("(min-width: 768px)"));
      }).toThrow("useMediaQuery can only be used in a browser environment.");

      global.window = originalWindow;
    });
  });
});
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useBreakpoint } from "./useBreakpoint";

// ---------------------------------------------------------------------------
// Mock window.matchMedia
// ---------------------------------------------------------------------------

function createMql(matches) {
  const listeners = new Set();
  return {
    matches,
    addEventListener: vi.fn((_, cb) => listeners.add(cb)),
    removeEventListener: vi.fn((_, cb) => listeners.delete(cb)),
    // Helper to simulate a media query change
    _trigger(newMatches) {
      listeners.forEach((cb) => cb({ matches: newMatches }));
    },
  };
}

let mql;

beforeEach(() => {
  mql = createMql(false); // default: desktop (not mobile)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn(() => mql),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe("initial state", () => {
  it("returns isMobile=false and isDesktop=true on desktop viewport", () => {
    mql = createMql(false);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });

  it("returns isMobile=true and isDesktop=false on mobile viewport", () => {
    mql = createMql(true);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it("isDesktop is always the inverse of isMobile", () => {
    mql = createMql(true);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isDesktop).toBe(!result.current.isMobile);
  });
});

// ---------------------------------------------------------------------------
// matchMedia query string
// ---------------------------------------------------------------------------

describe("matchMedia setup", () => {
  it("calls matchMedia with the correct query (max-width: 1023px)", () => {
    const mockFn = vi.fn(() => mql);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: mockFn,
    });
    renderHook(() => useBreakpoint());
    expect(mockFn).toHaveBeenCalledWith("(max-width: 1023px)");
  });

  it("registers a change event listener on mount", () => {
    renderHook(() => useBreakpoint());
    expect(mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});

// ---------------------------------------------------------------------------
// Reactive updates
// ---------------------------------------------------------------------------

describe("reactive updates", () => {
  it("switches to mobile when viewport narrows below breakpoint", () => {
    mql = createMql(false); // start desktop
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(false);

    act(() => mql._trigger(true));
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it("switches back to desktop when viewport widens above breakpoint", () => {
    mql = createMql(true); // start mobile
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(true);

    act(() => mql._trigger(false));
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });

  it("handles multiple consecutive viewport changes", () => {
    mql = createMql(false);
    const { result } = renderHook(() => useBreakpoint());

    act(() => mql._trigger(true));
    expect(result.current.isMobile).toBe(true);

    act(() => mql._trigger(false));
    expect(result.current.isMobile).toBe(false);

    act(() => mql._trigger(true));
    expect(result.current.isMobile).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Cleanup on unmount
// ---------------------------------------------------------------------------

describe("cleanup", () => {
  it("removes the change event listener on unmount", () => {
    const { unmount } = renderHook(() => useBreakpoint());
    act(() => unmount());
    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("uses the same handler reference for add and remove", () => {
    const { unmount } = renderHook(() => useBreakpoint());

    const addedHandler = mql.addEventListener.mock.calls[0][1];
    act(() => unmount());
    const removedHandler = mql.removeEventListener.mock.calls[0][1];

    expect(addedHandler).toBe(removedHandler);
  });

  it("does not update state after unmount", () => {
    const { result, unmount } = renderHook(() => useBreakpoint());
    act(() => unmount());

    // Triggering after unmount should not throw
    expect(() => act(() => mql._trigger(true))).not.toThrow();
  });
});
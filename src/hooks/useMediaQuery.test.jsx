import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners = [];
  let matches = false;

  beforeEach(() => {
    listeners = [];
    matches = false;

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: vi.fn((event, callback) => {
        if (event === "change") {
          listeners.push(callback);
        }
      }),
      removeEventListener: vi.fn((event, callback) => {
        if (event === "change") {
          listeners = listeners.filter((cb) => cb !== callback);
        }
      }),
    }));
  });

  it("should return initial match value", () => {
    matches = true;

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("should update when media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => {
      matches = true;

      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);
  });

  it("should cleanup listener on unmount", () => {
    const removeEventListener = vi.fn();

    window.matchMedia = vi.fn().mockImplementation(() => ({
      get matches() {
        return matches;
      },
      addEventListener: vi.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});

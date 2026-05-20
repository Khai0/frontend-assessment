import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useSliderTransition } from "./useSliderTransition";

beforeEach(() => {
  let frameId = 0;
  vi.spyOn(global, "requestAnimationFrame").mockImplementation((cb) => {
    frameId++;
    cb(0);
    return frameId;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderSlider(initialIndex, slidesLength) {
  return renderHook(
    ({ current, len }) => useSliderTransition(current, len),
    { initialProps: { current: initialIndex, len: slidesLength } }
  );
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe("initial state", () => {
  it("returns renderIndex equal to the initial current", () => {
    const { result } = renderSlider(0, 5);
    expect(result.current.renderIndex).toBe(0);
  });

  it("starts with noTransition = false", () => {
    const { result } = renderSlider(0, 5);
    expect(result.current.noTransition).toBe(false);
  });

  it("exposes a handleTransitionEnd function", () => {
    const { result } = renderSlider(0, 5);
    expect(typeof result.current.handleTransitionEnd).toBe("function");
  });
});

// ---------------------------------------------------------------------------
// Normal (non-wrapping) navigation
// ---------------------------------------------------------------------------

describe("normal navigation", () => {
  it("updates renderIndex when moving forward within bounds", () => {
    const { result, rerender } = renderSlider(0, 5);

    act(() => rerender({ current: 1, len: 5 }));
    expect(result.current.renderIndex).toBe(1);
    expect(result.current.noTransition).toBe(false);
  });

  it("updates renderIndex when moving backward within bounds", () => {
    const { result, rerender } = renderSlider(3, 5);

    act(() => rerender({ current: 2, len: 5 }));
    expect(result.current.renderIndex).toBe(2);
    expect(result.current.noTransition).toBe(false);
  });

  it("tracks multiple sequential slides correctly", () => {
    const { result, rerender } = renderSlider(0, 5);

    [1, 2, 3].forEach((idx) => {
      act(() => rerender({ current: idx, len: 5 }));
      expect(result.current.renderIndex).toBe(idx);
    });
  });
});

// ---------------------------------------------------------------------------
// Infinite-loop wrap: forward (last → first)
// ---------------------------------------------------------------------------

describe("wrap forward: last → first", () => {
  it("sets renderIndex to slidesLength (clone) on wrap trigger", () => {
    const { result, rerender } = renderSlider(4, 5); // start at last index

    act(() => rerender({ current: 0, len: 5 }));
    expect(result.current.renderIndex).toBe(5); // slidesLength
  });

  it("snaps to real index 0 after handleTransitionEnd", () => {
    const { result, rerender } = renderSlider(4, 5);

    act(() => rerender({ current: 0, len: 5 }));
    expect(result.current.renderIndex).toBe(5);

    act(() => result.current.handleTransitionEnd());
    expect(result.current.renderIndex).toBe(0);
  });

  it("disables then re-enables transition during snap", () => {
    const { result, rerender } = renderSlider(4, 5);

    act(() => rerender({ current: 0, len: 5 }));
    act(() => result.current.handleTransitionEnd());

    // After double-rAF (mocked synchronously) transition should be restored
    expect(result.current.noTransition).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Infinite-loop wrap: backward (first → last)
// ---------------------------------------------------------------------------

describe("wrap backward: first → last", () => {
  it("sets renderIndex to -1 (clone) on wrap trigger", () => {
    const { result, rerender } = renderSlider(0, 5);

    act(() => rerender({ current: 4, len: 5 }));
    expect(result.current.renderIndex).toBe(-1);
  });

  it("snaps to real last index after handleTransitionEnd", () => {
    const { result, rerender } = renderSlider(0, 5);

    act(() => rerender({ current: 4, len: 5 }));
    expect(result.current.renderIndex).toBe(-1);

    act(() => result.current.handleTransitionEnd());
    expect(result.current.renderIndex).toBe(4); // lastIndex
  });

  it("disables then re-enables transition during snap", () => {
    const { result, rerender } = renderSlider(0, 5);

    act(() => rerender({ current: 4, len: 5 }));
    act(() => result.current.handleTransitionEnd());

    expect(result.current.noTransition).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Single-slide edge case (slidesLength <= 1)
// ---------------------------------------------------------------------------

describe("single slide (slidesLength <= 1)", () => {
  it("sets noTransition = true momentarily then restores it", () => {
    // With mocked synchronous rAF, noTransition ends as false
    const { result, rerender } = renderSlider(0, 1);

    act(() => rerender({ current: 0, len: 1 }));
    expect(result.current.noTransition).toBe(false);
  });

  it("handleTransitionEnd is a no-op for single slide", () => {
    const { result } = renderSlider(0, 1);
    // Should not throw and renderIndex stays 0
    act(() => result.current.handleTransitionEnd());
    expect(result.current.renderIndex).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// handleTransitionEnd: no-op when not in a wrap position
// ---------------------------------------------------------------------------

describe("handleTransitionEnd no-op on normal positions", () => {
  it("does nothing when renderIndex is a normal slide index", () => {
    const { result, rerender } = renderSlider(0, 5);

    act(() => rerender({ current: 2, len: 5 }));
    const before = result.current.renderIndex;

    act(() => result.current.handleTransitionEnd());
    expect(result.current.renderIndex).toBe(before);
  });
});

// ---------------------------------------------------------------------------
// wrapLock guard — prevents double-processing a wrap
// ---------------------------------------------------------------------------

describe("wrapLock guard", () => {
  it("does not re-trigger wrap logic after snap (wrapLock consumed)", () => {
    const { result, rerender } = renderSlider(4, 5);

    // Trigger forward wrap
    act(() => rerender({ current: 0, len: 5 }));
    expect(result.current.renderIndex).toBe(5);

    // Complete the wrap
    act(() => result.current.handleTransitionEnd());
    expect(result.current.renderIndex).toBe(0);

    // A subsequent normal forward navigation should NOT re-trigger a wrap
    act(() => rerender({ current: 1, len: 5 }));
    expect(result.current.renderIndex).toBe(1);
    expect(result.current.noTransition).toBe(false);
  });
});
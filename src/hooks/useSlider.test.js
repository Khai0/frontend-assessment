import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useSlider } from "./useSlider";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderSlider(total, options = {}) {
  return renderHook(({ t, o }) => useSlider(t, o), {
    initialProps: { t: total, o: options },
  });
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe("initial state", () => {
  it("starts at index 0", () => {
    const { result } = renderSlider(5);
    expect(result.current.current).toBe(0);
  });

  it("exposes prev, next, goTo functions", () => {
    const { result } = renderSlider(5);
    expect(typeof result.current.prev).toBe("function");
    expect(typeof result.current.next).toBe("function");
    expect(typeof result.current.goTo).toBe("function");
  });
});

// ---------------------------------------------------------------------------
// next()
// ---------------------------------------------------------------------------

describe("next()", () => {
  it("increments current by 1", () => {
    const { result } = renderSlider(5);
    act(() => result.current.next());
    expect(result.current.current).toBe(1);
  });

  it("wraps from last to first", () => {
    const { result } = renderSlider(3);
    act(() => result.current.goTo(2));
    act(() => result.current.next());
    expect(result.current.current).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// prev()
// ---------------------------------------------------------------------------

describe("prev()", () => {
  it("decrements current by 1", () => {
    const { result } = renderSlider(5);
    act(() => result.current.goTo(2));
    act(() => result.current.prev());
    expect(result.current.current).toBe(1);
  });

  it("wraps from first to last", () => {
    const { result } = renderSlider(3);
    act(() => result.current.prev());
    expect(result.current.current).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// goTo()
// ---------------------------------------------------------------------------

describe("goTo()", () => {
  it("jumps to a specific index", () => {
    const { result } = renderSlider(5);
    act(() => result.current.goTo(4));
    expect(result.current.current).toBe(4);
  });

  it("can jump to index 0", () => {
    const { result } = renderSlider(5);
    act(() => result.current.goTo(3));
    act(() => result.current.goTo(0));
    expect(result.current.current).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// autoPlay
// ---------------------------------------------------------------------------

describe("autoPlay", () => {
  it("auto-advances after interval", () => {
    const { result } = renderSlider(3, { autoPlay: true, interval: 1000 });
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.current).toBe(1);
  });

  it("wraps around when auto-advancing from last slide", () => {
    const { result } = renderSlider(3, { autoPlay: true, interval: 1000 });
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.current).toBe(0);
  });

  it("does not auto-advance when autoPlay = false", () => {
    const { result } = renderSlider(3, { autoPlay: false });
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.current).toBe(0);
  });

  it("does not start timer when total <= 1", () => {
    const { result } = renderSlider(1, { autoPlay: true, interval: 1000 });
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.current).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Timer reset on user interaction
// ---------------------------------------------------------------------------

describe("timer reset on interaction", () => {
  it("next() resets the auto-play timer", () => {
    const { result } = renderSlider(5, { autoPlay: true, interval: 1000 });

    // Advance 800ms then call next()
    act(() => vi.advanceTimersByTime(800));
    act(() => result.current.next());

    // Only 200ms more — should NOT auto-advance yet (timer was reset)
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.current).toBe(1); // still at 1, not 2

    // Full interval after reset — now it advances
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.current).toBe(2);
  });

  it("prev() resets the auto-play timer", () => {
    const { result } = renderSlider(5, { autoPlay: true, interval: 1000 });

    act(() => result.current.goTo(2));
    act(() => vi.advanceTimersByTime(800));
    act(() => result.current.prev());

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.current).toBe(1);

    act(() => vi.advanceTimersByTime(800));
    expect(result.current.current).toBe(2);
  });

  it("goTo() resets the auto-play timer", () => {
    const { result } = renderSlider(5, { autoPlay: true, interval: 1000 });

    act(() => vi.advanceTimersByTime(800));
    act(() => result.current.goTo(3));

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.current).toBe(3);

    act(() => vi.advanceTimersByTime(800));
    expect(result.current.current).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// Cleanup on unmount
// ---------------------------------------------------------------------------

describe("cleanup", () => {
  it("clears the timer on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");
    const { unmount } = renderSlider(3, { autoPlay: true, interval: 1000 });

    act(() => unmount());
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
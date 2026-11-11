"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import type { InfographicSlide } from "@/data/content";
import { ChevronLeft, ChevronRight, CloseIcon, ExpandIcon } from "@/components/Icons";

type InfographicCarouselProps = {
  title: string;
  slides: InfographicSlide[];
  width: number;
  height: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * An accessible slide carousel for the eight-panel infographic.
 *
 * The track is a native horizontal scroller with scroll-snap, so touch swipe, trackpad scrolling and momentum all
 * come from the browser. Arrows, page indicators and the keyboard (when the track is focused) move it one slide at a
 * time. No autoplay. "Enlarge" opens the current slide in a dialog with the same controls.
 */
export default function InfographicCarousel({ title, slides, width, height }: InfographicCarouselProps) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [near, setNear] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  indexRef.current = index;
  // While a button or key scrolls the track, the slide it is heading to. Scroll positions passed on the way there
  // must not move the counter back (a smooth scroll from slide 1 to 2 passes through "still slide 1").
  const targetRef = useRef<number | null>(null);

  const scrollToSlide = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const left = i * track.clientWidth;
    const animate = smooth && !prefersReducedMotion() && Math.abs(track.scrollLeft - left) > 2;
    // Only an animated scroll passes through other slides on its way. An instant jump (or one to where the track
    // already is) fires no in-between scroll events, so it must not leave a target behind to be cleared.
    targetRef.current = animate ? i : null;
    track.scrollTo({ left, behavior: animate ? "smooth" : "auto" });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(total - 1, i));
      setIndex(next);
      scrollToSlide(next);
    },
    [scrollToSlide, total]
  );

  // Keep the index in step with swipes and trackpad scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth;
        if (!width) return;
        const target = targetRef.current;
        if (target !== null) {
          if (Math.abs(track.scrollLeft - target * width) > 2) return;
          targetRef.current = null;
        }
        const i = Math.max(0, Math.min(total - 1, Math.round(track.scrollLeft / width)));
        setIndex((current) => (current === i ? current : i));
      });
    };
    // A touch, wheel or trackpad gesture takes over from any button-driven scroll.
    const release = () => {
      targetRef.current = null;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", release, { passive: true });
    track.addEventListener("touchstart", release, { passive: true });
    track.addEventListener("wheel", release, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", release);
      track.removeEventListener("touchstart", release);
      track.removeEventListener("wheel", release);
    };
  }, [total]);

  // A resize changes the slide width; stay on the same slide.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => scrollToSlide(indexRef.current, false));
    observer.observe(track);
    return () => observer.disconnect();
  }, [scrollToSlide]);

  // Start loading the current and neighbouring slides only once the carousel is close to the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Tapping or clicking a slide opens it enlarged. A swipe never produces a click, and a tap that only stops a
  // slide still moving (or lands mid-way between two slides) is ignored.
  const onTrackClick = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth || targetRef.current !== null) return;
    const exact = track.scrollLeft / track.clientWidth;
    const i = Math.round(exact);
    if (Math.abs(exact - i) > 0.02) return;
    setIndex(i);
    setEnlarged(true);
  };

  const onTrackKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setEnlarged(true);
      return;
    }
    const from = targetRef.current ?? index;
    const moves: Record<string, number> = { ArrowRight: from + 1, ArrowLeft: from - 1, Home: 0, End: total - 1 };
    if (e.key in moves) {
      e.preventDefault();
      goTo(moves[e.key]);
    }
  };

  const closeEnlarged = useCallback(() => {
    setEnlarged(false);
    scrollToSlide(indexRef.current, false);
  }, [scrollToSlide]);

  // From sm up the arrows sit just outside the frame, so they never cover the slide. On phones there is no room
  // beside it, so they move into the indicator row underneath instead.
  const arrowClass =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink/85 text-paper backdrop-blur transition-colors hover:text-accent-fg disabled:pointer-events-none disabled:opacity-0 sm:flex";
  const rowArrowClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:text-accent-fg disabled:opacity-30 sm:hidden";

  return (
    <div ref={rootRef} className="w-full">
      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title}, ${total}-panel infographic. Use the left and right arrow keys to change slides, and Enter to enlarge.`}
          tabIndex={0}
          onKeyDown={onTrackKeyDown}
          onClick={onTrackClick}
          title="Click to enlarge"
          className="no-scrollbar flex cursor-zoom-in snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-line-strong bg-ink-800 shadow-[0_30px_80px_-30px_var(--frame-shadow)]"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={i !== index}
              className="w-full shrink-0 snap-center snap-always"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={width}
                height={height}
                quality={90}
                loading={near && Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                sizes="(min-width: 640px) 448px, calc(100vw - 5rem)"
                className="block h-auto w-full select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className={`${arrowClass} -left-12`}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          aria-label="Next slide"
          className={`${arrowClass} -right-12`}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="font-mono text-xs text-paper-muted" aria-live="polite" aria-atomic="true">
          <span aria-hidden>
            <span className="text-paper">{pad(index + 1)}</span>/{pad(total)}
          </span>
          <span className="sr-only">
            Slide {index + 1} of {total}
          </span>
        </p>

        <div className="order-last flex w-full items-center justify-between gap-2 sm:order-none sm:w-auto">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className={rowArrowClass}
          >
            <ChevronLeft />
          </button>
          <div className="flex items-center" role="group" aria-label="Choose a slide">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="group/dot flex h-7 w-6 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ${
                    i === index ? "w-4 bg-accent" : "w-1.5 bg-paper/25 group-hover/dot:bg-paper/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Next slide"
            className={rowArrowClass}
          >
            <ChevronRight />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label="Enlarge"
          title="Enlarge"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-paper-muted transition-colors hover:text-paper"
        >
          <ExpandIcon className="h-4 w-4" />
        </button>
      </div>

      {enlarged && (
        <EnlargedSlides
          title={title}
          slides={slides}
          width={width}
          height={height}
          index={index}
          onChange={(i) => setIndex(Math.max(0, Math.min(total - 1, i)))}
          onClose={closeEnlarged}
        />
      )}
    </div>
  );
}

function EnlargedSlides({
  title,
  slides,
  width,
  height,
  index,
  onChange,
  onClose,
}: InfographicCarouselProps & { index: number; onChange: (i: number) => void; onClose: () => void }) {
  const total = slides.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        onChange(indexRef.current + (e.key === "ArrowRight" ? 1 : -1));
      } else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        if (!dialogRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          focusable[0].focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onChange, onClose]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    const end = e.changedTouches[0]?.clientX;
    if (start === null || end === undefined || Math.abs(end - start) < 40) return;
    onChange(index + (end < start ? 1 : -1));
  };

  const slide = slides[index];
  const navClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink-800 text-paper transition-colors hover:text-accent-fg disabled:opacity-30 disabled:hover:text-paper";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, enlarged`}
      className="fixed inset-0 z-[100] flex animate-fade-in flex-col bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="font-mono text-xs text-paper-muted" aria-live="polite" aria-atomic="true">
          <span aria-hidden>
            <span className="text-paper">{pad(index + 1)}</span>/{pad(total)}
          </span>
          <span className="sr-only">
            Slide {index + 1} of {total}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-800 text-paper transition-colors hover:text-accent-fg"
          aria-label="Close enlarged infographic"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-2 pb-4 sm:gap-6 sm:px-6 sm:pb-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(index - 1);
          }}
          disabled={index === 0}
          aria-label="Previous slide"
          className={`${navClass} hidden sm:flex`}
        >
          <ChevronLeft />
        </button>

        <div
          className="flex min-w-0 flex-1 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={width}
            height={height}
            quality={90}
            priority
            sizes="(orientation: landscape) 75vh, 100vw"
            className="h-auto w-[min(100%,calc((100dvh_-_10rem)*0.8))] rounded-lg shadow-2xl sm:w-[min(100%,calc((100dvh_-_7rem)*0.8))]"
            draggable={false}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(index + 1);
          }}
          disabled={index === total - 1}
          aria-label="Next slide"
          className={`${navClass} hidden sm:flex`}
        >
          <ChevronRight />
        </button>
      </div>

      {/* On phones the arrows sit under the slide so they never cover it. */}
      <div className="flex justify-center gap-4 pb-6 sm:hidden" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => onChange(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className={navClass}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => onChange(index + 1)}
          disabled={index === total - 1}
          aria-label="Next slide"
          className={navClass}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

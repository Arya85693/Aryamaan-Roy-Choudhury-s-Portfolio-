"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 800;

/** Splits "~30 min" into "~", 30 and " min"; "13,846" keeps its comma grouping when redrawn. */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return { prefix, suffix, target: Number(digits.replace(/,/g, "")), decimals, grouped: digits.includes(",") };
}

/**
 * A stat that counts up from zero the first time it scrolls into view. The server renders the final value, so
 * without JS (or with reduced motion) it just shows the number; screen readers always get the final value.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const parsed = parse(value);
    const el = ref.current;
    if (!parsed || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, suffix, target, decimals, grouped } = parsed;
    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      }) +
      suffix;

    setShown(format(0));
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(t < 1 ? format(target * eased) : value);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

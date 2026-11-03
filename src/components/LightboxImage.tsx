"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon, ExpandIcon } from "@/components/Icons";

type LightboxImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function LightboxImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") {
        e.preventDefault();
        if (e.key === "Escape") setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group/lb relative block h-full w-full cursor-zoom-in overflow-hidden text-left"
        aria-label={`Expand image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={`transition-transform duration-500 ease-out motion-safe:group-hover/lb:scale-[1.02] ${className ?? ""}`}
        />
        <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-paper opacity-0 ring-1 ring-line-strong backdrop-blur transition-opacity duration-200 group-hover/lb:opacity-100 group-focus-visible/lb:opacity-100">
          <ExpandIcon className="h-3.5 w-3.5" />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-800 text-paper transition-colors hover:text-accent"
            aria-label="Close expanded image"
          >
            <CloseIcon />
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="h-auto max-h-[88vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

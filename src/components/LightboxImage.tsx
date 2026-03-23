"use client";

import { useState } from "react";
import Image from "next/image";

type LightboxImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function LightboxImage({
  src,
  alt,
  width,
  height,
  className,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full h-full text-left"
        aria-label={`Expand image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative mx-auto h-full w-full max-w-6xl flex items-center justify-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 text-slate-200 hover:text-blue-400 transition-colors text-2xl leading-none"
              aria-label="Close expanded image"
            >
              ×
            </button>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-h-[88vh] w-auto h-auto rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

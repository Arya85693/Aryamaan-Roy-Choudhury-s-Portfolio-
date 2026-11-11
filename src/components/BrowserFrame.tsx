import LightboxImage from "@/components/LightboxImage";
import type { ImageAsset } from "@/data/content";

type BrowserFrameProps = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** A screenshot with a thin border and rounded corners (no fake browser chrome). */
export default function BrowserFrame({ image, className = "", sizes, priority }: BrowserFrameProps) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line-strong bg-ink-800 shadow-[0_24px_60px_-30px_var(--frame-shadow)] ${className}`}
    >
      <LightboxImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </figure>
  );
}

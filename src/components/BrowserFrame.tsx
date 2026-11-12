import LightboxImage from "@/components/LightboxImage";
import type { ImageAsset } from "@/data/content";

type BrowserFrameProps = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** A screenshot with a thin square border (no fake browser chrome, no shadow). */
export default function BrowserFrame({ image, className = "", sizes, priority }: BrowserFrameProps) {
  return (
    <figure
      className={`overflow-hidden border border-line-strong bg-ink-800 ${className}`}
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

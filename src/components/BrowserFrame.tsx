import LightboxImage from "@/components/LightboxImage";
import type { ImageAsset } from "@/data/content";

type BrowserFrameProps = {
  image: ImageAsset;
  url?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function BrowserFrame({ image, url, className = "", sizes, priority }: BrowserFrameProps) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line-strong bg-ink-800 shadow-[0_30px_80px_-30px_var(--frame-shadow)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </span>
        {url && (
          <span className="ml-2 truncate rounded-md bg-ink-700 px-2.5 py-0.5 font-mono text-[0.68rem] text-paper-dim">
            {url}
          </span>
        )}
      </div>
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

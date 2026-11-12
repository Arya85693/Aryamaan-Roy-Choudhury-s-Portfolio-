import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  id: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

/**
 * Every section opens on a heavy rule: the title on the left of the grid, the intro beside it.
 * On first scroll into view the rule draws from the left and the title rises out of its mask
 * (styles in globals.css under .reveal-heading).
 */
export default function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="reveal-heading mb-12 md:mb-16">
      <div aria-hidden className="reveal-rule h-0.5 bg-paper" />
      <div className="grid gap-4 pt-5 lg:grid-cols-12 lg:gap-8">
        {/* The padding gives descenders room inside the mask; the negative margin cancels it in the layout. */}
        <h2
          id={id}
          className="-mb-[0.12em] overflow-hidden pb-[0.12em] font-display text-4xl font-bold leading-[0.95] tracking-tightest text-paper sm:text-6xl lg:col-span-7"
        >
          <span className="reveal-title block">{title}</span>
        </h2>
        {intro && (
          <p className="reveal-intro max-w-xl text-base leading-relaxed text-paper-muted lg:col-span-5 lg:pt-2">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

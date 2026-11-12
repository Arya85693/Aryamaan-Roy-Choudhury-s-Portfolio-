import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  id: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

/** Every section opens on a heavy rule: the title on the left of the grid, the intro beside it. */
export default function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 grid gap-4 border-t-2 border-paper pt-5 md:mb-16 lg:grid-cols-12 lg:gap-8">
      <h2
        id={id}
        className="font-display text-4xl font-bold leading-[0.95] tracking-tightest text-paper sm:text-6xl lg:col-span-7"
      >
        {title}
      </h2>
      {intro && (
        <p className="max-w-xl text-base leading-relaxed text-paper-muted lg:col-span-5 lg:pt-2">{intro}</p>
      )}
    </Reveal>
  );
}

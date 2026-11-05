import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  id: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

export default function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl text-base leading-relaxed text-paper-muted">{intro}</p>}
    </Reveal>
  );
}

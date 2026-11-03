import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

export default function SectionHeading({ id, index, label, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {label}
        </p>
        <h2 id={id} className="mt-5 font-display text-4xl font-semibold tracking-tightest text-paper sm:text-5xl">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="max-w-md text-base leading-relaxed text-paper-muted md:col-span-5 md:justify-self-end">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

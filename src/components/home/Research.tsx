import Image from "next/image";
import { infographic, researchCourse, researchPaper } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StackList from "@/components/StackList";
import InfographicCarousel from "@/components/InfographicCarousel";
import { ArrowDown, ArrowUp, ArrowUpRight, FileIcon } from "@/components/Icons";

function Meta({ label, category }: { label: string; category: string }) {
  return (
    <p className="text-sm text-paper-dim">
      <span className="font-mono text-xs text-accent">{label}</span>
      <span aria-hidden> · </span>
      {category}
    </p>
  );
}

function PaperCard() {
  const { preview } = researchPaper;
  return (
    <Reveal
      as="article"
      id={researchPaper.id}
      aria-labelledby={`${researchPaper.id}-title`}
      className="card scroll-mt-24 overflow-hidden"
    >
      <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="flex flex-col lg:col-span-7">
          <Meta label={researchPaper.label} category={researchPaper.category} />
          <h3
            id={`${researchPaper.id}-title`}
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl"
          >
            {researchPaper.title}
          </h3>
          <p className="mt-3 font-serif text-lg italic text-paper">“{researchPaper.fullTitle}”</p>
          <p className="mt-5 leading-relaxed text-paper-muted">{researchPaper.description}</p>

          <dl className="mt-8 grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
            {researchPaper.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse justify-end px-3 py-4 sm:px-5">
                <dt className="mt-1 text-xs leading-snug text-paper-dim">{fact.label}</dt>
                <dd className="font-display text-xl font-semibold text-paper sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <StackList items={researchPaper.skills} label="Skills" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <a href={researchPaper.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FileIcon /> Read Research Paper <ArrowUpRight />
            </a>
            <a href={`#${infographic.id}`} className="btn-ghost">
              See the infographic version <ArrowDown />
            </a>
          </div>
        </div>

        {/* A preview of the paper's first page; the button opens the complete original PDF. */}
        <div className="lg:col-span-5">
          <a
            href={researchPaper.pdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the full research paper (PDF, opens in a new tab)"
            className="group relative block overflow-hidden rounded-xl border border-line-strong bg-ink-800 p-4 transition-colors hover:border-paper/30 sm:p-6"
          >
            <div className="relative aspect-[10/11] overflow-hidden rounded-md bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
              <Image
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                quality={90}
                sizes="(min-width: 1024px) 420px, 92vw"
                className="h-full w-full object-cover object-top"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/85 to-transparent"
              />
            </div>
            <span className="mt-4 flex items-center justify-between gap-3 text-xs text-paper-dim">
              <span className="font-mono">PDF · 6 pages</span>
              <span className="inline-flex items-center gap-1 text-paper-muted transition-colors group-hover:text-paper">
                Open full paper <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function InfographicCard() {
  return (
    <Reveal
      as="article"
      id={infographic.id}
      aria-labelledby={`${infographic.id}-title`}
      className="card scroll-mt-24 overflow-hidden"
    >
      <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="mx-auto w-full max-w-[28rem] lg:col-span-5 lg:max-w-none">
          <InfographicCarousel
            title={infographic.title}
            slides={infographic.slides}
            width={infographic.width}
            height={infographic.height}
          />
        </div>

        <div className="flex flex-col lg:col-span-7">
          <Meta label={infographic.label} category={infographic.category} />
          <h3
            id={`${infographic.id}-title`}
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl"
          >
            {infographic.title}
          </h3>
          <p className="mt-3 text-sm text-paper-dim">
            Adapted from{" "}
            <a href={`#${researchPaper.id}`} className="link-underline text-paper-muted hover:text-paper">
              {researchPaper.label}: {researchPaper.title}
            </a>
          </p>
          <p className="mt-5 leading-relaxed text-paper-muted">{infographic.description}</p>

          <div className="mt-8">
            <StackList items={infographic.skills} label="Skills" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <a href={`#${researchPaper.id}`} className="btn-ghost">
              <ArrowUp /> See the original research paper
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="research-heading"
          title="Research & Technical Communication"
          intro={`Coursework from ${researchCourse}: an academic research paper, and the same research adapted for athletes and coaches.`}
        />

        <PaperCard />

        <Reveal className="flex items-center gap-4 py-6">
          <span aria-hidden className="h-px flex-1 bg-line" />
          <p className="flex items-center gap-2 text-center text-sm text-paper-muted">
            <ArrowDown className="h-3.5 w-3.5 shrink-0 text-accent" />
            From academic research to public communication
          </p>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </Reveal>

        <InfographicCard />
      </div>
    </section>
  );
}

import { infographic, researchCourse, researchPaper } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StackList from "@/components/StackList";
import InfographicCarousel from "@/components/InfographicCarousel";
import { ArrowUp, ArrowUpRight, FileIcon } from "@/components/Icons";

// The infographic is the main piece; the paper it adapts is linked from the bar at the bottom of the card.
const skills = Array.from(new Set([...infographic.skills, ...researchPaper.skills]));

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="research-heading"
          title="Research & Technical Communication"
          intro={`Coursework from ${researchCourse}: academic research on wearable sports technology, adapted for athletes and coaches.`}
        />

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
              <p className="text-sm text-paper-dim">{infographic.category}</p>
              <h3
                id={`${infographic.id}-title`}
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl"
              >
                {infographic.title}
              </h3>

              <figure className="mt-6 border-l-2 border-accent pl-4">
                <figcaption className="eyebrow">Research question</figcaption>
                <blockquote className="mt-2 font-serif text-xl italic leading-snug text-paper">
                  {researchPaper.researchQuestion}
                </blockquote>
              </figure>

              <p className="mt-6 leading-relaxed text-paper-muted">{infographic.description}</p>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-paper-muted">
                <span className="font-medium text-paper">What the research found: </span>
                {researchPaper.finding}
              </p>

              <div className="mt-8">
                <StackList items={skills} label="Skills" />
              </div>
            </div>
          </div>

          {/* The source paper, as a slim bar at the bottom of the card. */}
          <div className="border-t border-line bg-ink-800/40 px-5 py-6 sm:px-8 lg:px-12">
            <p className="flex items-center gap-2 text-xs text-paper-dim">
              <ArrowUp className="h-3.5 w-3.5 text-accent" />
              From academic research to public communication
            </p>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm text-paper-muted">Based on the research paper</p>
                <p className="mt-1 font-serif text-lg italic leading-snug text-paper">{researchPaper.title}</p>
                <p className="mt-2 font-mono text-xs text-paper-dim">{researchPaper.meta.join(" · ")}</p>
              </div>
              <a
                href={researchPaper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0 self-start sm:self-auto"
              >
                <FileIcon /> Read Research Paper <ArrowUpRight />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { infographic, profile, researchCourse, researchPaper } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StackList from "@/components/StackList";
import ImageCarousel from "@/components/ImageCarousel";
import { ArrowUp, ArrowUpRight, FileIcon } from "@/components/Icons";

// A supporting piece, so it gets a compact card: the carousel on one side, the research question,
// finding, and paper link on the other. Five tags; the Skills section has the full list.
const skills = ["Scientific Communication", "Data Visualization", "Technical Writing", "Research Synthesis", "Datawrapper"];

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
          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
            <div className="mx-auto w-full max-w-[24rem] sm:px-12 lg:col-span-5 lg:max-w-none">
              <ImageCarousel
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
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl"
              >
                {infographic.title}
              </h3>

              <figure className="mt-5 border-l-2 border-accent pl-4">
                <figcaption className="eyebrow">My research question</figcaption>
                <blockquote className="mt-2 font-serif text-xl italic leading-snug text-paper">
                  {researchPaper.researchQuestion}
                </blockquote>
              </figure>

              <p className="mt-5 text-[0.95rem] leading-relaxed text-paper-muted">{infographic.description}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper-muted">
                <span className="font-medium text-paper">What my research found: </span>
                {researchPaper.finding}
              </p>

              <div className="mt-6">
                <StackList items={skills} label="Skills" />
              </div>

              {/* The source paper. */}
              <div className="mt-8 border-t border-line pt-6">
                <p className="flex items-center gap-2 text-xs text-paper-dim">
                  <ArrowUp className="h-3.5 w-3.5 text-secondary" />
                  From academic research to public communication
                </p>
                <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-paper-muted">Based on my research paper</p>
                    <p className="mt-1 font-serif text-lg italic leading-snug text-paper">{researchPaper.title}</p>
                    <p className="mt-1.5 text-sm text-paper-muted">
                      Written by <span className="text-paper">{profile.name}</span>
                      <span className="text-paper-dim"> · {researchPaper.meta.join(" · ")}</span>
                    </p>
                  </div>
                  <a
                    href={researchPaper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary shrink-0 self-start lg:self-auto"
                  >
                    <FileIcon /> Read Research Paper <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { experience } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrowserFrame from "@/components/BrowserFrame";
import StackList from "@/components/StackList";
import { ArrowUpRight } from "@/components/Icons";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line bg-ink-850/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="experience-heading"
          index="02"
          label="Experience"
          title="Where I’ve worked"
          intro="Internships across software engineering and investment analysis: shipping product features, owning a production website end to end, and modeling portfolio risk."
        />

        <ol className="border-t border-line">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 40} className="border-b border-line py-10 sm:py-12">
              <article className="grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs text-paper">{job.period}</p>
                  <p className="mt-1.5 text-sm text-paper-dim">{job.location}</p>
                </div>

                <div className={job.image ? "md:col-span-9 lg:col-span-5" : "md:col-span-9 lg:col-span-7"}>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-paper">
                    {job.role}
                    <span className="text-paper-dim"> · </span>
                    <span className="text-accent">{job.company}</span>
                  </h3>
                  <p className="mt-2 text-paper-muted">{job.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-paper-muted">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-paper/30" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {job.note && <p className="mt-4 text-sm italic text-paper-dim">{job.note}</p>}
                  {(job.stack || job.link) && (
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {job.stack && <StackList items={job.stack} label={`${job.company} tools`} />}
                      {job.link && (
                        <a
                          href={job.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors hover:text-accent"
                        >
                          {job.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {job.image && (
                  <div className="md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-auto">
                    <BrowserFrame
                      image={job.image}
                      url="strat-edge-africa-website.vercel.app"
                      sizes="(min-width: 1024px) 380px, 100vw"
                    />
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

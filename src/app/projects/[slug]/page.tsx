import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeRequestHref, projects } from "@/data/content";
import BrowserFrame from "@/components/BrowserFrame";
import StackList from "@/components/StackList";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const liveHost = (url: string) => new URL(url).host.replace(/^www\./, "");

// One image fills the row; two sit side by side (wide + narrow); three or more put the first
// full width with the rest in pairs beneath it.
function imageSpan(count: number, i: number) {
  if (count === 1) return "lg:col-span-12";
  if (count === 2) return i === 0 ? "lg:col-span-7" : "lg:col-span-5";
  return i === 0 ? "lg:col-span-12" : "lg:col-span-6";
}

function imageSizes(count: number, i: number) {
  if (count === 1 || (count > 2 && i === 0)) return "(min-width: 1024px) 1200px, 100vw";
  if (count === 2 && i === 0) return "(min-width: 1024px) 760px, 100vw";
  return count === 2 ? "(min-width: 1024px) 460px, 100vw" : "(min-width: 1024px) 600px, 100vw";
}

export default function ProjectPage({ params }: Params) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const { caseStudy } = project;

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-paper-muted transition-colors hover:text-paper"
        >
          <ArrowLeft /> All work
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="animate-fade-up lg:col-span-8">
            <p className="eyebrow">{project.kind}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1] tracking-tightest text-paper">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-paper-muted">{project.summary}</p>
          </div>

          <dl className="grid animate-fade-up grid-cols-2 gap-6 self-end text-sm [animation-delay:120ms] lg:col-span-4 lg:grid-cols-1">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-2 text-paper">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Timeline</dt>
              <dd className="mt-2 text-paper">{project.period}</dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-3">
                <StackList items={project.stack} />
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:180ms]">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Visit {liveHost(project.live)} <ArrowUpRight />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <GitHubIcon /> View repository
            </a>
          )}
          {project.codeOnRequest && (
            <a href={codeRequestHref(project.title)} className="btn-ghost">
              <GitHubIcon /> Code available on request
            </a>
          )}
        </div>

        {project.images.length > 0 && (
          <div className="mt-16 animate-fade-up [animation-delay:240ms]">
            <div className="grid items-start gap-6 lg:grid-cols-12">
              {project.images.map((image, i) => (
                <BrowserFrame
                  key={image.src}
                  image={image}
                  url={image.frameUrl ?? (project.live ? liveHost(project.live) : undefined)}
                  priority={i === 0}
                  sizes={imageSizes(project.images.length, i)}
                  className={imageSpan(project.images.length, i)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Highlights</p>
              <ul className="mt-6 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-paper-muted">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-secondary" />
                    {h}
                  </li>
                ))}
              </ul>
              {project.facts && (
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {project.facts.map((f) => (
                    <div key={f.label} className="flex flex-col-reverse justify-end">
                      <dt className="mt-1 text-xs text-paper-dim">{f.label}</dt>
                      <dd className="font-display text-xl font-semibold text-paper">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </aside>

          <div className="space-y-16 lg:col-span-7 lg:col-start-6">
            <Reveal as="section" aria-labelledby="problem-heading">
              <h2 id="problem-heading" className="font-display text-2xl font-semibold tracking-tight text-paper">
                The problem
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-paper-muted">{caseStudy.problem}</p>
            </Reveal>

            {caseStudy.sections.map((section, i) => (
              <Reveal as="section" key={section.title} aria-labelledby={`section-${i}`}>
                <h2
                  id={`section-${i}`}
                  className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight text-paper"
                >
                  <span className="font-mono text-xs text-accent-fg">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                {section.body && <p className="mt-4 leading-relaxed text-paper-muted">{section.body}</p>}
                {section.points && (
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-paper-muted">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-paper/30" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}

            {caseStudy.sampleOutput && (
              <Reveal as="section" aria-labelledby="output-heading">
                <h2 id="output-heading" className="font-display text-2xl font-semibold tracking-tight text-paper">
                  {caseStudy.sampleOutput.title ?? "Sample output"}
                </h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[30rem] text-left font-mono text-sm">
                    <caption className="border-b border-line px-4 py-3 text-left text-xs text-paper-dim">
                      {caseStudy.sampleOutput.caption}
                    </caption>
                    <thead>
                      <tr className="border-b border-line text-xs text-paper-dim">
                        {caseStudy.sampleOutput.columns.map((c) => (
                          <th key={c} scope="col" className="px-4 py-2.5 font-normal">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudy.sampleOutput.rows.map((row) => (
                        <tr key={row[0]} className="border-b border-line last:border-0">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-2.5 ${j === row.length - 1 ? "text-accent-fg" : "text-paper"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {caseStudy.notes && (
              <Reveal as="aside" className="rounded-xl border border-line bg-ink-850 p-5 text-sm leading-relaxed text-paper-muted">
                <span className="font-medium text-paper">Note: </span>
                {caseStudy.notes}
              </Reveal>
            )}
          </div>
        </div>

        <nav aria-label="Next project" className="mt-28 border-t border-line pt-10">
          <Link href={`/projects/${next.slug}`} className="group block">
            <p className="eyebrow">Next project</p>
            <p className="mt-4 flex items-center gap-4 font-display text-3xl font-semibold tracking-tight text-paper transition-colors group-hover:text-accent-fg sm:text-5xl">
              {next.title}
              <ArrowRight className="h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </nav>
      </div>
    </article>
  );
}

import Link from "next/link";
import { codeRequestHref, projects, type Project } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrowserFrame from "@/components/BrowserFrame";
import StackList from "@/components/StackList";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Live site <ArrowUpRight />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          aria-label={`${project.title} on GitHub`}
        >
          <GitHubIcon /> GitHub
        </a>
      )}
      <Link href={`/projects/${project.slug}`} className="btn-ghost">
        Case study <ArrowRight />
      </Link>
      {project.codeOnRequest && (
        <a href={codeRequestHref(project.title)} className="btn-ghost">
          <GitHubIcon /> Code on request
        </a>
      )}
    </div>
  );
}

function FactGrid({ facts, className = "" }: { facts: NonNullable<Project["facts"]>; className?: string }) {
  return (
    <dl className={`grid-cols-3 divide-x divide-line rounded-xl border border-line ${className}`}>
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col-reverse justify-end px-3 py-4 sm:px-5 sm:py-5">
          <dt className="mt-1 text-xs leading-snug text-paper-dim">{fact.label}</dt>
          <dd className="font-display text-xl font-semibold text-paper sm:text-3xl">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FeaturedProject({ project, flip = false }: { project: Project; flip?: boolean }) {
  const [primary, secondary] = project.images;
  return (
    <Reveal as="article" className="card relative overflow-hidden" aria-labelledby={`${project.slug}-title`}>
      <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className={`relative lg:col-span-7 lg:self-start lg:pt-2 ${flip ? "lg:order-2" : ""}`}>
          {primary && (
            <BrowserFrame image={primary} url={primary.frameUrl} sizes="(min-width: 1024px) 640px, 100vw" />
          )}
          {secondary && (
            <BrowserFrame
              image={secondary}
              url={secondary.frameUrl}
              sizes="(min-width: 1024px) 420px, 100vw"
              className={`relative mt-4 lg:-mt-16 lg:w-[66%] ${flip ? "lg:-ml-6 lg:mr-auto" : "lg:-mr-6 lg:ml-auto"}`}
            />
          )}
          {project.facts && <FactGrid facts={project.facts} className="mt-10 hidden lg:grid" />}
        </div>

        <div className={`flex flex-col lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <p className="text-sm text-paper-dim">
            {project.kind} · {project.period}
          </p>
          <h3
            id={`${project.slug}-title`}
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-lg text-paper">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-paper-muted">{project.summary}</p>

          {project.facts && <FactGrid facts={project.facts} className="mt-8 grid lg:hidden" />}

          <ul className="mt-8 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-paper-muted">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-secondary" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <StackList items={project.stack} />
          </div>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** A full-width card for the projects below the featured ones: screenshot on one side, details on the other. */
function ProjectCard({ project }: { project: Project }) {
  const [image] = project.images;
  return (
    <Reveal
      as="article"
      className="card group overflow-hidden transition-colors duration-300 hover:border-line-strong"
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="grid lg:grid-cols-12">
        {image && (
          <div className="border-b border-line bg-ink-800/40 p-5 sm:p-6 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-8">
            <BrowserFrame image={image} url={image.frameUrl} sizes="(min-width: 1024px) 460px, 100vw" />
          </div>
        )}
        <div className={`flex flex-col p-5 sm:p-7 lg:p-8 ${image ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <p className="text-sm text-paper-dim">
            {project.kind} · {project.period}
          </p>
          <h3 id={`${project.slug}-title`} className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">
            <Link href={`/projects/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-paper">{project.tagline}</p>
          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-paper-muted">
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-secondary" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <StackList items={project.stack} />
          </div>
          <div className="mt-auto pt-8">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="work-heading"
          title="Projects"
          intro="Each one has a case study if you want more detail on how it works."
        />
        <div className="space-y-6">
          {featured.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} flip={i % 2 === 1} />
          ))}
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

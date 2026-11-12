import Link from "next/link";
import { codeRequestHref, projects, type Project } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrowserFrame from "@/components/BrowserFrame";
import StackList from "@/components/StackList";
import CountUp from "@/components/CountUp";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Live site <ArrowUpRight className="nudge-ur h-4 w-4" />
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
        Case study <ArrowRight className="nudge-r h-4 w-4" />
      </Link>
      {project.codeOnRequest && (
        <a href={codeRequestHref(project.title)} className="btn-ghost">
          <GitHubIcon /> Code on request
        </a>
      )}
    </div>
  );
}

// Home page cards keep the tag row short; the case study lists the full stack.
const HOME_STACK_LIMIT = 5;

/** Stats: one row of three from sm up; on phones, one stat per line with its label beside it. */
function FactGrid({ facts, className = "" }: { facts: NonNullable<Project["facts"]>; className?: string }) {
  return (
    <dl
      className={`grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${className}`}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="flex flex-row-reverse items-baseline justify-end gap-3 py-3 sm:flex-col-reverse sm:items-start sm:gap-0 sm:px-5 sm:py-5 sm:first:pl-0"
        >
          <dt className="text-sm leading-snug text-paper-dim sm:mt-1 sm:text-xs">{fact.label}</dt>
          <dd className="figures w-[4.5rem] shrink-0 font-display text-xl font-bold tracking-tight text-paper sm:w-auto sm:text-4xl">
            <CountUp value={fact.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function FeaturedProject({ project, flip = false }: { project: Project; flip?: boolean }) {
  const [primary, secondary] = project.images;
  return (
    <Reveal as="article" className="py-14 first:pt-0 sm:py-20" aria-labelledby={`${project.slug}-title`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className={`lg:col-span-6 lg:self-start ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
          {primary && (
            <BrowserFrame image={primary} sizes="(min-width: 1024px) 640px, 100vw" />
          )}
          {secondary && (
            <BrowserFrame
              image={secondary}
              sizes="(min-width: 1024px) 420px, 100vw"
              className={`mt-4 lg:w-2/3 ${flip ? "lg:mr-auto" : "lg:ml-auto"}`}
            />
          )}
          {project.facts && <FactGrid facts={project.facts} className="mt-10 hidden lg:grid" />}
        </div>

        <div className={`flex flex-col lg:col-span-5 ${flip ? "lg:order-1" : "lg:col-start-8"}`}>
          <p className="text-sm text-paper-dim">
            {project.kind} · {project.period}
          </p>
          <h3
            id={`${project.slug}-title`}
            className="mt-2 font-display text-4xl font-bold tracking-tightest text-paper sm:text-5xl"
          >
            <Link href={`/projects/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
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
            <StackList items={project.stack.slice(0, HOME_STACK_LIMIT)} />
          </div>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** A row for the projects below the featured ones: screenshot on one side, details on the other. */
function ProjectCard({ project }: { project: Project }) {
  const [image] = project.images;
  return (
    <Reveal
      as="article"
      className="py-14 last:pb-0 sm:py-16"
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {image && (
          <div className="lg:col-span-5">
            <BrowserFrame image={image} sizes="(min-width: 1024px) 460px, 100vw" />
          </div>
        )}
        <div className={`flex flex-col ${image ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-12"}`}>
          <p className="text-sm text-paper-dim">
            {project.kind} · {project.period}
          </p>
          <h3 id={`${project.slug}-title`} className="mt-2 font-display text-3xl font-bold tracking-tight text-paper">
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
            <StackList items={project.stack.slice(0, HOME_STACK_LIMIT)} />
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
    <section id="work" aria-labelledby="work-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="work-heading"
          title="Projects"
          intro="Each one has a case study if you want more detail on how it works."
        />
        <div className="divide-y divide-line">
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

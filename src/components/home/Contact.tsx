import { profile } from "@/data/content";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "@/components/Icons";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28"
    >
      <Reveal className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-4 border-t-2 border-paper pt-5 lg:grid-cols-12 lg:gap-8">
          <h2
            id="contact-heading"
            className="font-display text-4xl font-bold leading-[0.95] tracking-tightest text-paper sm:text-6xl lg:col-span-7"
          >
            Contact
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-paper-muted lg:col-span-5 lg:pt-2">
          I’m looking for a Spring 2027 co-op or Summer 2027 internship in software engineering, data or sports
          analytics, or quant. I’m also happy to help with short projects over winter break in December 2026. Email
            is the best way to reach me.
          </p>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-flex max-w-full items-center gap-3 break-all font-display text-xl font-medium text-paper transition-colors hover:text-accent-fg sm:text-3xl"
        >
          <span className="link-underline">{profile.email}</span>
          <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
        </a>

        <div className="mt-10 flex flex-wrap gap-3">
          <CopyEmail email={profile.email} />
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <GitHubIcon /> GitHub
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Download résumé
          </a>
        </div>
      </Reveal>
    </section>
  );
}

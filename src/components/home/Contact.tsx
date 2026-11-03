import { profile } from "@/data/content";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "@/components/Icons";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-line py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]"
      />
      <Reveal className="relative mx-auto max-w-page px-5 sm:px-8">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">06</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          Contact
        </p>
        <h2
          id="contact-heading"
          className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-tightest text-paper"
        >
          Let’s <span className="font-serif font-normal italic tracking-normal text-accent">talk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-muted">
          I’m looking for a Spring 2027 co-op or a Summer 2027 internship in software engineering, sports or data
          analytics, or quantitative development, and I’m open to short winter-break projects in December 2026.
          Email is the fastest way to reach me.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-flex max-w-full items-center gap-3 break-all font-display text-xl font-medium text-paper transition-colors hover:text-accent sm:text-3xl"
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

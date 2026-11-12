import { profile } from "@/data/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CopyEmail from "@/components/CopyEmail";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "@/components/Icons";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="contact-heading"
          title="Contact"
          intro="I’m looking for a Spring 2027 co-op or Summer 2027 internship in software engineering, data or sports analytics, or quant. I’m also happy to help with short projects over winter break in December 2026. Email is the best way to reach me."
        />

        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex max-w-full items-center gap-3 break-all font-display text-xl font-medium text-paper transition-colors hover:text-accent-fg sm:text-3xl"
          >
            <span className="link-underline">{profile.email}</span>
            <ArrowUpRight className="nudge-ur h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
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
      </div>
    </section>
  );
}

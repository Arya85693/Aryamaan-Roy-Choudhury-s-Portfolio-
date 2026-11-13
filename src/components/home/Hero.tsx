import Image from "next/image";
import Link from "next/link";
import { education, profile } from "@/data/content";
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

const facts = [
  { key: "School", value: education.school },
  { key: "Degree", value: "B.S. Computer Engineering and Computer Science, May 2028" },
  { key: "GPA", value: education.gpa },
  { key: "Honors", value: "Dean’s List, Eta Kappa Nu" },
  { key: "Works in", value: "Python, SQL, C++" },
  { key: "Based in", value: profile.location },
];

// The name splits after the first word so each line can run close to the full width of the grid.
const [firstName, ...restOfName] = profile.name.split(" ");

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        {/* The one oversized moment on the page, and its one load sequence: each line of the name rises out
            of a mask, the rule draws under it, then the rest fades in. Everything after it stays quiet.
            Below lg the photo sits to the right of both lines of the name, bottom-aligned with the second line,
            and the name is sized from the viewport width so "Roy Choudhury" always stops short of the photo.
            The h1 inherits its size from this wrapper so the em-sized photo and gap scale with it. From lg up
            the wrapper is a plain block at the original size and the photo moves to its own column below. */}
        <div className="flex items-end justify-between gap-[0.3em] text-[length:min(calc((100vw_-_40px)/9.7),7rem)] sm:text-[length:min(calc((100vw_-_64px)/9.7),7rem)] lg:block lg:text-[clamp(2.75rem,12vw,10.5rem)]">
          <h1 id="hero-title" className="font-display font-extrabold leading-[0.86] tracking-[-0.055em] text-paper">
            {[firstName, restOfName.join(" ")].map((line, i) => (
              // The padding gives descenders room inside the mask; the negative margin cancels it in the layout.
              <span key={line} className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                <span className="block animate-line-up" style={{ animationDelay: `${i * 110}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <Image
            src="/headshot-portrait.png"
            alt={`Portrait of ${profile.name}`}
            width={360}
            height={360}
            sizes="(min-width: 640px) 220px, 110px"
            priority
            className="aspect-square h-[2.6em] w-[2.6em] shrink-0 animate-fade object-cover [animation-delay:500ms] lg:hidden"
          />
        </div>

        <div aria-hidden className="mt-10 h-0.5 origin-left animate-rule-draw bg-paper [animation-delay:350ms] sm:mt-14" />

        <div className="grid animate-fade gap-10 pt-6 [animation-delay:700ms] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-paper-muted">
              I study Computer Engineering and Computer Science at Northeastern. Most of what I build has to do with
              sports and data. The newest is{" "}
              <Link href="/projects/matchup-dna" className="link-underline text-paper">
                Matchup DNA
              </Link>
              , which forecasts pro tennis matches and tests the forecasts against the betting market. Before that I
              built{" "}
              <Link href="/projects/hoops-stock-market" className="link-underline text-paper">
                Hoops Stock Market
              </Link>
              , a site where NBA players trade like stocks.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper">
              I’m looking for a Spring 2027 co-op or a Summer 2027 internship.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                See my projects
                <ArrowRight className="nudge-r h-4 w-4" />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Résumé
              </a>
              <span aria-hidden className="mx-1 hidden h-6 w-px bg-line-strong sm:block" />
              <div className="flex items-center gap-1">
                {[
                  { href: profile.github, label: "GitHub", Icon: GitHubIcon },
                  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-10 w-10 items-center justify-center text-paper-muted transition-colors hover:text-paper"
                    aria-label={label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <dl className="-mt-2.5 text-sm sm:grid sm:grid-cols-2 sm:gap-x-8 lg:col-span-4 lg:col-start-7 lg:block">
            {facts.map(({ key, value }) => (
              <div key={key} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-line py-2.5">
                <dt className="text-paper-dim">{key}</dt>
                <dd className="text-paper">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="hidden lg:col-span-2 lg:block">
            {/* A transparent cut-out (cropped from headshot.png above its circular edge), so the page color shows
                behind it and the shoulders run flat across the bottom edge. */}
            <Image
              src="/headshot-portrait.png"
              alt={`Portrait of ${profile.name}`}
              width={360}
              height={360}
              sizes="180px"
              priority
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

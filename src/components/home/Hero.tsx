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
        {/* The one oversized moment on the page; everything after it stays on the quiet grid. */}
        <h1
          id="hero-title"
          className="animate-fade-up font-display text-[clamp(2.75rem,12vw,10.5rem)] font-extrabold leading-[0.86] tracking-[-0.055em] text-paper"
        >
          <span className="block">{firstName}</span>
          <span className="block">{restOfName.join(" ")}</span>
        </h1>

        <div className="mt-10 grid animate-fade-up gap-10 border-t-2 border-paper pt-6 [animation-delay:120ms] sm:mt-14 lg:grid-cols-12 lg:gap-8">
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
              <a href="#work" className="btn-primary group">
                See my projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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

          <div className="lg:col-span-2">
            <Image
              src="/headshot.png"
              alt={`Portrait of ${profile.name}`}
              width={320}
              height={320}
              sizes="(min-width: 1024px) 180px, 144px"
              priority
              className="aspect-square w-28 object-cover sm:w-36 lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

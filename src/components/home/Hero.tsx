import Image from "next/image";
import Link from "next/link";
import { education, profile } from "@/data/content";
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

const spec = [
  { key: "school", value: education.school },
  { key: "degree", value: "B.S. CompE + CS · May 2028" },
  { key: "gpa", value: education.gpa },
  { key: "honors", value: "Dean’s List · Eta Kappa Nu" },
  { key: "core", value: "Python · SQL · C++" },
  { key: "based", value: profile.location },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-page gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="animate-fade-up font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-tightest text-paper"
          >
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-paper-muted [animation-delay:80ms]">
            I study Computer Engineering and Computer Science at Northeastern. Most of what I build has to do with
            sports and data. The newest is{" "}
            <Link href="/projects/matchup-dna" className="link-underline text-paper">
              Matchup DNA
            </Link>
            , which forecasts pro tennis matches and tests the forecasts against the betting market. Before that I built{" "}
            <Link href="/projects/hoops-stock-market" className="link-underline text-paper">
              Hoops Stock Market
            </Link>
            , a site where NBA players trade like stocks.
          </p>
          <p className="mt-4 max-w-xl animate-fade-up text-lg leading-relaxed text-paper-muted [animation-delay:120ms]">
            I’m looking for a Spring 2027 co-op or a Summer 2027 internship.
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:180ms]">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full text-paper-muted transition-colors hover:bg-white/[0.05] hover:text-paper"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <div className="card mx-auto max-w-md overflow-hidden lg:ml-auto">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-xs text-paper-dim">~/aryamaan</span>
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-paper/15" />
                <span className="h-2 w-2 rounded-full bg-paper/15" />
                <span className="h-2 w-2 rounded-full bg-accent/80" />
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/headshot.png"
                  alt={`Portrait of ${profile.name}`}
                  width={160}
                  height={160}
                  sizes="64px"
                  priority
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-line-strong"
                />
                <div>
                  <p className="font-medium text-paper">{profile.name}</p>
                  <p className="text-sm text-paper-muted">Sports analytics · Performance tech · Quant</p>
                </div>
              </div>
              <p className="mt-6 font-mono text-xs text-paper-dim">
                <span className="text-accent">$</span> whoami
              </p>
              <dl className="mt-3 space-y-2 font-mono text-[0.8rem]">
                {spec.map(({ key, value }) => (
                  <div key={key} className="grid grid-cols-[5.5rem_1fr] gap-2">
                    <dt className="text-paper-dim">{key}</dt>
                    <dd className="text-paper">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-mono text-xs text-paper-dim">
                <span className="text-accent">$</span>{" "}
                <span aria-hidden className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-paper/70 motion-safe:animate-blink" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

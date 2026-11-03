import Image from "next/image";
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

const facts = [
  { value: "91,000+", label: "NBA games processed by my Hoops Stock Market pipeline" },
  { value: "500+", label: "players repriced on a ~30-minute cycle" },
  { value: "3", label: "internships across software engineering & finance" },
  { value: "3.81", label: "GPA · Dean’s List · Eta Kappa Nu" },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36">
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-page gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow flex animate-fade-up items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-up/60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
            </span>
            Seeking Spring 2027 co-op · Summer 2027 internships
          </p>

          <p className="mt-8 animate-fade-up text-lg text-paper-muted [animation-delay:80ms]">
            Hi, I’m {profile.name}.
          </p>
          <h1
            id="hero-title"
            className="mt-3 animate-fade-up font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-tightest text-paper [animation-delay:140ms]"
          >
            I build software that turns raw data into{" "}
            <span className="font-serif font-normal italic tracking-normal text-accent">decisions.</span>
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-paper-muted [animation-delay:220ms]">
            I study Computer Engineering and Computer Science at Northeastern, and I build Python data pipelines,
            pricing models, and the full-stack products that sit on top of them. My most visible project is{" "}
            <a href="#work" className="link-underline text-paper">
              Hoops Stock Market
            </a>
            , a live NBA player market.
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:300ms]">
            <a href="#work" className="btn-primary group">
              View selected work
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

        <div className="animate-fade-up [animation-delay:260ms] lg:col-span-5 lg:pt-14">
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
                  <p className="text-sm text-paper-muted">Software · Sports analytics · Data</p>
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

      <div className="relative mx-auto mt-20 max-w-page px-5 sm:mt-28 sm:px-8">
        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {facts.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col-reverse justify-end py-6 pr-4 sm:py-8 ${
                i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="mt-2 text-sm leading-snug text-paper-muted">{label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

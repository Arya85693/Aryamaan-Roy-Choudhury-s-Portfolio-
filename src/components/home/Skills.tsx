import { skills } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-line bg-ink-850/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          id="skills-heading"
          index="04"
          label="Toolkit"
          title="What I work with"
          intro="Grouped by how I use each tool, with the project or role where I’ve actually used it."
        />

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal
              as="li"
              key={group.label}
              delay={i * 60}
              className={`flex flex-col bg-ink p-6 transition-colors hover:bg-ink-850 sm:p-8 ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-paper">{group.label}</h3>
              </div>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-paper-muted">{group.evidence}</p>
              <ul className="mt-6 flex flex-wrap items-center gap-2 pt-1 md:mt-auto md:pt-6" aria-label={`${group.label} skills`}>
                {group.items.map((item) => {
                  const featured = group.featured?.includes(item);
                  return (
                    <li
                      key={item}
                      className={
                        featured
                          ? "rounded-lg border border-accent/40 bg-accent/[0.08] px-3 py-1.5 font-display text-base font-semibold text-paper"
                          : "rounded-lg border border-line-strong px-3 py-1.5 text-sm text-paper-muted"
                      }
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

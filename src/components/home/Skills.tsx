import { skills } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading id="skills-heading" title="Skills" />

        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal
              as="li"
              key={group.label}
              delay={i * 40}
              className={`flex flex-col border-t border-line pt-6 ${
                i === 0 ? "md:col-span-2" : group.wide ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <h3 className="font-display text-2xl font-bold tracking-tight text-paper">{group.label}</h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-paper-muted">{group.evidence}</p>
              <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label={`${group.label} skills`}>
                {group.items.map((item) => {
                  const featured = group.featured?.includes(item);
                  return (
                    <li
                      key={item}
                      className={
                        featured
                          ? "border border-paper px-3 py-1.5 font-display text-base font-semibold text-paper"
                          : "border border-line-strong px-3 py-1.5 text-sm text-paper-muted"
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

import { education, leadership } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading id="education-heading" title="Education" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-paper">{education.school}</h3>
                <p className="mt-1 text-paper-muted">{education.degree}</p>
              </div>
              <p className="figures text-sm font-medium text-paper">
                Expected {education.graduation}
              </p>
            </div>

            <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">GPA</dt>
                <dd className="figures mt-2 font-display text-4xl font-bold tracking-tight text-paper">{education.gpa}</dd>
              </div>
              <div>
                <dt className="eyebrow">Honors</dt>
                <dd className="mt-2 space-y-1 text-sm text-paper">
                  {education.honors.map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow">Program</dt>
                <dd className="mt-2 text-sm text-paper">{education.program}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow">Relevant coursework</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <span key={c} className="border border-line-strong px-2.5 py-1 text-sm text-paper-muted">
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <h3 className="font-display text-2xl font-bold tracking-tight text-paper">Certificates</h3>
            <ul className="mt-8 space-y-5 border-t border-line pt-6">
              {education.certificates.map((c) => (
                <li key={c.name}>
                  <p className="text-paper">{c.name}</p>
                  <p className="mt-0.5 text-sm text-paper-dim">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-2xl font-bold tracking-tight text-paper">Leadership & community</h3>
        </Reveal>
        <ul className="mt-6 border-t border-line">
          {leadership.map((item, i) => (
            <Reveal
              as="li"
              key={item.org}
              delay={i * 40}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-8"
            >
              <p className="figures text-sm text-paper-dim md:col-span-3">{item.period}</p>
              <div className="md:col-span-4">
                <p className="font-medium text-paper">{item.role}</p>
                <p className="text-sm text-paper-muted">{item.org}</p>
              </div>
              <p className="text-sm leading-relaxed text-paper-muted md:col-span-5">{item.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

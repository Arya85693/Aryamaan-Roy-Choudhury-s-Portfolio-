import { education, leadership } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-line bg-ink-850/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading id="education-heading" title="Education" />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="card p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-paper">{education.school}</h3>
                <p className="mt-1 text-paper-muted">{education.degree}</p>
              </div>
              <p className="rounded-full border border-line px-3 py-1 font-mono text-xs text-paper">
                Expected {education.graduation}
              </p>
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">GPA</dt>
                <dd className="mt-2 font-display text-3xl font-semibold text-paper">{education.gpa}</dd>
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
                    <span key={c} className="rounded-md border border-line px-2.5 py-1 text-sm text-paper-muted">
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow">{education.certificates.length === 1 ? "Certificate" : "Certificates"}</dt>
                <dd className="mt-2 space-y-1 text-sm text-paper">
                  {education.certificates.map((c) => (
                    <p key={c.name}>
                      {c.name} <span className="text-paper-dim">· {c.issuer}</span>
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="card p-6 sm:p-8 lg:col-span-5">
            <h3 className="eyebrow">Leadership & community</h3>
            <ul className="mt-6 space-y-6">
              {leadership.map((item) => (
                <li key={item.org} className="border-l border-secondary/50 pl-4">
                  <p className="font-medium text-paper">{item.role}</p>
                  <p className="text-sm text-paper-muted">
                    {item.org} <span className="text-paper-dim">· {item.period}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

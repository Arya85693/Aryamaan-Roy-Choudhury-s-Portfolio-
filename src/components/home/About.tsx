import { interests } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading id="about-heading" title="About me" />

        <Reveal className="max-w-2xl space-y-5 text-lg leading-relaxed text-paper-muted">
          <p>
            Growing up, I wanted to play sports professionally. Then the pandemic disrupted several important years of
            training in Singapore, and I found myself spending more time behind a computer than on the field. Somewhere
            along the way, my interest shifted from just playing sports to understanding what makes athletes and teams
            successful.
          </p>
          <p>
            I’ve always been fascinated by untapped potential. Why do some players thrive in one environment but
            struggle in another? Why do talented teams underperform? And how much of success comes down to ability
            versus the decisions made around it? That curiosity is what drew me to <em>Moneyball</em> and{" "}
            <em>Soccernomics</em>, and it’s probably why I’ve spent an unreasonable amount of time rebuilding teams,
            scouting obscure players, and developing youth prospects in FIFA and 2K.
          </p>
          <p>
            That way of thinking extends beyond sports. I enjoy breaking complicated problems into smaller pieces,
            questioning assumptions, and figuring out why something works rather than just accepting that it does. One
            of the biggest things I’ve learned through building software is that getting something to work and
            genuinely understanding it are two different achievements. I’m increasingly interested in the second:
            testing ideas, recognizing limitations, and being able to explain the reasoning behind my decisions.
          </p>
          <p>
            Outside of that, I’m usually playing soccer or basketball, lifting, following far too many sports leagues,
            or watching movies.
          </p>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-xl font-semibold tracking-tight text-paper">What I’m interested in</h3>
          </Reveal>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {interests.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 50} className="border-t border-line pt-5">
                <h4 className="font-medium text-paper">{item.title}</h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-paper-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { interests } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading id="about-heading" index="03" label="About" title="The thread through it all" />

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-3xl">
              Most of what I build starts with a question I actually care about, like{" "}
              <span className="font-serif text-[1.1em] italic text-accent">
                how much should one game move a player’s value?
              </span>
            </p>
          </Reveal>

          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-paper-muted lg:col-span-5 lg:col-start-8">
            <p>
              I grew up wanting to play sport professionally. When the pandemic lockdowns in Singapore took away
              important years of development, I looked for other ways to stay close to the game and kept landing on
              computing. My role shifted from playing to analyzing and building systems around the people who play.
            </p>
            <p>
              The idea that stuck with me is <span className="text-paper">wasted potential</span>: helping a player,
              a team, or a system get closer to what it’s capable of. It’s the Moneyball and Soccernomics side of me,
              and the same instinct that has me deciding who to sign, trade, and develop in FIFA and 2K career modes.
            </p>
            <p>
              As an engineer, I care whether a model actually predicts something, not just whether its output looks
              convincing. That means validating it, being honest about its limits, and understanding the whole
              system, from the first design sketch to the final UI polish. My long-term focus is{" "}
              <span className="text-paper">Python, SQL, and C++</span>.
            </p>
            <p>
              Away from the keyboard, I play soccer and basketball, lift, and shoot sports photography.
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow">Where my interests point</p>
          </Reveal>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {interests.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className="bg-ink p-6 sm:p-8">
                <p className="font-mono text-xs text-accent">{`0${i + 1}`}</p>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-paper">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

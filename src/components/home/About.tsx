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
            Growing up, I wanted to play sport professionally. Then the pandemic lockdowns in Singapore took away
            important years of training. I spent a lot of that time on a computer instead, and I slowly
            went from playing sport to analyzing it.
          </p>
          <p>
            What I keep coming back to is wasted potential. I like figuring out why a player or a team isn’t
            performing at the level they could be. That’s why I liked reading Moneyball and Soccernomics, and why I
            spend way too long on transfers and youth development in FIFA and 2K career modes.
          </p>
          <p>
            When I build something, I want to know if it actually works. For a model that means testing it on data
            it hasn’t seen and being upfront about where it falls short. I also like building projects from start
            to finish so I understand every part of them.
          </p>
          <p>Outside of that, I play soccer and basketball, lift, and take sports photos.</p>
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

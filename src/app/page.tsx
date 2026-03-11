import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const links = [
  { href: "https://github.com/Arya85693", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/aryamaan-roy-choudhury-7830b6352/",
    label: "LinkedIn",
  },
  { href: "/Aryamaan_Roy_Choudhury_Resume.pdf", label: "Resume" },
];

const projects = [
  {
    title: "Supplement Recommender",
    description:
      "A recommendation system that maps structured user inputs (goals, constraints, preferences) to tailored supplement suggestions via the GPT-3.5 API. Designed the pipeline to enforce consistent outputs despite LLM non-determinism, and built a minimal front-end that keeps the user flow linear and predictable.",
    highlight: "Focused on deterministic outputs and a linear, predictable UX.",
    tech: ["React", "JavaScript", "GPT-3.5 API"],
    github: "https://github.com/asrinivasan75/supplement-recommender",
    live: null,
  },
  {
    title: "Quantifying Lyricism in Hip-Hop",
    description:
      "Structured NLP pipeline to quantify lyrical complexity across rap discographies. Engineered custom feature extraction and scoring metrics for lexical diversity, rhyme density, and thematic variation. Normalized multi-dimensional features for cross-artist comparison and generated visual analyses to identify stylistic patterns. This project is an active work in progress as I refine the methodology and expand the analysis.",
    highlight: "Designed feature pipelines and normalized metrics for cross-artist comparison.",
    tech: ["Python", "Pandas", "NLP Tooling", "Data Processing", "Data Visualization"],
    github: "https://github.com/Arya85693/Quantifying-Lyricism-in-Hip-Hop-A-Multi-Dimensional-NLP-Analysis-of-Rap-Discographies",
    live: null,
  },
];

const experience = [
  {
    company: "AdaptSkillAI",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Feb 2026 - Present",
    bullets: [
      "Contributing to development of an adaptive learning platform MVP; implementing platform features and improving reliability within an evolving early-stage codebase supporting personalized learning workflows",
      "Collaborating with engineering and product teams to translate learning workflow requirements into scalable technical implementations for future platform deployment",
    ],
  },
  {
    company: "PL4TFORM",
    role: "Writer & Editor",
    location: "Singapore",
    period: "2022 - 2024",
    bullets: [
      "Owned the full content pipeline from research through publication; produced analytical pieces that translated complex economic concepts into accessible frameworks and advanced reader engagement",
      "Defined editorial standards for clarity and accuracy; authored and edited 8+ pieces that elevated discourse and spurred productive debate",
    ],
  },
  {
    company: "Weiss Asset Management",
    role: "Investment Analyst Intern",
    location: "Remote",
    period: "2022",
    bullets: [
      "Owned design and execution of a $1M hypothetical portfolio; applied Monte Carlo simulation to validate allocation and risk framework, achieving 2-3% alpha vs benchmark",
      "Delivered equity research and risk analysis that informed portfolio construction; presented findings with supporting data to senior team",
    ],
  },
  {
    company: "EcoHarmony",
    role: "Head of Outreach",
    location: "Edison, NJ",
    period: "2023 - 2024",
    bullets: [
      "Owned outreach strategy for 150+ member organization; drove 15% engagement lift through targeted campaign design and audience segmentation",
      "Built and operated a tracking system to quantify impact; logged 18,500+ lbs of recycled materials and used data to refine outreach priorities",
    ],
  },
  {
    company: "Voice of Change",
    role: "Events Team Leader",
    location: "Singapore",
    period: "2021 - 2022",
    bullets: [
      "Owned end-to-end event lifecycle for food drives, webinars, and walkathon; raised $2,300+ for underprivileged communities through structured planning and volunteer coordination",
      "Designed donor and volunteer engagement framework that sustained participation across initiatives and enabled repeat participation",
    ],
  },
  {
    company: "Learn to Be",
    role: "Student Tutor",
    location: "Clark, NJ",
    period: "2023 - 2024",
    bullets: [
      "Delivered structured one-on-one mathematics tutoring, designing personalized lesson plans tailored to individual learning gaps",
      "Improved student performance by identifying conceptual weaknesses and implementing targeted problem-solving strategies, resulting in measurable academic improvement (2+ letter grade increases)",
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <header className="w-full bg-navy py-32 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/headshot.png"
              alt="Aryamaan Roy Choudhury"
              width={180}
              height={180}
              className="rounded-full object-cover border border-slate-600 shadow-lg"
              sizes="180px"
              priority
            />
          </div>
          <h1 className="text-6xl font-bold tracking-tight text-slate-100">
            Aryamaan Roy Choudhury
          </h1>
          <p className="mt-6 text-xl text-slate-400 font-medium">
            Computer Engineering & Computer Science · Northeastern University
          </p>
          <p className="mt-6 text-lg text-slate-400/90 leading-relaxed max-w-2xl mx-auto">
            Building reliable systems that turn structured inputs into measurable outcomes across engineering, analytics, and sports.
          </p>
          <nav className="mt-12 flex flex-wrap justify-center gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                target={
                  href.startsWith("http") || href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel={
                  href.startsWith("http") || href.endsWith(".pdf")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex items-center px-5 py-2.5 rounded-md border border-white/10 bg-white/5 text-slate-100 text-sm font-medium hover:border-accent/50 hover:text-accent transition-all duration-200 hover:scale-[1.02]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* About */}
      <section
        id="about"
        className="w-full bg-navy-secondary py-24 scroll-mt-20"
      >
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold text-slate-100">About</h2>
            <div className="mt-3 w-12 h-0.5 bg-accent rounded-full" />
          </div>
          <p className="text-slate-100 text-lg leading-relaxed mb-6">
            I study Computer Engineering and Computer Science at Northeastern, with a focus on <strong className="font-semibold text-slate-100">systems thinking</strong> - how components connect, how data flows, and how to build reliable software that serves clear objectives.
          </p>
          <p className="text-slate-100 text-lg leading-relaxed">
            My work spans full-stack development, LLM integration, and quantitative analysis. I prioritize <strong className="font-semibold text-slate-100">clean architecture</strong> and <strong className="font-semibold text-slate-100">structured inputs</strong>, and I&apos;ve built production-facing projects while contributing to editorial and research teams where clarity and rigor matter.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="w-full bg-navy py-24 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold text-slate-100">Projects</h2>
            <div className="mt-3 w-12 h-0.5 bg-accent rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article
                key={project.title}
                className="p-8 rounded-xl border border-slate-700 bg-navy-secondary hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-2xl font-semibold text-slate-100">
                  {project.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-medium text-accent bg-accent/10 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-slate-400 text-base leading-relaxed">
                  {project.description}
                  {project.highlight && ` ${project.highlight}`}
                </p>
                {project.title === "Supplement Recommender" && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <figure className="flex flex-col">
                      <div className="h-56 w-full overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/project-images/supplement-landing.png"
                          alt="Landing page of SuppleMatch supplement recommendation platform"
                          width={600}
                          height={380}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </figure>
                    <figure className="flex flex-col">
                      <div className="h-56 w-full overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/project-images/supplement-about.png"
                          alt="About section of SuppleMatch describing recommendation workflow"
                          width={600}
                          height={380}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </figure>
                  </div>
                )}
                <div className="mt-6">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-accent hover:text-blue-400 transition-all duration-200 hover:underline underline-offset-4 hover:scale-[1.02]"
                  >
                    GitHub →
                  </Link>
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-flex items-center text-sm font-medium text-accent hover:text-blue-400 transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      Live Demo →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="w-full bg-navy-secondary py-24 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold text-slate-100">Experience</h2>
            <div className="mt-3 w-12 h-0.5 bg-accent rounded-full" />
          </div>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="pb-8 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {exp.location} · {exp.period}
                  </p>
                </div>
                <p className="mt-1 text-slate-400">{exp.role}</p>
                <ul className="mt-5 space-y-4">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-slate-400 text-base leading-loose flex gap-3"
                    >
                      <span className="text-accent mt-1 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {exp.company === "AdaptSkillAI" && (
                  <p className="mt-3 text-sm text-slate-500">
                    Note: Certain technical details omitted due to NDA while product remains in pre-release.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full bg-navy py-24 scroll-mt-20">
        <div className="max-w-xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl font-semibold text-slate-100">Contact</h2>
          <div className="h-1 w-12 bg-blue-400 mb-8 mx-auto" />
          <p className="text-slate-400 text-sm mb-8">
            Feel free to reach out for collaboration, research, or engineering opportunities.
          </p>
          <a
            href="mailto:roychoudhury.a@northeastern.edu"
            className="text-xl text-slate-200 hover:text-blue-400 transition-colors"
          >
            roychoudhury.a@northeastern.edu
          </a>
          <div className="mt-8 flex flex-col items-center space-y-4">
            <a
              href="https://github.com/Arya85693"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aryamaan-roy-choudhury-7830b6352/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-10">
            Currently seeking Fall 2026 co-op opportunities.
          </p>
        </div>
      </section>
    </main>
  );
}

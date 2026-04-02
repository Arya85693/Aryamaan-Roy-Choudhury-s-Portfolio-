import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import LightboxImage from "@/components/LightboxImage";

const links = [
  { href: "https://github.com/Arya85693", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/aryamaan-roy-choudhury-7830b6352/",
    label: "LinkedIn",
  },
  { href: "/resume.pdf", label: "Resume" },
];

type ProjectGallery = "stratedge" | "supplement" | null;

type Project = {
  key: string;
  title: string;
  tags: string[];
  techStack: string;
  hook: string;
  bullets: string[];
  featureLine?: string;
  github: string | null;
  live: string | null;
  /** true = Live Demo styled as primary; false = GitHub primary when both exist */
  liveDemoPrimary: boolean;
  gallery: ProjectGallery;
};

const projects: Project[] = [
  {
    key: "stratedge",
    title: "StratEdge Africa Platform",
    tags: ["Production"],
    techStack: "Next.js • React • TypeScript • Vercel",
    hook:
      "Live production website for a consulting firm, built end-to-end as a solo developer.",
    bullets: [
      "Built full-stack application using Next.js, React, TypeScript, and Vercel.",
      "Designed multi-page architecture with reusable components and structured routing.",
      "Deployed live with optimized performance and responsive UI.",
    ],
    featureLine:
      "Features: multi-page navigation, responsive design, structured content system.",
    github: null,
    live: "https://strat-edge-africa-website.vercel.app/",
    liveDemoPrimary: true,
    gallery: "stratedge",
  },
  {
    key: "dls",
    title: "Dream League Soccer Analysis",
    tags: ["Data / Analytics", "In Progress"],
    techStack: "Python • Pandas • NumPy",
    hook:
      "Building a data-driven system to model player performance and role efficiency.",
    bullets: [
      "Developing Python pipeline (pandas, numpy) to convert cumulative stats into per-game metrics.",
      "Designing role classification and reliability-adjusted scoring system.",
      "Exploring validation and prediction techniques for player performance.",
    ],
    github: "https://github.com/Arya85693/Dream-League-Soccer-Playstyle-Analysis",
    live: null,
    liveDemoPrimary: false,
    gallery: null,
  },
  {
    key: "supplement",
    title: "Supplement Recommender",
    tags: ["AI / Full-Stack"],
    techStack: "React • JavaScript • GPT API",
    hook: "AI-powered system for personalized supplement recommendations.",
    bullets: [
      "Built full-stack app using React and GPT-based API for structured recommendations.",
      "Designed prompt and logic flow to improve output consistency.",
      "Created user-friendly interface for predictable interaction.",
    ],
    github: "https://github.com/asrinivasan75/supplement-recommender",
    live: null,
    liveDemoPrimary: false,
    gallery: "supplement",
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
    company: "StratEdge Africa",
    role: "Web Development Intern",
    location: "Remote",
    period: "Jan 2026 - Present",
    bullets: [
      "Built and deployed a production-ready advisory website, structuring the information architecture across Services, Insights, About, and Contact to improve clarity and conversion flow",
      "Implemented reusable App Router components and structured content models for services and insights, enabling low-friction updates and scalable publishing",
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

function ProjectGalleryBlock({ gallery }: { gallery: ProjectGallery }) {
  if (gallery === "supplement") {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 md:h-44 w-full overflow-hidden rounded-lg shadow-md">
          <LightboxImage
            src="/project-images/supplement-landing.png"
            alt="Supplement recommender landing page"
            width={600}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-40 md:h-44 w-full overflow-hidden rounded-lg shadow-md">
          <LightboxImage
            src="/project-images/supplement-about.png"
            alt="Supplement recommender about section"
            width={600}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  if (gallery === "stratedge") {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 md:h-44 w-full overflow-hidden rounded-lg shadow-md ring-1 ring-slate-600/40">
          <LightboxImage
            src="/project-images/stratedgeafrica-landing.png"
            alt="StratEdge Africa landing page"
            width={600}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-40 md:h-44 w-full overflow-hidden rounded-lg shadow-md ring-1 ring-slate-600/40">
          <LightboxImage
            src="/project-images/stratedgeafrica-about.png"
            alt="StratEdge Africa about section"
            width={600}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  return null;
}

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
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold text-slate-100">Projects</h2>
            <div className="mt-3 w-12 h-0.5 bg-accent rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.key}
                className="p-8 rounded-xl border border-slate-700 bg-navy-secondary hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <h3 className="text-lg font-semibold text-slate-100 tracking-tight">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-600 rounded-md bg-navy/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-slate-400 text-sm leading-snug">
                  {project.techStack}
                </p>
                <p className="mt-5 text-slate-300 text-sm leading-relaxed">
                  {project.hook}
                </p>
                <ul className="mt-5 space-y-2.5 text-slate-400 text-sm leading-relaxed">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {project.featureLine && (
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                    {project.featureLine}
                  </p>
                )}
                <ProjectGalleryBlock gallery={project.gallery} />
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.live &&
                    (project.liveDemoPrimary ? (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 rounded-lg bg-accent text-navy text-sm font-semibold hover:bg-blue-400 hover:text-navy transition-colors duration-200"
                      >
                        Live Demo
                      </Link>
                    ) : (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200"
                      >
                        Live Demo
                      </Link>
                    ))}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        project.liveDemoPrimary && project.live
                          ? "border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-slate-100"
                          : "bg-accent/15 border border-accent/40 text-accent hover:bg-accent/25 hover:text-blue-300"
                      }`}
                    >
                      GitHub
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

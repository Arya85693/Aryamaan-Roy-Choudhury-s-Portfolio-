export const profile = {
  name: "Aryamaan Roy Choudhury",
  shortName: "Aryamaan",
  email: "roychoudhury.a@northeastern.edu",
  location: "Boston, MA",
  github: "https://github.com/Arya85693",
  linkedin: "https://www.linkedin.com/in/aryamaan-roy-choudhury-7830b6352/",
  resume: "/resume.pdf",
};

export const codeRequestHref = (title: string) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(`Code access request: ${title}`)}`;

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  period: string;
  role: string;
  tagline: string;
  summary: string;
  stack: string[];
  highlights: string[];
  facts?: { value: string; label: string }[];
  live?: string;
  github?: string;
  codeOnRequest?: boolean;
  images: ImageAsset[];
  caseStudy: {
    problem: string;
    sections: { title: string; body?: string; points?: string[] }[];
    sampleOutput?: { caption: string; columns: string[]; rows: string[][] };
    notes?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "hoops-stock-market",
    index: "01",
    title: "Hoops Stock Market",
    kind: "Sports analytics · Full-stack",
    period: "Sep 2024 – Present",
    role: "Solo developer",
    tagline: "A live NBA player market where prices move with real games.",
    summary:
      "Every NBA player trades like a stock. A Python ETL and pricing system turns game data into player valuations, and a Next.js app lets users follow the board, understand why prices moved, and paper-trade with a simulated portfolio.",
    stack: ["Python", "Next.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
    highlights: [
      "Engineered ETL and pricing systems that have processed 91,000+ NBA games into dynamic player valuations.",
      "Two-layer pricing: a slow, performance-driven Fair Value and a Market Price that layers on projection, demand, sentiment, and team context.",
      "Built trading, portfolio tracking, and authentication so users can paper-trade 500+ players with a $100k simulated balance.",
    ],
    facts: [
      { value: "91k+", label: "NBA games processed" },
      { value: "500+", label: "players priced" },
      { value: "~30 min", label: "repricing cycle" },
    ],
    live: "https://hoopsstockmarket.com/",
    codeOnRequest: true,
    images: [
      {
        src: "/project-images/hoopsstockmarket-landing.png",
        alt: "Hoops Stock Market home page showing a near real-time market snapshot with board total, repricing pulse, and latest mover",
        width: 1024,
        height: 540,
      },
      {
        src: "/project-images/hoopsstockmarket-player.png",
        alt: "Hoops Stock Market player page for Anthony Edwards with a written player insight and a paper-trade panel",
        width: 1024,
        height: 486,
      },
    ],
    caseStudy: {
      problem:
        "Box scores tell you what happened in a game, but not how much it should change a player’s value over a season. Hoops Stock Market turns raw game data into a continuously repriced market so that fans can track player value, understand why it moved, and test their conviction with paper trades instead of hot takes.",
      sections: [
        {
          title: "Data ingestion & ETL",
          body:
            "A Python pipeline ingests NBA game data, normalizes it, and writes player-level records to a Supabase (PostgreSQL) backend. The pipeline has processed more than 91,000 NBA games, and the board refreshes on an ingestion cycle of roughly 30 minutes when new regular-season or playoff games arrive.",
        },
        {
          title: "Two-layer pricing model",
          points: [
            "Fair Value is the slow, performance-driven layer that moves with on-court production across recent games.",
            "Market Price tracks Fair Value plus explainable premiums for projection, demand, sentiment, and team context, and reprices every ingestion cycle, even between games.",
            "Each player page shows whether the market is trading at a premium or discount to Fair Value, so price and value can be compared directly.",
          ],
        },
        {
          title: "Trading & portfolios",
          points: [
            "Users start with $100,000 in simulated buying power and trade whole shares.",
            "Fills execute around the live Market Price with a 3% bid/ask spread: buys fill just above the mid and sells just below it.",
            "Authentication and per-user portfolios and watchlists are backed by Supabase.",
          ],
        },
        {
          title: "Product surfaces",
          points: [
            "Market board: search and sort 500+ players by price, forward outlook, market cycle, and last-game movement.",
            "Player pages: price charts plus a plain-language insight that explains what happened and why the price moved.",
            "Radar, Portfolio, and Guide pages that turn a pricing engine into something a fan can actually use.",
          ],
        },
      ],
      notes:
        "Hoops Stock Market is a model-driven simulation with paper currency only. Prices refresh on ingestion cycles rather than tick by tick, and nothing on the platform is real money or investment advice.",
    },
  },
  {
    slug: "dream-league-soccer-analytics",
    index: "02",
    title: "Dream League Soccer Player Analytics",
    kind: "Data analytics · Python",
    period: "Mar 2026 – Present",
    role: "Solo developer",
    tagline: "A modular ETL and scoring pipeline for ranking players fairly.",
    summary:
      "A composable Python system that converts cumulative player exports into normalized per-game metrics, classifies playing roles, applies reliability-adjusted scoring, and projects a prospect’s output with a similarity-based model that is validated against newer data.",
    stack: ["Python", "pandas", "NumPy"],
    highlights: [
      "Modular Python ETL pipeline that cleans player data, computes normalized metrics, and generates ranked outputs.",
      "Role-based scoring with weighted metrics and reliability shrinkage, so short hot streaks don’t outrank sustained production.",
      "Similarity-based prediction module, validated against an updated dataset with a structured error report.",
    ],
    github: "https://github.com/Arya85693/Dream-League-Soccer-Playstyle-Analysis",
    images: [],
    caseStudy: {
      problem:
        "Raw totals mix opportunity with efficiency: players who joined a squad at different times can’t be compared on goals alone, and a single goal/assist blend unfairly favours one playing style. The goal was an auditable, reproducible ranking that compares players on how they actually produce.",
      sections: [
        {
          title: "Pipeline design",
          body:
            "Every stage is a separate, composable script with CSV or JSON outputs, so each step can be diffed and audited as the data evolves. The same input file always regenerates the same outputs, with no manual steps or hidden state in the scoring path. Malformed exports, such as missing columns, non-numeric values, non-positive appearances, or negative counts, stop the pipeline immediately instead of producing silent errors.",
        },
        {
          title: "Scoring methodology",
          points: [
            "Per-game normalization: goals, assists, and card rates are converted into per-appearance metrics, with a configurable minimum-appearances filter.",
            "Role classification: a goal-contribution ratio tags each player as an Attacker, Playmaker, or Balanced contributor.",
            "Role-adjusted impact: goal and assist weights depend on role, with penalties for yellow and red cards.",
            "Reliability shrinkage: scores are multiplied by Apps / (Apps + K), with a default K of 50 that can be set from the CLI.",
            "Rank tracking records how each player’s position changes across every stage of the pipeline.",
          ],
        },
        {
          title: "Prediction & validation",
          points: [
            "Projects a prospect’s output by comparing an eight-attribute profile with historical wingers using min–max normalization, cosine similarity, and softmax weighting.",
            "A validation script compares predicted and observed per-game rates, reports percent error and role match, and re-ranks the player with the same scoring formulas.",
          ],
        },
      ],
      sampleOutput: {
        caption: "Top five players by final rank from the default export (player_stats_final.csv)",
        columns: ["Rank", "Player", "Apps", "Role", "Final score"],
        rows: [
          ["1", "Erling Haaland", "239", "Attacker", "2.189"],
          ["2", "Omar Marmoush", "46", "Balanced", "1.711"],
          ["3", "Alexander Isak", "440", "Attacker", "1.553"],
          ["4", "Robert Lewandowski", "471", "Attacker", "1.491"],
          ["5", "Harry Kane", "259", "Balanced", "1.206"],
        ],
      },
      notes:
        "Scope is deliberately limited to outfield attacking output. Goalkeeping and defending sit outside the core metrics by design, and the documentation says so explicitly.",
    },
  },
  {
    slug: "supplement-recommender",
    index: "03",
    title: "Supplement Recommender",
    kind: "Full-stack · Team project",
    period: "Jun 2025 – Sep 2025",
    role: "Software developer on a team",
    tagline: "Personalized supplement plans from a user’s profile and goals.",
    summary:
      "A team-built full-stack application where users register, complete a profile, receive API-generated supplement recommendations, and save their plans to a personal dashboard.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "OpenRouter API"],
    highlights: [
      "Contributed to a full-stack app built with React, Node.js, and MongoDB that generates personalized supplement plans.",
      "Integrated API-based recommendation logic through OpenRouter to generate user-specific suggestions.",
      "Implemented frontend components and UI flows with React and Tailwind CSS.",
    ],
    github: "https://github.com/asrinivasan75/supplement-recommender",
    images: [
      {
        src: "/project-images/supplement-landing.png",
        alt: "SuppleMatch landing page with a personal supplement advisor headline and assessment call to action",
        width: 2048,
        height: 1021,
      },
      {
        src: "/project-images/supplement-about.png",
        alt: "SuppleMatch about page describing the mission, how it works, and values",
        width: 607,
        height: 913,
      },
    ],
    caseStudy: {
      problem:
        "Generic supplement advice ignores a person’s goals, lifestyle, and existing habits. The team set out to build an app that turns a short health profile into a structured, saved plan.",
      sections: [
        {
          title: "What the app does",
          points: [
            "User registration, login, and logout with JWT-based authentication.",
            "Personalized recommendations generated from the user’s profile through the OpenRouter API.",
            "Plans saved per user in MongoDB and viewable from a dashboard.",
          ],
        },
        {
          title: "My contributions",
          points: [
            "Integrated the API-based recommendation logic that turns a user profile into supplement suggestions.",
            "Implemented frontend components and UI flows in React and Tailwind CSS for the assessment and results experience.",
            "Contributed across the React, Node.js, and MongoDB stack as part of the team.",
          ],
        },
      ],
      notes: "This was a team project, so the repository is hosted on a teammate’s GitHub account.",
    },
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  stack?: string[];
  link?: { href: string; label: string };
  image?: ImageAsset;
  note?: string;
};

export const experience: Experience[] = [
  {
    company: "AdaptSkillAI",
    role: "Software Engineering Intern",
    location: "Maharashtra, India · Remote",
    period: "Feb 2026 – Oct 2026",
    summary: "Built MVP features for an early-stage adaptive learning platform.",
    bullets: [
      "Developed MVP features for an adaptive learning platform, translating product requirements into scalable workflows.",
      "Implemented and tested core platform components, improving functionality and supporting scalable feature delivery.",
      "Collaborated on student and admin workflows to refine system behavior and improve usability and performance.",
    ],
    note: "Some technical details are omitted under NDA while the product is pre-release.",
  },
  {
    company: "StratEdge Africa",
    role: "Web Development Intern",
    location: "Port Louis, Mauritius · Remote",
    period: "Jan 2026 – Aug 2026",
    summary: "Sole developer of the firm’s production website, from design to deployment.",
    bullets: [
      "Designed and developed a production-ready website as the sole developer, translating business needs into a live platform.",
      "Built a responsive multi-page app with Next.js, React, and Tailwind CSS, structuring the information architecture across Services, Insights, About, and Contact.",
      "Implemented reusable App Router components and structured content models so that services and insights can be updated without code rewrites.",
      "Deployed and maintained the platform on Vercel, optimizing performance, reliability, and update workflows.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    link: { href: "https://strat-edge-africa-website.vercel.app/", label: "Visit live site" },
    image: {
      src: "/project-images/stratedgeafrica-landing.png",
      alt: "StratEdge Africa website home page: strategy, intelligence and investment insight for Africa",
      width: 2532,
      height: 1330,
    },
  },
  {
    company: "Weiss Asset Management",
    role: "Investment Analyst Intern",
    location: "Boston, MA · Remote",
    period: "Jan 2022 – Feb 2022",
    summary: "Equity research and portfolio construction in a selective investment program.",
    bullets: [
      "Conducted equity research and portfolio analysis within a selective investment program focused on market performance.",
      "Designed and presented a simulated $1M stock portfolio in Excel, with an allocation strategy and risk modeling.",
      "Achieved portfolio returns 2–3% above benchmark, using Monte Carlo simulations and scenario analysis.",
    ],
    stack: ["Excel", "Monte Carlo simulation", "Scenario analysis"],
  },
];

export const leadership = [
  {
    org: "Northeastern University Oakland",
    role: "Student Programming Board",
    period: "Sep 2024 – Dec 2024",
    detail:
      "Managed logistics, scheduling, and promotion for campus events, and analyzed student feedback to guide future programming.",
  },
  {
    org: "EcoHarmony",
    role: "Head of Outreach",
    period: "Oct 2023 – Apr 2024",
    detail:
      "Led outreach for a 150+ member sustainability organization, raised engagement by 15%, and maintained a tracking system that logged 18,500+ lbs of recycled materials.",
  },
];

export const education = {
  school: "Northeastern University",
  degree: "B.S. Computer Engineering and Computer Science",
  location: "Boston, MA",
  graduation: "May 2028",
  gpa: "3.81 / 4.00",
  program: "Global Scholars Program — Oakland & London, Sep 2024 – May 2025",
  coursework: [
    "Circuits and Signals",
    "Analysis of Random Phenomena",
    "Algorithms and Data",
    "Logic and Computation",
  ],
  honors: ["Dean’s List — Fall 2025, Spring 2026", "Eta Kappa Nu — inducted March 2026"],
  certificates: [
    { name: "Machine Learning", issuer: "Crimson Data Science" },
    { name: "3D Printing, AI & ML Fundamentals", issuer: "Singapore International Science Camp" },
    { name: "Game Changers: AI and the Future of Live Sports", issuer: "IBM SkillsBuild" },
  ],
};

export type SkillGroup = {
  label: string;
  items: string[];
  featured?: string[];
  evidence: string;
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "C++", "TypeScript / JavaScript", "Java", "OCaml"],
    featured: ["Python", "SQL", "C++"],
    evidence:
      "Python and SQL power Hoops Stock Market and the Dream League Soccer pipeline, and TypeScript runs the Hoops web app and the StratEdge Africa site. C++ is where I’m building systems-level depth; Java and OCaml come from coursework.",
  },
  {
    label: "Data & quantitative",
    items: ["pandas", "NumPy", "Monte Carlo simulation", "Excel modeling"],
    evidence: "Used in Hoops Stock Market pricing, Dream League Soccer analytics, and Weiss Asset Management.",
  },
  {
    label: "Web & backend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML / CSS",
      "Node.js",
      "Express",
      "Supabase / PostgreSQL",
      "MongoDB",
      "Vercel",
    ],
    evidence: "Used in Hoops Stock Market, the StratEdge Africa production site, and Supplement Recommender.",
  },
  {
    label: "Developer & AI tools",
    items: ["Git", "Cursor", "Claude Code", "OpenAI Codex", "NotebookLM", "OpenAI / OpenRouter APIs"],
    evidence:
      "Part of my everyday workflow for building, debugging, and research. The OpenRouter API powers Supplement Recommender’s suggestions.",
  },
  {
    label: "Hardware & lab",
    items: [
      "Arduino",
      "Raspberry Pi",
      "Circuit prototyping",
      "Oscilloscope",
      "LTSpice",
      "SolidWorks",
      "Fusion 360",
      "AutoCAD",
    ],
    evidence: "From Computer Engineering coursework and lab work.",
  },
];

export const interests = [
  {
    title: "Sports analytics",
    body: "Recruitment, draft and transfer evaluation, and performance data. The hard part is working out which statistics actually mean something, rather than ranking players just because the data exists. Most of my projects live here.",
  },
  {
    title: "Health & human performance",
    body: "Wearables and sensors produce huge amounts of noisy data about the body. I’m interested in turning it into information people can trust, while keeping them in control of how that sensitive data is used. It’s a big reason hardware matters to me.",
  },
  {
    title: "Quantitative systems",
    body: "Markets and probability drew me in: pricing, risk, and simulation, from Monte Carlo portfolio modeling at Weiss Asset Management to the two-layer pricing engine behind Hoops Stock Market.",
  },
];

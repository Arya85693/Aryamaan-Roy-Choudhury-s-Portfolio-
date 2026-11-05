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
    tagline: "An NBA player market where prices move with real games.",
    summary:
      "Every NBA player has a stock price. A Python pipeline turns game data into player values, and a Next.js site lets you browse the market, see why a price moved, and paper-trade with simulated money.",
    stack: ["Python", "Next.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
    highlights: [
      "The data pipeline has processed more than 91,000 NBA games into player prices.",
      "Each player has two prices. Fair Value moves slowly with on-court performance, and Market Price adds projection, demand, sentiment, and team context on top of it.",
      "Users get $100k in simulated money to trade 500+ players, with their own login and portfolio.",
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
        "A box score tells you what happened in one game, but not how much that game should change a player’s value. I wanted a way to track player value over a season, see why it went up or down, and make paper trades to back up an opinion about a player.",
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
          title: "Pages",
          points: [
            "The market board lets you search and sort 500+ players by price, outlook, market cycle, and last-game movement.",
            "Each player page has a price chart and a short written explanation of what happened and why the price moved.",
            "There are also Radar, Portfolio, and Guide pages.",
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
    tagline: "A Python pipeline for ranking players fairly when they’ve played different amounts.",
    summary:
      "It takes exported season totals, turns them into per-game numbers, sorts players into roles, and scores them in a way that doesn’t overrate small sample sizes. It also predicts how a new player will do based on similar past players, and I checked those predictions against newer data.",
    stack: ["Python", "pandas", "NumPy"],
    highlights: [
      "Python ETL pipeline that cleans the player data, calculates per-game metrics, and outputs rankings.",
      "Scores are weighted by role and scaled down for players with few appearances, so a short hot streak doesn’t beat years of steady output.",
      "A similarity-based prediction script, tested against an updated dataset with an error report.",
    ],
    github: "https://github.com/Arya85693/Dream-League-Soccer-Playstyle-Analysis",
    images: [],
    caseStudy: {
      problem:
        "Raw totals mix up opportunity and efficiency. Players who joined the squad at different times can’t be compared on total goals, and a single goals-plus-assists formula favours certain playing styles. I wanted a ranking that anyone could rerun and check.",
      sections: [
        {
          title: "Pipeline design",
          body:
            "Each stage is its own script that writes a CSV or JSON file, so I can check every step as the data changes. The same input always gives the same output, and there are no manual steps in the scoring. If an export is malformed (missing columns, non-numeric values, zero or negative appearances, or negative counts), the pipeline stops with an error instead of quietly producing bad numbers.",
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
        "This only covers attacking output for outfield players. Goalkeeping and defending aren’t part of the metrics, and the documentation says so.",
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
      "A full-stack app I worked on with a team. Users sign up, fill out a profile, get supplement recommendations generated through an API, and save their plans to a dashboard.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "OpenRouter API"],
    highlights: [
      "Worked on a React, Node.js, and MongoDB app that creates personalized supplement plans.",
      "Connected the recommendation logic to the OpenRouter API so suggestions are based on each user’s profile.",
      "Built frontend components and pages with React and Tailwind CSS.",
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
        "Most supplement advice is generic and doesn’t take someone’s goals or habits into account. Our team wanted an app that takes a short health profile and gives back a plan you can save.",
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
            "Integrated the API-based recommendation logic that turns a user’s profile into supplement suggestions.",
            "Built frontend components for the assessment and results pages in React and Tailwind CSS.",
            "Helped out across the rest of the React, Node.js, and MongoDB code.",
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
    summary: "An early-stage startup building an adaptive learning platform.",
    bullets: [
      "Built MVP features for the platform based on the product requirements.",
      "Implemented and tested core parts of the platform.",
      "Worked on the student and admin workflows, fixing how they behaved and making them faster and easier to use.",
    ],
    note: "Some technical details are omitted under NDA while the product is pre-release.",
  },
  {
    company: "StratEdge Africa",
    role: "Web Development Intern",
    location: "Port Louis, Mauritius · Remote",
    period: "Jan 2026 – Aug 2026",
    summary: "I was the only developer on the company’s website.",
    bullets: [
      "Designed and built the company’s live website by myself, based on what the business needed.",
      "Made it a responsive multi-page Next.js site with Services, Insights, About, and Contact pages.",
      "Set up reusable components and content models so the team can add services and insights without rewriting code.",
      "Deployed it on Vercel and maintained it, including performance fixes and making updates easier.",
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
    summary: "Equity research and portfolio building in a selective investment program.",
    bullets: [
      "Did equity research and portfolio analysis as part of the program.",
      "Built and presented a simulated $1M stock portfolio in Excel, including the allocation strategy and risk modeling.",
      "The portfolio returned 2–3% above its benchmark. I used Monte Carlo simulations and scenario analysis to test it.",
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
      "Handled logistics, scheduling, and promotion for campus events, and used student feedback to plan future ones.",
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
      "I use Python and SQL the most, mainly for Hoops Stock Market and the Dream League Soccer project. I use TypeScript for web work like the Hoops site and the StratEdge Africa site. Java and OCaml are from classes, and I’m working on getting better at C++.",
  },
  {
    label: "Data & quantitative",
    items: ["pandas", "NumPy", "Monte Carlo simulation", "Excel modeling"],
    evidence: "Used for the Hoops Stock Market pricing, the Dream League Soccer project, and my internship at Weiss Asset Management.",
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
    evidence: "Used for Hoops Stock Market, the StratEdge Africa website, and Supplement Recommender.",
  },
  {
    label: "Developer & AI tools",
    items: ["Git", "Cursor", "Claude Code", "OpenAI Codex", "NotebookLM", "OpenAI / OpenRouter APIs"],
    evidence:
      "What I use day to day for writing code, debugging, and research. Supplement Recommender uses the OpenRouter API for its suggestions.",
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
    evidence: "From Computer Engineering classes and labs.",
  },
];

export const interests = [
  {
    title: "Sports analytics",
    body: "Recruitment, the draft, transfers, and performance data. I’m most interested in figuring out which stats really tell you something about a player. Most of my projects are in this area.",
  },
  {
    title: "Health & human performance",
    body: "Wearables and sensors collect a lot of data about the body, and much of it is noisy. I’d like to help make that data reliable while letting people control how it’s used. It’s a big part of why I care about the hardware side.",
  },
  {
    title: "Quantitative systems",
    body: "I got into markets through probability, pricing, and risk. I used Monte Carlo simulations for portfolio modeling at Weiss Asset Management, and Hoops Stock Market runs on a two-layer pricing model.",
  },
];

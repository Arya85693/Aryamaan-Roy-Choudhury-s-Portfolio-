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
  /** Address shown in the browser-frame bar above the screenshot. */
  frameUrl?: string;
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
  /** Featured projects get the large card on the home page. */
  featured?: boolean;
  images: ImageAsset[];
  caseStudy: {
    problem: string;
    sections: { title: string; body?: string; points?: string[] }[];
    sampleOutput?: { title?: string; caption: string; columns: string[]; rows: string[][] };
    notes?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "matchup-dna",
    index: "01",
    title: "Matchup DNA",
    kind: "Machine learning · Quantitative research",
    period: "Oct 2026 – Present",
    role: "Solo developer",
    tagline: "Tennis win probabilities, locked in before the first serve.",
    summary:
      "A Python research system that rates every ATP and WTA player from their full match history and gives each upcoming match a win probability. Every forecast is stored before the match starts, and a Next.js site shows the forecasts, what drove them, and how they scored.",
    stack: ["Python", "NumPy", "scikit-learn", "LightGBM", "SQLite", "Next.js", "TypeScript"],
    highlights: [
      "Built calibrated ATP and WTA prediction models from Elo, surface Elo, logistic regression, and opponent-adjusted serve and return features, each tested on later years than it was trained on.",
      "Back-tested the models against betting-market prices on 13,846 matches, measuring calibration, whether the model adds anything to the price, and simulated returns.",
      "Picked the winner in 65.9% of 31,791 matches from 2021 to October 2026, 1.7 percentage points more than always picking the higher-ranked player.",
    ],
    facts: [
      { value: "361k+", label: "pro matches in the history" },
      { value: "13,846", label: "matches tested against the market" },
      { value: "65.9%", label: "winners picked, 31,791 matches" },
    ],
    live: "https://www.matchupdna.com/",
    github: "https://github.com/Arya85693/matchup-dna",
    featured: true,
    images: [
      {
        src: "/project-images/matchupdna-home.png",
        alt: "Matchup DNA home page asking who wins the next match and how sure we should be, over a photo of a clay-court rally",
        width: 2524,
        height: 1322,
        frameUrl: "matchupdna.com",
      },
      {
        src: "/project-images/matchupdna-model-lab.png",
        alt: "Matchup DNA Model Lab comparing the log loss of Elo, surface Elo, and the Phase 3 and Phase 4 models with the betting market on the same 13,846 matches",
        width: 2514,
        height: 1320,
        frameUrl: "matchupdna.com/lab",
      },
      {
        src: "/project-images/matchupdna-compare.png",
        alt: "Matchup DNA player comparison of Jannik Sinner and Carlos Alcaraz with their Elo ratings and a 17-match head-to-head record split by surface",
        width: 2522,
        height: 1322,
        frameUrl: "matchupdna.com/players/compare",
      },
    ],
    caseStudy: {
      problem:
        "Rankings and Elo tell you who is stronger, but not how likely an upset is, or whether a forecast deserves any trust. I wanted to build tennis forecasts the way a quant research team would: probabilities that mean what they say, tested only on matches the model had never seen, compared with the betting market, and recorded before every match so the track record can’t be edited afterwards.",
      sections: [
        {
          title: "Data & point-in-time features",
          body:
            "The history is 361,571 tour-level ATP and WTA matches from Jeff Sackmann’s archive, plus two newer sources that I audited against it match by match, and ESPN scoreboards for upcoming fixtures. Every feature is built by replaying matches in date order, so a forecast only ever uses information from before its match. Players are linked across sources by a tested identity crosswalk rather than by name, because the sources spell names differently.",
        },
        {
          title: "Models, one phase at a time",
          points: [
            "Elo and surface-adjusted Elo first, with their settings tuned on 1990–2009 and scored on later years.",
            "A logistic regression that adds ranking, time away from the tour, and recent form. On 13,732 held-back matches from 2024 to May 2026 it beat recalibrated surface Elo by 0.0078 log loss per match, on both tours and in every year.",
            "Opponent-adjusted serve and return estimates that shrink short records toward the tour average and give recent matches more weight.",
            "A round-aware model that also uses the earlier rounds of the same tournament. It was the clearest gain, with an interval that excluded zero in every test period.",
            "LightGBM was no better than the logistic model with the same inputs, so I kept the logistic model because it can be explained term by term.",
          ],
        },
        {
          title: "Testing without fooling myself",
          points: [
            "Chronological splits: training on 2010–2020, choosing models on 2021–2023, and scoring the final choice once on 2024 onward.",
            "A keep rule fixed in advance for every new feature, and a frozen protocol, with hashes of the code and every input, written before each final test.",
            "The pre-registered June–October 2026 test of the serve-return model gained 0.0040 log loss per match, but its interval just included zero (p = 0.055), so I report it as not proven.",
            "After that test I found 65 matches counted twice when two sources were combined. I fixed it and published an erratum, and kept the original result as the official one.",
            "Calibration is checked, not assumed: when the model gives a player about 75%, that player wins about 74% of the time.",
          ],
        },
        {
          title: "Against the betting market",
          points: [
            "Opening odds with the bookmaker’s margin removed, using a method chosen on 2021–2023 only.",
            "The market beat the best model by 0.024 log loss per match on 13,846 matches. Blending the model into the price added nothing, and where the two disagreed, results followed the market.",
            "A paper betting rule that backed the model’s value picks lost 8.9% per unit staked. That is a negative result, and the site reports it plainly.",
          ],
        },
        {
          title: "Live forecasting & the website",
          points: [
            "Both frozen models run twice a day and issue forecasts at least 30 minutes before each match starts.",
            "Forecasts go into append-only SQLite tables with a hash chain, plus a public ledger committed to Git, so no forecast can be changed after its match.",
            "A prospective record started on 9 November 2026 and gets its one final evaluation in July 2027.",
            "The Next.js site on Vercel reads published snapshots, checks each file against a SHA-256 manifest, and never computes a probability in the browser. It has match forecasts with the inputs behind them, player profiles and head-to-heads, a Model Lab, and a forecast archive.",
          ],
        },
      ],
      sampleOutput: {
        title: "Benchmark results",
        caption: "Every forecast scored on the same 13,846 matches, January 2024 to October 2026. Lower log loss is better.",
        columns: ["Forecast", "Accuracy", "Log loss"],
        rows: [
          ["Betting market (opening)", "68.07%", "0.5896"],
          ["Phase 4 model", "65.42%", "0.6132"],
          ["Phase 3 model", "65.27%", "0.6156"],
          ["Surface Elo", "64.53%", "0.6266"],
          ["Elo", "64.44%", "0.6267"],
        ],
      },
      notes:
        "Matchup DNA is a research project, not betting advice, and the betting market forecasts better than it does. The 65.9% accuracy figure pools 2021–2026, including years used to choose the model, so the pre-registered tests above are the stronger evidence.",
    },
  },
  {
    slug: "hoops-stock-market",
    index: "02",
    featured: true,
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
    github: "https://github.com/Arya85693/NBA-superstar-prediction",
    images: [
      {
        src: "/project-images/hoopsstockmarket-landing.png",
        alt: "Hoops Stock Market home page showing a near real-time market snapshot with board total, repricing pulse, and latest mover",
        width: 1024,
        height: 540,
        frameUrl: "hoopsstockmarket.com",
      },
      {
        src: "/project-images/hoopsstockmarket-player.png",
        alt: "Hoops Stock Market player page for Anthony Edwards with a written player insight and a paper-trade panel",
        width: 1024,
        height: 486,
        frameUrl: "hoopsstockmarket.com/player",
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

// Research & Technical Communication: ENGW3302 (Advanced Writing in the Technical Professions) coursework.
// Kept apart from `projects` on purpose: these are writing and communication pieces, not software.

export const researchCourse = "ENGW3302 Advanced Writing in the Technical Professions · Northeastern University";

export const researchPaper = {
  id: "research-paper",
  label: "Research Paper 01",
  title: "Wearable Technology and Injury Prevention",
  fullTitle: "From Accurate Measurements to Injury Prevention – Evaluating Wearable Sensor Reliability in Sports",
  category: "Academic Research · Technical Writing",
  description:
    "An academic research paper examining the reliability and limitations of wearable sensor technology in sports biomechanics and injury-risk assessment. Drawing on six peer-reviewed studies, the research distinguishes accurate movement measurement, injury-risk prediction, and evidence of actual injury prevention.",
  skills: ["Research Synthesis", "Technical Writing", "Sports Biomechanics", "Critical Analysis", "Academic Research"],
  facts: [
    { value: "6", label: "peer-reviewed studies" },
    { value: "IEEE", label: "citation style" },
    { value: "3", label: "claims kept separate" },
  ],
  pdf: "/research/wearable-tech-injury-prevention-paper.pdf",
  preview: {
    src: "/research/paper-preview.webp",
    alt: "First page of the paper, From Accurate Measurements to Injury Prevention, showing its problem statement, introduction, and the start of the synthesis",
    width: 1224,
    height: 1584,
  },
};

export type InfographicSlide = { src: string; alt: string };

export const infographic = {
  id: "research-infographic",
  label: "Infographic 02",
  title: "Can Wearable Technology Actually Prevent Injuries?",
  category: "Multimodal Technical Communication · Data Visualization",
  description:
    "An eight-panel Instagram-style educational carousel adapting my academic research for athletes and coaches. It combines sports photography, diagrams, scientific findings, and data visualization to explain why collecting performance data does not automatically lead to injury prevention.",
  skills: [
    "Scientific Communication",
    "Data Visualization",
    "Information Design",
    "Audience Adaptation",
    "Canva",
    "Datawrapper",
  ],
  pdf: "/research/wearable-tech-injury-prevention-infographic.pdf",
  // Rendered from the original PDF at 1440 × 1800 (the PDF's own 4:5 page size, scaled uniformly; nothing cropped).
  width: 1440,
  height: 1800,
  slides: [
    {
      src: "/research/infographic/slide-01.webp",
      alt: "Title slide: “Can wearable tech actually prevent injuries?” over a photo of a footballer in a blue kit bent over, holding his leg. Subtitle: “More tracking data doesn’t always mean fewer injuries. Here’s what the research tells us.”",
    },
    {
      src: "/research/infographic/slide-02.webp",
      alt: "“What do wearables actually track?” Photos of three footballers wearing tracking gear above four cards: distance (how far an athlete travels during training or competition), speed (how fast an athlete runs, including high-speed efforts), acceleration (how quickly an athlete speeds up or slows down), and joint motion (estimates of joint angles and movement patterns). Footer: “Tracking movement isn’t the same as predicting injury.”",
    },
    {
      src: "/research/infographic/slide-03.webp",
      alt: "“Tracking is not prevention.” Three stacked steps: 01 Track, measure movement and training workload (what happened?); 02 Predict, use patterns to estimate potential injury risk (what might happen?); 03 Prevent?, demonstrate that data-guided decisions actually reduce injuries (did the intervention work?). Footer: “An accurate measurement is not proof of injury prevention.”",
    },
    {
      src: "/research/infographic/slide-04.webp",
      alt: "“How accurate are wearable sensors?” One study, Ekdahl et al. (2023) with 11 participants, found differences from under 0.1° to 24.1° between wearable IMU and laboratory motion-capture joint-angle measurements. Readings differ with calibration, movement, and joint or angle. Footer: “A sensor that works well for one movement may be less accurate for another.”",
    },
    {
      src: "/research/infographic/slide-05.webp",
      alt: "“When workload spikes, injury risk can rise.” A bar chart of relative non-contact injury risk at very high acute-to-chronic workload ratios among players with low chronic workloads, from Bowen et al. (2020): decelerations 6.58, accelerations 5.90, low-intensity distance 5.39. Headline figure: 5–7x higher relative risk under these conditions, in 33 professional footballers over 3 seasons. Footer: “Higher observed injury risk does not mean that wearable monitoring has been proven to prevent injuries.”",
    },
    {
      src: "/research/infographic/slide-06.webp",
      alt: "“What wearable data can and can’t tell us.” Can help: track workload, spot changes, inform decisions. Can’t guarantee: exact injury risk, universal accuracy, injury prevention. Footer: “Use wearable data as a tool for decision-making – not as a guarantee of athlete safety.”",
    },
    {
      src: "/research/infographic/slide-07.webp",
      alt: "“Use the data. Don’t blindly trust it.” Three steps: 01 check the measurements (use sensors validated for the movement and metric being tracked), 02 look at the pattern (compare recent workloads with the athlete’s training history), 03 add human judgment (consider athlete feedback and professional assessment before making changes). Closing line: “Better data + better judgment: more informed decisions – not guaranteed injury prevention.”",
    },
    {
      src: "/research/infographic/slide-08.webp",
      alt: "“The research behind the data.” Featured research: Ekdahl et al. (2023), how sensor calibration affects movement measurement accuracy (panel 4), and Bowen et al. (2020), how training workload patterns relate to injury rates (panel 5). Additional studies: Chia et al. (2021), Macadam et al. (2019), Mason et al. (2024), Kim et al. (2026). A QR code links to the full reference list.",
    },
  ] satisfies InfographicSlide[],
};

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
    summary:
      "An early-stage startup developing an adaptive learning platform. Contributed to learner-facing interfaces, assessment workflows, and company registration functionality.",
    bullets: [
      "Built a learner dashboard using Next.js and React, integrating training scenarios, category filters, module listings, and progress indicators.",
      "Developed adaptive assessment logic in TypeScript, implementing performance-based progression, targeted micro-learning, and remediation workflows.",
      "Built company registration forms using TypeScript and Zod, implementing input validation, API payload transformation, and backend registration integration.",
    ],
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zod", "REST APIs"],
    note: "Additional implementation details are confidential while the product remains in development.",
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
      "I use Python and SQL the most, mainly for Matchup DNA and Hoops Stock Market. I use TypeScript for web work like the Matchup DNA, Hoops, and StratEdge Africa sites. Java and OCaml are from classes, and I’m working on getting better at C++.",
  },
  {
    label: "Data & quantitative",
    items: ["pandas", "NumPy", "scikit-learn", "LightGBM", "Logistic regression", "Elo ratings", "Calibration & backtesting", "Monte Carlo simulation", "Excel modeling"],
    evidence: "Used for the Matchup DNA models and market backtests, the Hoops Stock Market pricing, and my internship at Weiss Asset Management.",
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
      "SQLite",
      "MongoDB",
      "Vercel",
    ],
    evidence: "Used for Matchup DNA, Hoops Stock Market, the StratEdge Africa website, and Supplement Recommender.",
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
    body: "I got into markets through probability, pricing, and risk. I used Monte Carlo simulations for portfolio modeling at Weiss Asset Management, Hoops Stock Market runs on a two-layer pricing model, and Matchup DNA tests its tennis forecasts against betting-market prices.",
  },
];

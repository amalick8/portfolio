export const profile = {
  name: "Ammar Malick",
  fullName: "Muhammad Ammar Malick",
  tagline: "Software Engineering @ UTD · AI systems, full-stack, data infrastructure",
  headline: "I build real-world software with measurable impact.",
  bio: "I'm Ammar — a Software Engineering student transferring to UT Dallas after two years in UTA's Honors College. I build production systems across AI, full-stack platforms, data pipelines, information retrieval, and storage engines, with a 3.9 CGPA and a track record of shipping measurable results.",
  email: "ammarmalick2006@gmail.com",
  github: "https://github.com/amalick8",
  githubHandle: "amalick8",
  linkedin: "https://www.linkedin.com/in/ammar-malick-1023b9278/",
};

export const heroStats = [
  { value: "3.9", label: "CGPA (Software Engineering)" },
  { value: "4,500+", label: "LinkedIn followers" },
  { value: "1,000+", label: "GitHub commits" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export type ExperienceEntry = {
  index: string;
  org: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
  stat?: string;
  statLabel?: string;
};

export const experience: ExperienceEntry[] = [
  {
    index: "01",
    org: "The University of Texas at Dallas",
    location: "Dallas, TX",
    role: "B.S. Software Engineering",
    dates: "Aug 2026 — May 2028 (Expected)",
    bullets: [
      "Transfer Scholarship Recipient with more than $50,000 awarded.",
      "Continuing software engineering track after completing two years at UTA's Honors College.",
    ],
  },
  {
    index: "02",
    org: "The University of Texas at Arlington",
    location: "Arlington, TX",
    role: "Software Engineering, Honors College",
    dates: "2024 — 2026",
    bullets: [
      "Earned a 3.93 GPA while completing honors coursework in software engineering.",
      "Recognized on the Dean's List 3x and received the Freshman Distinction Award 2x.",
    ],
    stat: "3.93",
    statLabel: "UTA GPA",
  },
  {
    index: "03",
    org: "BlueCiate",
    location: "Dallas, TX (Hybrid)",
    role: "Software Engineering Intern",
    dates: "Oct 2025 — Mar 2026",
    bullets: [
      "Engineered and optimized REST API integrations and backend data workflows, reducing average request latency by 38% across 10K+ monthly operations.",
      "Collaborated with senior engineers to train and evaluate scikit-learn classification models across accuracy, precision, and recall.",
      "Refactored database queries and application logic across 15+ production modules, reducing redundant queries by 45% and improving page-load performance by 30%.",
    ],
    stat: "38%",
    statLabel: "Request latency reduction",
  },
  {
    index: "04",
    org: "Caliph Digital",
    location: "Edmonton, AB (Hybrid)",
    role: "Web Development Intern",
    dates: "Oct 2024 — May 2025",
    bullets: [
      "Optimized rendering, asset delivery, and frontend requests, reducing page-load time by 38% and improving Lighthouse scores by 25+ points.",
      "Integrated REST APIs, client-side validation, and error-handling states across interactive user flows supporting 1,000+ monthly interactions.",
      "Developed responsive web experiences across 8+ production pages, translating Figma designs into reusable React components.",
    ],
    stat: "25+",
    statLabel: "Lighthouse points gained",
  },
  {
    index: "05",
    org: "Intel + The Recording Academy",
    location: "Remote",
    role: "Industry Data Projects",
    dates: "Summer 2025",
    bullets: [
      "Analyzed 600K+ Intel devices, quantifying 6,768 tons of CO2 savings and identifying 2x greater per-device energy savings among devices aged 6+ years.",
      "Applied Python and SQL to industry datasets for Intel and The Recording Academy, transforming raw data into decision-oriented technical findings.",
    ],
    stat: "600K+",
    statLabel: "Devices analyzed",
  },
  {
    index: "06",
    org: "EY",
    location: "Remote",
    role: "Expedition Fellow",
    dates: "Mar 2026 — Jun 2026",
    bullets: [
      "Completed EY's Expedition Intermediate (Level 2) fellowship focused on technology, data, AI, and digital transformation.",
      "Developed stronger business context for technical delivery, consulting workflows, and stakeholder-facing decision-making.",
    ],
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Web / Backend",
    items: ["React", "Next.js", "FastAPI", "Node.js", "REST APIs"],
  },
  {
    category: "Systems / Data",
    items: ["PostgreSQL", "Docker", "Linux", "Supabase", "Pandas", "scikit-learn"],
  },
  {
    category: "AI / Concepts",
    items: ["LLM APIs", "LoRA Fine-Tuning", "Information Retrieval", "Concurrency", "System Design", "Claude Code", "Codex"],
  },
];

export type Project = {
  name: string;
  tags: string;
  description: string;
  repo: string | null;
  accessLabel: string;
};

export const projects: Project[] = [
  {
    name: "vlens-ai-showcase",
    tags: "React · TypeScript · Python · FastAPI · PostgreSQL · LLM APIs",
    description:
      "Value intelligence platform that transforms messy operating data into evidence-backed, dollar-quantified findings and actionable growth opportunities.",
    repo: "https://github.com/amalick8/vlens-ai-showcase",
    accessLabel: "Open repo",
  },
  {
    name: "SearchEngine-CLI",
    tags: "C++17 · BM25 · TF-IDF · Multithreading",
    description:
      "C++ search engine with inverted indexing, TF-IDF/BM25 ranking, multithreaded document processing, and millisecond query execution.",
    repo: "https://github.com/amalick8/SearchEngine-CLI",
    accessLabel: "Open repo",
  },
  {
    name: "portfolio",
    tags: "TypeScript · Next.js · React · Framer Motion",
    description:
      "Polished portfolio system presenting education, internships, technical projects, measurable impact, and GitHub work through a responsive animated experience.",
    repo: "https://github.com/amalick8/portfolio",
    accessLabel: "Open repo",
  },
  {
    name: "Camera-Mouse-Controller",
    tags: "Python · OpenCV · MediaPipe",
    description:
      "Hands-free accessibility controller using computer vision to move, click, and toggle cursor control through real-time hand gestures and facial landmarks.",
    repo: "https://github.com/amalick8/Camera-Mouse-Controller",
    accessLabel: "Open repo",
  },
  {
    name: "Grammy-Web-Data-Analysis",
    tags: "Jupyter Notebook · Python · Data Analysis",
    description:
      "Official Grammy and Recording Academy web analytics project turning audience and performance data into clear, decision-oriented technical findings.",
    repo: "https://github.com/amalick8/Grammy-Web-Data-Analysis",
    accessLabel: "Open repo",
  },
  {
    name: "mini-lsm-storage-engine",
    tags: "Python · LSM Trees · WAL · SSTables · Bloom Filters",
    description:
      "Persistent LSM-tree key-value storage engine with memtables, WAL, SSTables, Bloom filters, block caching, leveled compaction, crash recovery, and concurrent reads/writes.",
    repo: "https://github.com/amalick8/mini-lsm-storage-engine",
    accessLabel: "Open repo",
  },
];

export const githubStats = [
  { value: "42", label: "repositories" },
  { value: "1,000+", label: "commits" },
  { value: "Pull Shark + YOLO", label: "achievements" },
];

export type ResultCase = {
  index: string;
  org: string;
  domain: string;
  title: string;
  stats: { value: string; label: string }[];
  description: string;
};

export const results: ResultCase[] = [
  {
    index: "01",
    org: "VLens",
    domain: "B2B Financial Intelligence",
    title: "Production AI platform",
    stats: [
      { value: "$50K+", label: "ARR generated" },
      { value: "10M+", label: "Records processed" },
      { value: "229", label: "Backend tests passing" },
    ],
    description:
      "Built financial ingestion, validation, permissioning, and LLM-assisted analysis workflows for a production B2B platform serving 10+ businesses.",
  },
  {
    index: "02",
    org: "SearchEngine",
    domain: "Information Retrieval",
    title: "Low-latency retrieval engine",
    stats: [
      { value: "1.2M+", label: "Documents indexed" },
      { value: "61%", label: "p95 latency reduction" },
      { value: "240+", label: "Queries/sec sustained" },
    ],
    description:
      "Implemented inverted indexes, BM25/TF-IDF ranking, concurrent query execution, and heap-based top-k retrieval in C++17.",
  },
  {
    index: "03",
    org: "Intel + Recording Academy",
    domain: "Industry Data Projects",
    title: "Decision-oriented analytics",
    stats: [
      { value: "600K+", label: "Intel devices analyzed" },
      { value: "6,768t", label: "CO2 savings quantified" },
      { value: "4,500+", label: "LinkedIn followers" },
    ],
    description:
      "Applied Python and SQL to industry datasets, turning raw sustainability and web-performance data into technical findings stakeholders could use.",
  },
];

export const focusAreas = [
  { tag: "DSA", description: "Daily pattern-based reps and mock interviews." },
  { tag: "AI", description: "Shipping evidence-grounded LLM systems with production polish." },
  { tag: "Systems", description: "Building retrieval engines, storage layers, and backend infrastructure." },
];

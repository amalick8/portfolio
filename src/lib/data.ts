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
    org: "UT Arlington",
    location: "Dallas, TX",
    role: "Campus Tour Guide",
    dates: "Mar 2025 — Present",
    bullets: [
      "Representing UTA to prospective students and families through structured campus walkthroughs.",
      "Strengthening communication and live stakeholder-facing presentation skills.",
    ],
  },
  {
    index: "02",
    org: "EY",
    location: "Remote",
    role: "Expedition EY Program Participant",
    dates: "Mar 2026 — Jun 2026",
    bullets: [
      "Participating in a structured apprenticeship focused on consulting, technology, and delivery workflows.",
      "Developing stronger business context for engineering decisions in real-world teams.",
    ],
  },
  {
    index: "03",
    org: "ACM @ UT Arlington",
    location: "Dallas, TX",
    role: "Researcher",
    dates: "Feb 2026 — May 2026",
    bullets: [
      "Supporting introductory machine learning research through technical and market analysis.",
      "Contributing structured research notes and exploratory findings for team discussions.",
    ],
  },
  {
    index: "04",
    org: "BlueCiate",
    location: "Dallas, Hybrid",
    role: "Software Engineer Intern",
    dates: "Jan 2026 — Mar 2026",
    bullets: [
      "Built Python automation pipelines (pandas + file handling) for recurring internal data prep workflows.",
      "Reduced manual processing time by roughly 20–25% through repeatable script-based formatting steps.",
      "Contributed updates to application components while learning React architecture and data flow.",
    ],
    stat: "~22%",
    statLabel: "Processing time saved",
  },
  {
    index: "05",
    org: "BlueCiate",
    location: "Internship",
    role: "Frontend Developer",
    dates: "Oct 2025 — Dec 2025",
    bullets: [
      "Implemented and refined responsive UI components for active product surfaces.",
      "Shipped incremental front-end improvements using React and modern design patterns.",
    ],
  },
  {
    index: "06",
    org: "Recording Academy x GCA",
    location: "Remote",
    role: "Web Performance",
    dates: "Jun 2025 — Aug 2025",
    bullets: [
      "Analyzed 2,300+ days of traffic/engagement data using Python (Pandas) to evaluate site behavior.",
      "Built Plotly visualizations to compare trends before and after the platform split.",
      "Automated analysis workflows, reducing manual reporting effort by around 30%.",
    ],
    stat: "2,300+",
    statLabel: "Days of data analyzed",
  },
  {
    index: "07",
    org: "Intel x GCA",
    location: "Remote",
    role: "Sustainability Analytics",
    dates: "Jun 2025 — Aug 2025",
    bullets: [
      "Used Python (Pandas) and SQL to analyze repurposed-device and environmental impact datasets.",
      "Built dashboards to explore energy savings, e-waste reduction, and CO2 impact trends.",
      "Automated cleaning/analysis stages and reduced manual processing by roughly 25–30%.",
    ],
    stat: "601K+",
    statLabel: "Devices analyzed",
  },
  {
    index: "08",
    org: "Caliph Digital",
    location: "Edmonton, Hybrid",
    role: "Client Solutions & Web Dev Intern",
    dates: "Oct 2024 — May 2025",
    bullets: [
      "Built and maintained client websites primarily in Webflow with targeted HTML/CSS customizations.",
      "Improved responsiveness and usability through iterative styling and layout updates.",
      "Collaborated with team members on feedback cycles and production issue resolution.",
    ],
  },
  {
    index: "09",
    org: "Iqra Islamic School",
    location: "On-site",
    role: "Admin & IT Support",
    dates: "Jan 2023 — Jun 2023",
    bullets: [
      "Handled daily operations support, basic IT troubleshooting, and documentation tasks.",
      "Built a foundation for dependable execution in structured, fast-paced environments.",
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

export const profile = {
  name: "Ammar Malick",
  fullName: "M. Ammar Malick",
  tagline: "Software Engineering & Honors @ UTA · AI + Full-Stack Builder",
  headline: "I build real-world software with measurable impact.",
  bio: "I'm Ammar Malick, a Software Engineering student (3.95 GPA) focused on AI-driven and full-stack systems. I have experience across startups, industry, and data projects through BlueCiate, EY Expedition, Intel, and The Recording Academy.",
  email: "ammarmalick2006@gmail.com",
  github: "https://github.com/amalick8",
  githubHandle: "amalick8",
  linkedin: "https://www.linkedin.com/in/ammar-malick-1023b9278/",
};

export const heroStats = [
  { value: "3.95", label: "UTA GPA (Software Engineering & Honors)" },
  { value: "3,600+", label: "LinkedIn followers" },
  { value: "1,000+", label: "GitHub commits" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Hackathons", href: "#hackathons" },
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
    items: ["Python", "C++", "JavaScript", "PostgreSQL"],
  },
  {
    category: "Web / Backend",
    items: ["HTML", "CSS", "React", "Flask", "REST API"],
  },
  {
    category: "Data / AI",
    items: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch", "OpenCV", "MediaPipe"],
  },
  {
    category: "Tools",
    items: ["AWS", "Render", "Docker", "Supabase", "Git", "VS Code", "Cursor", "Claude Code"],
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
    name: "ForgeAI",
    tags: "TypeScript · Python · Next.js",
    description:
      "AI-powered career audit platform analyzing GitHub, LeetCode, resumes, and ATS readiness.",
    repo: "https://github.com/amalick8/ForgeAI",
    accessLabel: "Open repo",
  },
  {
    name: "PetroView",
    tags: "Python",
    description:
      "AI-driven energy analytics platform exploring oil supply dynamics, pricing shifts, and supply shock patterns.",
    repo: "https://github.com/amalick8/PetroView",
    accessLabel: "Open repo",
  },
  {
    name: "Technical-Interview-Preparation",
    tags: "Python",
    description:
      "Daily DSA preparation with pattern-based reps, clear notes, and consistent execution.",
    repo: "https://github.com/amalick8/Technical-Interview-Preparation",
    accessLabel: "Open repo",
  },
  {
    name: "Camera-Mouse-Controller",
    tags: "Python + Computer Vision",
    description:
      "Hands-free controller using OpenCV and MediaPipe for gesture-based cursor movement and actions.",
    repo: "https://github.com/amalick8/Camera-Mouse-Controller",
    accessLabel: "Open repo",
  },
  {
    name: "Grammy-Web-Data-Analysis",
    tags: "Jupyter Notebook",
    description:
      "Official analytics work for Grammy and Recording Academy web performance and audience engagement.",
    repo: "https://github.com/amalick8/Grammy-Web-Data-Analysis",
    accessLabel: "Open repo",
  },
  {
    name: "Overwatch",
    tags: "TypeScript (Private)",
    description:
      "Real-time operational intelligence dashboard using computer vision to track activity and productivity metrics.",
    repo: null,
    accessLabel: "Request access",
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
    org: "Recording Academy",
    domain: "Analytics",
    title: "Awards-night traffic anomaly",
    stats: [
      { value: "1.39M", label: "Peak daily traffic" },
      { value: "~32K", label: "Avg daily baseline" },
      { value: "+4,190%", label: "Spike vs baseline" },
    ],
    description:
      "Processed 2,700+ days of platform data and isolated the awards-night spike that outstripped the baseline by roughly 40x.",
  },
  {
    index: "02",
    org: "Intel",
    domain: "Sustainability",
    title: "Device lifecycle impact",
    stats: [
      { value: "6,768t", label: "CO2 emissions saved" },
      { value: "601,740", label: "Devices analyzed" },
      { value: "Lifecycle", label: "Extension modeled end-to-end" },
    ],
    description:
      "Evaluated 601,740 repurposed devices and quantified 6,768 tons of CO2 savings through lifecycle extension.",
  },
  {
    index: "03",
    org: "LinkedIn",
    domain: "Community Presence",
    title: "Connections & 7-day reach",
    stats: [
      { value: "3,600+", label: "LinkedIn followers" },
      { value: "141", label: "Post impressions" },
      { value: "131", label: "Search appearances" },
    ],
    description:
      "Audience of 3,600+ LinkedIn followers with a recent 7-day snapshot: 141 post impressions and 131 search appearances — inbound from recruiters, engineering leads, and fellow builders.",
  },
];

export const focusAreas = [
  { tag: "DSA", description: "Daily pattern-based reps and mock interviews." },
  { tag: "AI", description: "Shipping real-world AI builds with production polish." },
  { tag: "Arc", description: "Trajectory toward high-impact sales engineering." },
];

export type Hackathon = {
  index: string;
  name: string;
  placement: string;
  domain: string;
  description: string;
};

export const hackathons: Hackathon[] = [
  {
    index: "01",
    name: "HackUTA 2024",
    placement: "Top 10",
    domain: "Computer Vision · Python",
    description:
      "Built a hands-free accessibility controller using OpenCV and MediaPipe — real-time gesture recognition driving mouse cursor movement and click actions.",
  },
  {
    index: "02",
    name: "AI Build Sprint",
    placement: "Finalist",
    domain: "AI · Next.js",
    description:
      "Developed an AI-powered career analysis tool that parsed resumes and GitHub activity to surface actionable readiness signals for technical roles.",
  },
  {
    index: "03",
    name: "DataThon @ UTA",
    placement: "1st Place",
    domain: "Data Analytics · Python",
    description:
      "Analyzed energy and sustainability datasets to model CO2 savings from device lifecycle extension — built interactive dashboards for real-time exploration.",
  },
];

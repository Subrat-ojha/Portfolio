/**
 * All copy lives here so the design can be re-skinned without touching markup.
 * Content is taken from Subrat Ojha's resume (Aug 2026).
 */

export const profile = {
  name: "Subrat Ojha",
  monogram: "SO",
  role: "Software Developer",
  tagline:
    "A software developer building dependable backend systems and AI-powered applications.",
  location: "Hyderabad, India",
  timeZone: "Asia/Kolkata",
  email: "iamsubratojha@gmail.com",
  phone: "+91 91145 00734",
  status: "Software Developer at IbaseIT",
  resumeUrl: "/Subrat_Ojha_Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Subrat-ojha" },
    { label: "LinkedIn", href: "https://linkedin.com/in/subratojha" },
    { label: "LeetCode", href: "https://leetcode.com/u/Subrat_ojha/" },
    { label: "Résumé", href: "/Subrat_Ojha_Resume.pdf" },
    { label: "Email", href: "mailto:iamsubratojha@gmail.com" },
  ],
};

export const intro = {
  eyebrow: "01 / About",
  heading: "I build the quiet parts of the product.",
  paragraphs: [
    "I'm a software developer at IbaseIT in Hyderabad, working on Danni, a vehicle-insurance platform. My days are REST APIs for quotes, policy purchase, renewals and instalment plans — plus the unglamorous work that makes those flows trustworthy.",
    "I use AI where it actually pays off: a retrieval-augmented pipeline that standardises insurance client setup, and ResumeXpert, a resume-tailoring platform built with Spring AI and LangChain4j. Correctness first — idempotent writes, event-driven flows, and tests that catch regressions before users do.",
  ],
  now: [
    ["Based in", "Hyderabad, India · IST"],
    ["Working on", "Danni — vehicle insurance platform"],
    ["Building", "ShipCommerce · Java 21 / Spring Boot"],
    ["Learning", "Spring AI · LangChain4j · custom MCP"],
    ["Community", "CRY volunteer · Little Hope"],
    ["Off-screen", "Hackathons, yoga, badminton"],
  ] as [string, string][],
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  year: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  private?: boolean;
};

export const projects: Project[] = [
  {
    id: "shipcommerce",
    title: "ShipCommerce",
    summary: "A correctness-first ecommerce backend across 19 Maven modules.",
    detail:
      "Catalog, identity, pricing, inventory, cart, checkout, payments, orders, fulfilment, returns and settlements. Event-driven flows with Kafka, transactional outbox/inbox, idempotent checkout, TTL stock reservations, payment reconciliation and a double-entry ledger — validated with Flyway, JUnit, Testcontainers, ArchUnit and k6.",
    year: "2025",
    tags: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "Redis"],
    private: true,
  },
  {
    id: "resumexpert",
    title: "ResumeXpert",
    summary: "An AI platform that tailors a resume to the job it's applying for.",
    detail:
      "Uploads and resume management, ATS-focused keyword recommendations with visible optimisation results, job discovery and application tracking, plus AI-generated interview preparation — built with Spring AI and LangChain4j and shipped as a responsive web app.",
    year: "2025",
    tags: ["Spring Boot", "Spring AI", "LangChain4j", "React"],
    href: "https://resumexpert.ai",
    linkLabel: "resumexpert.ai",
  },
  {
    id: "danni",
    title: "Danni — Vehicle Insurance",
    summary: "Quote, buy, renew and pay for insurance without the edge cases.",
    detail:
      "REST APIs for vehicle-insurance instalment plans, quote generation, policy purchase and renewal at IbaseIT. Delivered MBI, GAP and SMART product setups for client implementations, carried a third-party AJR upgrade across eleven modules, and built an AI-assisted RAG pipeline that standardises reusable configuration and API artifacts.",
    year: "2025",
    tags: ["REST APIs", "RAG", "Java", "SQL"],
    private: true,
  },
  {
    id: "hospital",
    title: "Hospital Management System",
    summary: "Appointments that respect doctor availability.",
    detail:
      "Two implementations — Core Java with JDBC and a Spring Boot/Spring Data JPA version — with database-backed CRUD for patient and doctor records. Appointment scheduling checks availability first, cutting conflicts and improving coordination.",
    year: "2024",
    tags: ["Java", "Spring Boot", "JPA", "Oracle"],
    href: "https://github.com/Subrat-ojha/Hospital-Management-System",
    linkLabel: "Source",
  },
  {
    id: "webserver",
    title: "MultiThreaded Web Server",
    summary: "A Java socket server that holds 100+ connections at once.",
    detail:
      "Thread-per-connection processing with explicit synchronisation and exception handling, built to understand concurrency by making it misbehave first.",
    year: "2024",
    tags: ["Java", "Sockets", "Concurrency"],
    href: "https://github.com/Subrat-ojha/MultiThreaded-WebServer",
    linkLabel: "Source",
  },
];

export const stack = [
  {
    group: "Languages",
    items: ["Java 21", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    group: "Java & Backend",
    items: [
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "JDBC",
      "Maven",
      "Gradle",
    ],
  },
  {
    group: "Data & Messaging",
    items: ["PostgreSQL", "Oracle", "Redis", "Kafka", "Flyway"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Docker", "Docker Compose", "CI/CD", "Git/GitHub"],
  },
  {
    group: "Testing & Architecture",
    items: [
      "JUnit",
      "Testcontainers",
      "ArchUnit",
      "Event-driven",
      "Microservices",
    ],
  },
  {
    group: "AI",
    items: ["Spring AI", "LangChain4j", "RAG pipelines", "Custom MCP"],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer",
    org: "IbaseIT · Hyderabad",
    period: "Apr 2025 — Present",
    points: [
      "Built REST APIs for vehicle-insurance instalment plans, quote generation, policy purchase and renewal workflows on the Danni platform.",
      "Automated repetitive API creation across insurance schemes and client implementations with AI-assisted development workflows, improving consistency and cutting manual effort.",
      "Delivered the MBI (Mechanical Breakdown Insurance), GAP and SMART product setups for major clients.",
      "Implemented a third-party AJR upgrade across the full application, updating and validating integration changes in 11 modules.",
      "Built an AI-assisted RAG pipeline that automates insurance client setup and standardises reusable configuration and API artifacts.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Krupajal Engineering College, Bhubaneswar",
    period: "2022 — 2024",
    detail: "CGPA 8.0",
  },
  {
    degree: "Bachelor of Computer Applications",
    institution: "Bhadrak Autonomous College, Bhadrak",
    period: "2017 — 2020",
    detail: "73%",
  },
];

export const community = [
  {
    title: "2× hackathon winner",
    detail: "Built and pitched under a clock, twice, and came out on top.",
  },
  {
    title: "Volunteer · CRY",
    detail:
      "Contribute to Child Rights and You; received a letter of appreciation from the Kolkata branch administration.",
  },
  {
    title: "Member · Little Hope",
    detail:
      "Tree plantations and village welfare activities. Off-screen: meditation, yoga and badminton.",
  },
];

export const sections = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

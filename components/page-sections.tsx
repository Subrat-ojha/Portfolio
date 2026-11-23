import {
  community,
  education,
  experience,
  intro,
  profile,
  projects,
  stack,
} from "@/config/content";
import type { CSSProperties } from "react";
import { Portrait } from "./portrait";
import { SectionShell } from "./section-shell";

const stagger = (i: number): CSSProperties => ({ "--i": i }) as CSSProperties;

/* ------------------------------------------------------------------ about */

export function About() {
  return (
    <SectionShell
      id="about"
      index="01"
      eyebrow="About"
      title={intro.heading}
      titleClassName="max-w-[19ch] text-[clamp(1.95rem,4.6vw,2.95rem)] leading-[1.05] text-balance"
      bordered={false}
      className="pb-16 pt-16 sm:pb-20 sm:pt-20"
      bodyClassName="mt-7"
    >
      <div className="flex flex-col-reverse gap-9 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <div className="max-w-[52ch] space-y-4 text-[14.5px] leading-[1.8] text-muted">
            {intro.paragraphs.map((text, i) => (
              <p key={text.slice(0, 24)} className="sec-item" style={stagger(i)}>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="sec-item w-28 shrink-0 sm:w-36" style={stagger(2)}>
          <Portrait />
        </div>
      </div>

      <div className="sec-item mt-10" style={stagger(3)}>
        <div className="flex items-center gap-2.5 border-t border-dashed border-line pt-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7fbf8f] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7fbf8f]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {profile.status}
          </span>
        </div>

        <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {intro.now.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2.5">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                {label}
              </dt>
              <dd className="text-right text-[12.5px] text-foreground/85">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------- work */

export function Work() {
  return (
    <SectionShell
      id="work"
      index="02"
      eyebrow="Selected work"
      title="Things I've built and still stand behind."
      meta={`0${projects.length} projects`}
      bodyClassName="mt-8"
    >
      <div className="border-t border-dashed border-line">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="work-row sec-item group relative grid gap-3 border-b border-dashed border-line py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-5"
            style={stagger(i)}
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-gold/80">
              0{i + 1}
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-[1.55rem] leading-none transition-colors duration-300 group-hover:text-gold">
                {project.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-snug text-foreground/90">
                {project.summary}
              </p>
              <p className="mt-2.5 max-w-[58ch] text-[13px] leading-[1.75] text-muted">
                {project.detail}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {project.tags.map((tag, j) => (
                  <span
                    key={tag}
                    className="chip chip-anim"
                    style={{ "--j": j } as CSSProperties}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
              <span className="font-mono text-[10px] text-muted">{project.year}</span>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-gold"
                  aria-label={`${project.title} — ${project.linkLabel ?? "open link"}`}
                >
                  {project.linkLabel ?? "Open"} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/60">
                  Private
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ stack */

export function Stack() {
  return (
    <SectionShell
      id="stack"
      index="03"
      eyebrow="Stack"
      title="Boring tools, used carefully."
      titleClassName="max-w-[24ch] text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight"
      meta={`0${stack.length} groups`}
    >
      <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
        {stack.map((group, i) => (
          <div
            key={group.group}
            className="sec-item border-t border-dashed border-line py-5"
            style={stagger(i)}
          >
            <h3 className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold/90">
              {group.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item, j) => (
                <li
                  key={item}
                  className="chip chip-anim"
                  style={{ "--j": j } as CSSProperties}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------- experience */

export function Experience() {
  return (
    <SectionShell
      id="experience"
      index="04"
      eyebrow="Experience"
      title="A short, honest timeline."
      meta="2025 — Present"
    >
      <div>
        {experience.map((item, i) => (
          <div
            key={`${item.role}-${item.period}`}
            className="sec-item grid gap-2 border-t border-dashed border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
            style={stagger(i)}
          >
            <span className="pt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
              {item.period}
            </span>
            <div>
              <h3 className="text-[15px] font-medium leading-snug text-foreground">
                {item.role}
                <span className="text-muted"> · {item.org}</span>
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {item.points.map((point, j) => (
                  <li key={point.slice(0, 20)} className="flex gap-2.5 text-[13px] leading-[1.7] text-muted">
                    <span
                      aria-hidden="true"
                      className="bullet-line mt-[0.6em] h-px w-3 shrink-0 bg-gold/60"
                      style={stagger(j)}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- education */

export function Education() {
  return (
    <SectionShell
      id="education"
      index="05"
      eyebrow="Education"
      title="Where the fundamentals came from."
      meta="MCA · BCA"
    >
      <div>
        {education.map((item, i) => (
          <div
            key={item.degree}
            className="sec-item grid gap-2 border-t border-dashed border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
            style={stagger(i)}
          >
            <span className="pt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
              {item.period}
            </span>
            <div>
              <h3 className="font-display text-[1.35rem] leading-snug text-foreground">
                {item.degree}
              </h3>
              <p className="mt-1 text-[13px] text-muted">{item.institution}</p>
              <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-gold/90">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- community */

export function Community() {
  return (
    <SectionShell
      id="community"
      index="06"
      eyebrow="Beyond code"
      title="Hackathons, trees, and a badminton court."
      titleClassName="max-w-[20ch] text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight text-balance"
      meta="Off-screen"
    >
      <div className="grid gap-x-10 gap-y-0 sm:grid-cols-3">
        {community.map((item, i) => (
          <div
            key={item.title}
            className="sec-item h-full border-t border-dashed border-line py-5"
            style={stagger(i)}
          >
            <span className="font-mono text-[9.5px] tracking-[0.16em] text-gold/80">
              0{i + 1}
            </span>
            <h3 className="mt-2.5 text-[14px] font-medium leading-snug text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-[12.5px] leading-[1.75] text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------------- contact */

export function Contact() {
  return (
    <SectionShell
      id="contact"
      index="07"
      eyebrow="Contact"
      title="Have something that needs to keep working?"
      titleClassName="max-w-[22ch] text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] text-balance"
    >
      <p className="sec-item max-w-[46ch] text-[14px] leading-[1.8] text-muted" style={stagger(0)}>
        I&apos;m happiest on backend reliability, insurance and payments
        workflows, and applied AI. Tell me what you are building and where it
        hurts.
      </p>

      <div className="sec-item mt-8" style={stagger(1)}>
        <a
          href={`mailto:${profile.email}`}
          className="mail-link group inline-flex items-center gap-3 pb-2 text-[clamp(1.05rem,2.6vw,1.5rem)] text-gold"
        >
          {profile.email}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </a>
        <div>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            {profile.phone}
          </a>
        </div>
      </div>

      <ul
        className="sec-item mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-line pt-5"
        style={stagger(2)}
      >
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className="u-link font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ----------------------------------------------------------------- footer */

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-7 sm:px-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
          Intro drawn in canvas · Set in Newsreader &amp; Figtree
        </p>
        <a
          href="#top"
          className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

import {
  community,
  education,
  experience,
  intro,
  profile,
  projects,
  stack,
} from "@/config/content";
import { Portrait } from "./portrait";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ about */

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_20%_0%,var(--ink-glow),transparent_65%)]"
      />
      <Reveal>
        <p className="eyebrow">{intro.eyebrow}</p>
      </Reveal>

      <div className="mt-7 flex flex-col-reverse gap-9 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <Reveal delay={60}>
            <h2 className="font-display max-w-[19ch] text-[clamp(1.95rem,4.6vw,2.95rem)] leading-[1.05] text-balance">
              {intro.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-6 max-w-[52ch] space-y-4 text-[14.5px] leading-[1.8] text-muted">
              {intro.paragraphs.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="w-28 shrink-0 sm:w-36">
          <Portrait />
        </Reveal>
      </div>

      <Reveal delay={220}>
        <div className="mt-10 flex items-center gap-2.5 border-t border-dashed border-line pt-5">
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
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------- work */

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">02 / Selected work</p>
            <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight">
              Things I&apos;ve built and still stand behind.
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {projects.length} projects
          </span>
        </div>
      </Reveal>

      <div className="mt-8 border-t border-dashed border-line">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 70}>
            <article className="group relative grid gap-3 border-b border-dashed border-line py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-5">
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
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stack */

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <p className="eyebrow">03 / Stack</p>
        <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight">
          Boring tools, used carefully.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 50}>
            <div className="border-t border-dashed border-line py-5">
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold/90">
                {group.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- experience */

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <p className="eyebrow">04 / Experience</p>
        <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight">
          A short, honest timeline.
        </h2>
      </Reveal>

      <div className="mt-8">
        {experience.map((item, i) => (
          <Reveal key={`${item.role}-${item.period}`} delay={i * 60}>
            <div className="grid gap-2 border-t border-dashed border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
              <span className="pt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                {item.period}
              </span>
              <div>
                <h3 className="text-[15px] font-medium leading-snug text-foreground">
                  {item.role}
                  <span className="text-muted"> · {item.org}</span>
                </h3>
                <ul className="mt-2.5 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point.slice(0, 20)} className="flex gap-2.5 text-[13px] leading-[1.7] text-muted">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-gold/60" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- education */

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <p className="eyebrow">05 / Education</p>
        <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight">
          Where the fundamentals came from.
        </h2>
      </Reveal>

      <div className="mt-8">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={i * 60}>
            <div className="grid gap-2 border-t border-dashed border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- community */

export function Community() {
  return (
    <section id="community" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <p className="eyebrow">06 / Beyond code</p>
        <h2 className="font-display mt-4 max-w-[20ch] text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight text-balance">
          Hackathons, trees, and a badminton court.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-3">
        {community.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className="h-full border-t border-dashed border-line py-5">
              <span className="font-mono text-[9.5px] tracking-[0.16em] text-gold/80">
                0{i + 1}
              </span>
              <h3 className="mt-2.5 text-[14px] font-medium leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.75] text-muted">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact */

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-dashed border-line px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
      <Reveal>
        <p className="eyebrow">07 / Contact</p>
      </Reveal>

      <Reveal delay={60}>
        <h2 className="font-display mt-5 max-w-[22ch] text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] text-balance">
          Have something that needs to keep working?
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-5 max-w-[46ch] text-[14px] leading-[1.8] text-muted">
          I&apos;m happiest on backend reliability, insurance and payments
          workflows, and applied AI. Tell me what you are building and where it
          hurts.
        </p>
      </Reveal>

      <Reveal delay={180}>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-8 inline-flex items-center gap-3 border-b border-gold/40 pb-2 text-[clamp(1.05rem,2.6vw,1.5rem)] text-gold transition-colors hover:border-gold"
        >
          {profile.email}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </a>
      </Reveal>

      <Reveal delay={200}>
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
        >
          {profile.phone}
        </a>
      </Reveal>

      <Reveal delay={220}>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-line pt-5">
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
      </Reveal>
    </section>
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

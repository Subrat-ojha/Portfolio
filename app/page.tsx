import { CinematicHero } from "@/components/cinematic-hero";
import {
  About,
  Community,
  Contact,
  Education,
  Experience,
  SiteFooter,
  Stack,
  Work,
} from "@/components/page-sections";
import { SectionRail } from "@/components/section-rail";
import { ScrollFX } from "@/components/scroll-fx";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/config/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <CinematicHero />

      {/* width gutters: the dotted dead space either side of the paper column */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
        <div className="gutter-dots absolute inset-y-0 left-0 right-[calc(50%+var(--frame)/2)]" />
        <div className="gutter-dots absolute inset-y-0 left-[calc(50%+var(--frame)/2)] right-0" />
      </div>

      <main id="main-content" className="relative z-10">
        <div className="frame-shell">
          {/* masthead: the cover strip of the printed page */}
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:px-10">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Portfolio / {profile.name}
            </span>
            <span className="hidden sm:inline">Vol. 01 — 2026</span>
            <span>{profile.role}</span>
          </div>

          <About />
          <Work />
          <Stack />
          <Experience />
          <Education />
          <Community />
          <Contact />
          <SiteFooter />
        </div>
      </main>

      <SectionRail />
      <ScrollFX />
    </>
  );
}

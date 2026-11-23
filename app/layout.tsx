import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono, Newsreader } from "next/font/google";
import { profile } from "@/config/content";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#070912" },
  ],
};

const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('so:theme');
    if (saved === 'daylight') document.documentElement.classList.add('daylight');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${figtree.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal],.word-reveal .wr,.sec-item,.chip-anim,.bullet-line,.section-rule,.section-topline,.mail-link{opacity:1!important;transform:none!important;filter:none!important}.chapter-ghost{opacity:.22!important;transform:none!important}[data-section] .eyebrow::before{transform:scaleX(1)!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

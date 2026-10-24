import { DockNav } from "@/components/dock-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/data/site";
import { DEFAULT_MODE, DEFAULT_PALETTE, THEME_INIT_SCRIPT } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const fontSans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Martian_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Product`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { title: SITE.name, card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-palette={DEFAULT_PALETTE}
      data-mode={DEFAULT_MODE}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Doto (the dot-matrix display face) isn't in next/font's list for Next 14.
            The root layout covers every page, so the pages-router warning doesn't apply. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Doto:wght@900&display=swap"
        />
      </head>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable, fontMono.variable)}
      >
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen max-w-[1240px] flex-col px-5">
            <main className="flex-1 pt-14">{children}</main>
            <SiteFooter />
          </div>
          <DockNav />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Rubik, Assistant } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/* ------------------------------------------------------------------
   Type.

   The reference site (enigma.jetdomains.co.il) sets headlines in
   "אקסיומה" (Axioma) and body copy in "Futurism" — both licensed
   commercial Hebrew faces whose files we are not free to copy.

   Until Mastik owns those licences we run the closest free pair:
   Rubik for display (geometric, wide, confident — the Axioma register)
   and Assistant for text (quiet, highly legible at small Hebrew sizes).

   To swap in the real faces: drop the .woff2 files into /public/fonts,
   declare them with next/font/local, and point --font-display-face /
   --font-body-face at them. Nothing else in the codebase changes.
   ------------------------------------------------------------------ */

const display = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-face",
  display: "swap",
});

const SITE = "https://mastik.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "מסטיק | מערכות CRM, אוטומציות וסוכני AI לעסקים",
    template: "%s | מסטיק",
  },
  description:
    "מסטיק בונה מערכות CRM מותאמות אישית, אוטומציות עסקיות וסוכני AI חכמים — שמדביקים את כל חלקי העסק שלכם למערכת אחת שעובדת לבד.",
  keywords: [
    "בניית CRM",
    "מערכת CRM מותאמת אישית",
    "אוטומציות לעסק",
    "סוכני AI",
    "צ׳אט בוט לעסק",
    "אינטגרציות API",
    "מסטיק",
  ],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE,
    siteName: "מסטיק",
    title: "מסטיק | מערכות CRM, אוטומציות וסוכני AI לעסקים",
    description:
      "מערכות CRM מותאמות אישית, אוטומציות עסקיות וסוכני AI — שמדביקים את העסק שלכם להצלחה.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

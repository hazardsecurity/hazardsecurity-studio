import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hazardsecurity.xyz"),
  title: "Hazardsecurity: software for your daily needs",
  description: "A small software studio building focused tools for the everyday jobs: private by default, quick to learn, fairly priced.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Hazardsecurity: software for your daily needs", description: "Software for the small jobs of every day.", url: "/", siteName: "Hazardsecurity", locale: "en_NG" },
  twitter: { card: "summary_large_image", title: "Hazardsecurity: software for your daily needs", description: "Software for the small jobs of every day." },
};

export const viewport: Viewport = { themeColor: "#efede6" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

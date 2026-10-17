import { Hero, Nav } from "@/components/Hero";
import { Closing, Principles, Tools } from "@/components/Sections";

// Structured data: the studio, its website and its live products.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hazardsecurity.xyz/#org",
      name: "Hazardsecurity",
      url: "https://hazardsecurity.xyz",
      logo: "https://hazardsecurity.xyz/icon.svg",
      description: "An independent software studio building focused tools for everyday jobs.",
      sameAs: ["https://github.com/hazardsecurity"],
    },
    { "@type": "WebSite", "@id": "https://hazardsecurity.xyz/#site", url: "https://hazardsecurity.xyz", name: "Hazardsecurity", publisher: { "@id": "https://hazardsecurity.xyz/#org" } },
    {
      "@type": "SoftwareApplication",
      name: "HazardSign AI",
      url: "https://sign.hazardsecurity.xyz/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      offers: { "@type": "Offer", price: "500", priceCurrency: "NGN" },
      publisher: { "@id": "https://hazardsecurity.xyz/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Eyeline",
      url: "https://eyeline.hazardsecurity.xyz/",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      publisher: { "@id": "https://hazardsecurity.xyz/#org" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <Hero />
        <Tools />
        <Principles />
      </main>
      <Closing />
    </>
  );
}

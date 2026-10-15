import Link from "next/link";

/** Studio wordmark: a square of hazard tape + the name. */
export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6em", fontWeight: 700, letterSpacing: "-0.035em", fontSize: "1.15em" }}>
      <span
        aria-hidden
        style={{
          width: "1.35em", height: "1.35em", borderRadius: "0.3em", flex: "none",
          background: "repeating-linear-gradient(-45deg, var(--ink) 0 0.22em, var(--tape) 0.22em 0.44em)",
          boxShadow: onDark ? "0 0 0 2px var(--tape)" : "0 0 0 2px var(--ink)",
        }}
      />
      <span>
        hazardsecurity<span style={{ fontFamily: "var(--f-mono)", fontWeight: 400, fontSize: "0.68em", opacity: 0.55, letterSpacing: 0 }}>.xyz</span>
      </span>
    </span>
  );
}

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" aria-label={children}>
      {[...children].map((c, i) => (
        <span key={i} aria-hidden className="roll__c" style={{ ["--i" as string]: i }}>{c}</span>
      ))}
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "ink", external = false }: { href: string; children: string; variant?: "ink" | "tape" | "ghost"; external?: boolean }) {
  const cls = `btn roll-host ${variant === "tape" ? "btn--tape" : variant === "ghost" ? "btn--ghost" : ""}`;
  const inner = (
    <>
      <Roll>{children}</Roll>
      {variant !== "ghost" && <span className="btn__arrow"><Arrow /><Arrow /></span>}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/** Where each product lives. Update when subdomains are connected. */
export const PRODUCTS = {
  hazardsign: "https://sign.hazardsecurity.xyz",
};
export const GITHUB = "https://github.com/hazardsecurity";

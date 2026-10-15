"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { ButtonLink, Roll, Wordmark, GITHUB, PRODUCTS } from "./ui";

const EASE = [0.4, 0, 0.05, 1] as const;

/* ---------------- Nav ---------------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap nav__in">
        <Link href="/" aria-label="Hazardsecurity home"><Wordmark /></Link>
        <nav className="nav__links" aria-label="Main">
          <a href="#tools" className="roll-host"><Roll>Tools</Roll></a>
          <a href="#principles" className="roll-host"><Roll>How we build</Roll></a>
          <a href={GITHUB} className="roll-host" target="_blank" rel="noreferrer"><Roll>GitHub</Roll></a>
        </nav>
        <ButtonLink href="#tools" variant="ink">See the tools</ButtonLink>
      </div>
      <style>{`
        .nav { position: fixed; inset: 0 0 auto; z-index: 50; padding-top: 1em; }
        .nav__in { display: flex; align-items: center; justify-content: space-between; gap: 2em; height: 4.4em; border-radius: 999px; padding-inline: 1.5em .5em;
          transition: background-color .5s var(--ease), box-shadow .5s var(--ease); max-width: calc(92em - 2 * var(--gutter)); }
        .nav.is-scrolled .nav__in { background: color-mix(in srgb, var(--bone) 80%, transparent); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--ink) 9%, transparent), 0 14px 40px -20px rgba(15,15,14,.3); }
        .nav__links { display: flex; gap: 2.25em; font-size: .95em; font-weight: 500; color: var(--ink-2); }
        @media (max-width: 860px) { .nav__links { display: none; } .nav__in { padding-inline: 1em .4em; height: 3.9em; } }
      `}</style>
    </header>
  );
}

/* ---------------- Hazard tape (the signature moment) ---------------- */
function Tape({ label, angle, direction, delay }: { label: string; angle: number; direction: 1 | -1; delay: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 });
  const boost = useTransform(velocity, [-2500, 0, 2500], [-5, 0, 5], { clamp: false });
  const x = useMotionValue(0);
  const wrapped = useTransform(x, (v) => `${((v % 50) - 50) % 50}%`);

  // Constant drift, sped up (or reversed) by scroll velocity
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed = direction * (1.2 + Math.abs(boost.get())) * (boost.get() < 0 ? -1 : 1);
    x.set(x.get() + speed * (delta / 1000));
  });

  const text = Array.from({ length: 8 }, () => label).join("  ◆  ");
  return (
    <motion.div
      className="tape"
      style={{ rotate: angle }}
      initial={reduce ? false : { clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
      animate={{ clipPath: "inset(0 0% 0 0%)" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      aria-hidden
    >
      <motion.div className="tape__track" style={{ x: wrapped }}>
        <span>{text}  ◆  </span>
        <span>{text}  ◆  </span>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const reduce = useReducedMotion();
  const words = ["Software", "for", "the", "small", "jobs", "of"];
  return (
    <section className="hero">
      <div className="wrap hero__in">
        <motion.span className="eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE, delay: .2 }}>
          Independent software studio
        </motion.span>
        <motion.h1
          className="h1 hero__title"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: stagger(0.06, { startDelay: 0.3 }) } } }}
          aria-label="Software for the small jobs of every day."
        >
          {words.map((w) => (
            <span key={w} className="hero__word" aria-hidden>
              <motion.span style={{ display: "inline-block" }} variants={{ hidden: reduce ? { opacity: 0 } : { y: "110%" }, show: { y: "0%", opacity: 1 } }} transition={{ duration: 1, ease: EASE }}>
                {w}
              </motion.span>
            </span>
          ))}
          <span className="hero__word hero__mark" aria-hidden>
            <motion.span style={{ display: "inline-block" }} variants={{ hidden: reduce ? { opacity: 0 } : { y: "110%" }, show: { y: "0%", opacity: 1 } }} transition={{ duration: 1, ease: EASE }}>
              every&nbsp;day.
            </motion.span>
            {/* highlighter swipe */}
            <motion.span className="hero__swipe" initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .7, ease: EASE, delay: 1.25 }} />
          </span>
        </motion.h1>
        <motion.p className="lead" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .9 }}>
          Hazardsecurity builds focused tools that each do one job properly: private by default, quick to learn and fairly priced.
        </motion.p>
        <motion.div className="hero__ctas" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.05 }}>
          <ButtonLink href="#tools" variant="tape">Explore the tools</ButtonLink>
          <ButtonLink href={PRODUCTS.hazardsign} variant="ghost" external>Try HazardSign AI</ButtonLink>
        </motion.div>
      </div>

      <div className="tapes">
        <Tape label="SOFTWARE FOR DAILY NEEDS" angle={-4} direction={-1} delay={0.5} />
        <Tape label="HAZARDSECURITY STUDIO" angle={3} direction={1} delay={0.75} />
      </div>

      <style>{`
        .hero { position: relative; min-height: 100svh; padding-top: 10em; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
        .hero__in { display: grid; gap: 2em; justify-items: start; }
        .hero__title { max-width: 9.5em; }
        .hero__word { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: .06em; margin-bottom: -.06em; padding-right: .2em; }
        .hero__mark { position: relative; overflow: visible; }
        .hero__mark > span:first-child { position: relative; z-index: 1; }
        .hero__swipe { position: absolute; left: -.06em; right: .14em; bottom: .04em; height: .42em; background: var(--tape); transform-origin: 0 50%; z-index: 0; border-radius: .06em; }
        .hero__ctas { display: flex; gap: .75em; flex-wrap: wrap; }
        .tapes { position: relative; height: 13em; margin-top: 4em; }
        .tape { position: absolute; left: -5%; right: -5%; top: 50%; height: 3.3em; margin-top: -1.65em; overflow: hidden; display: flex; align-items: center;
          background: var(--stripes); box-shadow: 0 18px 40px -22px rgba(15,15,14,.5); }
        .tape:nth-child(2) { top: 50%; }
        .tape::before { content: ""; position: absolute; inset: .45em 0; background: var(--tape); }
        .tape__track { position: relative; display: flex; white-space: pre; font-family: var(--f-mono); font-weight: 600; font-size: 1em; letter-spacing: .14em; color: var(--ink); will-change: transform; }
        @media (max-width: 767px) { .hero { padding-top: 8em; } .tapes { height: 9em; margin-top: 3em; } .tape { height: 2.6em; margin-top: -1.3em; } .tape__track { font-size: .8em; } }
      `}</style>
    </section>
  );
}

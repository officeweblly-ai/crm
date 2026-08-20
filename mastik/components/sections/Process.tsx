"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/content";
import "./sections.css";
import "./process.css";

gsap.registerPlugin(ScrollTrigger);

/* The steps sit on a gentle S-curve, read right to left.
   x/y are percentages of the track box. */
const SEATS = [
  { x: 11, y: 4 },
  { x: 37, y: 40 },
  { x: 63, y: 4 },
  { x: 89, y: 40 },
];

/* the path the line draws, in the same 100x100 space (RTL: starts on the right) */
const PATH =
  "M 89 16 C 76 16 76 52 63 52 C 50 52 50 16 37 16 C 24 16 24 52 11 52";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".step");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ".process-head > *",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 8, stagger: 1.4 },
          0
        );

        /* the line writes itself across the whole scene */
        tl.fromTo(
          ".process-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 68 },
          12
        );

        /* each step lands as the line reaches it */
        steps.forEach((s, i) => {
          tl.fromTo(
            s,
            { y: 56, z: -220, autoAlpha: 0 },
            {
              y: 0,
              z: 0,
              autoAlpha: 1,
              duration: 14,
              onStart: () => s.classList.add("is-live"),
              onReverseComplete: () => s.classList.remove("is-live"),
            },
            14 + i * 16
          );
        });

        /* hold so the finished path stays on screen */
        tl.to({}, { duration: 22 }, 80);
      });

      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".step").forEach((s) => {
          gsap.fromTo(
            s,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.out",
              onStart: () => s.classList.add("is-live"),
              scrollTrigger: { trigger: s, start: "top 85%" },
            }
          );
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec process" id="process" ref={root}>
      <div className="process-pin">
        <div className="process-head">
          <span className="eyebrow">מסע האוטומציה שלכם</span>
          <h2>
            תהליך פשוט
            <span className="u-gum"> שמביא תוצאות גדולות.</span>
          </h2>
          <p>
            ארבעה שלבים, בלי הפתעות ובלי ז׳רגון — מהשיחה הראשונה ועד המערכת
            שרצה לבד.
          </p>
        </div>

        <div className="process-track">
          <svg
            className="process-line"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={PATH}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="0.45"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="process-path"
              d={PATH}
              fill="none"
              stroke="var(--gum-500)"
              strokeWidth="1"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {PROCESS.map((s, i) => (
            <article
              className="step"
              key={s.n}
              style={
                {
                  "--x": `${100 - SEATS[i].x}%`,
                  "--y": `${SEATS[i].y}%`,
                } as React.CSSProperties
              }
            >
              <span className="step-bead">{s.n}</span>
              <div className="step-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTEGRATIONS } from "@/lib/content";
import "./sections.css";
import "./automations.css";

gsap.registerPlugin(ScrollTrigger);

/* eight seats around the hub, top-first and clockwise */
const R = 41;
const SEATS = INTEGRATIONS.map((_, i) => {
  const a = (-90 + i * (360 / INTEGRATIONS.length)) * (Math.PI / 180);
  return {
    x: 50 + R * Math.cos(a),
    y: 50 + R * Math.sin(a),
  };
});

export default function Automations() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
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
          ".auto-copy > *",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 8, stagger: 1.6 },
          0
        )
          .fromTo(
            ".auto-hub",
            { scale: 0.55, autoAlpha: 0, rotate: -14 },
            { scale: 1, autoAlpha: 1, rotate: 0, duration: 12 },
            4
          )
          .fromTo(
            ".auto-ring",
            { scale: 0.82, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 12 },
            10
          );

        /* each tool the business already uses flies in and locks on */
        gsap.utils.toArray<HTMLElement>(".auto-node").forEach((n, i) => {
          const seat = SEATS[i];
          const dx = (seat.x - 50) * 4.6;
          const dy = (seat.y - 50) * 4.6;
          tl.fromTo(
            n,
            { x: `${dx}%`, y: `${dy}%`, scale: 0.6, autoAlpha: 0 },
            { x: "0%", y: "0%", scale: 1, autoAlpha: 1, duration: 20 },
            16 + i * 3.2
          );
        });

        /* the wires draw themselves once the tools are seated */
        tl.fromTo(
          ".auto-wire",
          { strokeDashoffset: 1, autoAlpha: 0 },
          { strokeDashoffset: 0, autoAlpha: 1, duration: 18, stagger: 1.4 },
          26
        );

        /* the hub breathes, then the "just ask" beat lands */
        tl.fromTo(
          ".auto-hub-pulse",
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1.06, autoAlpha: 1, duration: 14 },
          52
        )
          .fromTo(
            ".auto-ask",
            { y: -24, scale: 0.9, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 12 },
            64
          )
          .fromTo(
            ".auto-answer",
            { y: 34, scale: 0.9, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 14 },
            76
          )
          .fromTo(
            ".auto-answer .bars u",
            { scaleY: 0.05, transformOrigin: "50% 100%" },
            { scaleY: 1, duration: 12, stagger: 1.1 },
            82
          )
          /* hold on the finished scene */
          .to({}, { duration: 16 }, 94);
      });

      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".auto-node", {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.5,
          ease: "back.out(1.6)",
          stagger: 0.06,
          scrollTrigger: { trigger: ".auto-orbit", start: "top 78%" },
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec automations" id="automations" ref={root}>
      <div className="auto-bg" aria-hidden />
      <div className="auto-pin">
        <div className="auto-copy">
          <span className="eyebrow">אינטגרציות ואוטומציה</span>
          <h2>
            כל הכלים שאתם כבר עובדים איתם
            <br />
            <span className="u-gum">מתחברים לנקודה אחת.</span>
          </h2>
          <p>
            וואטסאפ, מייל, יומן, סליקה, גיליונות וקמפיינים — מפסיקים להיות שבעה
            מקומות נפרדים שאף אחד לא מסתדר ביניהם, והופכים למערכת אחת שמדברת עם
            עצמה.
          </p>
          <div className="auto-facts">
            <div>
              <b>90%</b>
              <span>פחות כאבי ראש</span>
            </div>
            <div>
              <b>85%</b>
              <span>יותר סדר וארגון</span>
            </div>
            <div>
              <b>99%</b>
              <span>אוטומציה שעובדת</span>
            </div>
          </div>
        </div>

        <div className="auto-orbit">
          <svg className="auto-wires" viewBox="0 0 100 100" aria-hidden>
            {SEATS.map((s, i) => (
              <line
                key={i}
                className="auto-wire"
                x1="50"
                y1="50"
                x2={s.x}
                y2={s.y}
                stroke="var(--gum-300)"
                strokeWidth="0.4"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
              />
            ))}
          </svg>

          <div className="auto-ring" aria-hidden />

          <div className="auto-hub">
            <div className="auto-hub-pulse" aria-hidden />
            <Image
              src="/brand/mastik-gum.avif"
              alt=""
              width={598}
              height={569}
              aria-hidden
            />
          </div>

          {INTEGRATIONS.map((t, i) => (
            <span
              key={t.label}
              className={`auto-node tone-${t.tone}`}
              style={
                {
                  "--x": `${100 - SEATS[i].x}%`,
                  "--y": `${SEATS[i].y}%`,
                } as React.CSSProperties
              }
            >
              <i aria-hidden />
              {t.label}
            </span>
          ))}

          <div className="auto-ask">״תבנה לי דוח מכירות חודשי ותשלח אותו כל ראשון בבוקר״</div>

          <div className="auto-answer">
            <h4>דוח מכירות · אוגוסט</h4>
            <small>נבנה אוטומטית · נשלח ל-4 נמענים</small>
            <div className="bars">
              <u style={{ height: "42%" }} />
              <u style={{ height: "61%" }} />
              <u style={{ height: "50%" }} />
              <u style={{ height: "78%" }} />
              <u className="hi" style={{ height: "100%" }} />
              <u style={{ height: "69%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

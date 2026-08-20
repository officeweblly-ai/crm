"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PILLARS } from "@/lib/content";
import { IconCheck } from "@/components/ui/Icons";
import "./sections.css";
import "./pillars.css";

gsap.registerPlugin(ScrollTrigger);

const BARS = [34, 46, 40, 58, 52, 71, 66, 100];

export default function Pillars() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".pillar",
          { y: 54, rotateX: 10, autoAlpha: 0, transformOrigin: "50% 100%" },
          {
            y: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".pillars-grid", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".vis-bars u",
          { scaleY: 0.06 },
          {
            scaleY: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ".vis-bars", start: "top 88%" },
          }
        );

        /* count the metrics up when they come into view */
        gsap.utils.toArray<HTMLElement>(".pillar-metric b").forEach((el) => {
          const target = parseInt(el.dataset.value || "0", 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}%`;
            },
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec pillars" id="how" ref={root}>
      <div className="sec-shell">
        <div className="pillars-head">
          <span className="eyebrow">הגישה שלנו</span>
          <h2>
            פיתוח תהליכים <span className="u-gum">שמעצימים עסקים.</span>
          </h2>
          <p>
            שילוב של אסטרטגיה טכנולוגית וראייה עסקית. זה לא רק פיתוח — זו
            ארכיטקטורה של תפעול שלם.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <article className="pillar" key={p.title}>
              <div className="pillar-metric">
                <b data-value={parseInt(p.metric, 10)}>0%</b>
                <span>{p.metricLabel}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>

              <div className="pillar-vis">
                {i === 0 && (
                  <div className="vis-flow">
                    <b>ליד</b>
                    <i />
                    <b>אפיון</b>
                    <i />
                    <b>הצעה</b>
                    <i />
                    <b>סגירה</b>
                  </div>
                )}
                {i === 1 && (
                  <div className="vis-conn">
                    <div>
                      <i style={{ background: "var(--green)" }} />
                      וואטסאפ → CRM
                      <IconCheck />
                    </div>
                    <div>
                      <i style={{ background: "var(--violet)" }} />
                      יומן → תזכורות
                      <IconCheck />
                    </div>
                    <div>
                      <i style={{ background: "var(--amber)" }} />
                      סליקה → חשבוניות
                      <IconCheck />
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="vis-bars">
                    {BARS.map((h, n) => (
                      <u
                        key={n}
                        className={n === BARS.length - 1 ? "hi" : undefined}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

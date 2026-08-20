"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS, RATING } from "@/lib/content";
import { IconStar } from "@/components/ui/Icons";
import "./sections.css";
import "./reviews.css";

gsap.registerPlugin(ScrollTrigger);

/* deterministic bubble colours so server and client agree */
const AV = [
  "linear-gradient(150deg, #fa85a8, #c42c4b)",
  "linear-gradient(150deg, #a99bf7, #563ae5)",
  "linear-gradient(150deg, #ffd28a, #d98a2b)",
  "linear-gradient(150deg, #8fdcae, #2f8f68)",
  "linear-gradient(150deg, #f0607f, #872444)",
  "linear-gradient(150deg, #9ec8ff, #3566c9)",
];

export default function Reviews() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* gum-bubble pop: overshoot on the way in, then settle */
        gsap.utils.toArray<HTMLElement>(".review").forEach((r, i) => {
          gsap.fromTo(
            r,
            { scale: 0.82, y: 34, autoAlpha: 0 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
              ease: "back.out(1.5)",
              delay: (i % 3) * 0.07,
              scrollTrigger: { trigger: r, start: "top 88%" },
            }
          );
        });

        gsap.fromTo(
          ".reviews-head > *",
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".reviews-head", start: "top 84%" },
          }
        );
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec reviews" id="reviews" ref={root}>
      <div className="sec-shell">
        <div className="reviews-head">
          <span className="eyebrow">לקוחות מספרים</span>
          <h2>
            עסקים שהאוטומציות שלנו חסכו להם
            <span className="u-gum"> זמן, כסף וכאב ראש.</span>
          </h2>
          <span className="rating">
            <span className="stars" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} />
              ))}
            </span>
            <b>{RATING.score}</b>
            <span>מתוך {RATING.count} דירוגים</span>
          </span>
        </div>

        <div className="reviews-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="review" key={t.name}>
              <span className="review-mark" aria-hidden>
                ״
              </span>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <footer>
                <span className="review-av" style={{ background: AV[i % AV.length] }} aria-hidden>
                  {t.name.charAt(0)}
                </span>
                <figcaption className="review-who">
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </figcaption>
              </footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

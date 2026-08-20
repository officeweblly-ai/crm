"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/content";
import { SERVICE_ICONS } from "@/components/ui/Icons";
import "./sections.css";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".svc");

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

        /* the headline arrives first and owns the frame alone */
        tl.fromTo(
          ".services-head h2",
          { yPercent: 18, scale: 1.06, autoAlpha: 0 },
          { yPercent: 0, scale: 1, autoAlpha: 1, duration: 14 },
          0
        ).fromTo(
          ".services-head p",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 10 },
          6
        );

        /* then the work rises up through it, one card behind the next */
        cards.forEach((c, i) => {
          tl.fromTo(
            c,
            {
              yPercent: 118,
              rotateX: 26,
              z: -320,
              autoAlpha: 0,
              transformOrigin: "50% 100%",
            },
            {
              yPercent: 0,
              rotateX: 0,
              z: 0,
              autoAlpha: 1,
              duration: 26,
            },
            18 + i * 7
          );
        });

        /* the headline steps back so the cards can be read */
        /* the lead line has done its job — it gets out of the cards' way */
        tl.to(".services-head p", { autoAlpha: 0, y: -14, duration: 12 }, 30);

        /* the headline stays fully saturated behind the cards, just lifted */
        tl.to(".services-head", { yPercent: -9, duration: 22 }, 50);

        /* hold on the settled grid so it can actually be read */
        tl.to({}, { duration: 28 }, 72);
      });

      /* mobile / reduced motion: a plain, well-behaved reveal */
      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".svc", {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".services-rail", start: "top 82%" },
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec services" id="services" ref={root}>
      <div className="services-pin">
        <div className="services-glow" aria-hidden />

        <div className="services-head">
          <span className="eyebrow">השירותים שלנו</span>
          <h2>
            <span>מייצרים תהליכים</span>
            <span className="u-gum">שעובדים בשבילכם.</span>
          </h2>
          <p>
            כל מה שגוזל לכם שעות — לידים, פניות, הצעות, מעקבים ודוחות — הופך
            למערכת אחת שרצה לבד.
          </p>
        </div>

        <div className="services-rail">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS];
            return (
              <article className="svc" key={s.id}>
                <span className="svc-n">{s.n}</span>
                <span className="svc-ico">
                  <Icon />
                </span>
                <h3>{s.title}</h3>
                <span className="svc-lead">{s.lead}</span>
                <p className="svc-body">{s.body}</p>
                <div className="svc-chips">
                  {s.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

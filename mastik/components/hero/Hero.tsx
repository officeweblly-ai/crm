"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import {
  ScreenCrm,
  ScreenAutomation,
  ScreenChatbot,
  SCREEN_LABELS,
  SCREEN_STORY,
} from "./DemoScreens";
import "./hero.css";

gsap.registerPlugin(ScrollTrigger);

const FACES = [ScreenCrm, ScreenAutomation, ScreenChatbot];

/* where the demo screen parks once it owns the frame (fraction of viewport
   width, measured from the physical left edge — the story panel takes the rest) */
const SHOWCASE_X = 0.63;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [screen, setScreen] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const card = q(".card-3d")[0] as HTMLElement;
      const inner = q(".card-inner")[0] as HTMLElement;
      const faces = q(".card-face") as HTMLElement[];
      const robot = q(".hero-robot")[0] as HTMLElement;
      const anchor = q(".stage-anchor")[0] as HTMLElement;

      /* faces are stacked; only one is lit at a time */
      const showFace = (i: number) => {
        faces.forEach((f, n) => gsap.set(f, { autoAlpha: n === i ? 1 : 0 }));
      };
      showFace(0);

      const mm = gsap.matchMedia();

      /* ---------------- desktop: the full cinematic take ---------------- */
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(card, { rotateY: -14, rotateX: 5, z: 0 });

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


        if (process.env.NODE_ENV === "development") {
          (window as unknown as { __heroTl?: gsap.core.Timeline }).__heroTl = tl;
          const m = /[#&]p=([\d.]+)/.exec(window.location.hash);
          if (m) {
            setTimeout(() => {
              tl.scrollTrigger?.kill(false);
              tl.pause();
              tl.progress(parseFloat(m[1]));
            }, 120);
          }
        }

        /* --- 0 → 6 : hold. the frame the visitor lands on. --- */
        tl.to({}, { duration: 6 });

        /* --- 6 → 24 : the screen detaches and takes the stage --- */
        tl.to(".hero-copy", { yPercent: -14, autoAlpha: 0, duration: 12 }, 6)
          .to(".chip-float", { autoAlpha: 0, y: -30, stagger: 0.4, duration: 8 }, 6)
          .to(
            card,
            {
              rotateY: 0,
              rotateX: 2,
              z: 140,
              /* as large as the frame allows once the story panel is seated */
              scale: () =>
                Math.min(1.5, (window.innerWidth - 540) / anchor.offsetWidth),
              /* slide out of the stage column and into the open frame */
              x: () => {
                const r = anchor.getBoundingClientRect();
                return window.innerWidth * SHOWCASE_X - (r.left + r.width / 2);
              },
              yPercent: 2,
              duration: 14,
            },
            6
          )
          /* the robot hands the screen over and steps back into depth */
          .to(
            robot,
            { z: -430, xPercent: 16, yPercent: 6, autoAlpha: 0, duration: 13 },
            6
          )
          .to(robot, { "--legstop": "100%", duration: 6 }, 6)
          .to([".robot-contact", ".robot-halo", ".stage-glow"], { autoAlpha: 0, duration: 8 }, 6)
          /* move the vanishing point to the middle of the viewport so the
             card is seen head-on once it has taken the stage */
          .to(
            ".hero-stage",
            {
              perspectiveOrigin: () => {
                const st = (root.current as HTMLElement).querySelector(
                  ".hero-stage"
                ) as HTMLElement;
                const r = st.getBoundingClientRect();
                const pct =
                  ((window.innerWidth * SHOWCASE_X - r.left) / r.width) * 100;
                return `${pct.toFixed(1)}% 47%`;
              },
              duration: 14,
            },
          6
          
          )
          .to([".stage-readout", ".stage-caption"], { autoAlpha: 1, duration: 6 }, 16);

        /* --- 24 → 64 : the turntable. three systems, one full revolution. --- */
        tl.to(
          card,
          {
            rotateY: -360,
            duration: 40,
            onUpdate: () => {
              const r = Number(gsap.getProperty(card, "rotationY"));
              const idx = Math.max(0, Math.min(2, Math.floor((-r + 90) / 180)));
              showFace(idx);
              /* keep the artwork readable while the card shows its back */
              gsap.set(inner, { rotateY: idx === 1 ? 180 : 0 });
              setScreen(idx);
            },
          },
          24
        );

        /* --- 64 → 72 : settle --- */
        tl.to(card, { rotateX: 4, duration: 8 }, 64);

        /* --- 72 → 100 : it glues itself into place for what comes next --- */
        tl.to(
          card,
          {
            rotateY: -370,
            rotateX: 3,
            z: -40,
            scale: () =>
              Math.min(1.12, (window.innerWidth - 540) / anchor.offsetWidth) * 0.78,
            x: () => {
              const r = anchor.getBoundingClientRect();
              return window.innerWidth / 2 - (r.left + r.width / 2);
            },
            yPercent: -26,
            duration: 28,
          },
          72
        )

          .to(
            ".hero-stage",
            {
              perspectiveOrigin: () => {
                const st = (root.current as HTMLElement).querySelector(
                  ".hero-stage"
                ) as HTMLElement;
                const r = st.getBoundingClientRect();
                const pct = ((window.innerWidth / 2 - r.left) / r.width) * 100;
                return `${pct.toFixed(1)}% 42%`;
              },
              duration: 28,
            },
            72
          )
          .to([".stage-readout", ".stage-caption"], { autoAlpha: 0, duration: 8 }, 80)
          .to(".scroll-hint", { autoAlpha: 0, duration: 6 }, 6);
      });

      /* ---------------- mobile: lighter, no turntable ---------------- */
      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(card, { rotateY: -8, rotateX: 4 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 8 });
        tl.to(".hero-copy", { yPercent: -18, autoAlpha: 0, duration: 14 }, 8)
          .to(card, { rotateY: 0, rotateX: 0, scale: 1.18, yPercent: -14, duration: 16 }, 8)
          .to(robot, { xPercent: 40, yPercent: -6, scale: 0.7, autoAlpha: 0.9, duration: 14 }, 8)
          .to(robot, { "--legstop": "100%", duration: 8 }, 8)
          .to(".stage-readout", { autoAlpha: 1, duration: 8 }, 18);

        /* screens cross-fade instead of spinning — much kinder to mobile GPUs */
        [1, 2].forEach((i) => {
          tl.call(
            () => {
              showFace(i);
              setScreen(i);
            },
            [],
            34 + (i - 1) * 22
          ).call(
            () => {
              showFace(i - 1);
              setScreen(i - 1);
            },
            [],
            34 + (i - 1) * 22 - 0.01
          );
        });

        tl.fromTo(
          faces,
          { yPercent: 0 },
          { yPercent: 0, duration: 44 },
          34
        );
        tl.to(card, { scale: 0.98, yPercent: -26, duration: 20 }, 78)
          .to(robot, { yPercent: 70, autoAlpha: 0, duration: 14 }, 78)
          .to(".stage-readout", { autoAlpha: 0, duration: 8 }, 90);
      });

      /* ---------------- idle life (all sizes, motion allowed) ---------------- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".chip-float", { z: 90 });
        gsap.to(".chip-float", {
          y: -12,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.6,
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-label="מסטיק — בונים מערכות שעובדות לבד">
      <div className="hero-pin">
        <div className="hero-bg" aria-hidden />
        <div className="hero-grid" aria-hidden />

        <Nav />

        <div className="hero-inner">
          {/* ---------------- copy ---------------- */}
          <div className="hero-copy">
            <span className="pill">
              <i
                aria-hidden
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 7,
                  background: "linear-gradient(150deg, var(--gum-400), var(--gum-600))",
                  display: "inline-block",
                }}
              />
              CRM · אוטומציות · סוכני AI
            </span>

            <h1>
              <span>בונים לעסק שלכם</span>
              <span>מערכת אחת שעושה</span>
              <span className="u-gum">את כל העבודה.</span>
            </h1>

            <p className="u-lead">
              הטפסים, הוואטסאפ, היומן והדוחות — מסטיק מדביקה את כולם למערכת אחת חכמה
              שרצה לבד, בלי שאף פנייה תיפול בין הכיסאות.
            </p>

            <div className="btns">
              <a href="#contact" className="btn btn-gum">
                בואו נבנה לכם מערכת
              </a>
              <a href="#demo" className="btn btn-ghost">
                <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
                  <path d="M13 8 3.5 13.5v-11L13 8Z" fill="var(--gum-500)" />
                </svg>
                לצפייה בדמו
              </a>
            </div>

            <div className="hero-trust">
              <span className="faces" aria-hidden>
                <i /> <i /> <i /> <i />
              </span>
              <span>יותר מ-120 עסקים ישראליים עובדים עם מערכות שבנינו</span>
            </div>
          </div>

          {/* ---------------- stage ---------------- */}
          <div className="hero-stage">
            <div className="stage-anchor">
              <div className="stage-glow" aria-hidden />
              <div className="robot-halo" aria-hidden />

              <div className="card-3d">
                <div className="card-inner" style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
                  {FACES.map((Face, i) => (
                    <div className="card-face" key={i} aria-hidden={i !== screen}>
                      <div className="card-skin">
                        <Face />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="robot-contact" aria-hidden />
              <Image
                src="/brand/mastik-robot.avif"
                alt="הרובוט של מסטיק מנפח בועת מסטיק"
                width={947}
                height={1344}
                priority
                className="hero-robot"
              />

              <div className="chip-float" style={{ top: "-7%", insetInlineStart: "-7%" }}>
                <i>94%</i>
                <span>
                  מהפניות נענות אוטומטית
                  <small>בלי מגע יד אדם</small>
                </span>
              </div>
              <div className="chip-float" style={{ bottom: "-6%", insetInlineStart: "16%" }}>
                <i>47</i>
                <span>
                  שעות עבודה נחסכו החודש
                  <small>לצוות של 4 אנשים</small>
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="stage-caption" aria-live="polite">
          {SCREEN_STORY.map((s, i) => (
            <article key={s.kicker} className={i === screen ? "on" : undefined}>
              <span className="kicker">{s.kicker}</span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              <div className="caption-chips">
                {s.chips.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="stage-readout" role="status">
          <span className="dots" aria-hidden>
            {SCREEN_LABELS.map((l, i) => (
              <span key={l} className={i === screen ? "on" : undefined} />
            ))}
          </span>
          <b>{SCREEN_LABELS[screen]}</b>
        </div>

        <div className="scroll-hint" aria-hidden>
          <u />
          גללו
        </div>
      </div>
    </section>
  );
}

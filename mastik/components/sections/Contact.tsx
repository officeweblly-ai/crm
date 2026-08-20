"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, FOOTER_NAV } from "@/lib/content";
import { IconPhone, IconMail } from "@/components/ui/Icons";
import "./sections.css";
import "./contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact-copy > *",
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".contact-grid", start: "top 78%" },
          }
        );
        gsap.fromTo(
          ".contact-form",
          { y: 46, scale: 0.97, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: ".contact-grid", start: "top 78%" },
          }
        );
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  /* No endpoint is wired yet — by design. When the destination is decided
     (mail / CRM / Make), this handler is the single place to change. */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("הטופס עוד לא מחובר ליעד. בינתיים אפשר להתקשר או לשלוח מייל — למטה.");
  };

  return (
    <section className="sec contact" id="contact" ref={root}>
      <div className="sec-shell">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">בואו נדבר</span>
            <h2>
              רוצים לייעל את העסק?
              <br />
              <span>נתחיל בשיחה אחת.</span>
            </h2>
            <p>
              תשאירו פרטים ונחזור אליכם בהקדם עם מענה מדויק — לא תבנית, לא
              מצגת מכירות.
            </p>

            <div className="contact-direct">
              <a href={CONTACT.phoneHref}>
                <IconPhone />
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                <IconMail />
                {CONTACT.email}
              </a>
            </div>

            <p className="contact-note">יושבים בין האוטומציות לקפה.</p>
          </div>

          <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
            <h3>נשמח להכיר</h3>

            <div className="field-row">
              <div className="field">
                <label htmlFor="c-name">שם מלא</label>
                <input id="c-name" name="name" type="text" required autoComplete="name" placeholder="איך לקרוא לכם?" />
              </div>
              <div className="field">
                <label htmlFor="c-phone">טלפון</label>
                <input id="c-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="05X-XXXXXXX" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-service">שירות רצוי</label>
              <select id="c-service" name="service" defaultValue="general">
                <option value="general">ייעוץ כללי</option>
                <option value="crm">מערכת CRM</option>
                <option value="automation">אוטומציות</option>
                <option value="api">חיבורי API</option>
                <option value="ai">צ׳אטבוט או סוכן AI</option>
                <option value="complex">זה מורכב, בואו נדבר</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-msg">במה נוכל לעזור?</label>
              <textarea id="c-msg" name="message" placeholder="ספרו לנו מה תוקע אתכם היום" />
            </div>

            <label className="consent">
              <input type="checkbox" name="consent" />
              אני מאשר קבלת חומר שיווקי, עדכונים ותוכן מקצועי ממסטיק.
            </label>

            <button type="submit" className="btn btn-gum" style={{ marginTop: 4 }}>
              שליחת פרטים
            </button>

            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>

        <footer className="footer">
          <div className="footer-brand">
            <Image src="/brand/mastik-logo.avif" alt="מסטיק" width={799} height={238} />
            <p>{CONTACT.blurb}</p>
          </div>
          {FOOTER_NAV.map((g) => (
            <div className="footer-col" key={g.group}>
              <h4>{g.group}</h4>
              {g.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </footer>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} מסטיק · כל הזכויות שמורות</span>
          <span>{CONTACT.tagline}</span>
        </div>
      </div>
    </section>
  );
}

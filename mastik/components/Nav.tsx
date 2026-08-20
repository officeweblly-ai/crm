import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "#services", label: "שירותים" },
  { href: "#automations", label: "אוטומציות" },
  { href: "#process", label: "תהליך העבודה" },
  { href: "#work", label: "עבודות" },
  { href: "/blog", label: "בלוג" },
];

export default function Nav() {
  return (
    <header className="hero-nav">
      <Link href="/" className="hero-logo" aria-label="מסטיק — לעמוד הבית">
        <Image
          src="/brand/mastik-logo.avif"
          alt="מסטיק"
          width={799}
          height={238}
          priority
        />
        <span>stick it all together</span>
      </Link>

      <nav className="hero-links" aria-label="ניווט ראשי">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hero-nav-cta">
        <Link href="#contact" className="btn btn-gum">
          בואו נדבר
        </Link>
      </div>
    </header>
  );
}

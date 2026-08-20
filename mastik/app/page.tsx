import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import Automations from "@/components/sections/Automations";
import Process from "@/components/sections/Process";
import Pillars from "@/components/sections/Pillars";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import "@/components/sections/sections.css";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* the docked demo screen hands over to the next scene rather than
          leaving the visitor on an empty frame */}
      <div className="bridge" aria-hidden>
        <i />
        <u />
        <span>ומה בעצם בונים בפנים?</span>
      </div>

      <Services />
      <Automations />
      <Process />
      <Pillars />
      <Reviews />
      <Contact />
    </main>
  );
}

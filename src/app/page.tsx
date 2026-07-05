import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";

// ScrollProgress and QuickActions are already mounted once in ClientProviders —
// rendering them again here created two independent instances (each with its
// own open/closed state), which is why the terminal used to need two clicks
// to actually close (the first click closed one instance, revealing the
// other still-open instance underneath).
export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Work />
        <Impact />
        <Contact />
      </main>
    </div>
  );
}

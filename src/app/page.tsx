import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import QuickActions from "@/components/QuickActions";
export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <ScrollProgress />
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
      <QuickActions />
    </div>
  );
}

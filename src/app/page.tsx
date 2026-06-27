import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Journey from "@/components/Journey";
import DynamicRibbon from "@/components/DynamicRibbon";
import Work from "@/components/Work";
import Hackathons from "@/components/Hackathons";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import QuickActions from "@/components/QuickActions";
import DesignOptions from "@/components/DesignOptions";
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
        <DynamicRibbon />
        <Work />
        <Hackathons />
        <Impact />
        <Contact />
      </main>
      <QuickActions />
      <DesignOptions />
    </div>
  );
}

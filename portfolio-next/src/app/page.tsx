"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Badges from "@/components/Badges";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const [showBadges, setShowBadges] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Research />
        <Experience />
        <Projects />
        <Skills onShowBadges={() => setShowBadges(true)} />
        <Badges isVisible={showBadges} />
        <About />
      </main>
      <Contact />
      <ChatWidget />
    </>
  );
}


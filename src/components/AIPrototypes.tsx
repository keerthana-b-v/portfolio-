"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface BentoItem {
  title: string;
  description: string;
  image: string;
  url: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    title: "WhatsApp Catalog Pro",
    description: "A responsive React + TypeScript engine that transforms browsing into a seamless WhatsApp ordering workflow. Features include localStorage lead persistence, real-time admin tracking, and automated shipment notification hooks.",
    image: "/whatsapp.png",
    url: "https://whatecommerce.netlify.app/",
  },
  {
    title: "Kunafa & Creams",
    description: "Rapidly prototyped digital experience for a dessert boutique, focusing on high-end visual storytelling and mobile-first responsive interactions.",
    image: "/kunafa.png",
    url: "https://kunafaandcreams.netlify.app/",
  },
  {
    title: "Zone99",
    description: "Lightweight, prompt-engineered architectural prototype developed to explore fast-iteration visual experimentation and AI-driven layout generation.",
    image: "/zone.png",
    url: "https://zone99.netlify.app/",
  },
];

export default function AIPrototypes() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="ai-projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">04 — AI Prototypes</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          AI <span>Prototypes</span>
        </div>

        <div className={`ai-bento-grid reveal d2 ${isVisible ? "visible" : ""}`}>
          {BENTO_ITEMS.map((item) => (
            <article className="bento-card" key={item.title}>
              <div className="bento-card-image" style={{ position: "relative" }}>
                <Image
                  src={item.image}
                  alt={`${item.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="bento-card-content">
                <div className="bento-card-header">{item.title}</div>
                <p className="bento-card-copy">{item.description}</p>
              </div>
              <div className="bento-card-links">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="demo-link">
                  Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

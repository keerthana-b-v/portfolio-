"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface BadgeItem {
  title: string;
  issuer: string;
  image: string;
  verifyUrl: string;
}

const BADGE_ITEMS: BadgeItem[] = [
  {
    title: "Prompt Engineering Guide",
    issuer: "Google Cloud · Issued by Google Skills",
    image: "/prompt.png",
    verifyUrl: "https://www.skills.google/public_profiles/7976f6ba-c32e-47ea-ba20-843a1fb18097/badges/23970377",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud · Issued by Google Skills",
    image: "/genai.png",
    verifyUrl: "https://www.skills.google/public_profiles/7976f6ba-c32e-47ea-ba20-843a1fb18097/badges/23844269",
  },
  {
    title: "Introduction to LLMs",
    issuer: "Google Cloud · Issued by Google Skills",
    image: "/llm.png",
    verifyUrl: "https://www.skills.google/public_profiles/7976f6ba-c32e-47ea-ba20-843a1fb18097/badges/23851754",
  },
  {
    title: "Responsible AI",
    issuer: "Google Cloud · Issued by Google Skills",
    image: "/responsibleai.png",
    verifyUrl: "https://www.skills.google/public_profiles/7976f6ba-c32e-47ea-ba20-843a1fb18097/badges/23864844",
  },
];

interface BadgesProps {
  isVisible: boolean;
}

export default function Badges({ isVisible }: BadgesProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && sectionRef.current) {
      setHasAnimated(true);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isVisible]);

  // If section is not visible, hide it per original spec (display: none by default)
  if (!isVisible && !hasAnimated) {
    return null;
  }

  return (
    <section 
      className="section" 
      id="badges" 
      ref={sectionRef} 
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="container">
        <div className="section-label reveal visible">
          <div className="section-label-dot"></div>
          <span className="section-label-text">05 — Verified Badges</span>
        </div>
        <div className="section-title reveal d1 visible">
          Professional <span>Badges</span>
        </div>

        <div className="badge-grid reveal d2 visible">
          {BADGE_ITEMS.map((badge) => (
            <a
              href={badge.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="live-demo-card badge-card"
              style={{ textDecoration: "none" }}
              key={badge.title}
            >
              <div className="live-demo-image" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", padding: "8px" }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={badge.image}
                    alt={badge.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="live-demo-content">
                <div className="live-demo-title">{badge.title}</div>
                <p className="live-demo-copy">{badge.issuer}</p>
              </div>
              <div className="live-demo-links">
                <span className="demo-link">Verify Badge</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

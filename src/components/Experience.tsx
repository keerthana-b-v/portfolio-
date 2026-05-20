"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface DeployedSite {
  title: string;
  description: string;
  image: string;
  url: string;
}

const DEPLOYED_SITES: DeployedSite[] = [
  {
    title: "Research Vision",
    description: "Corporate technology services website with modular product and services storytelling.",
    image: "/rvts.jpeg",
    url: "https://researchvisions.com/",
  },
  {
    title: "Surf School Asia",
    description: "Surf academy landing page with hero messaging and lesson booking emphasis.",
    image: "/surf.jpeg",
    url: "https://surfschool.asia",
  },
  {
    title: "AK Enterprises",
    description: "B2B industrial scrap processing & dismantling platform built with Next.js, TypeScript, Radix UI, and secure lead pipelines.",
    image: "/ak.png",
    url: "https://akenterprisesblr.com/",
  },
];

export default function Experience() {
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
    <section className="section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">02 — Work Experience</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          Where I've <span>Shipped</span>
        </div>

        <div className={`exp-card reveal d2 ${isVisible ? "visible" : ""}`}>
          <div className="exp-header">
            <div>
              <div className="exp-company">ASPL Tech Solutions Pvt. Ltd.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="exp-role">
                Full Stack Developer · <span style={{ fontWeight: 400, opacity: 0.8 }}>Product Delivery Focus</span>
              </div>
              <div className="exp-period desktop-only">Oct 2025 – March 2026 · Project Tenure</div>
              <div className="exp-date mobile-only">Oct 2025 – March 2026</div>
              <div className="exp-location mobile-only">Bengaluru, India</div>
            </div>
          </div>
          <div className="exp-divider"></div>
          <div className="exp-bullets">
            <div className="exp-bullet">
              <div className="bullet-icon"></div>
              <p className="bullet-text">
                Executed the <strong>full-cycle delivery of 8+ production applications</strong> within a high-intensity delivery sprint, managing the complete roadmap from architectural design to cloud deployment.
              </p>
            </div>
            <div className="exp-bullet">
              <div className="bullet-icon"></div>
              <p className="bullet-text">
                Built a full-stack <strong>HRMS platform</strong> digitizing onboarding for 4 departments, reducing administrative processing time by <strong>35%</strong>.
              </p>
            </div>
            <div className="exp-bullet">
              <div className="bullet-icon"></div>
              <p className="bullet-text">
                Implemented secure RBAC with JWT/bcrypt and optimized RESTful APIs for real-time Recharts dashboards, improving client satisfaction scores by <strong>15%</strong>.
              </p>
            </div>
            <div className="exp-bullet">
              <div className="bullet-icon"></div>
              <p className="bullet-text">
                Configured and managed 3+ live production sites on <strong>Linux VPS</strong> using Nginx, handling full <strong>SDLC orchestration</strong> including SSL/TLS and domain management.
              </p>
            </div>
          </div>
          <div className="exp-demo-list">
            <div className="exp-demo-title">Live deployed websites</div>
            <div className="live-demo-grid exp-demo-grid">
              {DEPLOYED_SITES.map((site) => (
                <article className="live-demo-card" key={site.title}>
                  <div className="live-demo-image" style={{ position: "relative" }}>
                    <Image
                      src={site.image}
                      alt={`${site.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="live-demo-content">
                    <div className="live-demo-title">{site.title}</div>
                    <p className="live-demo-copy">{site.description}</p>
                  </div>
                  <div className="live-demo-links">
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="demo-link">
                      Live Demo
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

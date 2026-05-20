"use client";

import { useEffect, useState, useRef } from "react";

export default function About() {
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
    <section className="section section-alt" id="about" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">07 — About</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          Who I <span>Am</span>
        </div>

        <div className="about-grid">
          <div className={`about-card main reveal d1 ${isVisible ? "visible" : ""}`}>
            <div className="about-main-grid">
              <div className="about-copy">
                <p>
                  I'm a Full Stack Developer based in Bengaluru. My work sits at the intersection of{" "}
                  <strong>modern web engineering and applied AI</strong> — I design schemas, integrate{" "}
                  models, configure servers, and ship UIs that real people use.
                </p>
                <p>
                  I served as a Full Stack Developer at <strong>ASPL Tech Solutions</strong>, where I took ownership of production repositories and client deliveries from day one.
                </p>
                <p>
                  My research on AI-powered legal document analysis <strong>won Best Paper at{" "}
                  NCRIE-2025</strong>. That work wasn't an academic exercise — it's a deployed,{" "}
                  full-stack application backed by a fine-tuned BERT model trained on 510 real contracts.
                </p>
                <p>
                  I hold an <strong>MCA from RV Institute of Technology and Management</strong> (CGPA:{" "}
                  8.2). I'm actively looking for a role where I can keep building things that matter.
                </p>
              </div>
              <div className="about-sidebar">
                <div className="about-meta-item">
                  <div className="about-meta-label">Education</div>
                  <div className="about-meta-value">
                    <strong>MCA · RVITM Bengaluru</strong>
                    CGPA 8.2 · Aug 2025
                  </div>
                </div>
                <div className="about-meta-divider"></div>
                <div className="about-meta-item">
                  <div className="about-meta-label">Currently</div>
                  <div className="about-meta-value">
                    <strong>Full Stack Developer · ASPL Tech Solutions</strong>
                    Oct 2025 – March 2026 · Bengaluru
                  </div>
                </div>
                <div className="about-meta-divider"></div>
                <div className="about-meta-item">
                  <div className="about-meta-label">Find Me</div>
                  <div className="about-meta-value" style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                    <a
                      href="https://github.com/keerthana-b-v"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "15px", color: "#181717", textDecoration: "none" }}
                    >
                      <svg className="brand-icon" style={{ width: "16px", height: "16px", color: "#181717", fill: "currentColor" }} viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      GitHub
                    </a>
                    ·
                    <a
                      href="https://www.linkedin.com/in/keerthana-b-v"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "15px", color: "#0077B5", textDecoration: "none" }}
                    >
                      <svg className="brand-icon" style={{ width: "16px", height: "16px", color: "#0077B5", fill: "currentColor" }} viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>{" "}
                    ·
                    <a
                      href="https://blog.keerthanabv.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 600, fontSize: "15px", color: "var(--text)", textDecoration: "none" }}
                    >
                      Blog
                    </a>
                  </div>
                </div>
                <div className="about-meta-divider"></div>
                <div className="about-meta-item">
                  <div className="about-meta-label">Location</div>
                  <div className="about-meta-value">
                    Bengaluru, Karnataka
                    <br />
                    Open to remote &amp; relocation
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`about-card reveal d2 ${isVisible ? "visible" : ""}`}>
            <div className="mini-card-label">Award</div>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🏆</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "6px" }}>
              Best Paper Presentation
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6, marginBottom: "12px" }}>
              NCRIE-2025 · KSIT, Bengaluru
              <br />
              National Conference on Recent Innovations in Engineering
            </div>
            <a
              href="https://drive.google.com/file/d/1nPK1FBLpzKAEEKXouHAY0RT9Fjy8UlK3/view"
              target="_blank"
              rel="noopener noreferrer"
              className="erl"
            >
              View Certificate →
            </a>
          </div>

          <div className={`about-card reveal d3 ${isVisible ? "visible" : ""}`}>
            <div className="mini-card-label">Certification</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "6px" }}>
              Certified MERN Stack Developer
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-2)" }}>Dyashin Technosoft</div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";

export default function Contact() {
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
    <>
      <section className="contact-section" id="contact" ref={sectionRef}>
        <div className="contact-inner">
          <div className={isVisible ? "reveal visible" : "reveal"}>
            <div className="contact-label">Let's work together</div>
            <h2 className="contact-heading">
              Let's build<br />
              <em>something real.</em>
            </h2>
            <p className="contact-sub">
              Full-time roles, contract work, or a good technical conversation. I reply fast.
            </p>
          </div>
          <div className={`contact-actions reveal d2 ${isVisible ? "visible" : ""}`}>
            <a href="mailto:keerthana.b.v.codes@gmail.com" className="contact-email-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px" }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              keerthana.b.v.codes@gmail.com
            </a>
            <div className="contact-links-row">
              <a href="https://github.com/keerthana-b-v" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <svg className="brand-icon github" style={{ width: "15px", height: "15px", fill: "currentColor" }} viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="contact-link-label">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/keerthana-b-v" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <svg className="brand-icon linkedin" style={{ width: "15px", height: "15px", fill: "currentColor" }} viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="contact-link-label">LinkedIn</span>
              </a>
              <a href="https://blog.keerthanabv.in" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "15px", height: "15px" }}>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="contact-link-label">Blog</span>
              </a>
              <a href="tel:+919901724479" className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "15px", height: "15px" }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="contact-link-label">+91 99017 24479</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-l">
          Keerthana B V · Built from scratch · <span>Bengaluru {new Date().getFullYear()}</span>
        </div>
        <div className="footer-r">© {new Date().getFullYear()} All rights reserved</div>
      </footer>
    </>
  );
}

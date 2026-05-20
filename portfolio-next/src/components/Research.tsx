"use client";

import { useEffect, useState, useRef } from "react";

interface MetricCounterProps {
  target: number;
  suffix?: string;
  isFloat?: boolean;
  label: string;
}

function MetricCounter({ target, suffix = "", isFloat = false, label }: MetricCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 1500;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentCount = progress === 1 ? target : target * ease;
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, hasAnimated]);

  const displayValue = isFloat ? count.toFixed(1) : Math.round(count);

  return (
    <div ref={elementRef}>
      <div className="metric-val">
        {displayValue}
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="metric-lbl">{label}</div>
    </div>
  );
}

export default function Research() {
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
    <section className="section section-alt" id="research" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">01 — Award-Winning Research</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          Published <span>Research</span>
        </div>

        <div className={`research-card reveal d2 ${isVisible ? "visible" : ""}`}>
          <div className="research-body">
            <div className="research-award">🏆 Best Paper Presentation — NCRIE-2025</div>
            <div className="research-title">
              AI-Powered Legal Document Analysis with an Integrated Trust &amp; Safety Framework
            </div>
            <p className="research-desc">
              Fine-tuned a BERT transformer on 510 CUAD legal contracts to automate
              clause extraction and risk classification. Integrated a Trust &amp; Safety module with automated
              PII redaction, live fairness auditing, and privacy analysis — making AI-driven legal review
              accurate, transparent, and responsible. Full-stack application, not just a paper.
            </p>
            <div className="research-links">
              <a
                href="https://github.com/keerthana-b-v/AI-Powered-Legal-Document-Analysis-with-an-Integrated-Trust-and-Safety-Framework-"
                target="_blank"
                rel="noopener noreferrer"
                className="research-link primary"
              >
                <svg className="brand-icon github" style={{ width: "16px", height: "16px", marginRight: "8px", fill: "currentColor" }} viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://drive.google.com/file/d/1nPK1FBLpzKAEEKXouHAY0RT9Fjy8UlK3/view"
                target="_blank"
                rel="noopener noreferrer"
                className="research-link ghost"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "13px", height: "13px" }}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Certificate
              </a>
            </div>
          </div>
          <div className="research-metrics">
            <div className="research-metrics-label">Model Performance</div>
            <div className="metrics-grid">
              <MetricCounter target={84.9} suffix="%" isFloat={true} label="F1-Score" />
              <MetricCounter target={84.7} suffix="%" isFloat={true} label="Accuracy" />
              <MetricCounter target={510} label="Contracts" />
              <div>
                <div className="metric-val" style={{ fontSize: "26px", paddingTop: "8px" }}>CUAD</div>
                <div className="metric-lbl">Benchmark</div>
              </div>
            </div>
            <div className="research-venue-block">
              <strong style={{ color: "rgba(255,255,255,0.55)" }}>Published at:</strong>
              <br />
              NCRIE-2025 · Best Paper Award · KSIT, Bengaluru
              <br />
              <br />
              <a
                href="https://github.com/keerthana-b-v/AI-Powered-Legal-Document-Analysis-with-an-Integrated-Trust-and-Safety-Framework-"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full repository →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

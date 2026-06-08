"use client";

import { useEffect, useState, useRef } from "react";

interface StatItemProps {
  target: number;
  suffix: string;
  isFloat?: boolean;
  label: string;
  isRank?: boolean;
}

function StatCounter({ target, suffix, isFloat = false, label, isRank = false }: StatItemProps) {
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
            // Cubic ease-out
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
    <div className="h-stat" ref={elementRef}>
      <div className="h-stat-n">
        {displayValue}
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="h-stat-l" dangerouslySetInnerHTML={{ __html: label }}></div>
    </div>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className={`hero-badge reveal ${isVisible ? "visible" : ""}`}>
          <div className="badge-dot"></div>
          <span className="badge-text">Available for full-time roles — Bengaluru &amp; Remote</span>
        </div>

        <h1 className={`hero-headline reveal d1 ${isVisible ? "visible" : ""}`}>
          AI Agent<br />
          <span className="accent">&amp; Automation</span><br />
          <span className="outline">Builder</span>
        </h1>

        <div className={`hero-sub-row reveal d2 ${isVisible ? "visible" : ""}`}>
          <p className="hero-desc">
            Full Stack Engineer specializing in <strong>Adversarial AI Security</strong> and production-grade LLM architectures. <br />
            Ranked <strong>Top 8% Globally</strong> in the Lakera Gandalf Security Challenge.
          </p>
          <div className="hero-ctas">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              View Work
            </a>
            <a href="/Keerthana_AI.pdf" className="btn-outline" download="Keerthana_AI.pdf">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          </div>
        </div>

        <div className={`hero-stats reveal d3 ${isVisible ? "visible" : ""}`}>
          <StatCounter
            target={8}
            suffix="th"
            isRank={true}
            label="Percentile · Global AI<br />Security Challenge"
          />
          <StatCounter
            target={84.9}
            suffix="%"
            isFloat={true}
            label="F1-Score on legal<br />AI benchmark"
          />
          <StatCounter
            target={15}
            suffix="+"
            label="Adversarial techniques<br />documented & tested"
          />
          <StatCounter
            target={8}
            suffix="+"
            label="Production apps<br />shipped end-to-end"
          />
        </div>
      </div>
    </section>
  );
}

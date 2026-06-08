"use client";

import { useEffect, useState, useRef } from "react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPromptRouteDeepDiveOpen, setIsPromptRouteDeepDiveOpen] = useState(false);
  const [isLegalMindDeepDiveOpen, setIsLegalMindDeepDiveOpen] = useState(false);
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
    <section className="section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">03 — Selected Projects</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          Things I've <span>Built</span>
        </div>

        <div className="projects-grid" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* P1: AI-Powered Legal Document Analysis */}
          <div className={`exp-card reveal d1 ${isVisible ? "visible" : ""}`}>
            <div className="exp-header" style={{ marginBottom: "16px" }}>
              <div>
                <div className="exp-company" style={{ fontSize: "26px" }}>AI-Powered Legal Document Analysis</div>
                <div className="exp-role">Lead Full Stack AI Engineer · Enterprise Contract Analytics &amp; Trust &amp; Safety Suite</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <a
                  href="https://github.com/keerthana-b-v/AI-Powered-Legal-Document-Analysis-with-an-Integrated-Trust-and-Safety-Framework-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link primary"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  View Repository
                  <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="https://drive.google.com/file/d/1nPK1FBLpzKAEEKXouHAY0RT9Fjy8UlK3/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link ghost"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  View Certificate
                  <svg className="brand-icon" style={{ width: "13px", height: "13px", fill: "none", stroke: "currentColor", strokeWidth: 2, marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
                <span className="research-link ghost" style={{ display: "inline-flex", alignItems: "center" }}>
                  Legal-BERT &amp; OpenCV
                  <svg className="brand-icon" style={{ width: "14px", height: "14px", fill: "none", stroke: "currentColor", strokeWidth: 2, marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </span>
              </div>
            </div>

            <p className="hero-desc" style={{ fontSize: "15px", marginBottom: "24px", maxWidth: "960px" }}>
              Designed and developed a production-grade, multi-format legal contract analytics platform that automates clause extraction and risk analysis from scanned PDFs, images, and text documents with a robust, integrated Trust &amp; Safety and Algorithmic Fairness compliance pipeline.
            </p>

            <div className="pexi" style={{ padding: 0, border: "none", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", marginBottom: "24px", gap: "20px" }}>
              <div className="e-problem">
                <p className="ebl">The Problem</p>
                <p className="ebt">Manual contract review is slow. However, scanned contracts have watermarks and stamps that corrupt OCR. Moreover, sensitive PII cannot be exposed to external APIs, and neural classifiers exhibit unchecked demographic performance biases.</p>
              </div>
              <div className="e-solution">
                <p className="ebl">The Solution</p>
                <p className="ebt">Built an intelligent layout-aware processor programmatically bypassing watermarks, a fine-tuned Legal-BERT classifier, a local spaCy PII redactor generating Privacy Scores, and an auditing system evaluating F1 parity across classes.</p>
              </div>
              <div className="e-decision">
                <p className="ebl">Key Engineering Decision</p>
                <p className="ebt">Fine-tuned BERT on the CUAD benchmark instead of relying on prompt engineering alone — because 84.9% F1 is a number you can defend in a paper and in production. Measurable over impressive.</p>
              </div>
              <div className="e-result">
                <p className="ebl">Result</p>
                <p className="ebt" style={{ fontWeight: 500 }}>84.9% F1, 84.7% accuracy on CUAD (510 legal contracts). Research paper presented at NCRIE-2025, KSIT — Best Paper Presentation Award.</p>
              </div>
            </div>

            {/* Metrics Sub-Grid */}
            <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px", marginBottom: "24px", padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "12px", display: "grid" }}>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--accent)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>92.0%</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Macro F1-Score</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>+32%</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>OCR Accuracy Boost</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>10+</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Clause Categories</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>&lt; 10%</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Bias Disparity Gap</div>
              </div>
            </div>

            {/* Collapsible Technical Deep-Dive */}
            <div className={`pexp ${isLegalMindDeepDiveOpen ? "open" : ""}`} style={{ marginBottom: "20px" }}>
              <div style={{ padding: "24px", background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,61,0,0.15)", borderRadius: "12px", marginTop: "16px" }}>
                
                {/* 1. Computer Vision & NLP Classifier */}
                <h4 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700, color: "var(--accent)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg style={{ width: "18px", height: "18px", fill: "none", stroke: "currentColor", strokeWidth: 2 }} viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Computer Vision Preprocessing &amp; Neural Classification
                </h4>
                
                <p className="ebt" style={{ fontSize: "13.5px", color: "var(--text-2)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Scanned agreements present noisy artifacts. We run page-by-page coordinates pruning using OpenCV and fitz to isolate body boundaries, stripping stamps and page metadata before running adaptive binarization to boost OCR text recovery.
                </p>

                {/* Workflow Diagram */}
                <div className="pipeline-flow-diagram" style={{ alignItems: "center", gap: "12px", marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ padding: "12px", background: "rgba(255,61,0,0.05)", border: "1px solid rgba(255,61,0,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--accent)", fontWeight: "bold", textTransform: "uppercase" }}>1. OpenCV Core</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>Boundary Grooming</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>Thresholding &amp; Noise Removal</div>
                  </div>
                  <div className="pipeline-arrow" style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "20px" }}>&rarr;</div>
                  <div style={{ padding: "12px", background: "rgba(22,163,74,0.05)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#16a34a", fontWeight: "bold", textTransform: "uppercase" }}>2. Legal-BERT</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>PyTorch Fine-Tuning</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>CUAD Dataset · 6 Epochs · fp16</div>
                  </div>
                  <div className="pipeline-arrow" style={{ color: "#16a34a", fontWeight: "bold", fontSize: "20px" }}>&rarr;</div>
                  <div style={{ padding: "12px", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#2563eb", fontWeight: "bold", textTransform: "uppercase" }}>3. Active Learning</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>HITL MongoDB Collector</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>User-corrected Annotations Pipeline</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px", marginBottom: "24px" }} className="pipeline-bullets">
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Adaptive Document CV</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}>Programmatically clips top and bottom margin zones of pages, isolating body content and removing e-stamp logos, signatures, and page numbering clutter.</li>
                      <li style={{ marginBottom: "6px" }}>Applies OpenCV Gaussian smoothing, adaptive binarization, and horizontal/vertical morphological filters to make text fully high-contrast for Tesseract.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Hugging Face Classifier</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}>Fine-tuned <code>nlpaueb/legal-bert-base-uncased</code> using Hugging Face and PyTorch on CUAD (Contract Understanding Atticus Dataset) text chunks.</li>
                      <li style={{ marginBottom: "6px" }}>Classifies 10+ clauses with logit confidence scores, returning predictive probability distribution margins.</li>
                    </ul>
                  </div>
                </div>

                {/* 2. Trust & Safety Section */}
                <h4 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700, color: "var(--accent)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg style={{ width: "18px", height: "18px", fill: "none", stroke: "currentColor", strokeWidth: 2 }} viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Trust &amp; Safety Pipeline &amp; Fairness Auditor
                </h4>
                
                <p className="ebt" style={{ fontSize: "13.5px", color: "var(--text-2)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Privacy is critical. The local NLP redactor removes names, organizations, SSNs, and emails on local servers. A dedicated compliance auditor checks prediction accuracy gaps across document demographics to prevent algorithmic bias.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px" }} className="pipeline-bullets">
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Dual-Engine PII Redactor</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>spaCy + RegEx:</strong> Deploys a large neural spaCy Named Entity Recognition model for spatial nouns coupled with optimized regular expressions for numbers.</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Privacy Score:</strong> Generates a mathematical privacy risk metric based on entity density, blocking storage of unredacted files.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Fairness Auditing Suite</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Parity Tracking:</strong> Computes demographic parity and F1 performance disparities between categories using Scikit-Learn to ensure equitable model performance.</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Bias Warning Flags:</strong> Triggers warning indicators if performance gaps between classes exceed a strict 10% threshold.</li>
                    </ul>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="exp-divider" style={{ marginBottom: "20px" }}></div>
            
            <div className="project-stack-chips" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>Stack &amp; Skills</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>PyTorch</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>Python</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>OpenCV</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Legal-BERT</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>spaCy NLP</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Scikit-Learn</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>React.js</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Node.js</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>MongoDB</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="erl"
                onClick={() => setIsLegalMindDeepDiveOpen(!isLegalMindDeepDiveOpen)}
                style={{ background: "none", border: "none", borderBottom: "1px solid currentColor", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 0" }}
              >
                <span>{isLegalMindDeepDiveOpen ? "Hide Technical Deep-Dive" : "View Technical Deep-Dive"}</span>
                <span className={`etog ${isLegalMindDeepDiveOpen ? "open" : ""}`}>+</span>
              </button>
            </div>
          </div>

          {/* P2: PromptRoute */}
          <div className={`exp-card reveal d2 ${isVisible ? "visible" : ""}`}>
            <div className="exp-header" style={{ marginBottom: "16px" }}>
              <div>
                <div className="exp-company" style={{ fontSize: "26px" }}>PromptRoute</div>
                <div className="exp-role">Lead AI/ML &amp; Frontend Engineer · Offline-First Hybrid AI Prompt Router</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <a
                  href="https://github.com/keerthana-b-v/Prompt-enhancer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link primary"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  View Repository
                  <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <span className="research-link ghost" style={{ display: "inline-flex", alignItems: "center" }}>
                  Chrome Extension MV3
                  <svg className="brand-icon" style={{ width: "14px", height: "14px", fill: "none", stroke: "currentColor", strokeWidth: 2, marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </span>
              </div>
            </div>

            <p className="hero-desc" style={{ fontSize: "15px", marginBottom: "24px", maxWidth: "960px" }}>
              Designed and built a dynamic in-browser prompt routing engine that replaces generic, rigid instruction templates with targeted cognitive routing. By running a quantized local neural network, it automatically classifies user intent and wraps inputs in the optimal academic reasoning paradigm (out of 17 supported techniques) in under 15ms.
            </p>

            <div className="pexi" style={{ padding: 0, border: "none", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", marginBottom: "24px", gap: "20px" }}>
              <div className="e-problem">
                <p className="ebl">Monolithic Problem</p>
                <p className="ebt">Most AI assistants rigidly wrap every query in generic templates (e.g. <code>Role -&gt; Task -&gt; Constraint</code>). This wastes expensive tokens on simple chats and lacks targeted cognitive reasoning for complex logic.</p>
              </div>
              <div className="e-solution">
                <p className="ebl">Dynamic Solution</p>
                <p className="ebt">PromptRoute intercepts inputs in real-time and runs a local neural network to classify intent, wrapping queries in the precise academic technique (out of 17 paradigms) matching the specific use case.</p>
              </div>
              <div className="e-decision">
                <p className="ebl">The Sandbox Constraint</p>
                <p className="ebt">Chrome Manifest V3 service workers cannot execute heavy WebAssembly/WebGPU compilations directly. Bypassed this by mounting ONNX Runtime Web in a persistent Chrome Offscreen Document.</p>
              </div>
              <div className="e-result">
                <p className="ebl">The Hybrid Architecture</p>
                <p className="ebt">Local INT8 classifier executes locally in &lt;15ms. Low-confidence queries (&lt;55%) automatically route to a high-fidelity Groq Llama 3.3 70B cloud API, securing 80% token cost savings.</p>
              </div>
            </div>

            {/* Performance Metrics Sub-Grid */}
            <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px", marginBottom: "24px", padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "12px", display: "grid" }}>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--accent)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>&lt; 15ms</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Local Latency</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>14.8MB</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Quantized Size</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>85.6%</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Eval Accuracy</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>7,477</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Dataset Samples</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="metric-val" style={{ color: "var(--text)", fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>~80%</div>
                <div className="metric-lbl" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", marginTop: "4px" }}>Token Savings</div>
              </div>
            </div>

            {/* Collapsible Technical Deep-Dive */}
            <div className={`pexp ${isPromptRouteDeepDiveOpen ? "open" : ""}`} style={{ marginBottom: "20px" }}>
              <div style={{ padding: "24px", background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,61,0,0.15)", borderRadius: "12px", marginTop: "16px" }}>
                
                {/* 1. The ML Pipeline Section */}
                <h4 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700, color: "var(--accent)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg style={{ width: "18px", height: "18px", fill: "none", stroke: "currentColor", strokeWidth: 2 }} viewBox="0 0 24 24">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Python &amp; Google Colab ML Pipeline
                </h4>
                
                <p className="ebt" style={{ fontSize: "13.5px", color: "var(--text-2)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Engineered an end-to-end machine learning pipeline in Python to fine-tune <code>distilbert-base-uncased</code> for local browser-side inference. The dataset pipeline balances diverse instruction-following and coding prompts with engineered casual colloquialisms to ensure robust real-world intent matching.
                </p>
                
                {/* Pipeline CSS Flow Diagram */}
                <div className="pipeline-flow-diagram" style={{ alignItems: "center", gap: "12px", marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ padding: "12px", background: "rgba(255,61,0,0.05)", border: "1px solid rgba(255,61,0,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--accent)", fontWeight: "bold", textTransform: "uppercase" }}>1. Data Engine</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>7,477 Prompt Samples</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>Dolly, Alpaca, Glaive + Custom Synthetics</div>
                  </div>
                  <div className="pipeline-arrow" style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>&rarr;</div>
                  <div style={{ padding: "12px", background: "rgba(22,163,74,0.05)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#16a34a", fontWeight: "bold", textTransform: "uppercase" }}>2. Colab PyTorch</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>Tesla T4 GPU Fine-Tuning</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>AdamW · fp16 · 6 Epochs · 85.6% Acc</div>
                  </div>
                  <div className="pipeline-arrow" style={{ color: "#16a34a", fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>&rarr;</div>
                  <div style={{ padding: "12px", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#2563eb", fontWeight: "bold", textTransform: "uppercase" }}>3. ONNX Quantization</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--text)" }}>14.8MB INT8 Compile</div>
                    <div style={{ fontSize: "9px", color: "var(--text-3)", marginTop: "2px" }}>Offline WASM/WebGPU Inference</div>
                  </div>
                </div>
                
                {/* ML Pipeline Bullet points */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px", marginBottom: "24px" }} className="pipeline-bullets">
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Data Engine &amp; Preprocessing</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Dataset Blending:</strong> Merged key programming prompts from Glaive, task instruction-following from Alpaca, and factual QA from Databricks Dolly-15k.</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Synthetic Augmentation:</strong> Programmed over 1,000 synthetic samples targeting local linguistic idioms, typographical errors, and casual Indian English phrasing (e.g., <em>"kindly draft..."</em>).</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Model Architecture &amp; Quantization</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Training Configuration:</strong> Leveraged PyTorch and Hugging Face to fine-tune DistilBERT over 6 epochs, utilizing AdamW optimizer, warmup ratio of 0.1, and mixed-precision (<code>fp16</code>).</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>INT8 ONNX Compressing:</strong> Compiled PyTorch weights to an open-format ONNX graph, quantizing weights to 8-bit integers to compress the model from ~270MB down to 14.8MB.</li>
                    </ul>
                  </div>
                </div>
                
                {/* 2. Browser Implementation Section */}
                <h4 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700, color: "var(--accent)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg style={{ width: "18px", height: "18px", fill: "none", stroke: "currentColor", strokeWidth: 2 }} viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M2 12h20" />
                  </svg>
                  Chrome MV3 Extension &amp; Fallback Runner
                </h4>
                
                <p className="ebt" style={{ fontSize: "13.5px", color: "var(--text-2)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Bypasses Manifest V3 service-worker execution environments by running in-browser inference using ONNX Runtime Web in a sandboxed, hidden Offscreen Document. This architecture loads the WASM/WebGPU models eagerly upon extension boot to prevent service-worker eviction or freeze issues.
                </p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px" }} className="pipeline-bullets">
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Offscreen Sandbox &amp; Messaging</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>WASM &amp; WebGPU SIMD:</strong> Leverages hardware WebGPU acceleration in the sandbox offscreen page to perform local classification in under 15ms.</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>IPC Native Bridging:</strong> Communicates between host DOM panels, Manifest V3 background service worker threads, and the sandbox using low-latency Chrome native messages.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "8px" }}>Hybrid Fallback &amp; UI</h5>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-3)" }}>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Secure Groq Runner:</strong> Intercepts low-confidence intent classifications (&lt;55%) and routes them to a cloud Groq runner (Llama 3.3 70B) to guarantee high-fidelity reasoning.</li>
                      <li style={{ marginBottom: "6px" }}><strong style={{ color: "var(--text-2)" }}>Premium Glassmorphic UX:</strong> Injects a translucent, responsive control overlay with backdrop filters, manual overrides, and live token estimators.</li>
                    </ul>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="exp-divider" style={{ marginBottom: "20px" }}></div>
            
            <div className="project-stack-chips" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>Stack &amp; Skills</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>Python</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>LLM Fine-Tuning</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>PyTorch</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Hugging Face Transformers</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>JavaScript ES6+</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>ONNX Runtime Web</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>WebGPU</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Chrome MV3</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Jest</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="erl"
                onClick={() => setIsPromptRouteDeepDiveOpen(!isPromptRouteDeepDiveOpen)}
                style={{ background: "none", border: "none", borderBottom: "1px solid currentColor", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 0" }}
              >
                <span>{isPromptRouteDeepDiveOpen ? "Hide Technical Deep-Dive" : "View Technical Deep-Dive"}</span>
                <span className={`etog ${isPromptRouteDeepDiveOpen ? "open" : ""}`}>+</span>
              </button>
            </div>
          </div>

          {/* P3: AI Security Lab */}
          <div className={`exp-card reveal d3 ${isVisible ? "visible" : ""}`}>
            <div className="exp-header" style={{ marginBottom: "16px" }}>
              <div>
                <div className="exp-company" style={{ fontSize: "26px" }}>AI Security Lab</div>
                <div className="exp-role">Prompt Injection &amp; Defensive Engineering Lab</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <a
                  href="https://github.com/keerthana-b-v/Prompt-Injection-Lab-Adversarial-LLM-Testing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link primary"
                >
                  View Repository
                  <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="hero-desc" style={{ fontSize: "15px", marginBottom: "28px", maxWidth: "900px" }}>
              A comprehensive adversarial testing environment where I neutralized all 7 levels of the Lakera Gandalf challenge. I achieved a <strong>Top 8% Global Ranking</strong> by developing a &quot;Defense-in-Depth&quot; framework.
            </p>

            <div className="pexi" style={{ padding: 0, border: "none", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", marginBottom: "28px", gap: "20px" }}>
              <div className="e-problem">
                <p className="ebl">The Vulnerability</p>
                <p className="ebt">LLMs are susceptible to sophisticated prompt injections that easily bypass standard input sanitization and moderation layers.</p>
              </div>
              <div className="e-solution">
                <p className="ebl">The Defense</p>
                <p className="ebt">Documented 15+ adversarial techniques (Multilingual Obfuscation, Data Fragmentation) and engineered intent-based guardrails to expose and patch model blindspots.</p>
              </div>
            </div>

            <div className="exp-divider" style={{ marginBottom: "20px" }}></div>
            
            <div className="project-stack-chips" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>Stack &amp; Skills</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>LLM Guardrails</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Adversarial Testing</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Red Teaming</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Prompt Engineering</span>
            </div>
          </div>

          {/* P4: Blood Donor Management System */}
          <div className={`exp-card reveal d4 ${isVisible ? "visible" : ""}`}>
            <div className="exp-header" style={{ marginBottom: "16px" }}>
              <div>
                <div className="exp-company" style={{ fontSize: "26px" }}>Blood Donor Management System</div>
                <div className="exp-role">Full Stack Developer · Healthcare Information &amp; Analytics Platform</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <a
                  href="https://github.com/keerthana-b-v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link primary"
                >
                  View Repository
                  <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="hero-desc" style={{ fontSize: "15px", marginBottom: "24px", maxWidth: "960px" }}>
              Admin dashboard for donor/recipient CRUD operations, automated blood group compatibility matching, donation lifecycle tracking, and analytics-ready medical database management.
            </p>

            <div className="pexi" style={{ padding: 0, border: "none", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", marginBottom: "24px", gap: "20px" }}>
              <div className="e-problem">
                <p className="ebl">The Problem</p>
                <p className="ebt">Managing donor profiles, matching blood types during emergencies, and updating donation statuses across regional healthcare collection sites was highly manual, sluggish, and prone to tracking errors.</p>
              </div>
              <div className="e-solution">
                <p className="ebl">What I Built</p>
                <p className="ebt">A fast, full-stack medical registry system with JWT authentication, donor/recipient directories, direct blood type matching algorithms, donation workflow monitors, and dynamic analytics dashboards.</p>
              </div>
              <div className="e-decision">
                <p className="ebl">Key Engineering Decision</p>
                <p className="ebt">Selected MongoDB for its flexible schema (easily absorbing varied donor medical flags) paired with Python-Flask APIs to encapsulate matching logic, ensuring rapid queries and extreme service maintainability.</p>
              </div>
              <div className="e-result">
                <p className="ebl">The Result</p>
                <p className="ebt" style={{ fontWeight: 500 }}>Delivered a high-performance system for swift emergency matching, highly indexable profiles, and real-time donation tracking with clean analytics reports for clinical operations.</p>
              </div>
            </div>

            <div className="exp-divider" style={{ marginBottom: "20px" }}></div>
            
            <div className="project-stack-chips" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>Stack &amp; Skills</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>React</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>Flask (Python)</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>MongoDB</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>REST APIs</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>JWT Security</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Vite</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Bootstrap</span>
            </div>
          </div>

          {/* P5: E-Commerce Return Policy Chatbot */}
          <div className={`exp-card reveal d5 ${isVisible ? "visible" : ""}`}>
            <div className="exp-header" style={{ marginBottom: "16px" }}>
              <div>
                <div className="exp-company" style={{ fontSize: "26px" }}>E-Commerce Return Policy Chatbot</div>
                <div className="exp-role">AI Developer · RAG Architecture &amp; Guardrails</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <a
                  href="https://github.com/keerthana-b-v/E-Commerce-Return-Policy-Chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-link primary"
                >
                  View Repository
                  <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginLeft: "6px" }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="hero-desc" style={{ fontSize: "15px", marginBottom: "24px", maxWidth: "960px" }}>
              An interactive web-based chatbot designed to act as an automated customer support agent for an e-commerce store, securely answering questions by querying a specific company policy document.
            </p>

            <div className="pexi" style={{ padding: 0, border: "none", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", marginBottom: "24px", gap: "20px" }}>
              <div className="e-problem">
                <p className="ebl">The Setup</p>
                <p className="ebt">Instead of relying on general internet knowledge, the chatbot is powered by a RAG pipeline using FAISS and HuggingFace embeddings to search the specific policy.</p>
              </div>
              <div className="e-solution">
                <p className="ebl">The Processing</p>
                <p className="ebt">Integrated the lightning-fast Groq API with the Llama-3.1 model to provide instant, human-like, conversational responses to customer queries.</p>
              </div>
              <div className="e-decision">
                <p className="ebl">Key Engineering Feature</p>
                <p className="ebt">Implemented strict guardrails using LangChain. If a user asks a question not covered in the return policy, the bot recognizes the boundary and politely refuses to answer, preventing AI hallucination.</p>
              </div>
            </div>

            <div className="exp-divider" style={{ marginBottom: "20px" }}></div>
            
            <div className="project-stack-chips" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "8px" }}>Stack &amp; Skills</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>Python</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>LangChain</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px", background: "rgba(255, 61, 0, 0.1)", borderColor: "rgba(255, 61, 0, 0.25)", color: "var(--accent)" }}>Groq API (Llama 3)</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>Streamlit</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>FAISS</span>
              <span className="skill-chip" style={{ padding: "4px 10px", fontSize: "11px" }}>HuggingFace</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

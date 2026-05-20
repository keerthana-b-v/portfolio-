"use client";

import { useEffect, useState, useRef } from "react";

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Expert (Research)";
  usage: string;
  note: string;
}

interface SkillGroup {
  category: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React.js",
        level: "Expert",
        usage: "Used in 8+ production apps",
        note: "Core technology used for ASPL client portals, custom dashboard widgets, and responsive B2B platform layouts."
      },
      {
        name: "React 19",
        level: "Advanced",
        usage: "Used in latest portfolio migration",
        note: "Leveraged new React features, concurrent rendering, and clean native state management hooks."
      },
      {
        name: "Next.js 14",
        level: "Advanced",
        usage: "Used in research & monorepos",
        note: "Implemented Next.js App Router, server-side data fetching, and monorepo architectures with Prisma and NextAuth."
      },
      {
        name: "JavaScript ES6+",
        level: "Expert",
        usage: "Daily development",
        note: "Deep asynchronous execution models, promises, functional pipelines, and ESNext standard features."
      },
      {
        name: "Tailwind CSS",
        level: "Expert",
        usage: "Used in 6+ projects",
        note: "Rapid, responsive design systems, custom flexbox/grid components, and micro-interaction states."
      },
      {
        name: "Framer Motion",
        level: "Advanced",
        usage: "Smooth client UI",
        note: "Configured layout animations, hover states, scroll reveals, and custom mobile navigations."
      },
      {
        name: "Vite",
        level: "Expert",
        usage: "Quick project scaffolding",
        note: "Configured fast dev servers, hot module reloading, and bundle build setups."
      },
      {
        name: "HTML5 / CSS3",
        level: "Expert",
        usage: "Structural core",
        note: "Semantic document schemas, responsive layout containers, variable states, and custom animations."
      }
    ]
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        level: "Expert",
        usage: "Used in 8+ API backends",
        note: "Architected RESTful endpoints, event loops, stream-based file processing, and monorepo configurations."
      },
      {
        name: "Express.js",
        level: "Expert",
        usage: "Backend routing core",
        note: "Implemented robust middlewares, CORS filters, request-response handling, and error control layers."
      },
      {
        name: "Python",
        level: "Advanced",
        usage: "Used in BERT training & Flask",
        note: "Implemented machine learning training loops, spaCy named entity extraction, and custom image binarization algorithms."
      },
      {
        name: "Flask",
        level: "Advanced",
        usage: "Full-stack HRMS API",
        note: "Configured Flask CORS architectures, SQLAlchemy schemas, and JWT-based Role-Based Access Control (RBAC)."
      },
      {
        name: "REST API",
        level: "Expert",
        usage: "Used across all applications",
        note: "Engineered scalable REST routes with standard HTTP verbs, payloads, parameters, and secure JSON tokens."
      }
    ]
  },
  {
    category: "Data & AI",
    skills: [
      {
        name: "PostgreSQL",
        level: "Expert",
        usage: "ASPL corporate databases",
        note: "Designed relational database schemas, multi-table joins, indexes, and complex analytics queries."
      },
      {
        name: "MongoDB",
        level: "Advanced",
        usage: "Used in Blood Donor & Legal AI",
        note: "Configured document stores, active learning annotation caches, and CRUD pipelines."
      },
      {
        name: "MySQL",
        level: "Expert",
        usage: "Deployed client databases",
        note: "Managed normalization, triggers, query performance tracking, and transaction safety."
      },
      {
        name: "Firebase",
        level: "Advanced",
        usage: "Real-time sync prototypes",
        note: "Configured real-time document sync, security rules, and user social authentication."
      },
      {
        name: "BERT (fine-tuning)",
        level: "Expert (Research)",
        usage: "84.9% F1 on CUAD Contracts",
        note: "Fine-tuned Hugging Face transformer models using PyTorch on 510 real legal agreements. Presented paper at NCRIE-2025."
      },
      {
        name: "LLM Fine-Tuning",
        level: "Advanced",
        usage: "Model customization research",
        note: "Familiar with PEFT, LoRA, and pipeline fine-tuning for domain-specific tasks."
      },
      {
        name: "OpenAI API",
        level: "Expert",
        usage: "Legal summary formatting",
        note: "Engineered robust JSON steering and functional tool calls to convert contract raw classes to plain English summaries."
      },
      {
        name: "LangChain",
        level: "Advanced",
        usage: "RAG & Chatbot engineering",
        note: "Built document chunking, prompt chaining workflows, and memory states for custom chatbots."
      },
      {
        name: "Hugging Face",
        level: "Advanced",
        usage: "Model selection & pipelines",
        note: "Sourced tokenizers, deployed pipeline wrappers, and formatted train-test splits."
      },
      {
        name: "NLP",
        level: "Expert",
        usage: "PII redaction & classification",
        note: "Engineered custom Named Entity Recognition (NER), chunk parsing, and text vectorization systems."
      },
      {
        name: "SHAP",
        level: "Expert",
        usage: "Explainable AI (XAI) dashboard",
        note: "Generated visual explainability heatmaps for medical risk models to help clinicians understand neural weights."
      }
    ]
  },
  {
    category: "Advanced Prompting & Security",
    skills: [
      {
        name: "Chain of Thought (CoT)",
        level: "Expert",
        usage: "Complex LLM reasoning tasks",
        note: "Structured prompt hierarchies to guide LLMs through complex mathematical, logic, or coding sequences step-by-step."
      },
      {
        name: "ReAct Prompting",
        level: "Expert",
        usage: "Tool-use & agents steering",
        note: "Engineered prompts that interleave thought, actions, and observations to let LLMs use search engines and calculators."
      },
      {
        name: "Self-Consistency",
        level: "Advanced",
        usage: "LLM accuracy calibration",
        note: "Sampled multiple reasoning paths to find consensus and minimize model hallucination rates."
      },
      {
        name: "Least-to-Most Prompting",
        level: "Advanced",
        usage: "Deconstruction tasks",
        note: "Prompts that decompose a huge query into sub-problems, solving each sequentially to boost model success."
      },
      {
        name: "XML/Meta Prompting",
        level: "Expert",
        usage: "Clean payload formatting",
        note: "Constructed precise prompting wrappers with XML tags (<system>, <input>) to prevent model instruction injection."
      },
      {
        name: "Adversarial LLM Testing",
        level: "Expert",
        usage: "Security auditing",
        note: "Stress-tested AI applications against prompt injection, jailbreaking, and demographic bias vectors."
      },
      {
        name: "Guardrail Engineering",
        level: "Expert",
        usage: "Trust & Safety Framework",
        note: "Implemented deterministic checks, PII filters, and moderation wrappers to ensure safe AI boundaries."
      },
      {
        name: "RAG Optimization",
        level: "Expert",
        usage: "Chat widgets & search platforms",
        note: "Configured overlap chunking, metadata extraction, semantic score thresholds, and custom prompt templates."
      },
      {
        name: "Functional & API Steering",
        level: "Expert",
        usage: "JSON-structured outputs",
        note: "Guided models to return pure JSON objects adhering strictly to schema rules for backend parsing."
      }
    ]
  },
  {
    category: "DevOps & Tooling",
    skills: [
      {
        name: "Linux VPS",
        level: "Expert",
        usage: "3+ live production client servers",
        note: "Configured SSH, firewall security rules, systemd services, and resource tracking on Hostinger VPS servers."
      },
      {
        name: "Nginx",
        level: "Expert",
        usage: "Production server gateway",
        note: "Configured Nginx as reverse proxy, gzip compression, HTTP/2 optimizations, and security headers."
      },
      {
        name: "SSL/TLS",
        level: "Expert",
        usage: "Encrypted secure transport",
        note: "Configured automated Let's Encrypt certificates, strict SSL security headers, and domain redirection hooks."
      },
      {
        name: "Git / GitHub",
        level: "Expert",
        usage: "Daily version control",
        note: "Managed commits, branching models, pull request code reviews, conflict resolutions, and CI/CD triggers."
      },
      {
        name: "Netlify",
        level: "Expert",
        usage: "Static site deployment",
        note: "Configured redirect filters, form integrations, and custom DNS hosting configurations."
      },
      {
        name: "Vercel",
        level: "Expert",
        usage: "Next.js production hosting",
        note: "Configured serverless function regions, environment secrets, and preview deployment chains."
      },
      {
        name: "NPM Workspaces",
        level: "Advanced",
        usage: "Monorepo structuring",
        note: "Configured monorepos containing isolated React/Node/Shared subfolders to coordinate package updates."
      },
      {
        name: "Jira / Agile",
        level: "Advanced",
        usage: "Corporate product cycles",
        note: "Tracked development sprint milestones, created subtasks, and updated progress within standard agile boards."
      }
    ]
  }
];


interface SkillsProps {
  onShowBadges: () => void;
}

export default function Skills({ onShowBadges }: SkillsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILL_GROUPS[0].skills[0]); // Default to React.js
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

  // Filter skills based on Category Tab and Search Query
  const filteredGroups = SKILL_GROUPS.map((group) => {
    const isCategoryMatch = activeTab === "All" || group.category.toLowerCase().includes(activeTab.toLowerCase().split(" ")[0]);
    
    if (!isCategoryMatch) {
      return { category: group.category, skills: [] };
    }

    const matchingSkills = group.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.note.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { category: group.category, skills: matchingSkills };
  }).filter((group) => group.skills.length > 0);

  const tabs = ["All", "Frontend", "Backend", "AI & Data", "Prompting", "DevOps"];

  return (
    <section className="section section-alt" id="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-label reveal ${isVisible ? "visible" : ""}`}>
          <div className="section-label-dot"></div>
          <span className="section-label-text">06 — Skills</span>
        </div>
        <div className={`section-title reveal d1 ${isVisible ? "visible" : ""}`}>
          Technical <span>Competence</span>
        </div>

        {/* CSS Encapsulation for Premium Layout & Interactions */}
        <style dangerouslySetInnerHTML={{ __html: `
          .skills-outer {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 40px;
            align-items: start;
          }
          .skills-sidebar {
            position: sticky;
            top: 100px;
          }

          /* Search and Filter System */
          .skills-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
            background: rgba(255,255,255,0.01);
            border: 1px solid var(--border);
            padding: 12px 20px;
            border-radius: 12px;
            flex-wrap: wrap;
          }
          .search-wrapper {
            position: relative;
            flex: 1;
            min-width: 250px;
          }
          .search-input {
            width: 100%;
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 10px 16px 10px 38px;
            font-size: 13.5px;
            color: var(--text);
            font-family: var(--body);
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .search-input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 10px rgba(255, 61, 0, 0.15);
          }
          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            color: var(--text-3);
            pointer-events: none;
          }
          .filter-tabs {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
          }
          .filter-tab {
            font-family: var(--mono);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: none;
            border: 1px solid transparent;
            color: var(--text-3);
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .filter-tab:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.03);
          }
          .filter-tab.active {
            color: var(--accent);
            border-color: rgba(255, 61, 0, 0.2);
            background: rgba(255, 61, 0, 0.04);
            font-weight: 600;
          }

          /* Interactive Skill Chips */
          .skill-chip-interactive {
            font-family: var(--mono);
            font-size: 12.5px;
            font-weight: 500;
            color: var(--text);
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border);
            padding: 9px 15px;
            border-radius: 8px;
            letter-spacing: 0.02em;
            line-height: 1.5;
            transition: all 0.2s;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
          }
          .skill-chip-interactive:hover {
            background: rgba(255, 61, 0, 0.05);
            border-color: rgba(255, 61, 0, 0.25);
            color: var(--accent);
            transform: translateY(-1px);
          }
          .skill-chip-interactive.active {
            background: rgba(255, 61, 0, 0.1);
            border-color: var(--accent);
            color: var(--text);
            font-weight: 600;
            box-shadow: 0 0 10px rgba(255, 61, 0, 0.12);
          }

          /* Detail Card Component */
          .detail-panel {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 28px;
            margin-top: 32px;
            box-shadow: var(--shadow-sm);
            position: relative;
            animation: fadeIn 0.3s ease;
          }
          .detail-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid var(--border);
            padding-bottom: 16px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 12px;
          }
          .detail-name {
            font-family: var(--display);
            font-size: 20px;
            font-weight: 700;
            color: var(--text);
          }
          .detail-meta-container {
            display: flex;
            gap: 12px;
          }
          .detail-badge {
            font-family: var(--mono);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 4px 10px;
            border-radius: 4px;
            font-weight: 600;
          }
          .detail-badge.level {
            background: rgba(255, 61, 0, 0.1);
            color: var(--accent);
            border: 1px solid rgba(255, 61, 0, 0.2);
          }
          .detail-badge.usage {
            background: rgba(255, 255, 255, 0.03);
            color: var(--text-2);
            border: 1px solid var(--border);
          }
          .detail-note {
            font-size: 14.5px;
            line-height: 1.6;
            color: var(--text-2);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 1024px) {
            .skills-outer {
              grid-template-columns: 1fr;
              gap: 30px;
            }
            .skills-sidebar {
              position: static;
            }
          }
        ` }} />


        <div className="skills-outer">
          {/* Sidebar Section */}
          <div className={`skills-sidebar reveal ${isVisible ? "visible" : ""}`}>
            <div className="skills-sidebar-title">Production-Tested<br />Stack</div>
            <div className="skills-sidebar-sub">
              Professional competencies and core tools I leverage to architect scalable web apps and secure AI workflows.
            </div>
            
            <div className="skills-sidebar-stat">
              <div className="sss-n">8+</div>
              <div className="sss-l">Production apps<br />delivered end-to-end</div>
            </div>
            
            <div className="skills-sidebar-stat">
              <div className="sss-n">3+</div>
              <div className="sss-l">Servers configured<br />and deployed live</div>
            </div>

            <div 
              className="skills-sidebar-stat" 
              onClick={onShowBadges}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onShowBadges(); } }}
              title="Click to view verified badges"
            >
              <div className="sss-n" style={{ color: "var(--accent)" }}>4+</div>
              <div className="sss-l">
                Professional AI<br />
                <span style={{ borderBottom: "1px dashed rgba(255, 61, 0, 0.4)", color: "var(--text)" }}>
                  badges verified &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Main Controls & Chips Section */}
          <div className={`skills-groups reveal d1 ${isVisible ? "visible" : ""}`}>
            {/* Search and Filters */}
            <div className="skills-controls">
              <div className="search-wrapper">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Filter skills (e.g. React, Python, BERT, RAG...)"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      // Select the first skill of that tab if category changes
                      const targetGroup = SKILL_GROUPS.find((g) => g.category.toLowerCase().includes(tab.toLowerCase().split(" ")[0]));
                      if (targetGroup && targetGroup.skills.length > 0) {
                        setSelectedSkill(targetGroup.skills[0]);
                      }
                    }}
                    className={`filter-tab ${activeTab === tab ? "active" : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {filteredGroups.map((group) => (
                <div className="skill-group" key={group.category} style={{ padding: "24px 32px" }}>
                  <div className="skill-group-name" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>{group.category}</div>
                  <div className="skill-chips" style={{ gap: "10px" }}>
                    {group.skills.map((skill) => (
                      <button
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        className={`skill-chip-interactive ${selectedSkill?.name === skill.name ? "active" : ""}`}
                        title="Click to view details & engineering context"
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {filteredGroups.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-3)", fontFamily: "var(--mono)", border: "1px dashed var(--border)", borderRadius: "12px" }}>
                  No matching technical skills found in this category.
                </div>
              )}
            </div>

            {/* Selected Skill Details Box */}
            {selectedSkill && (
              <div className="detail-panel">
                <div className="detail-header">
                  <div className="detail-name">{selectedSkill.name}</div>
                  <div className="detail-meta-container">
                    <span className="detail-badge level">{selectedSkill.level}</span>
                    <span className="detail-badge usage">{selectedSkill.usage}</span>
                  </div>
                </div>
                <div className="detail-note">
                  <strong style={{ color: "var(--text)", fontFamily: "var(--mono)", fontSize: "12px", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Practical Implementation:
                  </strong>
                  {selectedSkill.note}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

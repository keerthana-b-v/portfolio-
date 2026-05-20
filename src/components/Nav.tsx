"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link tracker
      const sections = ["research", "experience", "projects", "skills", "about"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <a href="#" className="nav-wordmark" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        kbv<em>.</em>dev
      </a>

      {/* Desktop Links */}
      <ul className="nav-center">
        <li>
          <a
            href="#research"
            className={activeSection === "research" ? "nav-link active" : "nav-link"}
            onClick={(e) => handleLinkClick(e, "research")}
          >
            Research
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className={activeSection === "experience" ? "nav-link active" : "nav-link"}
            onClick={(e) => handleLinkClick(e, "experience")}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={activeSection === "projects" ? "nav-link active" : "nav-link"}
            onClick={(e) => handleLinkClick(e, "projects")}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={activeSection === "skills" ? "nav-link active" : "nav-link"}
            onClick={(e) => handleLinkClick(e, "skills")}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? "nav-link active" : "nav-link"}
            onClick={(e) => handleLinkClick(e, "about")}
          >
            About
          </a>
        </li>
      </ul>

      <div className="nav-right">
        <a
          href="https://github.com/keerthana-b-v/portfolio-"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-github"
        >
          <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor" }} viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </a>
        <a href="mailto:keerthana.b.v.codes@gmail.com" className="nav-cta">
          Let's Talk
        </a>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle Menu">
        <span style={isMobileMenuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}}></span>
        <span style={isMobileMenuOpen ? { opacity: 0 } : {}}></span>
        <span style={isMobileMenuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}}></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <ul
          id="navlinks"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            background: "rgba(10, 10, 12, 0.96)",
            backdropFilter: "blur(20px)",
            padding: "20px 24px",
            gap: "4px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            zIndex: 499,
          }}
        >
          <li>
            <a
              href="#research"
              className={activeSection === "research" ? "nav-link active" : "nav-link"}
              onClick={(e) => handleLinkClick(e, "research")}
              style={{ display: "block", padding: "10px 0", color: activeSection === "research" ? "var(--accent)" : "rgba(255, 255, 255, 0.7)", fontFamily: "var(--mono)", fontSize: "13px", textDecoration: "none", fontWeight: activeSection === "research" ? "600" : "400" }}
            >
              Research
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className={activeSection === "experience" ? "nav-link active" : "nav-link"}
              onClick={(e) => handleLinkClick(e, "experience")}
              style={{ display: "block", padding: "10px 0", color: activeSection === "experience" ? "var(--accent)" : "rgba(255, 255, 255, 0.7)", fontFamily: "var(--mono)", fontSize: "13px", textDecoration: "none", fontWeight: activeSection === "experience" ? "600" : "400" }}
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeSection === "projects" ? "nav-link active" : "nav-link"}
              onClick={(e) => handleLinkClick(e, "projects")}
              style={{ display: "block", padding: "10px 0", color: activeSection === "projects" ? "var(--accent)" : "rgba(255, 255, 255, 0.7)", fontFamily: "var(--mono)", fontSize: "13px", textDecoration: "none", fontWeight: activeSection === "projects" ? "600" : "400" }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className={activeSection === "skills" ? "nav-link active" : "nav-link"}
              onClick={(e) => handleLinkClick(e, "skills")}
              style={{ display: "block", padding: "10px 0", color: activeSection === "skills" ? "var(--accent)" : "rgba(255, 255, 255, 0.7)", fontFamily: "var(--mono)", fontSize: "13px", textDecoration: "none", fontWeight: activeSection === "skills" ? "600" : "400" }}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === "about" ? "nav-link active" : "nav-link"}
              onClick={(e) => handleLinkClick(e, "about")}
              style={{ display: "block", padding: "10px 0", color: activeSection === "about" ? "var(--accent)" : "rgba(255, 255, 255, 0.7)", fontFamily: "var(--mono)", fontSize: "13px", textDecoration: "none", fontWeight: activeSection === "about" ? "600" : "400" }}
            >
              About
            </a>
          </li>
          <li style={{ marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px", display: "flex", gap: "10px" }}>
            <a
              href="https://github.com/keerthana-b-v/portfolio-"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                flex: 1, 
                justifyContent: "center", 
                display: "inline-flex", 
                alignItems: "center", 
                padding: "10px 0", 
                color: "#ffffff", 
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)", 
                borderRadius: "20px", 
                textDecoration: "none", 
                fontFamily: "var(--mono)", 
                fontSize: "13px",
                fontWeight: "500",
                transition: "background 0.2s"
              }}
            >
              <svg className="brand-icon github" style={{ width: "14px", height: "14px", fill: "currentColor", marginRight: "6px" }} viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

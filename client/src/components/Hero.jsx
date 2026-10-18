import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin, Sparkles, Terminal, Code2, Database, GraduationCap } from 'lucide-react';

export default function Hero() {
  const roles = [
    'Full Stack & Python Developer',
    'SQL & Database Specialist',
    'BE CSE (4th Year) @ JPR',
    'Frontend & Web Interface Engineer'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="hero-section">
      {/* Background Neon Accent Blobs (Hardware-feathered without expensive blur filter) */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.14) 0%, rgba(0, 242, 254, 0.04) 35%, rgba(0,0,0,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none',
        transform: 'translateZ(0)'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-100px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127, 86, 217, 0.14) 0%, rgba(127, 86, 217, 0.04) 35%, rgba(0,0,0,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none',
        transform: 'translateZ(0)'
      }}></div>

      <div className="section-container hero-section-container">
        <div className="hero-main-grid">
          
          {/* Left Column: Bio & Headline */}
          <div className="hero-left-col">
            <div className="badge badge-cyan" style={{ marginBottom: '18px', padding: '6px 14px' }}>
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>Aspiring Software Engineer</span>
            </div>

            {/* Main Animated Headline & Name */}
            <h1 className="hero-main-title">
              Hi, I'm <span className="hero-name-animated">Hayasinth M</span>
            </h1>

            {/* Dynamic Animated Role Ticker */}
            <div className="role-ticker-box">
              <Terminal size={18} color="var(--accent-cyan)" />
              <div className="role-ticker-text">
                <span key={currentRoleIndex} className="role-ticker-badge">
                  {roles[currentRoleIndex]}
                </span>
                <span className="terminal-cursor"></span>
              </div>
            </div>

            <p className="hero-bio-text">
              Currently pursuing <strong>B.E. Computer Science and Engineering</strong> at <strong>Jeppiaar Engineering College</strong>. Passionate about building modern database-driven systems using <strong>SQL</strong> and <strong>Python</strong>, and clean responsive frontends with <strong>JavaScript, HTML5, and CSS3</strong>.
            </p>

            {/* CTA Action Buttons with Unified Cohesive Animation */}
            <div className="hero-cta-group">
              <a
                href="#projects"
                className="hero-cta-btn hero-cta-explore"
                title="Explore My Work"
              >
                <span>Explore My Work</span>
                <ArrowRight size={18} className="hero-cta-icon" />
                <span className="hero-btn-pulse-dot"></span>
              </a>

              <a
                href="https://www.linkedin.com/in/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="hero-cta-btn hero-cta-linkedin"
                title="Connect with Hayasinth on LinkedIn"
              >
                <Linkedin size={18} className="hero-cta-icon" />
                <span>LinkedIn</span>
                <span className="hero-btn-pulse-dot"></span>
              </a>

              <a
                href="https://github.com/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="hero-cta-btn hero-cta-github"
                title="View Hayasinth's GitHub"
              >
                <Github size={18} className="hero-cta-icon" />
                <span>GitHub</span>
                <span className="hero-btn-pulse-dot"></span>
              </a>
            </div>

            {/* Quick Contact & Info Grid with Floating Micro-Animations */}
            <div className="hero-contact-chips-group">
              <a href="mailto:hayasinth284@gmail.com" className="contact-chip contact-chip-email" title="Click to email">
                <Mail size={16} color="var(--accent-cyan)" />
                <span className="chip-text">hayasinth284@gmail.com</span>
              </a>

              <a href="tel:+918122208962" className="contact-chip contact-chip-phone" title="Click to call">
                <Phone size={16} color="#10b981" />
                <span className="chip-text">+91 8122208962</span>
              </a>

              <a
                href="https://www.linkedin.com/in/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="contact-chip contact-chip-linkedin"
                title="View LinkedIn Profile"
              >
                <Linkedin size={16} color="#00f2fe" />
                <span className="chip-text">linkedin.com/in/hayasinth284</span>
              </a>

              <div className="contact-chip contact-chip-location">
                <MapPin size={16} color="#c084fc" />
                <span className="chip-text">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Card with Holographic Portal Profile & Animated Tech Tags */}
          <div className="hero-right-col" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="glass-panel profile-card-glow hero-profile-card">
              {/* Clean Static Profile Photo (No Animation) */}
              <div className="avatar-static-wrapper">
                <div className="avatar-static-frame">
                  <img
                    src="/avatar.jpg"
                    alt="Hayasinth M"
                    width="180"
                    height="180"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '12px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  border: '3px solid var(--bg-card)',
                  boxShadow: '0 0 8px var(--accent-emerald)',
                  zIndex: 4
                }} title="Open to Opportunities"></div>
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '6px' }}>
                <span className="hero-name-animated" style={{ fontSize: '1.45rem' }}>Hayasinth M</span>
              </h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
                Computer Science & Engineering
              </p>

              {/* Animated JPR College Card Badge */}
              <div className="jpr-college-card-badge-animated">
                <GraduationCap size={16} className="jpr-cap-icon" />
                <span>Jeppiaar Engineering College (JPR) • 2023 - 2027</span>
              </div>

              {/* Core Skill Tickers - All sharing the exact same animation as #Python */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3'].map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag-chip tech-tag-python"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

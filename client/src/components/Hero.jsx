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
    <section id="hero" style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px 60px' }}>
      {/* Background Neon Accent Blobs */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-100px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127, 86, 217, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }}></div>

      <div className="section-container" style={{ padding: '0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Bio & Headline */}
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '18px', padding: '6px 14px' }}>
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>Aspiring Software Engineer</span>
            </div>

            {/* Main Animated Headline & Name */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
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

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              Currently pursuing <strong>B.E. Computer Science and Engineering</strong> at <span className="jpr-college-badge-animated">🎓 Jeppiaar Engineering College (JPR)</span>. Passionate about building modern database-driven systems using <strong className="tech-chip-text tech-text-sql">SQL</strong> and <strong className="tech-chip-text tech-text-python">Python</strong>, and clean responsive frontends with <strong className="tech-chip-text tech-text-js">JavaScript</strong>, <strong className="tech-chip-text tech-text-html">HTML5</strong>, and <strong className="tech-chip-text tech-text-css">CSS3</strong>.
            </p>

            {/* CTA Action Buttons with Unified Cohesive Animation */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px', alignItems: 'center' }}>
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
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <a href="mailto:hayasinth284@gmail.com" className="contact-chip contact-chip-email" title="Click to email">
                <Mail size={16} color="var(--accent-cyan)" />
                <span>hayasinth284@gmail.com</span>
              </a>

              <a href="tel:+918122208962" className="contact-chip contact-chip-phone" title="Click to call">
                <Phone size={16} color="#10b981" />
                <span>+91 8122208962</span>
              </a>

              <a
                href="https://www.linkedin.com/in/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="contact-chip contact-chip-linkedin"
                title="View LinkedIn Profile"
              >
                <Linkedin size={16} color="#00f2fe" />
                <span>linkedin.com/in/hayasinth284</span>
              </a>

              <div className="contact-chip contact-chip-location">
                <MapPin size={16} color="#c084fc" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Card with Holographic Portal Profile & Animated Tech Tags */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel profile-card-glow" style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              padding: '28px 24px',
              textAlign: 'center',
              border: '1px solid var(--border-accent)'
            }}>
              {/* Cyberpunk Holographic Portal Avatar */}
              <div className="avatar-portal-wrapper">
                <div className="avatar-portal-ring"></div>
                <div className="avatar-portal-halo"></div>
                <div className="avatar-portal-shimmer-sweep"></div>
                <div className="avatar-portal-frame">
                  <img
                    src="/avatar.jpg"
                    alt="Hayasinth M"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '20px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  border: '3px solid var(--bg-card)',
                  boxShadow: '0 0 10px var(--accent-emerald)',
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

              {/* Core Skill Tickers - Python, SQL, JavaScript, HTML5, CSS3 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {[
                  { name: 'Python', cls: 'tech-tag-python' },
                  { name: 'SQL', cls: 'tech-tag-sql' },
                  { name: 'JavaScript', cls: 'tech-tag-javascript' },
                  { name: 'HTML5', cls: 'tech-tag-html5' },
                  { name: 'CSS3', cls: 'tech-tag-css3' }
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className={`tech-tag-chip ${tech.cls}`}
                  >
                    #{tech.name}
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

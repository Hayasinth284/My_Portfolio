import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin, Sparkles, Terminal, Code2, Database } from 'lucide-react';

export default function Hero() {
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
        bottom: '0',
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
              <Sparkles size={14} /> <span>Aspiring Software Engineer</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
              Hi, I'm <span className="gradient-text">Hayasinth M</span>
            </h1>

            <div style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Terminal size={20} color="var(--accent-cyan)" />
              <span>Full Stack & Python Developer | BE CSE (4th Year)</span>
            </div>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              Currently pursuing <strong>B.E. Computer Science and Engineering</strong> at <strong>Jeppiaar Engineering College</strong>. Passionate about building modern full-stack web applications, database-driven systems using <strong>SQL</strong> and <strong>Python</strong>, and clean responsive frontends with <strong>JavaScript, HTML, CSS, and React</strong>.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <a href="#projects" className="btn-primary">
                Explore My Work <ArrowRight size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Linkedin size={18} color="#00f2fe" /> LinkedIn
              </a>

              <a
                href="https://github.com/hayasinth284"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Github size={18} /> GitHub
              </a>
            </div>

            {/* Quick Contact & Info Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--accent-cyan)" />
                <a href="mailto:hayasinth284@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>hayasinth284@gmail.com</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--accent-cyan)" />
                <a href="tel:+918122208962" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8122208962</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Linkedin size={16} color="#00f2fe" />
                <a href="https://www.linkedin.com/in/hayasinth284" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>hayasinth284</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--accent-cyan)" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Card & Tech Stack Badges */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel animate-float" style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid var(--border-accent)'
            }}>
              {/* Profile Avatar Image */}
              <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                padding: '4px',
                background: 'var(--accent-gradient)',
                boxShadow: 'var(--shadow-glow)'
              }}>
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

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>Hayasinth M</h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
                Computer Science & Engineering
              </p>

              {/* College Pill */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}>
                🎓 Jeppiaar Engineering College (2023 - 2027)
              </div>

              {/* Core Skill Tickers */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express', 'React', 'SQLite'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.2)',
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500
                    }}
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

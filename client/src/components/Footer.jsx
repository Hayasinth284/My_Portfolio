import React from 'react';
import { ArrowUp, Code2, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-secondary)'
    }}>
      <div className="section-container footer-container">
        <div className="footer-top-row">
          {/* Logo & Profile Avatar */}
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/avatar.jpg"
              alt="Hayasinth M"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 10px rgba(0, 242, 254, 0.4)'
              }}
            />
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Hayasinth M</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Jeppiaar Engineering College (BE CSE)</div>
            </div>
          </div>

          {/* Social Links & Navigation */}
          <div className="footer-nav-links">
            <a href="#hero">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a href="https://www.linkedin.com/in/hayasinth284" target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center' }}>
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/hayasinth284" target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
              <Github size={18} />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            title="Back to Top"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          © {new Date().getFullYear()} Hayasinth M. Engineered with Python, SQL, React & Express REST API. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { ArrowUp, Code2, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '40px 24px 20px',
      color: 'var(--text-secondary)'
    }}>
      <div className="section-container" style={{ padding: '0' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Logo & Profile Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem' }}>
            <a href="#hero" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
            <a href="#skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a>
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
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

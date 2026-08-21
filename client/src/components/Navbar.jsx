import React, { useState } from 'react';
import { Sun, Moon, Code2, Menu, X, Settings, Sparkles } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, openAdmin, bgMode, cycleBgMode, bgModeNames }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,242,254,0.3)'
          }}>
            <Code2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Hayasinth<span className="gradient-text">.M</span>
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              BE CSE Student @ Jeppiaar
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Animation Mode Switcher */}
          {cycleBgMode && (
            <button
              onClick={cycleBgMode}
              title="Click to Switch Background Animation (3D Quantum, Code Matrix, Aurora)"
              style={{
                background: 'rgba(127, 86, 217, 0.15)',
                border: '1px solid rgba(127, 86, 217, 0.35)',
                color: '#c084fc',
                padding: '6px 12px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={14} color="#00f2fe" />
              <span>{bgModeNames ? bgModeNames[bgMode] : 'Effects'}</span>
            </button>
          )}

          {/* Status Badge */}
          <div className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)'
            }}></span>
            <span>4th Year CSE</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
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
            {theme === 'dark' ? <Sun size={18} color="#00f2fe" /> : <Moon size={18} color="#7c3aed" />}
          </button>

          {/* Admin Content Manager Toggle */}
          <button
            onClick={openAdmin}
            title="Content Manager / Database Admin"
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
            <Settings size={18} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

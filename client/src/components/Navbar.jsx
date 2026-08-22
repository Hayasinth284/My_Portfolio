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
        {/* Brand Logo with Profile Image */}
        <a href="#hero" className="nav-brand-link">
          <div style={{ position: 'relative', width: '42px', height: '42px' }}>
            <img
              src="/avatar.jpg"
              alt="Hayasinth M"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 14px rgba(0, 242, 254, 0.45)',
                display: 'block',
                transition: 'all 0.3s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-1px',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              border: '2px solid var(--bg-primary)',
              boxShadow: '0 0 8px var(--accent-emerald)'
            }}></div>
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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
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
              className="nav-fx-btn"
              title="Click to Switch Background Animation (3D Quantum, Code Matrix, Aurora)"
            >
              <Sparkles size={14} color="#00f2fe" />
              <span>{bgModeNames ? bgModeNames[bgMode] : 'Effects'}</span>
            </button>
          )}

          {/* Status Badge */}
          <div className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', cursor: 'default' }}>
            <span className="status-dot-pulse" style={{ marginRight: '4px' }}></span>
            <span>4th Year CSE</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="nav-icon-btn"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Database Trigger */}
          {openAdmin && (
            <button
              onClick={openAdmin}
              className="nav-icon-btn"
              title="Content Manager / Database"
            >
              <Settings size={18} />
            </button>
          )}

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

import React, { useState } from 'react';
import { Sun, Moon, Code2, Menu, X, Settings, Sparkles, User, Cpu, GraduationCap, Mail } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, openAdmin, bgMode, cycleBgMode, bgModeNames }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#hero', icon: User },
    { name: 'Projects', href: '#projects', icon: Code2 },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Experience', href: '#experience', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Mail },
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
        {/* Brand Logo with Violet Name Styling */}
        <a href="#hero" className="nav-brand-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: '42px', height: '42px' }}>
            <img
              src="/avatar.jpg"
              alt="Hayasinth M"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #c084fc',
                boxShadow: '0 0 14px rgba(192, 132, 252, 0.55)',
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
            <span className="nav-brand-name-violet">
              Hayasinth<span className="nav-brand-dot-violet">.M</span>
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              BE CSE Student @ Jeppiaar
            </div>
          </div>
        </a>

        {/* Desktop Links with Same Unified Animation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="nav-link nav-link-unified"
              >
                <span className="nav-btn-indicator"></span>
                <Icon size={13} className="nav-btn-icon" />
                <span>{link.name}</span>
              </a>
            );
          })}
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

      {/* Mobile Navigation Drawer with Smooth Slide-in */}
      {mobileMenuOpen && (
        <div style={{
          padding: '16px 24px 20px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'fadeIn 0.25s ease'
        }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="nav-link nav-link-unified"
                style={{ padding: '10px 16px', width: '100%', justifyContent: 'flex-start' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-btn-indicator"></span>
                <Icon size={14} className="nav-btn-icon" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

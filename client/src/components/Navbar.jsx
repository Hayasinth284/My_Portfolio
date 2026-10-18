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
      <div className="navbar-inner-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Brand Logo with Violet Name Styling */}
        <a href="#hero" className="nav-brand-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <div style={{ position: 'relative', width: '42px', height: '42px', flexShrink: 0 }}>
            <img
              src="/avatar.jpg"
              alt="Hayasinth M"
              width="42"
              height="42"
              decoding="async"
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
          <div style={{ minWidth: 0 }}>
            <span className="nav-brand-name-violet">
              Hayasinth M
            </span>
            <div className="nav-brand-subtitle-visible">
              <span className="subtitle-live-dot"></span>
              <span className="subtitle-text">CSE Student @ JPR (Jeppiaar)</span>
            </div>
          </div>
        </a>

        {/* Desktop Links with Compact Sizing & Unified Animation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="nav-link nav-link-unified nav-link-compact"
              >
                <span className="nav-btn-indicator"></span>
                <Icon size={12} className="nav-btn-icon" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="nav-actions-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Animated Background Mode Switcher Button */}
          {cycleBgMode && (
            <button
              onClick={cycleBgMode}
              className="nav-fx-btn"
              title="Click to Switch Background Animation (3D Quantum, Code Matrix, Aurora)"
            >
              <Sparkles size={14} className="nav-fx-icon" />
              <span className="nav-fx-text">{bgModeNames ? bgModeNames[bgMode] : 'Effects'}</span>
            </button>
          )}

          {/* Animated Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="nav-icon-btn nav-theme-btn"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Light or Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} className="theme-icon-animated" /> : <Moon size={18} className="theme-icon-animated" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Smooth Slide-in */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{
          padding: '16px 20px 22px',
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
                style={{ padding: '12px 18px', width: '100%', justifyContent: 'flex-start', minHeight: '44px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-btn-indicator"></span>
                <Icon size={16} className="nav-btn-icon" />
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>{link.name}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

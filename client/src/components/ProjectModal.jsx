import React from 'react';
import { X, ExternalLink, Github, Layers, CheckCircle2, Cpu, Tag } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          border: '1px solid var(--border-accent)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        <div style={{ position: 'relative', height: '260px', width: '100%' }}>
          <img
            src={project.image || '/project1.jpg'}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px'
          }}>
            <span className="badge badge-cyan">{project.category}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
            {project.title}
          </h2>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.tags.split(',').map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(0, 242, 254, 0.08)',
                  color: 'var(--accent-cyan)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                #{tag.trim()}
              </span>
            ))}
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Overview
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            {project.description}
          </p>

          {/* Architecture Section */}
          {project.architecture && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '6px' }}>
                <Cpu size={18} /> System Architecture
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontFamily: 'var(--font-mono)' }}>
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Features List */}
          {project.key_features && (
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Key Highlights & Features</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {project.key_features.split(';').map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feat.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links Footer */}
          <div style={{
            display: 'flex',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-color)'
          }}>
            {project.github_url && project.github_url !== '#' && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-primary">
                <Github size={18} /> View Code on GitHub
              </a>
            )}

            {project.demo_url && project.demo_url !== '#' && (
              <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-secondary">
                <ExternalLink size={18} /> Live Demonstration
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

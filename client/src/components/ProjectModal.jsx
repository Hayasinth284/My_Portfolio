import React from 'react';
import { X, ExternalLink, Github, Layers, CheckCircle2, Cpu, Tag } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel project-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        <div className="modal-header-img-wrapper">
          <img
            src={project.image || '/project1.jpg'}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width="750"
            height="260"
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
        <div className="modal-body-container">
          <h2 className="modal-project-title">
            {project.title}
          </h2>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {(project.tags ? project.tags.split(',') : []).map((tag) => (
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
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', fontSize: '0.95rem' }}>
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
          <div className="modal-links-footer">
            {project.github_url && project.github_url !== '#' && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-primary modal-action-btn">
                <Github size={18} /> View Code on GitHub
              </a>
            )}

            {project.demo_url && project.demo_url !== '#' && (
              <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-secondary modal-action-btn">
                <ExternalLink size={18} /> Live Demonstration
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

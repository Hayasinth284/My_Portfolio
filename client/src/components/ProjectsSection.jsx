import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Github, Layers, Sparkles, Eye, Code } from 'lucide-react';

export default function ProjectsSection({ projects, onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = (Array.isArray(projects) ? projects : []).filter((project) => {
    if (!project) return false;
    if (!searchQuery.trim()) return true;
    const title = (project.title || '').toLowerCase();
    const desc = (project.description || '').toLowerCase();
    const tags = (project.tags || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || desc.includes(q) || tags.includes(q);
  });

  return (
    <section id="projects" className="section-container">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
          <Sparkles size={14} /> <span>Featured Work</span>
        </div>
        <h2><span className="gradient-text">Projects</span></h2>
      </div>

      {/* Centered Futuristic Animated Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <div className="project-search-wrapper-animated">
          <div className="project-search-glow-beam"></div>
          <Search size={18} className="project-search-icon-animated" />
          <input
            type="text"
            className="project-search-input-animated"
            placeholder="⚡ Search projects by name, tags, Python, SQL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="project-search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p>No projects found matching "{searchQuery}".</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel project-card-item"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => onSelectProject(project)}
            >
              {/* Project Image Header */}
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                <img
                  src={project.image || '/project1.jpg'}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Category Pill Tag */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px'
                }}>
                  <span className="badge badge-purple">{project.category}</span>
                </div>

                {/* Featured Star Badge */}
                {project.featured === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}>
                    <span className="badge badge-cyan">★ Featured</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {(project.tags ? project.tags.split(',') : []).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-muted)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                    >
                      <Eye size={14} /> View Details
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {project.github_url && project.github_url !== '#' && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repository"
                          style={{ color: 'var(--text-secondary)' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

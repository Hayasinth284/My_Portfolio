import React, { useState } from 'react';
import { X, Plus, Trash2, Edit, Database, Save, CheckCircle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, projects, onRefreshData, showToast }) {
  const [activeTab, setActiveTab] = useState('add_project');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    tags: '',
    github_url: '',
    demo_url: '',
    featured: false,
    architecture: '',
    key_features: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      alert('Title and Description are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      if (res.ok) {
        showToast('New project saved to SQLite database!');
        onRefreshData();
        setNewProject({
          title: '',
          description: '',
          category: 'Full Stack',
          tags: '',
          github_url: '',
          demo_url: '',
          featured: false,
          architecture: '',
          key_features: ''
        });
      } else {
        alert('Failed to add project');
      }
    } catch (err) {
      alert('Error connecting to backend API');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project from the database?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Project removed from database!');
        onRefreshData();
      }
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
          border: '1px solid var(--border-accent)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Database size={24} color="var(--accent-cyan)" />
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Database Content Manager</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Manage SQLite database records in real-time
            </p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('add_project')}
            style={{
              background: activeTab === 'add_project' ? 'var(--accent-gradient)' : 'none',
              border: 'none',
              color: activeTab === 'add_project' ? '#fff' : 'var(--text-secondary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            + Add New Project
          </button>

          <button
            onClick={() => setActiveTab('manage_projects')}
            style={{
              background: activeTab === 'manage_projects' ? 'var(--accent-gradient)' : 'none',
              border: 'none',
              color: activeTab === 'manage_projects' ? '#fff' : 'var(--text-secondary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Manage Existing ({projects.length})
          </button>
        </div>

        {activeTab === 'add_project' ? (
          <form onSubmit={handleAddProject} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Project Title *
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="e.g. Python SQL Analytics Engine"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="Python & SQL">Python & SQL</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Database">Database</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Tech Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="Python, SQL, JavaScript, HTML"
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Description *
              </label>
              <textarea
                rows="3"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Brief project description..."
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                System Architecture
              </label>
              <input
                type="text"
                value={newProject.architecture}
                onChange={(e) => setNewProject({ ...newProject, architecture: e.target.value })}
                placeholder="e.g. Express REST API + SQLite DB + React Frontend"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Key Features (semicolon-separated)
              </label>
              <input
                type="text"
                value={newProject.key_features}
                onChange={(e) => setNewProject({ ...newProject, key_features: e.target.value })}
                placeholder="Feature 1; Feature 2; Feature 3"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={newProject.github_url}
                  onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                />
                <label htmlFor="featured" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                  Feature on Homepage
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
              <Save size={18} /> {loading ? 'Saving...' : 'Save Project to Database'}
            </button>
          </form>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{proj.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{proj.category}</div>
                </div>

                <span className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                  {proj.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

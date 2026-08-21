import React from 'react';
import { FolderGit2, Code2, Database, Award, Layers } from 'lucide-react';

export default function StatsSection({ stats }) {
  const statCards = [
    {
      title: 'Current Academic Year',
      value: '4th Year',
      subtitle: 'Jeppiaar Engineering College (BE CSE)',
      icon: <Award size={28} color="var(--accent-cyan)" />
    },
    {
      title: 'Projects Completed',
      value: stats?.projectsCompleted || '4+',
      subtitle: 'Full Stack, SQL & Python Apps',
      icon: <FolderGit2 size={28} color="var(--accent-blue)" />
    },
    {
      title: 'Core Technologies',
      value: '5+ Core',
      subtitle: 'Python, SQL, HTML, CSS, JS',
      icon: <Code2 size={28} color="var(--accent-purple)" />
    },
    {
      title: 'Database Engine',
      value: 'SQLite/SQL',
      subtitle: 'RESTful API & Relational Tables',
      icon: <Database size={28} color="var(--accent-emerald)" />
    }
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '60px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-container" style={{ padding: '0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {statCards.map((card, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {card.icon}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }} className="gradient-text">
                {card.value}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{card.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

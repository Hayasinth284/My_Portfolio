import React from 'react';
import { Code, Database, Terminal, Globe, Cpu, CheckCircle } from 'lucide-react';

export default function SkillsSection({ skills }) {
  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryIcons = {
    'Programming Languages': <Code size={20} color="var(--accent-cyan)" />,
    'Database & SQL': <Database size={20} color="var(--accent-blue)" />,
    'Web Frontend': <Globe size={20} color="var(--accent-purple)" />,
    'Backend Development': <Cpu size={20} color="var(--accent-emerald)" />,
    'Developer Tools': <Terminal size={20} color="var(--accent-cyan)" />
  };

  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
          <Cpu size={14} /> <span>Technical Proficiency</span>
        </div>
        <h2>Skills & <span className="gradient-text">Competencies</span></h2>
        <p>Comprehensive overview of core programming languages, database systems, web frameworks, and developer tools.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px'
      }}>
        {Object.entries(categories).map(([catName, catSkills]) => (
          <div key={catName} className="glass-panel" style={{ padding: '28px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              {categoryIcons[catName] || <Code size={20} color="var(--accent-cyan)" />}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{catName}</h3>
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {catSkills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                    <span style={{
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)'
                    }}>
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        width: `${skill.proficiency}%`,
                        height: '100%',
                        background: 'var(--accent-gradient)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

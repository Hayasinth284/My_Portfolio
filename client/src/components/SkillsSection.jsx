import React from 'react';
import { Code, Database, Terminal, Globe, Cpu, CheckCircle } from 'lucide-react';

export default function SkillsSection({ skills }) {
  // Group skills by category safely
  const skillList = Array.isArray(skills) ? skills : [];
  const categories = skillList.reduce((acc, skill) => {
    if (!skill) return acc;
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryIcons = {
    'Frontend Development': <Globe size={20} color="var(--accent-cyan)" />,
    'Backend Development': <Cpu size={20} color="#c084fc" />,
    'Database Systems': <Database size={20} color="var(--accent-emerald)" />,
    'Developer Tools & CS': <Terminal size={20} color="#38bdf8" />
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

      <div className="skills-grid">
        {Object.entries(categories).map(([catName, catSkills], index) => (
          <div
            key={catName}
            className="glass-panel skill-card-box-animated"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <div className="skill-card-shine"></div>
            <div className="skill-category-header">
              <div className="skill-category-icon-box">
                {categoryIcons[catName] || <Code size={20} color="var(--accent-cyan)" />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.22rem', fontWeight: 700, margin: 0 }}>{catName}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {catSkills.length} Core Competencies
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {catSkills.map((skill) => (
                <div key={skill.name} className="skill-item-hover-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                    <span className="skill-percentage-pill">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill-animated"
                      style={{ width: `${skill.proficiency}%` }}
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

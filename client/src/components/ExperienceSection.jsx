import React from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

export default function ExperienceSection() {
  const roadmapItems = [
    {
      title: 'B.E. Computer Science & Engineering (4th Year / Final Year)',
      institution: 'Jeppiaar Engineering College',
      period: '2023 - 2027',
      type: 'Education',
      description: 'Undergraduate Computer Science curriculum covering advanced software development, relational database architecture, Python programming, object-oriented concepts, and web technology.',
      bullets: [
        'Specializing in Python, SQL Database Systems, and Full Stack Web Engineering.',
        'Active developer working on real-world projects and relational database optimization.',
        'Proficient in HTML, CSS, JavaScript, Node.js, Express, and SQL query creation.'
      ]
    }
  ];

  return (
    <section id="experience" className="section-container">
      <div className="section-header">
        <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
          <GraduationCap size={14} /> <span>Roadmap & Education</span>
        </div>
        <h2>Education & <span className="gradient-text">Experience</span></h2>
        <p>Academic foundation at Jeppiaar Engineering College and practical software engineering milestones.</p>
      </div>

      <div className="timeline-container">
        {/* Timeline Line */}
        <div className="timeline-spine"></div>

        <div style={{ display: 'grid', gap: '36px' }}>
          {roadmapItems.map((item, index) => (
            <div key={index} className="timeline-item">
              {/* Timeline Icon Badge */}
              <div className="timeline-icon-badge">
                {item.type === 'Education' ? <GraduationCap size={22} /> : <Briefcase size={22} />}
              </div>

              {/* Card Container */}
              <div className="glass-panel timeline-card">
                <div className="timeline-card-header">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                  <span style={{
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0, 242, 254, 0.1)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {item.period}
                  </span>
                </div>

                <div style={{ color: 'var(--accent-purple)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '12px' }}>
                  🎓 {item.institution}
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px', fontSize: '0.95rem' }}>
                  {item.description}
                </p>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {item.bullets.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={15} color="var(--accent-cyan)" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

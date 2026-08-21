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

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '28px',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))',
          opacity: 0.4
        }}></div>

        <div style={{ display: 'grid', gap: '36px' }}>
          {roadmapItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '24px', position: 'relative' }}>
              {/* Timeline Icon Badge */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
                flexShrink: 0,
                zIndex: 2,
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.2)'
              }}>
                {item.type === 'Education' ? <GraduationCap size={24} /> : <Briefcase size={24} />}
              </div>

              {/* Card Container */}
              <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
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

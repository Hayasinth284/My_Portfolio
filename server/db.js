const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'portfolio.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    // Projects Table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        tags TEXT,
        github_url TEXT,
        demo_url TEXT,
        featured INTEGER DEFAULT 0,
        architecture TEXT,
        key_features TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Skills Table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        name TEXT NOT NULL,
        proficiency INTEGER NOT NULL,
        experience_level TEXT,
        icon TEXT
      )
    `);

    // Messages Table (Contact Submissions)
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Experience / Education Table
    db.run(`
      CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT NOT NULL,
        organization TEXT NOT NULL,
        duration TEXT NOT NULL,
        description TEXT NOT NULL,
        skills_used TEXT,
        type TEXT NOT NULL
      )
    `);

    // Seed default data if empty
    db.get('SELECT COUNT(*) AS count FROM projects', (err, row) => {
      if (err) return;
      if (row.count === 0) {
        seedInitialData();
      }
    });
  });
}

function seedInitialData() {
  console.log('Seeding initial portfolio data for Hayasinth M...');

  const projects = [
    {
      title: 'My Portfolio',
      description: 'A high-performance modern developer portfolio featuring 3D Deep Space starfield warp animations, interactive HTML5 Canvas particle physics, Express REST API backend, persistent SQL/JSON storage, and responsive glassmorphism UI.',
      category: 'Full Stack',
      image: '/project2.jpg',
      tags: 'JavaScript, React, Node.js, Express, HTML5 Canvas 3D, CSS3, REST API, SQL',
      github_url: 'https://github.com/hayasinth284/My_Portfolio',
      demo_url: 'http://localhost:5000',
      featured: 1,
      architecture: 'Node.js & Express REST Backend + React & Vanilla CSS UI + GPU-Accelerated 3D Canvas Graphics Engine',
      key_features: '3D Deep Space warp flight animation; Multi-mode animation switcher (Space, 3D Quantum, Magnetic Vortex); Live Contact Form with persistent DB; Admin Content Manager; Light/Dark theme engine; Mobile-responsive design'
    },
    {
      title: 'TaskFlow - Task Management System',
      description: 'A full-featured, responsive, real-time task management web application built with Python, Django 5, SQLite, HTML5, Vanilla CSS3, and Modern JavaScript (ES6+). Features interactive drag-and-drop Kanban boards, live subtask checklists with progress tracking, dynamic HTML5 Canvas productivity analytics, interactive calendar timeline, and role-based user authentication.',
      category: 'Full Stack',
      image: '/project_taskmanagement.jpg',
      tags: 'Task_Management, Python, Django, SQLite, JavaScript, HTML5, CSS3, REST API, Kanban',
      github_url: 'https://github.com/hayasinth284/Task_Management',
      demo_url: 'https://github.com/hayasinth284/Task_Management',
      featured: 1,
      architecture: 'Django 5 REST & Session Backend + SQLite Relational Database + Vanilla JS Kanban & Analytics Canvas Engine + Glassmorphism UI',
      key_features: 'Interactive Drag-and-Drop Kanban Board across 5 status columns; Dynamic Subtask Checklist with real-time progress bar; Real-Time Productivity Analytics with HTML5 Canvas charts; Interactive Calendar timeline & deadline scheduling; Multi-parameter filtering, sorting & live search; Secure Django user authentication, session security & role isolation'
    }
  ];

  const stmtProj = db.prepare(`
    INSERT INTO projects (title, description, category, image, tags, github_url, demo_url, featured, architecture, key_features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  projects.forEach(p => {
    stmtProj.run(p.title, p.description, p.category, p.image, p.tags, p.github_url, p.demo_url, p.featured, p.architecture, p.key_features);
  });
  stmtProj.finalize();

  const skills = [
    { category: 'Frontend Development', name: 'HTML5 & Semantic Markup', proficiency: 95, experience_level: 'Expert', icon: 'fa-brands fa-html5' },
    { category: 'Frontend Development', name: 'CSS3 / Flexbox / CSS Grid', proficiency: 92, experience_level: 'Expert', icon: 'fa-brands fa-css3-alt' },
    { category: 'Frontend Development', name: 'JavaScript (ES6+ / Modern DOM)', proficiency: 90, experience_level: 'Advanced', icon: 'fa-brands fa-js' },
    { category: 'Frontend Development', name: 'React.js & Component UI', proficiency: 85, experience_level: 'Advanced', icon: 'fa-brands fa-react' },
    { category: 'Backend Development', name: 'Python & Flask REST APIs', proficiency: 90, experience_level: 'Advanced', icon: 'fa-brands fa-python' },
    { category: 'Backend Development', name: 'Node.js & Express.js', proficiency: 85, experience_level: 'Advanced', icon: 'fa-brands fa-node-js' },
    { category: 'Backend Development', name: 'RESTful API Design & Routing', proficiency: 88, experience_level: 'Advanced', icon: 'fa-solid fa-server' },
    { category: 'Database Systems', name: 'SQL (Structured Query Language)', proficiency: 92, experience_level: 'Expert', icon: 'fa-solid fa-database' },
    { category: 'Database Systems', name: 'SQLite & MySQL Optimization', proficiency: 86, experience_level: 'Advanced', icon: 'fa-solid fa-hard-drive' },
    { category: 'Developer Tools & CS', name: 'Git & GitHub Version Control', proficiency: 88, experience_level: 'Advanced', icon: 'fa-brands fa-github' }
  ];

  const stmtSkill = db.prepare(`
    INSERT INTO skills (category, name, proficiency, experience_level, icon)
    VALUES (?, ?, ?, ?, ?)
  `);

  skills.forEach(s => {
    stmtSkill.run(s.category, s.name, s.proficiency, s.experience_level, s.icon);
  });
  stmtSkill.finalize();

  const experience = [
    {
      role: 'B.E. Computer Science & Engineering (4th Year)',
      organization: 'Jeppiaar Engineering College',
      duration: '2023 - 2027',
      description: 'Specializing in Core Computer Science, Software Engineering, Python Programming, Database Management Systems (DBMS), Data Structures, and Web Application Architecture.',
      skills_used: 'Python, SQL, HTML/CSS, JavaScript, Data Structures, DBMS',
      type: 'Education'
    }
  ];

  const stmtExp = db.prepare(`
    INSERT INTO experience (role, organization, duration, description, skills_used, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  experience.forEach(e => {
    stmtExp.run(e.role, e.organization, e.duration, e.description, e.skills_used, e.type);
  });
  stmtExp.finalize();

  console.log('Database seeded successfully!');
}

module.exports = db;

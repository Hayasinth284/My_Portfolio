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
      title: 'Smart Data Analytics & Query Platform',
      description: 'A robust Python and SQL-driven analytics dashboard designed for complex relational database queries, real-time data processing, and interactive visual reporting.',
      category: 'Python & SQL',
      image: '/project1.jpg',
      tags: 'Python, SQL, SQLite, Pandas, Flask, Data Analytics',
      github_url: 'https://github.com/hayasinth284/smart-analytics-platform',
      demo_url: '#',
      featured: 1,
      architecture: 'Python Flask API + SQL Query Engine + Frontend Data Visualizer',
      key_features: 'Automated SQL Query execution; Real-time charts; Custom report export; Database performance profiling'
    },
    {
      title: 'Relational Database Management System (RDBMS)',
      description: 'An efficient database engine schema and management tool built with SQL and Python for managing student records, course enrollments, and performance metrics.',
      category: 'Database',
      image: '/project1.jpg',
      tags: 'SQL, Python, MySQL, Relational Database, Indexing',
      github_url: 'https://github.com/hayasinth284/rdbms-student-manager',
      demo_url: '#',
      featured: 0,
      architecture: 'Normalized SQL Database Schema + Python CLI & GUI interface',
      key_features: 'Third normal form schema; Stored procedures & triggers; Fast indexed queries; Data backup export'
    },
    {
      title: 'Responsive E-Commerce Frontend',
      description: 'A modern, responsive e-commerce storefront web application featuring dynamic shopping cart logic, product filtering, and glassmorphic UI design.',
      category: 'Frontend',
      image: '/project2.jpg',
      tags: 'HTML5, CSS3, JavaScript, DOM Manipulation, UX/UI',
      github_url: 'https://github.com/hayasinth284/ecommerce-frontend',
      demo_url: '#',
      featured: 0,
      architecture: 'Vanilla JavaScript SPA + LocalStorage State + CSS Grid System',
      key_features: 'Interactive product catalog; Shopping cart checkout simulation; Mobile-responsive navigation'
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
    { category: 'Programming Languages', name: 'Python', proficiency: 90, experience_level: 'Advanced', icon: 'py' },
    { category: 'Programming Languages', name: 'JavaScript (ES6+)', proficiency: 88, experience_level: 'Advanced', icon: 'js' },
    { category: 'Database & SQL', name: 'SQL / Relational Databases', proficiency: 85, experience_level: 'Advanced', icon: 'sql' },
    { category: 'Database & SQL', name: 'SQLite / MySQL', proficiency: 82, experience_level: 'Intermediate', icon: 'db' },
    { category: 'Web Frontend', name: 'HTML5 & Semantic Markup', proficiency: 95, experience_level: 'Expert', icon: 'html' },
    { category: 'Web Frontend', name: 'CSS3 / Flexbox / Grid', proficiency: 92, experience_level: 'Expert', icon: 'css' },
    { category: 'Web Frontend', name: 'React.js & Modern UI', proficiency: 80, experience_level: 'Intermediate', icon: 'react' },
    { category: 'Backend Development', name: 'Node.js & Express.js', proficiency: 82, experience_level: 'Intermediate', icon: 'node' },
    { category: 'Developer Tools', name: 'Git & GitHub', proficiency: 85, experience_level: 'Advanced', icon: 'git' },
    { category: 'Developer Tools', name: 'VS Code & Linux Commands', proficiency: 88, experience_level: 'Advanced', icon: 'terminal' }
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

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');

const initialData = {
  projects: [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
  ],
  skills: [
    { id: 1, category: 'Programming Languages', name: 'Python', proficiency: 90, experience_level: 'Advanced', icon: 'py' },
    { id: 2, category: 'Programming Languages', name: 'JavaScript (ES6+)', proficiency: 88, experience_level: 'Advanced', icon: 'js' },
    { id: 3, category: 'Database & SQL', name: 'SQL / Relational Databases', proficiency: 85, experience_level: 'Advanced', icon: 'sql' },
    { id: 4, category: 'Database & SQL', name: 'SQLite / MySQL', proficiency: 82, experience_level: 'Intermediate', icon: 'db' },
    { id: 5, category: 'Web Frontend', name: 'HTML5 & Semantic Markup', proficiency: 95, experience_level: 'Expert', icon: 'html' },
    { id: 6, category: 'Web Frontend', name: 'CSS3 / Flexbox / Grid', proficiency: 92, experience_level: 'Expert', icon: 'css' },
    { id: 7, category: 'Web Frontend', name: 'React.js & Modern UI', proficiency: 80, experience_level: 'Intermediate', icon: 'react' },
    { id: 8, category: 'Backend Development', name: 'Node.js & Express.js', proficiency: 82, experience_level: 'Intermediate', icon: 'node' },
    { id: 9, category: 'Developer Tools', name: 'Git & GitHub', proficiency: 85, experience_level: 'Advanced', icon: 'git' },
    { id: 10, category: 'Developer Tools', name: 'VS Code & Linux Commands', proficiency: 88, experience_level: 'Advanced', icon: 'terminal' }
  ],
  experience: [
    {
      id: 1,
      role: 'B.E. Computer Science & Engineering (4th Year)',
      organization: 'Jeppiaar Engineering College',
      duration: '2023 - 2027',
      description: 'Specializing in Core Computer Science, Software Engineering, Python Programming, Database Management Systems (DBMS), Data Structures, and Web Application Architecture.',
      skills_used: 'Python, SQL, HTML/CSS, JavaScript, Data Structures, DBMS',
      type: 'Education'
    }
  ],
  messages: []
};

let inMemoryData = JSON.parse(JSON.stringify(initialData));

function readDB() {
  try {
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, 'utf8');
      inMemoryData = JSON.parse(raw);
      return inMemoryData;
    } else {
      try {
        fs.writeFileSync(dbPath, JSON.stringify(inMemoryData, null, 2));
      } catch (err) {
        // Fallback to in-memory if write is blocked
      }
      return inMemoryData;
    }
  } catch (e) {
    return inMemoryData;
  }
}

function writeDB(data) {
  inMemoryData = data;
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    // If disk write fails, memory state is safely preserved
    console.warn('Warning: Could not save database.json to disk, using in-memory store:', err.message);
  }
}

module.exports = { readDB, writeDB };

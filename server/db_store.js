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
    { id: 1, category: "Frontend Development", name: "HTML5 & Semantic Markup", proficiency: 95, experience_level: "Expert", icon: "fa-brands fa-html5", color: "#e34f26" },
    { id: 2, category: "Frontend Development", name: "CSS3 / Flexbox / CSS Grid", proficiency: 92, experience_level: "Expert", icon: "fa-brands fa-css3-alt", color: "#1572b6" },
    { id: 3, category: "Frontend Development", name: "JavaScript (ES6+ / Modern DOM)", proficiency: 90, experience_level: "Advanced", icon: "fa-brands fa-js", color: "#f7df1e" },
    { id: 4, category: "Frontend Development", name: "React.js & Component UI", proficiency: 85, experience_level: "Advanced", icon: "fa-brands fa-react", color: "#61dafb" },
    { id: 5, category: "Frontend Development", name: "Responsive & Glassmorphic UI", proficiency: 88, experience_level: "Advanced", icon: "fa-solid fa-wand-magic-sparkles", color: "#c084fc" },
    { id: 6, category: "Backend Development", name: "Python & Flask REST APIs", proficiency: 90, experience_level: "Advanced", icon: "fa-brands fa-python", color: "#3776ab" },
    { id: 7, category: "Backend Development", name: "Node.js & Express.js", proficiency: 85, experience_level: "Advanced", icon: "fa-brands fa-node-js", color: "#339933" },
    { id: 8, category: "Backend Development", name: "RESTful API Design & Routing", proficiency: 88, experience_level: "Advanced", icon: "fa-solid fa-server", color: "#00f2fe" },
    { id: 9, category: "Database Systems", name: "SQL (Structured Query Language)", proficiency: 92, experience_level: "Expert", icon: "fa-solid fa-database", color: "#00b4d8" },
    { id: 10, category: "Database Systems", name: "Relational Database Management (RDBMS)", proficiency: 88, experience_level: "Advanced", icon: "fa-solid fa-table", color: "#4facfe" },
    { id: 11, category: "Database Systems", name: "SQLite & MySQL Optimization", proficiency: 86, experience_level: "Advanced", icon: "fa-solid fa-hard-drive", color: "#10b981" },
    { id: 12, category: "Database Systems", name: "Database Schema Design & Indexing", proficiency: 85, experience_level: "Advanced", icon: "fa-solid fa-diagram-project", color: "#a855f7" },
    { id: 13, category: "Developer Tools & CS", name: "Git & GitHub Version Control", proficiency: 88, experience_level: "Advanced", icon: "fa-brands fa-github", color: "#ffffff" },
    { id: 14, category: "Developer Tools & CS", name: "VS Code & Linux Commands", proficiency: 86, experience_level: "Advanced", icon: "fa-solid fa-terminal", color: "#38bdf8" }
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

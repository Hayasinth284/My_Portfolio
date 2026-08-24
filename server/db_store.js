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
    },
    {
      id: 3,
      title: 'ShopVibe - E-Commerce Web Application',
      description: 'A modern, full-stack e-commerce web application built with Python 3, SQL (SQLite / MySQL), HTML5, Vanilla CSS3, and JavaScript (ES6+). Features dynamic product catalogs with instant search and multi-filtering, slide-out shopping cart with promo coupon engines & free shipping progress bar, interactive multi-step checkout with live credit card preview simulator, real-time parcel order tracking timeline, and a comprehensive role-based Admin Management Suite with inventory CRUD and live order status management.',
      category: 'Full Stack',
      image: '/project_ecommerce.jpg',
      tags: 'E-Commerce, Python, SQL, SQLite, JavaScript, HTML5, CSS3, REST API, Shopping Cart, Admin Suite',
      github_url: 'https://github.com/Hayasinth284/E-Commerce-Web-Application',
      demo_url: 'https://github.com/Hayasinth284/E-Commerce-Web-Application',
      featured: 1,
      architecture: 'Python REST & API Architecture + SQLite Relational Database + Vanilla JS Dynamic Cart & Real-Time Tracking Engine + Glassmorphism Storefront UI',
      key_features: 'Interactive Storefront with instant search, price sliders & multi-category filters; Dynamic Slide-Out Shopping Cart with coupon codes & free shipping meter; Multi-Step Checkout with real-time interactive credit card simulator; Real-Time Order Tracking timeline & customer order history lookup; Comprehensive Admin Suite for product inventory CRUD & live order status updates; Role-Based Access Control (Admin vs. Customer) with instant demo auth'
    }
  ],
  skills: [
    { id: 1, category: "Frontend Development", name: "HTML5 & Semantic Markup", proficiency: 95, experience_level: "Expert", icon: "fa-brands fa-html5", color: "#e34f26" },
    { id: 2, category: "Frontend Development", name: "CSS3 / Flexbox / CSS Grid", proficiency: 92, experience_level: "Expert", icon: "fa-brands fa-css3-alt", color: "#1572b6" },
    { id: 3, category: "Frontend Development", name: "JavaScript (ES6+ / Modern DOM)", proficiency: 90, experience_level: "Advanced", icon: "fa-brands fa-js", color: "#f7df1e" },
    { id: 4, category: "Frontend Development", name: "React.js & Component UI", proficiency: 85, experience_level: "Advanced", icon: "fa-brands fa-react", color: "#61dafb" },
    { id: 5, category: "Backend Development", name: "Python & Flask REST APIs", proficiency: 90, experience_level: "Advanced", icon: "fa-brands fa-python", color: "#3776ab" },
    { id: 6, category: "Backend Development", name: "Node.js & Express.js", proficiency: 85, experience_level: "Advanced", icon: "fa-brands fa-node-js", color: "#339933" },
    { id: 7, category: "Backend Development", name: "RESTful API Design & Routing", proficiency: 88, experience_level: "Advanced", icon: "fa-solid fa-server", color: "#00f2fe" },
    { id: 8, category: "Database Systems", name: "SQL (Structured Query Language)", proficiency: 92, experience_level: "Expert", icon: "fa-solid fa-database", color: "#00b4d8" },
    { id: 9, category: "Database Systems", name: "SQLite & MySQL Optimization", proficiency: 86, experience_level: "Advanced", icon: "fa-solid fa-hard-drive", color: "#10b981" },
    { id: 10, category: "Developer Tools & CS", name: "Git & GitHub Version Control", proficiency: 88, experience_level: "Advanced", icon: "fa-brands fa-github", color: "#ffffff" }
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

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

// Fallback initial data in case API server is loading
const initialProjects = [
  {
    id: 1,
    title: 'My Portfolio — 3D Cyber Space & Full-Stack Web App',
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
];

const initialSkills = [
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

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [stats, setStats] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Fetch live projects, skills, and stats from backend Express API
  const fetchBackendData = async () => {
    try {
      const [projRes, skillRes, statRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/stats')
      ]);

      if (projRes.ok) {
        const projData = await projRes.json();
        if (projData && projData.length > 0) setProjects(projData);
      }

      if (skillRes.ok) {
        const skillData = await skillRes.json();
        if (skillData && skillData.length > 0) setSkills(skillData);
      }

      if (statRes.ok) {
        const statData = await statRes.json();
        setStats(statData);
      }
    } catch (err) {
      console.log('Using local fallback portfolio data');
    }
  };

  const [bgMode, setBgMode] = useState('space'); // 'space', 'quantum', 'vortex'

  const bgModeNames = {
    space: 'Deep Cyber Space',
    quantum: '3D Quantum Waves',
    vortex: 'Magnetic Nebula Vortex'
  };

  const cycleBgMode = () => {
    const modes = ['space', 'quantum', 'vortex'];
    const next = modes[(modes.indexOf(bgMode) + 1) % modes.length];
    setBgMode(next);
    showToast(`Background Effect: ${bgModeNames[next]}`);
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let mouse = { x: null, y: null };
    let flightOffsetX = 0;
    let flightOffsetY = 0;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let time = 0;

    // ----------------------------------------------------
    // 1. DEEP CYBER SPACE ENGINE STATE
    // ----------------------------------------------------
    const numStars = Math.min(Math.floor(w * 0.4), 400);
    const maxZ = 1200;
    const fov = 260;
    const stars = [];
    const starColors = ['#ffffff', '#00f2fe', '#38bdf8', '#c084fc', '#e0e7ff', '#a855f7'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * w * 3,
        y: (Math.random() - 0.5) * h * 3,
        z: Math.random() * maxZ,
        baseSize: Math.random() * 1.8 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkle: Math.random() * Math.PI * 2
      });
    }

    // Floating 3D Cyber Code Words in Space
    const spaceCodeWords = [
      'Python', 'SQL', 'SELECT * FROM', 'async / await', 'def main():',
      '{ ... }', '=>', 'REST API', 'React.js', 'Node.js',
      'SQLite', 'Git & GitHub', 'db.query()', '<div>', '010101',
      'JavaScript', 'CSS3 / Grid', 'HTML5', 'class Model:'
    ];

    const floatingCodes = [];
    const numCodes = 18;
    for (let i = 0; i < numCodes; i++) {
      floatingCodes.push({
        text: spaceCodeWords[i % spaceCodeWords.length],
        x: (Math.random() - 0.5) * w * 2.2,
        y: (Math.random() - 0.5) * h * 2.2,
        z: (i / numCodes) * maxZ + 50,
        color: i % 3 === 0 ? '#00f2fe' : (i % 3 === 1 ? '#c084fc' : '#38bdf8'),
        rotZ: (Math.random() - 0.5) * 0.25
      });
    }

    // Comets / Meteors in Deep Space
    const comets = [];
    const spawnComet = () => {
      comets.push({
        x: Math.random() * w * 0.9,
        y: Math.random() * h * 0.4,
        length: 150 + Math.random() * 120,
        speed: 9 + Math.random() * 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        opacity: 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#c084fc'
      });
    };

    // ----------------------------------------------------
    // 2. MAGNETIC NEBULA VORTEX PARTICLES
    // ----------------------------------------------------
    const vortexParticles = [];
    const numVortex = Math.min(Math.floor(w / 10), 120);
    const vortexColors = ['#00f2fe', '#38bdf8', '#a855f7', '#c084fc', '#34d399', '#f43f5e'];

    for (let i = 0; i < numVortex; i++) {
      vortexParticles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 40 + Math.random() * Math.min(w, h) * 0.48,
        speed: (Math.random() * 0.015 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
        radialSpeed: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1.2,
        color: vortexColors[i % vortexColors.length],
        trail: []
      });
    }

    // 3D Geometry definitions for Quantum Waves mode
    const cubeVerts = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const cubeEdges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const octaVerts = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    const octaEdges = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]];

    const shapes = [];
    const shapeModels = [{ verts: cubeVerts, edges: cubeEdges }, { verts: octaVerts, edges: octaEdges }];
    for (let i = 0; i < 6; i++) {
      shapes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        rx: Math.random() * Math.PI * 2, ry: Math.random() * Math.PI * 2, rz: Math.random() * Math.PI * 2,
        vrx: 0.01, vry: 0.01, vrz: 0.01, size: 36, color: starColors[i % starColors.length],
        model: shapeModels[i % shapeModels.length]
      });
    }

    // ----------------------------------------------------
    // MAIN ANIMATION LOOP
    // ----------------------------------------------------
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse camera tilt steering
      const targetOffsetX = mouse.x ? (mouse.x - w / 2) * 0.18 : 0;
      const targetOffsetY = mouse.y ? (mouse.y - h / 2) * 0.18 : 0;
      flightOffsetX += (targetOffsetX - flightOffsetX) * 0.05;
      flightOffsetY += (targetOffsetY - flightOffsetY) * 0.05;

      const cx = w / 2 - flightOffsetX;
      const cy = h / 2 - flightOffsetY;

      // ====================================================
      // MODE 1: DEEP CYBER SPACE WARP & FLOATING CODE (DEFAULT)
      // ====================================================
      if (bgMode === 'space') {
        const speed = 2.4;

        // 1. Render 3D Stars & Warp Speed Streaks
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.z -= speed;

          if (s.z <= 1) {
            s.z = maxZ;
            s.x = (Math.random() - 0.5) * w * 3;
            s.y = (Math.random() - 0.5) * h * 3;
          }

          const k = fov / s.z;
          const sx = s.x * k + cx;
          const sy = s.y * k + cy;

          const prevK = fov / (s.z + speed * 3.8);
          const px = s.x * prevK + cx;
          const py = s.y * prevK + cy;

          if (sx >= -50 && sx <= w + 50 && sy >= -50 && sy <= h + 50) {
            const depthRatio = 1 - s.z / maxZ;
            const size = Math.max(0.6, depthRatio * s.baseSize * 2.2);
            const alpha = Math.min(1, depthRatio * 1.3) * (0.75 + Math.sin(time * 3 + s.twinkle) * 0.25);

            // Warp streak line
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = s.color;
            ctx.globalAlpha = alpha * 0.75;
            ctx.lineWidth = size * 0.9;
            ctx.stroke();

            // Star node glow
            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = alpha;
            if (s.z < 450) {
              ctx.shadowColor = s.color;
              ctx.shadowBlur = 10;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        ctx.globalAlpha = 1;

        // 2. Render 3D Floating Cyber Code Words in Space
        for (let i = 0; i < floatingCodes.length; i++) {
          const c = floatingCodes[i];
          c.z -= speed * 0.95;

          if (c.z <= 10) {
            c.z = maxZ;
            c.x = (Math.random() - 0.5) * w * 2.2;
            c.y = (Math.random() - 0.5) * h * 2.2;
          }

          const k = fov / c.z;
          const sx = c.x * k + cx;
          const sy = c.y * k + cy;

          if (sx >= -150 && sx <= w + 150 && sy >= -80 && sy <= h + 80) {
            const fontSize = Math.max(10, Math.min(24, k * 28));
            const alpha = Math.min(0.92, (1 - c.z / maxZ) * 1.15);

            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(c.rotZ);
            ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
            ctx.fillStyle = c.color;
            ctx.globalAlpha = alpha;
            ctx.shadowColor = c.color;
            ctx.shadowBlur = c.z < 550 ? 14 : 4;
            ctx.fillText(c.text, 0, 0);
            ctx.restore();
          }
        }
        ctx.globalAlpha = 1;

        // 3. Shooting Star Comets
        if (Math.random() < 0.016 && comets.length < 3) {
          spawnComet();
        }

        for (let i = comets.length - 1; i >= 0; i--) {
          const c = comets[i];
          c.x += Math.cos(c.angle) * c.speed;
          c.y += Math.sin(c.angle) * c.speed;
          c.opacity -= 0.012;

          if (c.opacity <= 0 || c.x > w + 100 || c.y > h + 100) {
            comets.splice(i, 1);
            continue;
          }

          const tailX = c.x - Math.cos(c.angle) * c.length;
          const tailY = c.y - Math.sin(c.angle) * c.length;

          const cGrad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
          cGrad.addColorStop(0, 'rgba(0,0,0,0)');
          cGrad.addColorStop(0.7, c.color);
          cGrad.addColorStop(1, '#ffffff');

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(c.x, c.y);
          ctx.strokeStyle = cGrad;
          ctx.lineWidth = 2.8;
          ctx.shadowColor = c.color;
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // ====================================================
      // MODE 2: QUANTUM ENERGY SINE WAVES
      // ====================================================
      else if (bgMode === 'quantum') {
        const waveConfigs = [
          { yRatio: 0.35, freq1: 0.0028, freq2: 0.006, speed1: 0.8, speed2: -0.6, amp1: 50, amp2: 24, width: 2, c1: 'rgba(0,242,254,0.3)', c2: 'rgba(79,172,254,0.5)', c3: 'rgba(127,86,217,0.1)', glow: 'rgba(0,242,254,0.4)' },
          { yRatio: 0.65, freq1: 0.0022, freq2: 0.005, speed1: -0.9, speed2: 0.7, amp1: 65, amp2: 30, width: 2.2, c1: 'rgba(127,86,217,0.1)', c2: 'rgba(168,85,247,0.5)', c3: 'rgba(0,242,254,0.35)', glow: 'rgba(168,85,247,0.4)' }
        ];

        waveConfigs.forEach(wave => {
          ctx.beginPath();
          const grad = ctx.createLinearGradient(0, 0, w, 0);
          grad.addColorStop(0, wave.c1);
          grad.addColorStop(0.5, wave.c2);
          grad.addColorStop(1, wave.c3);
          ctx.strokeStyle = grad;
          ctx.lineWidth = wave.width;
          ctx.shadowColor = wave.glow;
          ctx.shadowBlur = 14;

          for (let x = 0; x <= w; x += 10) {
            const y = (h * wave.yRatio) + 
              Math.sin(x * wave.freq1 + time * wave.speed1) * wave.amp1 + 
              Math.cos(x * wave.freq2 + time * wave.speed2) * wave.amp2;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        shapes.forEach(s => {
          s.x += s.vx; s.y += s.vy; s.rx += 0.01; s.ry += 0.01;
          if (s.x < -50) s.x = w + 50; if (s.x > w + 50) s.x = -50;
          if (s.y < -50) s.y = h + 50; if (s.y > h + 50) s.y = -50;

          const projVerts = s.model.verts.map(v => {
            let x = v[0] * s.size; let y = v[1] * s.size; let z = v[2] * s.size;
            let y1 = y * Math.cos(s.rx) - z * Math.sin(s.rx);
            let z1 = y * Math.sin(s.rx) + z * Math.cos(s.rx);
            let x2 = x * Math.cos(s.ry) + z1 * Math.sin(s.ry);
            let z2 = -x * Math.sin(s.ry) + z1 * Math.cos(s.ry);
            const scale = 350 / (z2 + 350);
            return [s.x + x2 * scale, s.y + y1 * scale];
          });

          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.5;
          s.model.edges.forEach(e => {
            ctx.beginPath();
            ctx.moveTo(projVerts[e[0]][0], projVerts[e[0]][1]);
            ctx.lineTo(projVerts[e[1]][0], projVerts[e[1]][1]);
            ctx.stroke();
          });
          ctx.globalAlpha = 1;
        });
      }

      // ====================================================
      // MODE 3: MAGNETIC NEBULA VORTEX
      // ====================================================
      else {
        const vortexCenterX = mouse.x !== null ? mouse.x : w / 2;
        const vortexCenterY = mouse.y !== null ? mouse.y : h / 2;

        for (let i = 0; i < vortexParticles.length; i++) {
          const p = vortexParticles[i];
          p.angle += p.speed;
          p.distance += p.radialSpeed;

          if (p.distance < 20) p.radialSpeed = Math.abs(p.radialSpeed);
          if (p.distance > Math.min(w, h) * 0.52) p.radialSpeed = -Math.abs(p.radialSpeed);

          const px = vortexCenterX + Math.cos(p.angle) * p.distance;
          const py = vortexCenterY + Math.sin(p.angle) * (p.distance * 0.7);

          // Draw particle glow
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect near vortex neighbors
          for (let j = i + 1; j < Math.min(i + 8, vortexParticles.length); j++) {
            const p2 = vortexParticles[j];
            const p2x = vortexCenterX + Math.cos(p2.angle) * p2.distance;
            const p2y = vortexCenterY + Math.sin(p2.angle) * (p2.distance * 0.7);
            const dx = px - p2x;
            const dy = py - p2y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2x, p2y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dist / 110) * 0.28;
              ctx.lineWidth = 0.85;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [bgMode]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className={`app ${theme}`} style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Animated Cyber Constellation & Aurora Background */}
      <div className="bg-canvas-container">
        <div className="aurora-orb orb-1"></div>
        <div className="aurora-orb orb-2"></div>
        <div className="aurora-orb orb-3"></div>
        <div className="aurora-orb orb-4"></div>
        <div className="bg-grid-overlay"></div>
        <canvas id="ambient-canvas"></canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          openAdmin={() => setIsAdminOpen(true)}
          bgMode={bgMode}
          cycleBgMode={cycleBgMode}
          bgModeNames={bgModeNames}
        />

        <main>
          <Hero />
          <StatsSection stats={stats} />
          <ProjectsSection
            projects={projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
          <SkillsSection skills={skills} />
          <ExperienceSection />
          <ContactSection showToast={showToast} />
        </main>

        <Footer />
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Content Manager Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        onRefreshData={fetchBackendData}
        showToast={showToast}
      />

      {/* Global Toast */}
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}

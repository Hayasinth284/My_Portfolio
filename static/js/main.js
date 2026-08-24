/**
 * Hayasinth M Portfolio - Main JavaScript Engine
 * Features: 3D HTML5 Canvas Graphics, Dark/Light Themes, AJAX Contact, Project Filter & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Toast Notification System
  // ==========================================
  const toastContainer = document.getElementById('toast-container');
  window.showToast = function (msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // ==========================================
  // 2. Theme Engine (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('portfolio_theme', isLight ? 'light' : 'dark');
      themeToggleBtn.innerHTML = isLight ? '🌙' : '☀️';
      showToast(isLight ? 'Switched to Light Mode' : 'Switched to Dark Mode');
    });
  }

  // ==========================================
  // 3. Multi-Mode 3D Canvas Animation Engine
  // ==========================================
  const canvas = document.getElementById('ambient-canvas');
  let bgMode = 'space'; // 'space', 'quantum', 'vortex'
  const bgModeNames = {
    space: 'Deep Cyber Space',
    quantum: '3D Quantum Waves',
    vortex: 'Magnetic Nebula Vortex'
  };

  const bgModeBtn = document.getElementById('bg-mode-btn');
  if (bgModeBtn) {
    bgModeBtn.addEventListener('click', () => {
      const modes = ['space', 'quantum', 'vortex'];
      bgMode = modes[(modes.indexOf(bgMode) + 1) % modes.length];
      showToast(`Background Effect: ${bgModeNames[bgMode]}`);
    });
  }

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    let mouseX = w / 2;
    let mouseY = h / 2;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Space Mode Setup
    const NUM_STARS = 260;
    const stars = [];
    const techWords = ['Python', 'Django', 'SQL', 'JavaScript', 'HTML5', 'CSS3', 'React', 'SQLite', 'Node', 'REST API', 'Kanban'];

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * w * 2.5,
        y: (Math.random() - 0.5) * h * 2.5,
        z: Math.random() * 1500 + 1,
        pz: 1000,
        word: i % 18 === 0 ? techWords[i % techWords.length] : null,
        color: ['#00f2fe', '#4facfe', '#7f56d9', '#ffffff'][i % 4]
      });
    }

    let time = 0;
    function animateCanvas() {
      time += 0.015;
      const isLight = document.body.classList.contains('light');

      ctx.clearRect(0, 0, w, h);

      if (bgMode === 'space') {
        const cx = w / 2 + (mouseX - w / 2) * 0.15;
        const cy = h / 2 + (mouseY - h / 2) * 0.15;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.pz = s.z;
          s.z -= 4.2;

          if (s.z <= 0) {
            s.z = 1500;
            s.pz = 1500;
            s.x = (Math.random() - 0.5) * w * 2.5;
            s.y = (Math.random() - 0.5) * h * 2.5;
          }

          const k = 350 / s.z;
          const px = s.x * k + cx;
          const py = s.y * k + cy;

          const pk = 350 / s.pz;
          const prevX = s.x * pk + cx;
          const prevY = s.y * pk + cy;

          if (px >= 0 && px <= w && py >= 0 && py <= h) {
            const size = Math.max(0.6, (1 - s.z / 1500) * 3);
            const alpha = Math.min(1, (1 - s.z / 1500) * (isLight ? 0.6 : 0.95));

            // Star streak
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = s.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = size;
            ctx.stroke();

            // Star point
            ctx.beginPath();
            ctx.arc(px, py, size / 1.5, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();

            // Tech Token text floating
            if (s.word && s.z < 800) {
              ctx.font = '11px "JetBrains Mono", monospace';
              ctx.fillStyle = isLight ? '#0284c7' : '#00f2fe';
              ctx.fillText(s.word, px + 8, py - 4);
            }
          }
        }
        ctx.globalAlpha = 1;
      } else if (bgMode === 'quantum') {
        // Quantum Waves Animation
        ctx.lineWidth = 1.5;
        for (let j = 0; j < 5; j++) {
          ctx.beginPath();
          ctx.strokeStyle = j % 2 === 0 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(127, 86, 217, 0.25)';
          for (let x = 0; x < w; x += 15) {
            const y = h / 2 + Math.sin(x * 0.005 + time + j * 0.8) * 90 * Math.cos(time * 0.5 + j);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (bgMode === 'vortex') {
        // Magnetic Vortex Animation
        const cx = mouseX;
        const cy = mouseY;
        for (let i = 0; i < 90; i++) {
          const angle = time * 0.8 + i * 0.12;
          const radius = (i * 7 + time * 20) % (w * 0.45);
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          const alpha = (1 - radius / (w * 0.45)) * 0.7;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? `rgba(0, 242, 254, ${alpha})` : `rgba(127, 86, 217, ${alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // ==========================================
  // 4. Interactive Project Filter & Search
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const noProjectsMsg = document.getElementById('no-projects-found');

  let activeCat = 'All';
  let queryText = '';

  function applyProjectFilters() {
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const cat = card.dataset.category || '';
      const title = (card.dataset.title || '').toLowerCase();
      const desc = (card.dataset.desc || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();

      const matchesCat = activeCat === 'All' || cat === activeCat;
      const q = queryText.toLowerCase();
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || tags.includes(q);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noProjectsMsg) {
      noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.category;
      applyProjectFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      queryText = e.target.value;
      if (searchClearBtn) searchClearBtn.style.display = queryText ? 'block' : 'none';
      applyProjectFilters();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      queryText = '';
      searchClearBtn.style.display = 'none';
      applyProjectFilters();
    });
  }

  // ==========================================
  // 5. Project Detail Modal Handler
  // ==========================================
  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-project-modal');

  // Load project JSON data from embedded script
  const projectsDataScript = document.getElementById('projects-json-data');
  let projectsData = [];
  if (projectsDataScript) {
    try {
      projectsData = JSON.parse(projectsDataScript.textContent);
    } catch (e) {
      console.warn('Could not parse projects JSON');
    }
  }

  window.openProjectModal = function (projectId) {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project || !projectModal) return;

    document.getElementById('modal-project-img').src = project.image || '/static/images/project1.jpg';
    document.getElementById('modal-project-cat').innerText = project.category;
    document.getElementById('modal-project-title').innerText = project.title;
    document.getElementById('modal-project-desc').innerText = project.description;

    // Tags
    const tagsContainer = document.getElementById('modal-project-tags');
    tagsContainer.innerHTML = '';
    project.tags.split(',').forEach((t) => {
      if (t.trim()) {
        const span = document.createElement('span');
        span.className = 'tech-tag-chip';
        span.innerText = '#' + t.trim();
        tagsContainer.appendChild(span);
      }
    });

    // Architecture
    const archContainer = document.getElementById('modal-project-arch-container');
    const archText = document.getElementById('modal-project-arch');
    if (project.architecture) {
      archText.innerText = project.architecture;
      archContainer.style.display = 'block';
    } else {
      archContainer.style.display = 'none';
    }

    // Key Features
    const featContainer = document.getElementById('modal-project-features-container');
    const featList = document.getElementById('modal-project-features');
    featList.innerHTML = '';
    if (project.key_features) {
      project.key_features.split(';').forEach((f) => {
        if (f.trim()) {
          const item = document.createElement('div');
          item.style.display = 'flex';
          item.style.alignItems = 'flex-start';
          item.style.gap = '10px';
          item.innerHTML = `<span style="color: var(--accent-cyan)">✔</span> <span style="color: var(--text-secondary); font-size: 0.95rem;">${f.trim()}</span>`;
          featList.appendChild(item);
        }
      });
      featContainer.style.display = 'block';
    } else {
      featContainer.style.display = 'none';
    }

    // GitHub Link
    const githubLink = document.getElementById('modal-project-github');
    if (project.github_url && project.github_url !== '#') {
      githubLink.href = project.github_url;
      githubLink.style.display = 'inline-flex';
    } else {
      githubLink.style.display = 'none';
    }

    // Demo Link
    const demoLink = document.getElementById('modal-project-demo');
    if (project.demo_url && project.demo_url !== '#') {
      demoLink.href = project.demo_url;
      demoLink.style.display = 'inline-flex';
    } else {
      demoLink.style.display = 'none';
    }

    projectModal.classList.add('active');
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => projectModal.classList.remove('active'));
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.remove('active');
    });
  }

  // ==========================================
  // 6. Admin Modal Handler (Live Project CRUD)
  // ==========================================
  const adminModal = document.getElementById('admin-modal');
  const openAdminBtn = document.getElementById('open-admin-btn');
  const closeAdminBtn = document.getElementById('close-admin-btn');
  const adminForm = document.getElementById('admin-add-project-form');

  if (openAdminBtn && adminModal) {
    openAdminBtn.addEventListener('click', () => adminModal.classList.add('active'));
  }
  if (closeAdminBtn && adminModal) {
    closeAdminBtn.addEventListener('click', () => adminModal.classList.remove('active'));
  }
  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) adminModal.classList.remove('active');
    });
  }

  // Helper to get CSRF token from cookies
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(adminForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/api/projects/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') || ''
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          showToast('Project added to SQLite database successfully!');
          adminModal.classList.remove('active');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showToast('Error saving project to database');
        }
      } catch (err) {
        showToast('Network error');
      }
    });
  }

  // ==========================================
  // 7. Live Contact Form Submission (AJAX)
  // ==========================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = 'Sending...';
      }

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/api/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') || ''
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
          showToast('Message received! Saved to SQLite database.');
          contactForm.reset();
        } else {
          showToast(data.error || 'Failed to send message.');
        }
      } catch (err) {
        showToast('Network error, please try again.');
      } finally {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = 'Send Message 🚀';
        }
      }
    });
  }
});

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { readDB, writeDB } = require('./db_store');

const PORT = process.env.PORT || 5000;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJSON(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function serveStaticFile(res, filePath, contentType) {
  if (fs.existsSync(filePath)) {
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File Not Found');
  }
}

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  setCorsHeaders(res);
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const db = readDB();

  // API Endpoints
  if (pathname === '/api/projects') {
    if (method === 'GET') {
      const { category, search } = parsedUrl.query;
      let projects = db.projects || [];
      if (category && category !== 'All') {
        projects = projects.filter(p => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        projects = projects.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.toLowerCase().includes(q))
        );
      }
      return sendJSON(res, 200, projects);
    }

    if (method === 'POST') {
      const body = await parseBody(req);
      if (!body.title || !body.description) {
        return sendJSON(res, 400, { error: 'Title and description required' });
      }
      const newProj = {
        id: Date.now(),
        title: body.title,
        description: body.description,
        category: body.category || 'Full Stack',
        image: body.image || '/project1.jpg',
        tags: body.tags || '',
        github_url: body.github_url || '#',
        demo_url: body.demo_url || '#',
        featured: body.featured ? 1 : 0,
        architecture: body.architecture || '',
        key_features: body.key_features || ''
      };
      db.projects.unshift(newProj);
      writeDB(db);
      return sendJSON(res, 201, newProj);
    }
  }

  // Single Project Route (/api/projects/:id)
  if (pathname.startsWith('/api/projects/')) {
    const id = parseInt(pathname.split('/')[3]);
    if (method === 'DELETE') {
      db.projects = db.projects.filter(p => p.id !== id);
      writeDB(db);
      return sendJSON(res, 200, { message: 'Project deleted' });
    }
  }

  // Skills Endpoint
  if (pathname === '/api/skills') {
    if (method === 'GET') {
      return sendJSON(res, 200, db.skills || []);
    }
  }

  // Contact Endpoint
  if (pathname === '/api/contact') {
    if (method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.email || !body.message) {
        return sendJSON(res, 400, { error: 'Name, email, and message are required' });
      }
      const msg = {
        id: Date.now(),
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        subject: body.subject || '',
        message: body.message,
        date: new Date().toISOString()
      };
      db.messages.unshift(msg);
      writeDB(db);
      return sendJSON(res, 201, { success: true, message: 'Message saved to database successfully!' });
    }
  }

  // Stats Endpoint
  if (pathname === '/api/stats') {
    return sendJSON(res, 200, {
      projectsCompleted: db.projects.length,
      technologiesMastered: db.skills.length,
      messagesReceived: db.messages.length,
      yearsCoding: '4th Year BE CSE Student',
      academicInstitution: 'Jeppiaar Engineering College'
    });
  }

  // Health Endpoint
  if (pathname === '/api/health') {
    return sendJSON(res, 200, {
      status: 'OK',
      developer: 'Hayasinth M',
      institution: 'Jeppiaar Engineering College',
      timestamp: new Date().toISOString()
    });
  }

  // Serve static assets from client/public or client/dist
  let staticPath = path.join(__dirname, '../client/public', pathname);
  if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    const ext = path.extname(staticPath);
    return serveStaticFile(res, staticPath, mimeTypes[ext] || 'application/octet-stream');
  }

  let distPath = path.join(__dirname, '../client/dist', pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(distPath) && fs.statSync(distPath).isFile()) {
    const ext = path.extname(distPath);
    return serveStaticFile(res, distPath, mimeTypes[ext] || 'application/octet-stream');
  }

  // Fallback to index.html or API welcome page
  const indexHtml = path.join(__dirname, '../client/dist/index.html');
  if (fs.existsSync(indexHtml)) {
    return serveStaticFile(res, indexHtml, 'text/html');
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h2>Hayasinth M Portfolio Backend API is Running!</h2>
    <p>Developer: Hayasinth M (B.E. CSE 4th Year, Jeppiaar Engineering College)</p>
    <ul>
      <li><a href="/api/projects">/api/projects</a></li>
      <li><a href="/api/skills">/api/skills</a></li>
      <li><a href="/api/stats">/api/stats</a></li>
      <li><a href="/api/health">/api/health</a></li>
    </ul>
  `);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  Hayasinth M Portfolio Server running on http://localhost:${PORT}`);
  console.log(`  College: Jeppiaar Engineering College (BE CSE 4th Year)`);
  console.log(`  Database: Persistent SQL/JSON Store Active`);
  console.log(`=======================================================`);
});

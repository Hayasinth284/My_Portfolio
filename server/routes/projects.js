const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/projects - Retrieve projects (with category & search filtering)
router.get('/', (req, res) => {
  const { category, search, sort } = req.query;
  let sql = 'SELECT * FROM projects WHERE 1=1';
  const params = [];

  if (category && category !== 'All') {
    sql += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    sql += ' AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  if (sort === 'featured') {
    sql += ' ORDER BY featured DESC, id DESC';
  } else {
    sql += ' ORDER BY id DESC';
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error', details: err.message });
    }
    res.json(rows);
  });
});

// GET /api/projects/:id - Single project
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Project not found' });
    res.json(row);
  });
});

// POST /api/projects - Add new project
router.post('/', (req, res) => {
  const { title, description, category, image, tags, github_url, demo_url, featured, architecture, key_features } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }

  const sql = `
    INSERT INTO projects (title, description, category, image, tags, github_url, demo_url, featured, architecture, key_features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    title,
    description,
    category,
    image || '/project1.jpg',
    tags || '',
    github_url || '#',
    demo_url || '#',
    featured ? 1 : 0,
    architecture || '',
    key_features || ''
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM projects WHERE id = ?', [this.lastID], (err, newRow) => {
      res.status(201).json(newRow);
    });
  });
});

// PUT /api/projects/:id - Update project
router.put('/:id', (req, res) => {
  const { title, description, category, image, tags, github_url, demo_url, featured, architecture, key_features } = req.body;
  const sql = `
    UPDATE projects
    SET title = ?, description = ?, category = ?, image = ?, tags = ?, github_url = ?, demo_url = ?, featured = ?, architecture = ?, key_features = ?
    WHERE id = ?
  `;
  const params = [
    title, description, category, image, tags, github_url, demo_url, featured ? 1 : 0, architecture, key_features, req.params.id
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project updated successfully', id: req.params.id });
  });
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  });
});

module.exports = router;

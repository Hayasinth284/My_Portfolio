const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/skills - Retrieve all skills grouped by category
router.get('/', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY category, proficiency DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/skills - Add skill
router.post('/', (req, res) => {
  const { category, name, proficiency, experience_level, icon } = req.body;
  if (!category || !name || !proficiency) {
    return res.status(400).json({ error: 'Category, name, and proficiency are required' });
  }

  const sql = 'INSERT INTO skills (category, name, proficiency, experience_level, icon) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [category, name, proficiency, experience_level || 'Intermediate', icon || 'code'], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, category, name, proficiency, experience_level, icon });
  });
});

// DELETE /api/skills/:id - Delete skill
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM skills WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skill deleted' });
  });
});

module.exports = router;

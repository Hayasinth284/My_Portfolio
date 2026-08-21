const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/contact - Submit contact message
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const sql = 'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [name, email, phone || '', subject || 'General Inquiry', message], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save message to database', details: err.message });
    }
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved successfully.',
      id: this.lastID
    });
  });
});

// GET /api/contact - View all messages (Admin)
router.get('/', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;

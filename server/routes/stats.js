const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/stats - Portfolio statistics
router.get('/', (req, res) => {
  db.get('SELECT COUNT(*) as projectCount FROM projects', [], (err, row1) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get('SELECT COUNT(*) as skillCount FROM skills', [], (err, row2) => {
      if (err) return res.status(500).json({ error: err.message });

      db.get('SELECT COUNT(*) as messageCount FROM messages', [], (err, row3) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          projectsCompleted: row1.projectCount || 4,
          technologiesMastered: row2.skillCount || 10,
          messagesReceived: row3.messageCount || 0,
          yearsCoding: '4th Year Student (BE CSE)',
          academicInstitution: 'Jeppiaar Engineering College'
        });
      });
    });
  });
});

module.exports = router;

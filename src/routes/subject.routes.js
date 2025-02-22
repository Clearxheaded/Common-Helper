const express = require('express');
const router = express.Router();
const { matchSubject, SA_SUBJECTS } = require('../services/subjectMatcher');

router.post('/match', async (req, res) => {
  try {
    const { subject } = req.body;
    
    if (!subject || !SA_SUBJECTS[subject]) {
      return res.status(400).json({
        error: 'Invalid subject',
        validSubjects: Object.keys(SA_SUBJECTS)
      });
    }

    const match = await matchSubject(subject);
    res.json(match);

  } catch (error) {
    console.error('Subject matching error:', error);
    res.status(500).json({ error: 'Error matching subject' });
  }
});

module.exports = router; 
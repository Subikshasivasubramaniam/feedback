const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Level 2 - Task 2: Welcome route from the backend
router.get('/welcome', (req, res) => {
  res.json({ message: 'Welcome to the Event Feedback API!' });
});

// Level 2 - Task 3 & Level 3 - Task 3: Receive feedback form data and save to DB
router.post('/', async (req, res) => {
  try {
    const { name, email, event, rating, message } = req.body;

    // Level 4 - Task 4: Basic validation (empty fields)
    if (!name || !email || !event || !rating || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required. Please fill out the complete form.',
      });
    }

    const feedback = new Feedback({ name, email, event, rating, message });
    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      data: feedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error while saving feedback.' });
  }
});

// Level 3 - Task 4 / Level 4 - Task 3: Retrieve and display all feedback
router.get('/', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feedbackList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error while fetching feedback.' });
  }
});

module.exports = router;

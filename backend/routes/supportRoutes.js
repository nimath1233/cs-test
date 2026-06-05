import express from 'express';
import { protect } from '../middleware/auth.js';
import SupportTicket from '../models/SupportTicket.js';

const router = express.Router();

// @desc    Submit a new support ticket
// @route   POST /api/support/tickets
// @access  Private
router.post('/tickets', protect, async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ success: false, message: 'Subject and message are required fields' });
  }

  try {
    const ticket = await SupportTicket.create({
      user: req.user._id,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Support ticket submitted successfully!',
      data: ticket,
    });
  } catch (error) {
    console.error('Create Ticket API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get user's support tickets
// @route   GET /api/support/tickets
// @access  Private
router.get('/tickets', protect, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error('Get Tickets API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

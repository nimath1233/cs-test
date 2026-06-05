import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get current user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.json({
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountId: user.accountId,
          verificationStatus: user.verificationStatus,
          trustPoints: user.trustPoints,
          balances: user.balances,
        },
      });
    } else {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }
  } catch (error) {
    console.error('Fetch Profile API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update user profile details
// @route   PUT /api/user/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.json({
        success: true,
        data: {
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          accountId: updatedUser.accountId,
          verificationStatus: updatedUser.verificationStatus,
          trustPoints: updatedUser.trustPoints,
          balances: updatedUser.balances,
        },
      });
    } else {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }
  } catch (error) {
    console.error('Update Profile API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

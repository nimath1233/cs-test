/* global process */
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    dob,
    language,
    address,
    street,
    city,
    zipCode,
    country,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already registered with this email address' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      dob,
      language,
      address,
      street,
      city,
      zipCode,
      country,
    });

    if (user) {
      return res.status(201).json({
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
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid user registration input data' });
    }
  } catch (error) {
    console.error('Registration API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email address or password credentials' });
    }
  } catch (error) {
    console.error('Login API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

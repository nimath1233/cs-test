import express from 'express';
import { protect } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Log a new deposit
// @route   POST /api/transactions/deposit
// @access  Private
router.post('/deposit', protect, async (req, res) => {
  const { asset, amount, address } = req.body;

  if (!asset || !amount || !address) {
    return res.status(400).json({ success: false, message: 'Asset, amount, and wallet address are required fields' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    // Create the transaction record
    const transaction = await Transaction.create({
      user: user._id,
      type: 'deposit',
      asset,
      amount: parseFloat(amount),
      address,
      status: 'completed', // Immediately mark as completed for direct demo display
    });

    // Update user balance & award Trust Points (e.g. 1 point for every 100 USDT deposited or 50 points per BTC)
    let trustPointsGained = 0;
    if (asset === 'USDT') {
      user.balances.USDT += parseFloat(amount);
      trustPointsGained = Math.floor(parseFloat(amount) / 100);
    } else if (asset === 'BTC') {
      user.balances.BTC += parseFloat(amount);
      trustPointsGained = Math.floor(parseFloat(amount) * 50);
    }
    
    user.trustPoints += trustPointsGained;
    await user.save();

    return res.status(201).json({
      success: true,
      message: `Successfully deposited ${amount} ${asset}!`,
      data: {
        transaction,
        updatedBalances: user.balances,
        trustPoints: user.trustPoints,
        trustPointsGained,
      },
    });
  } catch (error) {
    console.error('Deposit API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Submit a new withdrawal request
// @route   POST /api/transactions/withdraw
// @access  Private
router.post('/withdraw', protect, async (req, res) => {
  const { asset, amount, address } = req.body;

  if (!asset || !amount || !address) {
    return res.status(400).json({ success: false, message: 'Asset, amount, and target wallet address are required fields' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const withdrawAmount = parseFloat(amount);

    // Verify sufficient balance
    if (asset === 'USDT' && user.balances.USDT < withdrawAmount) {
      return res.status(400).json({ success: false, message: 'Insufficient USDT balance for this withdrawal' });
    } else if (asset === 'BTC' && user.balances.BTC < withdrawAmount) {
      return res.status(400).json({ success: false, message: 'Insufficient BTC balance for this withdrawal' });
    }

    // Create pending withdrawal transaction
    const transaction = await Transaction.create({
      user: user._id,
      type: 'withdrawal',
      asset,
      amount: withdrawAmount,
      address,
      status: 'pending', // Keeps as pending review by default
    });

    // Deduct user balance immediately
    if (asset === 'USDT') {
      user.balances.USDT -= withdrawAmount;
    } else if (asset === 'BTC') {
      user.balances.BTC -= withdrawAmount;
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: `Withdrawal request for ${amount} ${asset} has been submitted successfully!`,
      data: {
        transaction,
        updatedBalances: user.balances,
      },
    });
  } catch (error) {
    console.error('Withdrawal API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get transaction history
// @route   GET /api/transactions/history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50); // Cap at 50 records

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error('Get Transaction History API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Redeem loyalty points
// @route   POST /api/transactions/redeem-points
// @access  Private
router.post('/redeem-points', protect, async (req, res) => {
  const { points, method } = req.body;

  if (!points || !method) {
    return res.status(400).json({ success: false, message: 'Points and payment method are required fields' });
  }

  const parsedPoints = parseInt(points);
  if (isNaN(parsedPoints) || parsedPoints <= 0) {
    return res.status(400).json({ success: false, message: 'Please enter a valid amount of points' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    if (user.trustPoints < parsedPoints) {
      return res.status(400).json({ success: false, message: 'Insufficient trust points balance' });
    }

    // Conversion rate: 10,000 points = 10 USD (i.e. 1,000 points = 1 USD)
    const amountUSD = parsedPoints / 1000;

    let transaction;
    if (method === 'USDT') {
      // Direct credit to wallet
      user.balances.USDT += amountUSD;
      user.trustPoints -= parsedPoints;
      
      transaction = await Transaction.create({
        user: user._id,
        type: 'deposit',
        asset: 'USDT',
        amount: amountUSD,
        address: 'Loyalty Points Redemption to USDT Wallet',
        status: 'completed'
      });
    } else {
      // Sent to external payment gateway (XM / Neteller)
      user.trustPoints -= parsedPoints;
      
      transaction = await Transaction.create({
        user: user._id,
        type: 'withdrawal',
        asset: 'USDT',
        amount: amountUSD,
        address: `Loyalty Points Redemption to ${method} Account`,
        status: 'pending'
      });
    }

    await user.save();

    return res.json({
      success: true,
      message: `Successfully redeemed ${parsedPoints} points for $${amountUSD.toFixed(2)} USD!`,
      data: {
        transaction,
        updatedBalances: user.balances,
        trustPoints: user.trustPoints,
      }
    });
  } catch (error) {
    console.error('Redeem Points API Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get transaction details (Vulnerable to IDOR!)
// @route   GET /api/transactions/details/:id
// @access  Private
router.get('/details/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    // VULNERABILITY: Missing check to see if transaction.user.toString() === req.user._id.toString()
    return res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Get Transaction Details Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;



import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    mobileNumber: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'English',
    },
    address: {
      type: String,
      default: '',
    },
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    zipCode: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'Sri Lanka',
    },
    accountId: {
      type: String,
      unique: true,
      default: () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
      },
    },
    verificationStatus: {
      type: String,
      enum: ['not_completed', 'pending', 'verified'],
      default: 'not_completed',
    },
    trustPoints: {
      type: Number,
      default: 0,
    },
    balances: {
      USDT: {
        type: Number,
        default: 15420.50,
      },
      BTC: {
        type: Number,
        default: 0.2845,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

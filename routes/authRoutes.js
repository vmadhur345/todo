// routes/authRoutes.js

import jwt from '../auth/jwt.js'; // Import token generation function
import protect from '../auth/authMiddleware.js';  // Import the protect middleware
import bcrypt from 'bcryptjs';  // Import bcryptjs for password hashing
import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.generateToken(user._id);  // Use jwt.generateToken instead of generateToken directly

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login a user and return a JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);  // Use bcrypt to compare the password
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.generateToken(user._id);  // Use jwt.generateToken instead of generateToken directly

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example of a protected route (using protect middleware)
router.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;

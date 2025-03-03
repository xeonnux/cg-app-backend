const express = require('express');
const { User } = require('../models');
const authenticateJWT = require('../middleware/authenticateJWT'); // JWT authentication middleware

const router = express.Router();

// Get all users
router.get('/', authenticateJWT, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get user profile
router.get('/profile', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.userId); // req.user.userId is set by the authenticateJWT middleware
  res.json(user);
});

// Update user profile
router.put('/profile', authenticateJWT, async (req, res) => {
  const { first_name, last_name, contact_number } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { first_name, last_name, contact_number },
    { new: true }
  );
  
  res.json(updatedUser);
});

// Create a User
router.post('/create', async (req, res) => {
  const data = req.body;
  const { email } = data;
  try {
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create(data);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error , data });
  }
});

module.exports = router;

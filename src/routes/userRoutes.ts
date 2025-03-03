import express, { Request, Response } from 'express';
import { User } from '../models/user';
import authenticateJWT from '../middleware/authenticateJWT'; // JWT authentication middleware

const router = express.Router();

// Get all users
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get user profile
router.get('/profile', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk((req as any).user.userId); // req.user.userId is set by the authenticateJWT middleware
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update user profile
router.put('/profile', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, contact_number } = req.body;
    const updatedUser = await User.update(
      { first_name, last_name, contact_number },
      { where: { id: (req as any).user.userId }, returning: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a User
router.post('/create', async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const { email } = data;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) res.status(400).json({ message: 'User already exists' });

    const user = await User.create(data);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error, data });
  }
});

export default router;
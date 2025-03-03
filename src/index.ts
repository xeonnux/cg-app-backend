import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
// import careServiceRoutes from './routes/careServiceRoutes';
// import notificationRoutes from './routes/notificationRoutes';
// import paymentRoutes from './routes/paymentRoutes';
// import analyticsRoutes from './routes/analyticsRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/care-services', careServiceRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/analytics', analyticsRoutes);

// Start server
const PORT: number = parseInt(process.env.PORT || '5005', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

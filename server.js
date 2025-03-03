const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const careServiceRoutes = require('./routes/careServiceRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running...')
})

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/care-services', careServiceRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/analytics', analyticsRoutes);

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express, { json } from 'express';
import { config } from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';  // Import database connection function

config();  // Load environment variables

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);  // Authentication routes

// Connect to MongoDB
connectDB();  // Use the connection logic from config/db.js

// Start the server
const PORT = process.env.PORT || 5000;  // Use environment port or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

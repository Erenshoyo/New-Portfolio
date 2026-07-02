import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-project.vercel.app", // Replace with your Vercel URL after deployment
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes imports
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import projectRoutes from './routes/projects';
import skillRoutes from './routes/skills';
import experienceRoutes from './routes/experience';
import educationRoutes from './routes/education';
import blogRoutes from './routes/blogs';
import messageRoutes from './routes/messages';

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    time: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start DB & Express Server
async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio Express backend running on http://localhost:${PORT}`);
    console.log(`ℹ️ Base API URL: http://localhost:${PORT}/api`);
  });
}

startServer().catch(err => {
  console.error('❌ Server startup error:', err);
  process.exit(1);
});

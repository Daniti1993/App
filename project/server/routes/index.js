import express from 'express';
import checkInRoutes from './checkInRoutes.js';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import { getApiInfo, testApi, healthCheck } from '../controllers/systemController.js';

const router = express.Router();

// Test endpoint that always responds
router.get('/ping', (req, res) => {
  console.log('Ping received at:', new Date().toISOString());
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// System routes
router.get('/', getApiInfo);
router.get('/test', testApi);
router.get('/health', healthCheck);

// Mount feature routes
router.use('/auth', authRoutes);
router.use('/checkin', checkInRoutes);
router.use('/admin', adminRoutes);

export default router;
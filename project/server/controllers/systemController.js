import os from 'os';
import { logger } from '../utils/logger.js';

export const getApiInfo = (req, res) => {
  res.json({
    message: 'F.A.D Guest Check-In API',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      checkIn: '/api/checkin',
      admin: '/api/admin'
    }
  });
};

export const testApi = (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  logger.info(`Test API called from IP: ${clientIp}`);
  
  res.json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    request: {
      method: req.method,
      path: req.path,
      ip: clientIp,
      userAgent: req.headers['user-agent']
    },
    server: {
      platform: os.platform(),
      nodeVersion: process.version,
      uptime: process.uptime()
    }
  });
};

export const healthCheck = (req, res) => {
  const healthInfo = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    server: {
      uptime: process.uptime(),
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem()
      },
      cpu: os.cpus().length,
      platform: os.platform(),
      nodeVersion: process.version,
      env: process.env.NODE_ENV,
      pid: process.pid
    },
    database: {
      connected: !!global.mongoose?.connection?.readyState,
      state: global.mongoose?.connection?.readyState || 'disconnected'
    }
  };

  logger.info('Health check performed', healthInfo);
  res.json(healthInfo);
};
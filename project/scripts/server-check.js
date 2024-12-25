import axios from 'axios';
import { logger } from '../server/utils/logger.js';

const checkServer = async () => {
  const SERVER_URL = process.env.VITE_API_URL || 'http://159.223.0.84:5001';
  
  try {
    const healthResponse = await axios.get(`${SERVER_URL}/api/health`);
    logger.info('Server Health Check:', healthResponse.data);
    
    const testResponse = await axios.get(`${SERVER_URL}/api/test`);
    logger.info('Server Test Response:', testResponse.data);
    
    return {
      health: healthResponse.data,
      test: testResponse.data
    };
  } catch (error) {
    logger.error('Server Check Failed:', error.message);
    throw error;
  }
};

export default checkServer;
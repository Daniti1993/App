import axios from 'axios';
import { logger } from '../server/utils/logger.js';

const testEndpoints = async () => {
  const SERVER_URL = process.env.VITE_API_URL || 'http://159.223.0.84:5001';
  const endpoints = [
    { path: '/api', name: 'API Info' },
    { path: '/api/test', name: 'API Test' },
    { path: '/api/health', name: 'Health Check' }
  ];

  console.log('\nTesting Server Endpoints...\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await axios.get(`${SERVER_URL}${endpoint.path}`);
      console.log('Status:', response.status === 200 ? '✅ Success' : '❌ Failed');
      console.log('Response:', JSON.stringify(response.data, null, 2));
      console.log('-------------------\n');
    } catch (error) {
      console.error(`❌ ${endpoint.name} Failed:`, error.message);
      console.log('-------------------\n');
    }
  }
};

testEndpoints();
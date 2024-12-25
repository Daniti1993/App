import axios from 'axios';

// Get the base URL from environment or use the DigitalOcean IP
const BASE_URL = process.env.REACT_APP_API_URL || 'http://159.223.0.84:5001';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 30000 // 30 second timeout
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      return Promise.reject({ 
        message: 'Network error - server may be unavailable',
        details: error.message
      });
    } else {
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
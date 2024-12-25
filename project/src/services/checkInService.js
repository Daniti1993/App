import api from '../config/api';

export const checkInService = {
  submitCheckIn: async (formData) => {
    try {
      const response = await api.post('/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout for file uploads
      });
      return response.data;
    } catch (error) {
      console.error('Check-in submission error:', error);
      throw new Error(error.message || 'Failed to submit check-in');
    }
  },

  getCheckIns: async (params) => {
    try {
      const response = await api.get('/api/checkins', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch check-ins:', error);
      throw new Error(error.message || 'Failed to fetch check-ins');
    }
  },

  testConnection: async () => {
    try {
      const response = await api.get('/api/test');
      return response.data;
    } catch (error) {
      console.error('Server connection test failed:', error);
      throw new Error(error.message || 'Failed to connect to server');
    }
  }
};
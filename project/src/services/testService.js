import api from '../config/api';

export const testServerConnection = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    throw new Error('Server connection failed');
  }
};
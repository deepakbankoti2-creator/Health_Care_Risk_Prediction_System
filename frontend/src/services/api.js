import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

export const predictionAPI = {
  createPrediction: (patientData) => api.post('/predict', patientData),
  getPredictions: () => api.get('/predictions'),
  getPredictionById: (id) => api.get(`/predictions/${id}`),
  getDashboardStats: () => api.get('/dashboard'),
  getModelMetrics: () => api.get('/model-metrics')
};

export default api;

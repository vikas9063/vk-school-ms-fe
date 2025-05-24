import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api/v1';
const TOKEN_KEY = 'token';

// Create a base Axios instance
const AxiosUtil = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
AxiosUtil.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosUtil.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject(new Error('Network error occurred'));
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        console.warn('Unauthorized access, redirecting to login...');
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/auth/signin';
        break;
      case 403:
        console.warn('Forbidden access');
        break;
      case 404:
        console.warn('Resource not found');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error(`Unexpected error: ${status}`);
    }

    return Promise.reject(error);
  }
);

// Utility functions with error handling
export const apiService = {
  get: async (url, config = {}) => {
    try {
      return await AxiosUtil.get(url, config);
    } catch (error) {
      throw error;
    }
  },
  post: async (url, data, config = {}) => {
    try {
      return await AxiosUtil.post(url, data, config);
    } catch (error) {
      throw error;
    }
  },
  put: async (url, data, config = {}) => {
    try {
      return await AxiosUtil.put(url, data, config);
    } catch (error) {
      throw error;
    }
  },
  delete: async (url, config = {}) => {
    try {
      return await AxiosUtil.delete(url, config);
    } catch (error) {
      throw error;
    }
  },
};

export default AxiosUtil;

// axiosUtils.js
import axios from 'axios';

// Create a base Axios instance
const AxiosUtil = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
AxiosUtil.interceptors.request.use(
  (config) => {
    // Optionally attach token if stored in localStorage or cookies
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
AxiosUtil.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Optional: redirect to login or clear token
      console.warn('Unauthorized, logging out...');
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

// // Utility functions
// export const get = (url, config = {}) => api.get(url, config);
// export const post = (url, data, config = {}) => api.post(url, data, config);
// export const put = (url, data, config = {}) => api.put(url, data, config);
// export const del = (url, config = {}) => api.delete(url, config);

export default AxiosUtil;

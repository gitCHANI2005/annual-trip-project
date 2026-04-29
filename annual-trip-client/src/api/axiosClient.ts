import axios from 'axios';
import { getToken } from '../services/tokenService';
export const BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
    (error) => {
    if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
        console.error('No response from API:', error.request);
    } else {
        console.error('API Request Error:', error.message);
    }                                                       
    return Promise.reject(error);
    }   
);

export default api;
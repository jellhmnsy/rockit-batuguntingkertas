import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konfigurasi axios dengan baseURL
const api = axios.create({
  baseURL: 'http://54.254.164.127/api/v1',
  timeout: 5000, // Waktu maksimal request (opsional)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Middleware untuk menyertakan token
api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Fungsi untuk mengatur token autentikasi secara dinamis
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;

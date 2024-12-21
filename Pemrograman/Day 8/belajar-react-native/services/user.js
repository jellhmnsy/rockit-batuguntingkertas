import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Ambil token dari storage
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    });
    console.log(token)
    return response.data.data; // Kembalikan data pengguna
  } catch (error) {
    console.error('Fetch Profile Error:', error.response?.data || error.message);
    throw error;
  }
};

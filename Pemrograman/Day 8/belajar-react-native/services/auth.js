import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    console.log('Login Response:', response.data); // Debugging respons login
    return response.data.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (full_name, email, password, phone_number) => {
    try {
      const response = await api.post('/auth/register', {
        full_name,
        email,
        password,
        phone_number,
      });
      return response.data; // Data dari server
    } catch (error) {
      console.error('Register Error:', error.response?.data || error.message);
      throw error;
    }
  };

// export const fetchUserProfile = async () => {
//   try {
//     const response = await api.get('/profile');
//     return response.data;
//   } catch (error) {
//     console.error('Fetch Profile Error:', error.response?.data || error.message);
//     throw error;
//   }
// };

export const fetchUserProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Ambil token dari storage
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    });
    return response.data.data; // Kembalikan data pengguna
  } catch (error) {
    console.error('Fetch Profile Error:', error.response?.data || error.message);
    throw error;
  }
};

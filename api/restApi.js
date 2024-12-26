import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = AsyncStorage.getItem('accessToken')
console.log(token)
const api = axios.create({
  baseURL: 'http://13.239.139.158',
  headers: {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token
  }
});

const apii = axios.create({
  baseURL: 'http://13.239.139.158',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const login = async (username, pin) => {
  try {
    const response = await api.post('/auth/login', { 
      username: username, 
      pin: pin 
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    throw new Error(errorMessage);
  }
};


export const register = async (username, pin) => {
  try {
    const response = await api.post('/auth/register', { 
        username: username, 
        pin : pin
    });
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message);
  }
};

export const getLeaderboard = async () => {
  try {
    console.log('Fetching token from storage...');
    const token = await AsyncStorage.getItem('accessToken'); // Ambil token dari storage
    console.log('Token fetched:', token);
    if (!token) throw new Error('No token found'); // Periksa apakah token tersedia

    console.log('Fetching leaderboard data...');
    const response = await apii.get('/users/leaderboard', {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    });
    console.log('Leaderboard data fetched:', response.data);
    return response.data.data; // Mengembalikan data leaderboard dan user rank
  } catch (error) {
    console.error('Fetch Profile Error:', error.response?.data || error.message);
    if (error.response?.status === 403) {
      console.warn('Unauthorized access - Invalid Token');
    }
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    console.log('Fetching token from storage...');
    const token = await AsyncStorage.getItem('accessToken'); 
    console.log('Token fetched:', token);
    if (!token) throw new Error('No token found'); 

    console.log('Fetching user info...');
    const response = await apii.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log('User info fetched:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Fetch User Info Error:', error.response?.data || error.message);
    if (error.response?.status === 403) {
      console.warn('Unauthorized access - Invalid Token');
    }
    throw error;
  }
};


// export const getUserLeaderboard = async () => {
//   try {
//     console.log('Fetching token from storage...');
//     const token = await AsyncStorage.getItem('accessToken'); // Ambil token dari storage
//     console.log('Token fetched:', token);
//     if (!token) throw new Error('No token found'); // Periksa apakah token tersedia

//     console.log('Fetching leaderboard data...');
//     const response = await apii.get('/users/leaderboard', {
//       headers: {
//         Authorization: `Bearer ${token}`, // Tambahkan token ke header
//       },
//     });
//     console.log('Leaderboard data fetched:', response.data);
//     return response.data.data.user_rank; // Kembalikan data leaderboard
//   } catch (error) {
//     console.error('Fetch Profile Error:', error.response?.data || error.message);
//     if (error.response?.status === 403) {
//       console.warn('Unauthorized access - Invalid Token');
//     }
//     throw error;
//   }
// };


export default api;
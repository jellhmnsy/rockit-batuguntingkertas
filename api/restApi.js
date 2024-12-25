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

export const login = async (username, pin) => {
  try {
    const response = await api.post('/auth/login', { 
        username : username, 
        pin : pin });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
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

export const getGameToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    console.log("test",accessToken)
    const response = await api.post('/games',{}, { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
     });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get game token');
  }
};

export const postJoinGame = async (token) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await api.put(`/games/${token}/join`,{}, { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
     });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get game token');
  }
};


export default api;
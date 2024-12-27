import React, { createContext, useState, useContext, use, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogoutAndStopAudio } from '../screens/AudioContext'; // Sesuaikan path jika berbeda
import { login } from '../api/restApi';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId,setUserId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        checkTokenExpiration();
      }
    });
  }, [user]);

  const checkTokenExpiration = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log('Token telah kadaluarsa');
        setUser(null);
        setUserId(null);
        await AsyncStorage.removeItem('accessToken');
      } else {
        console.log(decodedToken);
        setUser(token);
        setUserId(decodedToken.id);
      }
    }
  };

  const loginAuth = async (username, pin) => {
    try {
      const response = await login(username, pin);
      const { access_token } = response;
  
      if (access_token) {
        console.log('Access Token:', access_token, 'User ID:', response.data.id);
        setUser(access_token);
        setUserId(response.data.id);
        await AsyncStorage.setItem('accessToken', access_token);
        return true;
      } else {
        throw new Error('Access token not found in response');
      }
    
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  };  
  

  const logout = async () => {
    setUser(null);
    setUserId(null);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('data');
    checkAsyncStorage(); // Panggil fungsi untuk memeriksa AsyncStorage setelah logout
    handleLogoutAndStopAudio();
    checkAsyncStorage(); // Panggil fungsi untuk memeriksa AsyncStorage setelah logout
  };

  const checkAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      console.log('Data yang tersisa di AsyncStorage setelah logout:');
      result.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, data, setUserId, userId,loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/restApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const loginAuth = async (username, pin) => {
    try {
      const response = await login(username, pin);
      const { access_token } = response;
  
      if (access_token) {
        console.log('Access Token:', access_token);
        setUser(access_token);
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
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('data');
  };
  return (
    <AuthContext.Provider value={{ user, data, loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
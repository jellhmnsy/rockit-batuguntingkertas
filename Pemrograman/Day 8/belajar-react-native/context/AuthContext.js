import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  

  const login = async (token) => {
    try{
      console.log('Token yang diterima saat login:', token); // Debugging token saat login
      setUser({ token });
      setAuthToken(token);
      await AsyncStorage.setItem('userToken', token);
      console.log('Token berhasil disimpan ke AsyncStorage.');
    } catch (error) {
      console.error('Error saat menyimpan token ke AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUser({ token });
          setAuthToken(token); // Set token ke header axios
          console.log('Token berhasil diset ke axios header.');
        } else {
          console.log('Token tidak ditemukan.');
        } 
      } catch (error) {
        console.error('Error saat membaca token dari AsyncStorage:', error);
      }
    };
    loadUser();
  }, []);

  const logout = async () => {
    setUser(null);
    setAuthToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  console.log('AuthContext value:', { user, login, logout });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

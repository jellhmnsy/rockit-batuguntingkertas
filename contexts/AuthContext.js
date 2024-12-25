import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/restApi';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginAuth =  async(username,pin) => {
    try {
        const response = await login(username, pin);
        console.log(response.data.token)
        setUser( response.data.token );
        AsyncStorage.setItem('accessToken', response.data.token);
    } catch (error) {
        console.log(error.response.data)
    }

  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('accessToken');
  };
  return (
    <AuthContext.Provider value={{ user, loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/restApi';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const loginAuth =  async(username,pin) => {
    try {
        const response = await login(username, pin);
        console.log(response.data.token)
        console.log(response.data)
        setUser( response.data.token );
        setData( response.data );
        AsyncStorage.setItem('accessToken', response.data.token);
        AsyncStorage.setItem('data', response.data);
    } catch (error) {
        console.log(error.response.data)
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
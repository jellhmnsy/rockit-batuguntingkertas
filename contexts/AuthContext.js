import React, { createContext, useState, useContext, use, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/restApi';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId,setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        setUser(token);
      }
    });
  }, [user]);


  

  const loginAuth =  async(username,pin) => {
    try {
        const response = await login(username, pin);
        console.log(response.data.token, response.data.id)
        setUser( response.data.token );
        setUserId( response.data.id );
        AsyncStorage.setItem('accessToken', response.data.token);
    } catch (error) {
        console.log(error.response.data)
    }

  };

  const logout = async () => {
    setUser(null);
    setUserId(null);
    await AsyncStorage.removeItem('accessToken');
  };
  return (
    <AuthContext.Provider value={{ user,userId, loginAuth, logout,setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
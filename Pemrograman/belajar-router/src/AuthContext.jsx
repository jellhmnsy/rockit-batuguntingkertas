import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const login = (username) => {
    if (username === 'Admin') {
      localStorage.setItem('auth', 'true');
      setIsLoggedIn(true);
      console.log('masuk login');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

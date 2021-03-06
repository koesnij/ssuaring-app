import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: _isLoggedIn, children }) => {
  // true: in / false: out / null: not checked
  const [isLoggedIn, setIsLoggedIn] = useState(_isLoggedIn);

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('jwt', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false'); // only string
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

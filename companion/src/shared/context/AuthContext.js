import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async ({ key, data }) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  user: null,
  token: null,
});

export const AuthProvider = (props) => {
  const [renderUploadProfilePic, setRenderUploadProfilePic] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const showUploadProfilePic = () => setRenderUploadProfilePic(true);

  const login = ({ user, token }) => {
    setIsloggedIn(true);
    setUser(user);
    setToken(token);
    storeData({ key: 'userData', data: { user, token } });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setIsloggedIn(false);
      setUser(null);
      setToken(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const userData = await getItem('userData');
      if (userData) login({ user: userData.user, token: userData.token });
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoggedIn: !!token,
        renderUploadProfilePic,
        showUploadProfilePic,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const BASE_URL = "https://classbookingroom-gwa2cchfcuaub5ch.southeastasia-01.azurewebsites.net";

export const axiosClientMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

axiosClientMultipart.interceptors.request.use(
  async (config) => {
    const token =  await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);
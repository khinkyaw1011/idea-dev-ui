import axios from 'axios';
import { getStoredAccessToken, setStoredAccessToken } from './authToken';
import { refreshAccessToken } from '../api/auth';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_PRODUCTION_API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
//attach token on fresh
API.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Refresh token after expire
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Token အသစ် ပြန်တောင်းခြင်း
        const {accessToken:newToken} = await refreshAccessToken();
        setStoredAccessToken(newToken);

        // Header ကို Token အသစ်ဖြင့် အစားထိုးခြင်း
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // မူလ Request ကို ပြန်လည် ပေးပို့ခြင်း
        return API(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

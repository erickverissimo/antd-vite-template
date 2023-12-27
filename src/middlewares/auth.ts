import { useCookies } from 'vue3-cookies';
import api from '../services/api';

const { cookies } = useCookies();

const isAuthenticated = async () => {
  if (!cookies.isKey('auth_token')) {
    cookies.remove('auth_token');
    return false;
  }
  const token = cookies.get('auth_token');
  if (token) {
    try {
      api.interceptors.request.use((config) => {
        config.headers = {
          Authorization: `Bearer ${token}`
        } as any;
        return config;
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

export { isAuthenticated };

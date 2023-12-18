import Axios from 'axios';
import axiosRetry from 'axios-retry';
import { useAuthStore } from '../stores';
import { BASE_API_URL } from '../config';

const options = {
  baseURL: BASE_API_URL || 'http://localhost:8000/api'
};

const api = Axios.create(options);
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isRetryableError
});

api.interceptors.request.use((config) => {
  const store = useAuthStore();
  const currentUser = store.currentUser;
  if (currentUser.token) {
    config.headers = {
      Authorization: `Bearer ${currentUser.token}`
    } as any;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const store = useAuthStore();
      store.logout();
    }
    return Promise.reject(error);
  }
);

export default api;

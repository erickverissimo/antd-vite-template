import router from '../router';
import api from './api';

const baseURL = '/auth';

export default {
  name: 'auth',

  async logout() {
    router.push('/login');
  },

  async login(loginData: { username: string; password: string }) {
    return api
      .post(`${baseURL}/login`, {
        username: loginData.username,
        password: loginData.password
      })
      .then((response) => {
        return response.data;
      });
  },
  async getMe() {
    return api.get(`${baseURL}/me`).then((response) => {
      return response.data;
    });
  }
};

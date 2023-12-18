import { useCookies } from 'vue3-cookies';
import { defineStore } from 'pinia';
import { getToastStatus, TYPES_OF_TOAST } from '@/utils/toastUtils';
import authService from '@/services/auth';

const { cookies } = useCookies();

interface LoginData {
  username: string;
  password: string;
}

interface AuthState {
  currentUser: any;
  myUser: any;
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      currentUser: {
        permissions: [],
        token: undefined
      },
      myUser: {}
    };
  },

  getters: {
    getCurrentUser: (state) => state.currentUser,
    getMyUser: (state) => state.myUser
  },

  actions: {
    async login(data: LoginData) {
      await authService
        .login(data)
        .then((response) => {
          if (response && response.token && response.user && response.user.email) {
            this.currentUser = response;
            cookies.set('auth_token', response.token, {
              maxAge: 60 * 60 * 24 * 30
            } as any);
          }
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async logout() {
      cookies.remove('auth_token');
      this.$reset;
      await authService.logout();
    },
    async getMe() {
      await authService.getMe().then((response) => {
        this.myUser = response;
      });
    }
  },

  persist: {
    paths: ['currentUser', 'myUser']
  }
});

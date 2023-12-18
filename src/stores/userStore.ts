import { defineStore } from 'pinia';
import { getToastStatus, TYPES_OF_TOAST } from '@/utils/toastUtils';
import userService from '@/services/userService';

interface UserState {
  users: any;
  selectedUser: undefined;
  userAlreadyExists: boolean;
}

export const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      users: [],
      selectedUser: undefined,
      userAlreadyExists: false
    };
  },

  getters: {
    getUsers: (state) => state.users,
    getSelectedUser: (state) => state.selectedUser,
    getUserAlreadyExists: (state) => state.userAlreadyExists
  },

  actions: {
    async getAllUsers(params: any) {
      await userService
        .getAll(params)
        .then((response) => {
          this.users = response;
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async getUserById(id: string) {
      await userService
        .getById(id)
        .then((response) => {
          this.selectedUser = response;
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async getUserByEmail(email: string) {
      await userService.getByEmail(email).then((response) => {
        this.userAlreadyExists = response;
      });
    },
    async getPaginateUsers({ page, params }: { page: number; params: any }) {
      await userService
        .paginate(page, params)
        .then((response) => {
          this.users = response;
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async createUser(data: any) {
      await userService
        .create(data)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Usuário cadastrado');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async updateUser(data: any) {
      await userService
        .update(data)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Usuário atualizado');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async updatePassword(data: any) {
      await userService
        .updatePassword(data)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Senha atualizada');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async updateUserInfos(data: any) {
      await userService
        .updateUserInfos(data)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Usuário atualizado');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async updateUserPassword(data: any) {
      await userService
        .updatePassword(data)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Senha atualizada');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async deleteUser(id: string) {
      await userService
        .delete(id)
        .then(() => {
          getToastStatus(TYPES_OF_TOAST.SUCCESS, 'Usuário deletado');
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    }
  },

  persist: {
    paths: ['users', 'selectedUser']
  }
});

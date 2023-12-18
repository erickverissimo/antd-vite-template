<template>
  <!-- <v-container fluid>
    <users-list
      v-if="users && users.result && !createUserForm"
      :users="users"
      :filter="filter"
      @callCreate="callCreate"
      @callUpdate="callUpdate"
      @callDelete="callDelete"
      @callUpdatePassword="callUpdatePassword"
      @onPageChange="onChangePage"
    />

    <create-user-form v-if="createUserForm" />

    <create-user-modal v-if="showCreateModal" @createUser="createUser" @closeModal="closeModal" />
  </v-container> -->
  <div style="padding-top: 20px">Olá</div>
</template>

<script lang="ts">
import { mapStores, mapState } from 'pinia';
import { useUserStore } from '../stores';
import { defineComponent } from 'vue';

// import UsersList from '@/components/users-components/UsersList.vue';
// import CreateUserModal from '@/components/users-components/CreateUserModal.vue';
// import CreateUserForm from '@/components/users-components/CreateUserForm.vue';

export default defineComponent({
  name: 'users',
  // components: {
  //   UsersList,
  //   CreateUserModal,
  //   CreateUserForm
  // },
  data() {
    return {
      showCreateModal: false,
      showUpdateModal: false,
      showDeleteModal: false,
      createUserForm: false,
      showUpdatePasswordModal: false,
      selectedUser: '',
      filter: {
        currentPage: 1,
        params: {
          nameLike: undefined
        }
      }
    };
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapState(useUserStore, ['users'])
  },
  methods: {
    closeModal() {
      this.showCreateModal = false;
      this.showDeleteModal = false;
      this.showUpdateModal = false;
      this.showUpdatePasswordModal = false;
      this.selectedUser = '';
    },

    onChangePage(page: number) {
      this.filter.currentPage = page;
      this.getAllUsers();
    },
    callCreate() {
      // this.showCreateModal = true;
      this.createUserForm = true;
    },
    callUpdate(id: string) {
      this.showUpdateModal = true;
      this.selectedUser = id;
    },
    callDelete(id: string) {
      this.showDeleteModal = true;
      this.selectedUser = id;
    },
    callUpdatePassword(id: string) {
      this.showUpdatePasswordModal = true;
      this.selectedUser = id;
    },
    changeUpdateState(data: any, userId: string) {
      this.showUpdateModal = false;
      this.selectedUser = '';
      if (data && userId) {
        const updateUser = {
          name: data.name,
          email: data.email,
          roles: data.roles,
          password: data.password,
          id: userId
        };
        this.updateUser(updateUser);
      }
    },
    changeDeleteState(id: string) {
      this.showDeleteModal = false;
      this.selectedUser = '';
      if (id) {
        this.deleteUser(id);
      }
    },
    async getAllUsers(filter?: any) {
      this.filter.params.nameLike = filter;
      await this.userStore.getPaginateUsers({
        page: this.filter.currentPage,
        params: this.filter.params
      });
    },
    async createUser(data: any) {
      await this.userStore.createUser(data).then(() => {
        this.getAllUsers();
      });
    },
    async updateUser(data: any) {
      await this.userStore.updateUser(data);
      this.getAllUsers();
    },
    async deleteUser(id: string) {
      await this.userStore.deleteUser(id);
      this.getAllUsers();
    }
  },
  created() {
    this.userStore.$reset();
    this.getAllUsers();
  }
});
</script>

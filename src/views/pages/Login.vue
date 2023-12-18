<template>
  <a-card class="center" title="Login">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { mapStores, mapState } from 'pinia';
import { useAuthStore } from '@/stores';

import { getInitialRoute } from '@/navItems';

export default defineComponent({
  name: 'login',
  setup() {
    interface FormState {
      username: string;
      password: string;
      remember: boolean;
    }

    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true
    });

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinishFailed
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['currentUser'])
  },
  methods: {
    async onSubmit() {
      if (!this.formState) return;

      const data = {
        username: this.formState.username,
        password: this.formState.password
      };

      await this.authStore.login(data).then(() => {
        // Mudar para quando as roles do sistema forem cadastradas
        // this.$router.push(getInitialRoute(this.currentUser.user));
        if (this.currentUser.user) {
          this.$router.push('users');
        }
      });
    },
    required(v: any) {
      return !!v || 'Field is required';
    }
  }
});
</script>
<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>

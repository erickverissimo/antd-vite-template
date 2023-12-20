<template>
  <a-card class="center" title="Login">
    <a-form
      layout="vertical"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Usuário"
        name="username"
        :rules="[{ required: true, message: 'Insira seu usuário!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Senha"
        name="password"
        :rules="[{ required: true, message: 'Por favor, coloque sua senha!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 10 }">
        <a-button type="primary" html-type="submit">Entrar</a-button>
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
    }

    const formState = reactive<FormState>({
      username: '',
      password: ''
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
        this.$router.push(getInitialRoute(this.currentUser.user));
      });
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
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  max-width: 400px;
}
</style>

<template>
  <a-layout-header class="header">
    <div class="logo">
      <img src="../../assets/logo-bionic.png" />
    </div>
    <div>
      <a-menu
        v-model:selectedKeys="currentTab"
        mode="horizontal"
        :items="items"
        style="width: 100%; border-bottom: none"
      />
    </div>
    <a-flex gap="middle" horizontal>
      <a-space :size="10">
        <a-button type="text" shape="circle"><SearchOutlined /></a-button>
        <a-button type="text" shape="circle"><QuestionCircleOutlined /></a-button>
        <a-button type="text" shape="circle"><BellOutlined /></a-button>
      </a-space>

      <a-menu mode="horizontal" title="Meu Usuário" style="border-bottom: none">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <span>{{ myUser.name }}</span>
            </span>
          </template>
          <a-menu-item key="details">
            <UserOutlined />
            <span>Detalhes</span>
          </a-menu-item>
          <a-menu-item key="logout" @click="logout">
            <LogoutOutlined />
            <span>Sair</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-flex>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapStores } from 'pinia';
import { useAuthStore } from '../../stores';

import { ref } from 'vue';
import { MenuProps } from 'ant-design-vue';

import { navbarItems } from '../../navItems/_nav';
import { useRouter } from 'vue-router';

import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'navbar',
  components: {
    UserOutlined,
    LogoutOutlined,
    BellOutlined,
    SearchOutlined,
    QuestionCircleOutlined
  },
  setup() {
    const router = useRouter();
    const items = ref<MenuProps['items']>(navbarItems);
    const currentTab = ref<string[]>([router.currentRoute.value.path]);
    return {
      currentTab,
      items,
      router
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['myUser'])
  },
  methods: {
    async logout() {
      await this.authStore.logout();
    }
  }
});
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 5px 0px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 45px;
  }
}
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #ffff;
  line-height: 50px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
</style>

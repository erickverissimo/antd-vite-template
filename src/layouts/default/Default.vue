<template>
  <a-layout style="height: 100dvh">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 45px', marginTop: '64px', background: '#FFF' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'default-layout',
  computed: {
    ...mapState(useAuthStore, ['myUser'])
  },
  methods: {
    isNotEmpty() {
      if (Object.keys(this.myUser).length) {
        return true;
      }
      return false;
    }
  }
});
</script>

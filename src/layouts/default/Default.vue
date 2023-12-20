<template>
  <a-layout v-if="myUser !== undefined && isNotEmpty()" style="height: 100dvh">
    <Navbar />
    <a-layout-content :style="{ padding: '30px 50px', marginTop: '50px', background: '#FFF' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores';

import Navbar from '../../components/layout/Navbar.vue';

export default defineComponent({
  name: 'default-layout',
  components: {
    Navbar
  },
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

<template>
  <div class="center">
    <a-row justify="center">
      <a-col style="text-align: center">
        <h1>Oops! Error 404</h1>
        <p style="padding-bottom: 30px">
          Desculpe o transtorno, mas a página que você procura não pode ser encontrada.
        </p>
        <a-button @click="backPage()">
          <template #icon>
            <ArrowLeftOutlined />
          </template>
          <span>Voltar</span>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
export default {
  name: 'Page404',
  components: {
    ArrowLeftOutlined
  },
  methods: {
    backPage() {
      this.$router.go(-1);
    }
  }
};
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

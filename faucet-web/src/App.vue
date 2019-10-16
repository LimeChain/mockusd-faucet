<template>
    <Faucet></Faucet>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Faucet from './components/Faucet.vue'

  export default Vue.extend({
    name: 'app',
    components: {
      Faucet
    }
  });
</script>

<style lang="less">
  #app {
    margin-top: 60px;
  }
</style>

<template>
  <div id="app">
    <div class="container">
      <div class="col-md-5">
      <form>
        <div class="form-group">
          <label for="exampleInput">Tokens receiver address</label>
          <input v-model="sendToAddress" type="text" class="form-control" id="exampleInput" placeholder="enter beneficiary address">
          <small class="form-text text-muted">You will get a million bucks.</small>
        </div>
        <button type="button" @click="sendTokens" class="btn btn-primary">Get these bankrolls</button>
      </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ethers } from 'ethers';
  import faucetAbi from './assets/contract-interfaces/UsdTokenFaucet.json'


  export default Vue.extend({

    name: 'app',
    components: {
    },
    data() {
      return {
        provider: {},
        faucetContract: {},
        sendToAddress: ""
      }
    },
    async created() {
      let ethereum = window.ethereum;
      await ethereum.on('accountsChanged', this.setProvider());
      await ethereum.enable();
      this.provider = new ethers.providers.Web3Provider(ethereum);
      this.faucetContract = new ethers.Contract(process.env.VUE_APP_FAUCET_ADDRESS, faucetAbi, this.provider.getSigner())
    },
    methods: {
      sendTokens: async function() {
        // console.log(this.sendToAddress);
        await this.faucetContract.sendTokens(this.sendToAddress);
      },
      setProvider() {
        let ethereum = window.ethereum;
        this.provider = new ethers.providers.Web3Provider(ethereum);
      }
    }
  });
</script>

<style lang="less">
  #app {
    margin-top: 60px;
  }
</style>

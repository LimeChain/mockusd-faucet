<template>
    <div id="app">
        <div class="container">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                        <label for="exampleInput">MockUSD Token Faucet</label>
                        <input v-model="sendToAddress" type="text" class="form-control" id="exampleInput" placeholder="enter beneficiary address...">
                        <small class="form-text text-muted">You will get a million bucks.</small>
                    </div>
                    <button type="button" @click="sendTokens" class="btn btn-primary">Get these bankrolls</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

	import Vue from 'vue';
	import { ethers } from 'ethers';
	import faucetAbi from './../assets/contract-interfaces/UsdTokenFaucet.json';

	export default Vue.extend({
		name: "Faucet",
		data() {
			return {
				provider: {}, //(null as unknown) as ethers.providers.Web3Provider,
				faucetContract: {}, // (null as unknown) as ethers.Contract,
				sendToAddress: ''
			};
		},
		async created() {
			if (window.ethereum) {
				const ethereum = window.ethereum;
				try {
					// Request account access
					await ethereum.enable();
				} catch (error) {
					// User denied account access...
					console.error("User denied account access")
				}
			}

			this.provider = new ethers.providers.Web3Provider(ethereum);

			this.faucetContract = new ethers.Contract(process.env.VUE_APP_FAUCET_GOERLI_ADDRESS, faucetAbi, this.provider.getSigner());
		},
		methods: {
			async sendTokens() {
				await this.faucetContract.sendTokens(this.sendToAddress);
			}
		},
	});
</script>

<style scoped>

</style>

const etherlime = require('etherlime-lib');
const UsdTokenFaucet = require('../build/UsdTokenFaucet.json');
const USDToken = require('../build/UsdToken.json');
const ethers = require('ethers');


const deploy = async (network, secret) => {

	const infuraApiKey = "e7a6b9997e804bc6a91b8c8d6f1fd7d1";
	const sendAmount = "1000000000000000000000000";
	const fausetPremintAmount = ethers.constants.MaxUint256;


	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, infuraApiKey);
	deployer.defaultOverrides = { gasLimit: 4700000, gasPrice: 2000000000 };

	const USDTokenContract = await deployer.deploy(USDToken);
	const USDFaucetContract = await deployer.deploy(UsdTokenFaucet, {}, USDTokenContract.contractAddress, sendAmount);

	await USDTokenContract.mint(USDFaucetContract.contractAddress, fausetPremintAmount);

};

module.exports = {
	deploy
};


// etherlime deploy --network rinkeby --secret 0x2956B7AFA2B93C048F2281BE59A5D0ECAF247C5F82430A2209143C1E973C5B82

// Ropsten: {
//    UsdTokenFaucet: 0x38057816E3931C10a690EE8A849F1848EdAd4343
//    UsdToken: 0xaE76B08Cb468633b3f389bCA6630B5b140cd787E
//    MogulToken: 0x0a322441fBeD01e4BA1C2AD9db80E2F1cFD95ffd
//    MogulOrganisation: 0x7faCEcB5BDC2f68B0D7aCb8FE419b9bBbC1aDfF3
// }

// Goerli: {
//    UsdTokenFaucet: 0xb77613E1fe043BbFc655580D754b4d24562fe4a3
//    UsdToken: 0xdE640dd1BA6FD11591736b595BC644c8EaD5C6B2
//    MogulToken: 0x73A26cA4bAa32edCccF81bE939328b2c945C3fb7
//    MogulOrganisation: 0x4bC7Ac0bE3D54e921F787f9AF2838D50c646A769
// }

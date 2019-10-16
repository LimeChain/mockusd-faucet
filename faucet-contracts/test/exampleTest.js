const etherlime = require('etherlime-lib');
const UsdTokenFaucet = require('../build/UsdTokenFaucet.json');
const UsdToken = require('../build/UsdToken.json');


describe('Faucet', () => {
    let owner = accounts[0];
    let deployer;
    let usdToken;
    let usdTokenFaucet;

    before(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer(owner.secretKey);
        usdToken = await deployer.deploy(UsdToken);
        usdTokenFaucet = await deployer.deploy(UsdTokenFaucet, {}, );
    });

    it('should have valid deployer private key', async () => {
        assert.strictEqual(deployer.signer.privateKey, aliceAccount.secretKey);
    });



});

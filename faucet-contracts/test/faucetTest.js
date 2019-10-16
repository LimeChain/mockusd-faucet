const etherlime = require('etherlime-lib');
const UsdToken = require('../build/UsdToken.json');
const UsdTokenFaucet = require('../build/UsdTokenFaucet.json');


describe('Faucet', () => {
    let george = accounts[1];
    let deployer;
    let usdToken;
    let usdTokenFaucet;

    const tokensToSend = ethers.utils.bigNumberify("1000000000000000000000000");

    before(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer();
    });

    it('should Deploy mockUsd token', async () => {
        usdToken = await deployer.deploy(UsdToken);
        assert.isAddress(usdToken.contractAddress);
    });

    it('should Deploy mockUsd faucet', async () => {
        usdTokenFaucet = await deployer.deploy(UsdTokenFaucet, {}, usdToken.contractAddress, tokensToSend);
        assert.isAddress(usdTokenFaucet.contractAddress);
    });

    it('should load the Faucet', async () => {
        const uintMaxNum = ethers.constants.MaxUint256;
        await usdToken.mint(usdTokenFaucet.contractAddress, uintMaxNum);
        const faucetBalance = await usdToken.balanceOf(usdTokenFaucet.contractAddress);

	    assert(faucetBalance.eq(uintMaxNum));
    });

    it('should send MockUsd Tokens to George', async () => {
        let balanceBefore = await usdToken.balanceOf(george.signer.address);
        let txGas = await usdTokenFaucet.sendTokens(george.signer.address, {
	        gasLimit: 100000
        });
        let balanceAfter = await usdToken.balanceOf(george.signer.address);
        assert(balanceAfter.eq(balanceBefore.add(tokensToSend)))
    });

    it('should change tokensToSend from owner', async () => {
        const newSendAmount = "9999999999999999999";
        await usdTokenFaucet.setSendAmount(newSendAmount);

        let newAmount = await usdTokenFaucet.sendAmount();
        assert(newAmount.eq(newSendAmount))
    });

    it('should revert if changing tokensToSend not from owner', async () => {
        const newSendAmount = "9999999999999999999";
        await assert.revert(usdTokenFaucet.from(george).setSendAmount(newSendAmount));
    });
});

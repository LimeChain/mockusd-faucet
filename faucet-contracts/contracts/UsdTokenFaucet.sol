pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract UsdTokenFaucet is Ownable {
    
    uint256 public sendAmount = 0;
    IERC20 public tokenContract;
    
    constructor(address _tokenContract, uint256 _sendAmount) public {
        tokenContract = IERC20(_tokenContract);
        sendAmount = _sendAmount;
    }
    
    function sendTokens(address _to) public {
        tokenContract.transfer(_to, sendAmount);
    }
    
    function setSendAmount(uint256 _newAmount) public onlyOwner {
        sendAmount = _newAmount;
    }

}

pragma solidity ^0.5.3;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

// POC purposes
contract UsdToken is ERC20Detailed, ERC20Mintable, ERC20Burnable  {

    constructor() ERC20Detailed (
        "USD Token",
        "USDT",
        18
    ) public { }
}

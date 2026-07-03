// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITexToken {
    function mint(
        address to,
        uint256 amount
    ) external;
}

contract TexClaim is Ownable {
    IERC20 public immutable usdc;

    ITexToken public immutable tex;

    uint256 public constant MIN_USDC = 50 * 1e6;

    uint256 public constant CLAIM_AMOUNT =
        100 * 1e18;

    mapping(address => bool)
        public claimed;

    event Claimed(
        address indexed user,
        uint256 amount
    );

    constructor(
        address usdcAddress,
        address texAddress,
        address owner
    ) Ownable(owner) {
        usdc = IERC20(usdcAddress);

        tex = ITexToken(texAddress);
    }

    function claim() external {
        require(
            !claimed[msg.sender],
            "Already claimed"
        );

        require(
            usdc.balanceOf(msg.sender) >=
                MIN_USDC,
            "Need at least 50 USDC"
        );

        claimed[msg.sender] = true;

        tex.mint(
            msg.sender,
            CLAIM_AMOUNT
        );

        emit Claimed(
            msg.sender,
            CLAIM_AMOUNT
        );
    }

    function canClaim(
        address user
    )
        external
        view
        returns (bool)
    {
        return
            !claimed[user] &&
            usdc.balanceOf(user) >=
            MIN_USDC;
    }
}
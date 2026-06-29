// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArcRouter is Ownable {
    IERC20 public immutable eurc;

    event SwapExecuted(
        address indexed user,
        uint256 amountIn,
        uint256 amountOut,
        uint256 timestamp
    );

    constructor(address _eurc)
        Ownable(msg.sender)
    {
        eurc = IERC20(_eurc);
    }

    function swap(
        uint256 amount
    ) external {
        require(
            amount > 0,
            "Invalid amount"
        );

        bool success =
            eurc.transferFrom(
                msg.sender,
                address(this),
                amount
            );

        require(
            success,
            "Transfer failed"
        );

        emit SwapExecuted(
            msg.sender,
            amount,
            amount,
            block.timestamp
        );
    }

    function withdrawEURC(
        uint256 amount
    ) external onlyOwner {
        eurc.transfer(
            owner(),
            amount
        );
    }

    function eurcBalance()
        external
        view
        returns (uint256)
    {
        return eurc.balanceOf(
            address(this)
        );
    }
}
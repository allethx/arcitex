// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ArcitexEarlyAccessNFT is
    ERC721,
    ERC721Burnable,
    Ownable,
    ReentrancyGuard
{
    // ============================================================
    // Constants
    // ============================================================

    uint256 public constant PRICE = 55e6;

    uint256 public constant MAX_SUPPLY = 500;

    // ============================================================
    // Immutable
    // ============================================================

    IERC20 public immutable usdc;

    // ============================================================
    // Storage
    // ============================================================

    uint256 public totalMinted;

    bool public mintEnabled = true;

    string private baseTokenURI;

    mapping(address => bool) public hasMinted;

    // ============================================================
    // Events
    // ============================================================

    event Minted(
        address indexed user,
        uint256 indexed tokenId
    );

    event MintStatusChanged(
        bool enabled
    );

    event BaseURIUpdated(
        string uri
    );

    event Withdrawn(
        address indexed owner,
        uint256 amount
    );

    // ============================================================
    // Constructor
    // ============================================================

    constructor(
        address usdcAddress,
        string memory baseURI
    )
        ERC721(
            "Arcitex Early Access Membership",
            "AEA"
        )
        Ownable(msg.sender)
    {
        require(
            usdcAddress != address(0),
            "Invalid USDC"
        );

        usdc = IERC20(usdcAddress);

        baseTokenURI = baseURI;
    }

    // ============================================================
    // Mint
    // ============================================================

    function mint()
        external
        nonReentrant
    {
        require(
            mintEnabled,
            "Mint disabled"
        );

        require(
            !hasMinted[msg.sender],
            "Already minted"
        );

        require(
            totalMinted < MAX_SUPPLY,
            "Sold out"
        );

        bool success = usdc.transferFrom(
            msg.sender,
            address(this),
            PRICE
        );

        require(
            success,
            "Payment failed"
        );

        totalMinted++;

        uint256 tokenId =
            totalMinted;

        hasMinted[msg.sender] = true;

        _safeMint(
            msg.sender,
            tokenId
        );

        emit Minted(
            msg.sender,
            tokenId
        );
    }

    // ============================================================
    // Admin
    // ============================================================

    function setMintEnabled(
        bool enabled
    )
        external
        onlyOwner
    {
        mintEnabled = enabled;

        emit MintStatusChanged(
            enabled
        );
    }

    function setBaseURI(
        string calldata uri
    )
        external
        onlyOwner
    {
        baseTokenURI = uri;

        emit BaseURIUpdated(
            uri
        );
    }

    function withdraw()
        external
        onlyOwner
        nonReentrant
    {
        uint256 balance =
            usdc.balanceOf(
                address(this)
            );

        require(
            balance > 0,
            "No funds"
        );

        bool success =
            usdc.transfer(
                owner(),
                balance
            );

        require(
            success,
            "Withdraw failed"
        );

        emit Withdrawn(
            owner(),
            balance
        );
    }

    // ============================================================
    // Views
    // ============================================================

    function remainingSupply()
        external
        view
        returns (uint256)
    {
        return
            MAX_SUPPLY -
            totalMinted;
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override
        returns (string memory)
    {
        require(
            ownerOf(tokenId) != address(0),
            "NFT not found"
        );

        return string.concat(
            baseTokenURI,
            "metadata.json"
        );
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title IOUToken
 * @dev ERC-721 NFT representing a work promise (IOU)
 */
contract IOUToken is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    struct IOU {
        uint256 id;
        address creator;           // Who owes the work
        address holder;            // Who currently holds the IOU
        string workDescription;
        uint256 skillPoints;       // Value in skill points
        uint256 deadline;          // Unix timestamp
        uint256 collateral;        // Amount staked
        bool redeemed;             // Has holder requested work?
        bool completed;            // Has work been delivered?
        uint256 createdAt;
    }

    mapping(uint256 => IOU) public ious;
    address public timeBankContract;

    event IOUCreated(
        uint256 indexed tokenId,
        address indexed creator,
        string workDescription,
        uint256 skillPoints,
        uint256 deadline
    );

    event IOURedeemed(uint256 indexed tokenId, address indexed redeemer);
    event IOUCompleted(uint256 indexed tokenId);

    modifier onlyTimeBank() {
        require(msg.sender == timeBankContract, "Only TimeBank contract");
        _;
    }

    constructor() ERC721("TimeBank IOU", "IOU") Ownable(msg.sender) {}

    function setTimeBankContract(address _timeBankContract) external onlyOwner {
        timeBankContract = _timeBankContract;
    }

    function getTotalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function mintIOU(
        address creator,
        string memory workDescription,
        uint256 skillPoints,
        uint256 deadline,
        uint256 collateral
    ) external onlyTimeBank returns (uint256) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _safeMint(creator, newTokenId);

        ious[newTokenId] = IOU({
            id: newTokenId,
            creator: creator,
            holder: creator,
            workDescription: workDescription,
            skillPoints: skillPoints,
            deadline: deadline,
            collateral: collateral,
            redeemed: false,
            completed: false,
            createdAt: block.timestamp
        });

        emit IOUCreated(newTokenId, creator, workDescription, skillPoints, deadline);
        return newTokenId;
    }

    function transferIOU(uint256 tokenId, address to) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(!ious[tokenId].redeemed, "IOU already redeemed");
        require(!ious[tokenId].completed, "IOU already completed");

        _transfer(msg.sender, to, tokenId);
        ious[tokenId].holder = to;
    }

    function markRedeemed(uint256 tokenId) external onlyTimeBank {
        ious[tokenId].redeemed = true;
        emit IOURedeemed(tokenId, ious[tokenId].holder);
    }

    function markCompleted(uint256 tokenId) external onlyTimeBank {
        ious[tokenId].completed = true;
        emit IOUCompleted(tokenId);
    }

    function getIOU(uint256 tokenId) external view returns (IOU memory) {
        return ious[tokenId];
    }

    function getIOUsByCreator(address creator) external view returns (uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter;
        uint256 count = 0;

        // Count IOUs created by this address
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (ious[i].creator == creator) {
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalSupply; i++) {
            if (ious[i].creator == creator) {
                result[index] = i;
                index++;
            }
        }

        return result;
    }

    function getIOUsByHolder(address holder) external view returns (uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter;
        uint256 count = 0;

        for (uint256 i = 1; i <= totalSupply; i++) {
            if (ownerOf(i) == holder) {
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalSupply; i++) {
            if (ownerOf(i) == holder) {
                result[index] = i;
                index++;
            }
        }

        return result;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

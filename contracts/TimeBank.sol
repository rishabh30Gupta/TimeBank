// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IOUToken.sol";
import "./Reputation.sol";
import "./SkillRegistry.sol";

/**
 * @title TimeBank
 * @dev Main contract for creating, trading, and redeeming work IOUs
 */
contract TimeBank {
    IOUToken public iouToken;
    Reputation public reputation;
    SkillRegistry public skillRegistry;

    uint256 public constant COLLATERAL_PER_HOUR = 10 ether; // 10 tokens per hour (in wei)

    struct RedemptionRequest {
        uint256 tokenId;
        address requester;
        uint256 requestedAt;
        bool creatorConfirmed;
        bool holderConfirmed;
    }

    mapping(uint256 => RedemptionRequest) public redemptions;

    event IOUCreatedEvent(uint256 indexed tokenId, address indexed creator, uint256 skillPoints);
    event IOURedeemedEvent(uint256 indexed tokenId, address indexed redeemer);
    event WorkCompletedEvent(uint256 indexed tokenId, address indexed creator, address indexed holder);
    event DefaultReportedEvent(uint256 indexed tokenId, address indexed creator);

    constructor(
        address _iouToken,
        address _reputation,
        address _skillRegistry
    ) {
        iouToken = IOUToken(_iouToken);
        reputation = Reputation(_reputation);
        skillRegistry = SkillRegistry(_skillRegistry);
    }

    /**
     * @dev Create a new IOU (work promise)
     */
    function createIOU(
        string memory workDescription,
        uint256 numHours,
        SkillRegistry.SkillCategory skillCategory,
        uint256 deadlineDays
    ) external payable returns (uint256) {
        require(numHours > 0, "Hours must be greater than 0");
        require(deadlineDays > 0 && deadlineDays <= 365, "Invalid deadline");

        uint256 requiredCollateral = numHours * COLLATERAL_PER_HOUR;
        require(msg.value >= requiredCollateral, "Insufficient collateral");

        // Get reputation multiplier
        uint256 repMultiplier = reputation.getReputationMultiplier(msg.sender);

        // Calculate skill points
        uint256 skillPoints = skillRegistry.calculateSkillPoints(
            skillCategory,
            numHours,
            repMultiplier
        );

        // Calculate deadline
        uint256 deadline = block.timestamp + (deadlineDays * 1 days);

        // Mint IOU NFT
        uint256 tokenId = iouToken.mintIOU(
            msg.sender,
            workDescription,
            skillPoints,
            deadline,
            requiredCollateral
        );

        emit IOUCreatedEvent(tokenId, msg.sender, skillPoints);
        return tokenId;
    }

    /**
     * @dev Redeem an IOU (request work from creator)
     */
    function redeemIOU(uint256 tokenId) external {
        require(iouToken.ownerOf(tokenId) == msg.sender, "Not the IOU holder");
        
        IOUToken.IOU memory iou = iouToken.getIOU(tokenId);
        require(!iou.redeemed, "Already redeemed");
        require(!iou.completed, "Already completed");
        require(block.timestamp <= iou.deadline, "IOU expired");

        iouToken.markRedeemed(tokenId);

        redemptions[tokenId] = RedemptionRequest({
            tokenId: tokenId,
            requester: msg.sender,
            requestedAt: block.timestamp,
            creatorConfirmed: false,
            holderConfirmed: false
        });

        emit IOURedeemedEvent(tokenId, msg.sender);
    }

    /**
     * @dev Confirm work completion (both parties must confirm)
     */
    function confirmCompletion(uint256 tokenId, bool isCreator) external {
        IOUToken.IOU memory iou = iouToken.getIOU(tokenId);
        require(iou.redeemed, "IOU not redeemed yet");
        require(!iou.completed, "Already completed");

        RedemptionRequest storage redemption = redemptions[tokenId];

        if (isCreator) {
            require(msg.sender == iou.creator, "Not the creator");
            redemption.creatorConfirmed = true;
        } else {
            require(msg.sender == iou.holder, "Not the holder");
            redemption.holderConfirmed = true;
        }

        // If both confirmed, complete the IOU
        if (redemption.creatorConfirmed && redemption.holderConfirmed) {
            _completeIOU(tokenId);
        }
    }

    /**
     * @dev Internal function to complete IOU
     */
    function _completeIOU(uint256 tokenId) private {
        IOUToken.IOU memory iou = iouToken.getIOU(tokenId);

        // Mark as completed
        iouToken.markCompleted(tokenId);

        // Return collateral to creator
        payable(iou.creator).transfer(iou.collateral);

        // Update reputation (positive)
        reputation.updateReputation(iou.creator, true, iou.skillPoints);

        emit WorkCompletedEvent(tokenId, iou.creator, iou.holder);
    }

    /**
     * @dev Report default if deadline passed without completion
     */
    function reportDefault(uint256 tokenId) external {
        IOUToken.IOU memory iou = iouToken.getIOU(tokenId);
        
        require(iou.redeemed, "IOU not redeemed");
        require(!iou.completed, "Already completed");
        require(block.timestamp > iou.deadline, "Deadline not passed");
        require(msg.sender == iou.holder, "Only holder can report");

        // Transfer collateral to holder as compensation
        payable(iou.holder).transfer(iou.collateral);

        // Update reputation (negative)
        reputation.updateReputation(iou.creator, false, iou.skillPoints);

        emit DefaultReportedEvent(tokenId, iou.creator);
    }

    /**
     * @dev Get marketplace IOUs (not redeemed, not expired)
     */
    function getMarketplaceIOUs() external view returns (uint256[] memory) {
        uint256 totalSupply = iouToken.getTotalSupply();
        uint256 count = 0;

        // Count available IOUs
        for (uint256 i = 1; i <= totalSupply; i++) {
            IOUToken.IOU memory iou = iouToken.getIOU(i);
            if (!iou.redeemed && !iou.completed && block.timestamp <= iou.deadline) {
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalSupply; i++) {
            IOUToken.IOU memory iou = iouToken.getIOU(i);
            if (!iou.redeemed && !iou.completed && block.timestamp <= iou.deadline) {
                result[index] = i;
                index++;
            }
        }

        return result;
    }

    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IOUToken.sol";
import "./Reputation.sol";
import "./SkillRegistry.sol";

/**
 * @title TimeBankV2
 * @dev Two-sided collateral system with dispute resolution
 */
contract TimeBankV2 {
    IOUToken public iouToken;
    Reputation public reputation;
    SkillRegistry public skillRegistry;
    
    address public admin;
    uint256 public constant COLLATERAL_PER_HOUR = 0.1 ether; // Reduced for demo
    uint256 public constant REPUTATION_REWARD = 20;
    uint256 public constant REPUTATION_PENALTY = 20;

    struct IOUDetails {
        uint256 tokenId;
        address creator;
        address holder;
        uint256 creatorCollateral;
        uint256 holderCollateral;
        bool creatorConfirmed;
        bool holderConfirmed;
        bool disputed;
        address disputeInitiator;
        bool resolved;
        uint256 createdAt;
    }

    mapping(uint256 => IOUDetails) public iouDetails;
    
    event IOUCreated(uint256 indexed tokenId, address indexed creator, uint256 collateral);
    event IOUAccepted(uint256 indexed tokenId, address indexed holder, uint256 collateral);
    event BothConfirmed(uint256 indexed tokenId, address creator, address holder);
    event DisputeFiled(uint256 indexed tokenId, address indexed initiator);
    event DisputeResolved(uint256 indexed tokenId, address winner, address loser);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(
        address _iouToken,
        address _reputation,
        address _skillRegistry
    ) {
        iouToken = IOUToken(_iouToken);
        reputation = Reputation(_reputation);
        skillRegistry = SkillRegistry(_skillRegistry);
        admin = msg.sender;
    }

    /**
     * @dev Create IOU with collateral
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

        // Store IOU details
        iouDetails[tokenId] = IOUDetails({
            tokenId: tokenId,
            creator: msg.sender,
            holder: address(0),
            creatorCollateral: msg.value,
            holderCollateral: 0,
            creatorConfirmed: false,
            holderConfirmed: false,
            disputed: false,
            disputeInitiator: address(0),
            resolved: false,
            createdAt: block.timestamp
        });

        emit IOUCreated(tokenId, msg.sender, msg.value);
        return tokenId;
    }

    /**
     * @dev Accept IOU and stake collateral
     */
    function acceptIOU(uint256 tokenId) external payable {
        IOUDetails storage details = iouDetails[tokenId];
        require(details.creator != address(0), "IOU doesn't exist");
        require(details.holder == address(0), "Already accepted");
        require(msg.value >= details.creatorCollateral, "Must match creator's collateral");

        details.holder = msg.sender;
        details.holderCollateral = msg.value;

        // Transfer IOU NFT to holder
        iouToken.transferIOU(tokenId, msg.sender);

        emit IOUAccepted(tokenId, msg.sender, msg.value);
    }

    /**
     * @dev Confirm work completion
     */
    function confirmCompletion(uint256 tokenId, bool isCreator) external {
        IOUDetails storage details = iouDetails[tokenId];
        require(!details.resolved, "Already resolved");
        require(!details.disputed, "Under dispute");

        if (isCreator) {
            require(msg.sender == details.creator, "Not the creator");
            details.creatorConfirmed = true;
        } else {
            require(msg.sender == details.holder, "Not the holder");
            details.holderConfirmed = true;
        }

        // If both confirmed, complete the IOU
        if (details.creatorConfirmed && details.holderConfirmed) {
            _completeIOU(tokenId);
        }
    }

    /**
     * @dev File a dispute
     */
    function fileDispute(uint256 tokenId) external {
        IOUDetails storage details = iouDetails[tokenId];
        require(!details.resolved, "Already resolved");
        require(!details.disputed, "Already disputed");
        require(
            msg.sender == details.creator || msg.sender == details.holder,
            "Not involved in this IOU"
        );

        details.disputed = true;
        details.disputeInitiator = msg.sender;

        emit DisputeFiled(tokenId, msg.sender);
    }

    /**
     * @dev Admin resolves dispute
     */
    function resolveDispute(uint256 tokenId, bool initiatorIsRight) external onlyAdmin {
        IOUDetails storage details = iouDetails[tokenId];
        require(details.disputed, "No dispute");
        require(!details.resolved, "Already resolved");

        address winner;
        address loser;

        if (initiatorIsRight) {
            // Initiator was right, other party is guilty
            winner = details.disputeInitiator;
            loser = (details.disputeInitiator == details.creator) 
                ? details.holder 
                : details.creator;
            
            // Winner gets both collaterals
            payable(winner).transfer(details.creatorCollateral + details.holderCollateral);
            
            // Update reputation
            reputation.updateReputation(winner, true, REPUTATION_REWARD);
            reputation.updateReputation(loser, false, REPUTATION_PENALTY);
        } else {
            // False claim - initiator loses reputation
            winner = (details.disputeInitiator == details.creator) 
                ? details.holder 
                : details.creator;
            loser = details.disputeInitiator;
            
            // Return collaterals
            payable(details.creator).transfer(details.creatorCollateral);
            payable(details.holder).transfer(details.holderCollateral);
            
            // Penalize false claimer
            reputation.updateReputation(loser, false, REPUTATION_PENALTY);
            reputation.updateReputation(winner, true, REPUTATION_REWARD);
        }

        details.resolved = true;
        iouToken.markCompleted(tokenId);

        emit DisputeResolved(tokenId, winner, loser);
    }

    /**
     * @dev Internal function to complete IOU
     */
    function _completeIOU(uint256 tokenId) private {
        IOUDetails storage details = iouDetails[tokenId];

        // Return both collaterals
        payable(details.creator).transfer(details.creatorCollateral);
        payable(details.holder).transfer(details.holderCollateral);

        // Update reputation for both
        reputation.updateReputation(details.creator, true, REPUTATION_REWARD);
        reputation.updateReputation(details.holder, true, REPUTATION_REWARD);

        details.resolved = true;
        iouToken.markCompleted(tokenId);

        emit BothConfirmed(tokenId, details.creator, details.holder);
    }

    /**
     * @dev Get IOU details
     */
    function getIOUDetails(uint256 tokenId) external view returns (IOUDetails memory) {
        return iouDetails[tokenId];
    }

    /**
     * @dev Change admin
     */
    function changeAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    receive() external payable {}
}

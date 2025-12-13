// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Reputation
 * @dev Manages user reputation scores and tiers
 */
contract Reputation {
    struct UserReputation {
        uint256 score;
        uint256 completedIOUs;
        uint256 defaultedIOUs;
        uint256 totalSkillPointsDelivered;
    }

    mapping(address => UserReputation) public reputations;
    address public timeBankContract;

    event ReputationUpdated(address indexed user, uint256 newScore, bool completed);
    event TierChanged(address indexed user, string newTier);

    modifier onlyTimeBank() {
        require(msg.sender == timeBankContract, "Only TimeBank contract");
        _;
    }

    function setTimeBankContract(address _timeBankContract) external {
        require(timeBankContract == address(0), "Already set");
        timeBankContract = _timeBankContract;
    }

    function updateReputation(
        address user,
        bool completed,
        uint256 skillPoints
    ) external onlyTimeBank {
        UserReputation storage rep = reputations[user];

        if (completed) {
            rep.score += 10;
            rep.completedIOUs++;
            rep.totalSkillPointsDelivered += skillPoints;
        } else {
            // Penalty for defaulting
            if (rep.score >= 100) {
                rep.score -= 100;
            } else {
                rep.score = 0;
            }
            rep.defaultedIOUs++;
        }

        emit ReputationUpdated(user, rep.score, completed);
        
        // Check for tier change
        string memory newTier = getReputationTier(user);
        emit TierChanged(user, newTier);
    }

    function getReputationScore(address user) external view returns (uint256) {
        return reputations[user].score;
    }

    function getReputationTier(address user) public view returns (string memory) {
        uint256 score = reputations[user].score;
        
        if (score >= 500) return "Gold";
        if (score >= 200) return "Silver";
        return "Bronze";
    }

    function getReputationMultiplier(address user) external view returns (uint256) {
        uint256 score = reputations[user].score;
        
        if (score >= 500) return 150; // 1.5x (Gold)
        if (score >= 200) return 120; // 1.2x (Silver)
        return 100; // 1.0x (Bronze)
    }

    function getUserStats(address user) external view returns (
        uint256 score,
        uint256 completed,
        uint256 defaulted,
        uint256 totalPoints,
        string memory tier
    ) {
        UserReputation memory rep = reputations[user];
        return (
            rep.score,
            rep.completedIOUs,
            rep.defaultedIOUs,
            rep.totalSkillPointsDelivered,
            getReputationTier(user)
        );
    }

    function getCompletionRate(address user) external view returns (uint256) {
        UserReputation memory rep = reputations[user];
        uint256 total = rep.completedIOUs + rep.defaultedIOUs;
        
        if (total == 0) return 100; // New users start at 100%
        
        return (rep.completedIOUs * 100) / total;
    }
}

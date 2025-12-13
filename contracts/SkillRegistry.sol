// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SkillRegistry
 * @dev Manages skill categories and calculates skill points
 */
contract SkillRegistry {
    enum SkillCategory {
        BASIC,      // 10 pts/hr - moving, cleaning, errands
        SKILLED,    // 20 pts/hr - design, writing, photography
        TECHNICAL,  // 30 pts/hr - coding, tutoring, accounting
        EXPERT      // 50 pts/hr - legal, medical, consulting
    }

    mapping(SkillCategory => uint256) public pointsPerHour;
    mapping(address => mapping(SkillCategory => uint256)) public userSkillMultiplier;

    event SkillPointsUpdated(SkillCategory category, uint256 points);

    constructor() {
        pointsPerHour[SkillCategory.BASIC] = 10;
        pointsPerHour[SkillCategory.SKILLED] = 20;
        pointsPerHour[SkillCategory.TECHNICAL] = 30;
        pointsPerHour[SkillCategory.EXPERT] = 50;
    }

    function calculateSkillPoints(
        SkillCategory category,
        uint256 numHours,
        uint256 reputationMultiplier
    ) public view returns (uint256) {
        uint256 basePoints = pointsPerHour[category] * numHours;
        return (basePoints * reputationMultiplier) / 100; // multiplier is in basis points (100 = 1x)
    }

    function getPointsPerHour(SkillCategory category) external view returns (uint256) {
        return pointsPerHour[category];
    }
}

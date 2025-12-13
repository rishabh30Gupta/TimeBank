// TimeBank Contract ABI - Essential functions only
export const TIMEBANK_ABI = [
  "function createIOU(string memory workDescription, uint256 numHours, uint8 skillCategory, uint256 deadlineDays) external payable returns (uint256)",
  "function redeemIOU(uint256 tokenId) external",
  "function confirmCompletion(uint256 tokenId, bool isCreator) external",
  "function reportDefault(uint256 tokenId) external",
  "function getMarketplaceIOUs() external view returns (uint256[] memory)",
  "function getContractBalance() external view returns (uint256)",
  "event IOUCreatedEvent(uint256 indexed tokenId, address indexed creator, uint256 skillPoints)",
  "event IOURedeemedEvent(uint256 indexed tokenId, address indexed redeemer)",
  "event WorkCompletedEvent(uint256 indexed tokenId, address indexed creator, address indexed holder)"
];

// IOUToken Contract ABI
export const IOU_TOKEN_ABI = [
  "function getIOU(uint256 tokenId) external view returns (tuple(uint256 id, address creator, address holder, string workDescription, uint256 skillPoints, uint256 deadline, uint256 collateral, bool redeemed, bool completed, uint256 createdAt))",
  "function getIOUsByCreator(address creator) external view returns (uint256[] memory)",
  "function getIOUsByHolder(address holder) external view returns (uint256[] memory)",
  "function transferIOU(uint256 tokenId, address to) external",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function getTotalSupply() external view returns (uint256)"
];

// Reputation Contract ABI
export const REPUTATION_ABI = [
  "function getReputationScore(address user) external view returns (uint256)",
  "function getReputationTier(address user) external view returns (string memory)",
  "function getUserStats(address user) external view returns (uint256 score, uint256 completed, uint256 defaulted, uint256 totalPoints, string memory tier)",
  "function getCompletionRate(address user) external view returns (uint256)"
];

// SkillRegistry Contract ABI
export const SKILL_REGISTRY_ABI = [
  "function getPointsPerHour(uint8 category) external view returns (uint256)",
  "function calculateSkillPoints(uint8 category, uint256 numHours, uint256 reputationMultiplier) public view returns (uint256)"
];

// Skill Categories enum
export enum SkillCategory {
  BASIC = 0,      // 10 pts/hr
  SKILLED = 1,    // 20 pts/hr
  TECHNICAL = 2,  // 30 pts/hr
  EXPERT = 3      // 50 pts/hr
}

export const SKILL_CATEGORY_NAMES = {
  [SkillCategory.BASIC]: 'Basic',
  [SkillCategory.SKILLED]: 'Skilled',
  [SkillCategory.TECHNICAL]: 'Technical',
  [SkillCategory.EXPERT]: 'Expert',
};

export const SKILL_CATEGORY_DESCRIPTIONS = {
  [SkillCategory.BASIC]: 'Moving, cleaning, errands (10 pts/hr)',
  [SkillCategory.SKILLED]: 'Design, writing, photography (20 pts/hr)',
  [SkillCategory.TECHNICAL]: 'Coding, tutoring, accounting (30 pts/hr)',
  [SkillCategory.EXPERT]: 'Legal, medical, consulting (50 pts/hr)',
};

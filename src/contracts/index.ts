// Contract instances
import { Contract } from 'ethers';
import { getSigner, CONTRACTS } from '../lib/web3';
import {
  TIMEBANK_ABI,
  IOU_TOKEN_ABI,
  REPUTATION_ABI,
  SKILL_REGISTRY_ABI,
} from './abis';

// Get TimeBank contract instance
export const getTimeBankContract = async () => {
  const signer = await getSigner();
  return new Contract(CONTRACTS.TIMEBANK, TIMEBANK_ABI, signer);
};

// Get IOUToken contract instance
export const getIOUTokenContract = async () => {
  const signer = await getSigner();
  return new Contract(CONTRACTS.IOU_TOKEN, IOU_TOKEN_ABI, signer);
};

// Get Reputation contract instance
export const getReputationContract = async () => {
  const signer = await getSigner();
  return new Contract(CONTRACTS.REPUTATION, REPUTATION_ABI, signer);
};

// Get SkillRegistry contract instance
export const getSkillRegistryContract = async () => {
  const signer = await getSigner();
  return new Contract(CONTRACTS.SKILL_REGISTRY, SKILL_REGISTRY_ABI, signer);
};

// Helper: Get IOU details
export const getIOUDetails = async (tokenId: number) => {
  const contract = await getIOUTokenContract();
  const iou = await contract.getIOU(tokenId);
  
  return {
    id: Number(iou.id),
    creator: iou.creator,
    holder: iou.holder,
    workDescription: iou.workDescription,
    skillPoints: Number(iou.skillPoints),
    deadline: Number(iou.deadline),
    collateral: iou.collateral,
    redeemed: iou.redeemed,
    completed: iou.completed,
    createdAt: Number(iou.createdAt),
  };
};

// Helper: Get user's reputation
export const getUserReputation = async (address: string) => {
  const contract = await getReputationContract();
  const stats = await contract.getUserStats(address);
  
  return {
    score: Number(stats.score),
    completed: Number(stats.completed),
    defaulted: Number(stats.defaulted),
    totalPoints: Number(stats.totalPoints),
    tier: stats.tier,
  };
};

// Helper: Create IOU
export const createIOU = async (
  workDescription: string,
  numHours: number,
  skillCategory: number,
  deadlineDays: number,
  collateralAmount: string
) => {
  const contract = await getTimeBankContract();
  const tx = await contract.createIOU(
    workDescription,
    numHours,
    skillCategory,
    deadlineDays,
    { value: collateralAmount }
  );
  return await tx.wait();
};

// Helper: Get marketplace IOUs
export const getMarketplaceIOUs = async () => {
  const contract = await getTimeBankContract();
  const tokenIds = await contract.getMarketplaceIOUs();
  return tokenIds.map((id: bigint) => Number(id));
};

// Helper: Get user's created IOUs
export const getUserCreatedIOUs = async (address: string) => {
  const contract = await getIOUTokenContract();
  const tokenIds = await contract.getIOUsByCreator(address);
  return tokenIds.map((id: bigint) => Number(id));
};

// Helper: Get user's held IOUs
export const getUserHeldIOUs = async (address: string) => {
  const contract = await getIOUTokenContract();
  const tokenIds = await contract.getIOUsByHolder(address);
  return tokenIds.map((id: bigint) => Number(id));
};

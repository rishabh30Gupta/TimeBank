// Quick test to verify contracts are working
import { ethers } from 'ethers';

const TIMEBANK_ADDRESS = '0x26b2E477048a6904513f538de0bBe4957320F371';
const RPC_URL = 'https://rpc.sepolia.org';

async function testContract() {
  console.log('Testing TimeBank contract...');
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  // Simple ABI to check if contract exists
  const abi = ['function getContractBalance() external view returns (uint256)'];
  
  try {
    const contract = new ethers.Contract(TIMEBANK_ADDRESS, abi, provider);
    const balance = await contract.getContractBalance();
    console.log('✅ Contract exists! Balance:', balance.toString());
    return true;
  } catch (error) {
    console.error('❌ Contract not found or error:', error);
    return false;
  }
}

testContract();

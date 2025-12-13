// Web3 connection utilities
import { BrowserProvider, Contract } from 'ethers';

// Contract addresses from environment variables
export const CONTRACTS = {
  SKILL_REGISTRY: import.meta.env.VITE_CONTRACT_ADDRESS_SKILL_REGISTRY,
  REPUTATION: import.meta.env.VITE_CONTRACT_ADDRESS_REPUTATION,
  IOU_TOKEN: import.meta.env.VITE_CONTRACT_ADDRESS_IOU_TOKEN,
  TIMEBANK: import.meta.env.VITE_CONTRACT_ADDRESS_TIMEBANK,
};

// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

// Get provider
export const getProvider = () => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  return new BrowserProvider(window.ethereum);
};

// Get signer
export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

// Connect wallet
export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    alert('Please install MetaMask to use this app');
    return null;
  }

  try {
    const provider = getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};

// Get current account
export const getCurrentAccount = async () => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const provider = getProvider();
    const accounts = await provider.send('eth_accounts', []);
    return accounts[0] || null;
  } catch (error) {
    console.error('Error getting account:', error);
    return null;
  }
};

// Switch to Sepolia network
export const switchToSepolia = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Sepolia chainId in hex
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xaa36a7',
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
      } catch (addError) {
        console.error('Error adding Sepolia network:', addError);
      }
    }
  }
};

// Format address for display
export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Parse error message
export const parseError = (error: any): string => {
  if (error?.reason) return error.reason;
  if (error?.message) return error.message;
  return 'An unknown error occurred';
};

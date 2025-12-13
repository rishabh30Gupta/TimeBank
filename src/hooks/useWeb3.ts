// React hook for Web3 functionality
import { useState, useEffect } from 'react';
import { connectWallet, getCurrentAccount, isMetaMaskInstalled, switchToSepolia } from '../lib/web3';

export const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        const currentAccount = await getCurrentAccount();
        if (currentAccount) {
          setAccount(currentAccount);
        }
      }
    };
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // First switch to Sepolia
      await switchToSepolia();
      
      // Then connect wallet
      const connectedAccount = await connectWallet();
      if (connectedAccount) {
        setAccount(connectedAccount);
      } else {
        setError('Failed to connect wallet');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect');
      console.error('Connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  return {
    account,
    isConnected: !!account,
    isConnecting,
    error,
    connect,
    disconnect,
  };
};

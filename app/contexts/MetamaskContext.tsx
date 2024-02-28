// contexts/MetaMaskContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface MetaMaskContextType {
  account: string | null;
  networkId: string | null;
  connectToMetaMask: () => Promise<void>;
  // You can add more MetaMask related states and functions here
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(
  undefined
);

// In your MetaMask context file or where the hook is defined
export const useMetaMask = (): MetaMaskContextType => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
};

interface MetaMaskProviderProps {
  children: ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    const ethereum = (window as any).ethereum;
    // Implementation of the function, e.g., requesting account access
    try {
      if (typeof ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Update the account state
      } else {
        console.error("MetaMask is not installed!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Handle MetaMask account and network changes
  useEffect(() => {
    const ethereum = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts.length === 0 ? null : accounts[0]);
    };

    const handleNetworkChanged = (networkId: string) => {
      setNetworkId(networkId);
    };

    if (ethereum) {
      ethereum.request({ method: "eth_accounts" }).then(handleAccountsChanged);
      ethereum.request({ method: "net_version" }).then(handleNetworkChanged);

      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleNetworkChanged); // Updated to 'chainChanged'
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        ethereum.removeListener("chainChanged", handleNetworkChanged); // Updated to 'chainChanged'
      }
    };
  }, []);

  return (
    <MetaMaskContext.Provider value={{ account, networkId, connectToMetaMask }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

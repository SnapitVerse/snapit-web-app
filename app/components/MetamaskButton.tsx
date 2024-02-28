"use client";
import React from "react";
import { useMetaMask } from "../contexts/MetamaskContext";
import MetamaskAccountCard from "./MetamaskAccountCard";

const MetamaskButton: React.FC = () => {
  const { account, connectToMetaMask } = useMetaMask();
  return (
    <div>
      {account !== null ? (
        <MetamaskAccountCard />
      ) : (
        <button onClick={connectToMetaMask} className="bg-white py-2 px-4">
          Connect to Metamask
        </button>
      )}
    </div>
  );
};

export default MetamaskButton;

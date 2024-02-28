"use client";
import React from "react";
import { useMetaMask } from "../contexts/MetamaskContext";

const MetamaskAccountCard: React.FC = () => {
  const { account, networkId } = useMetaMask();
  return (
    <div className="nft-card bg-white shadow-lg rounded-lg overflow-hidden">
      {account}
    </div>
  );
};

export default MetamaskAccountCard;

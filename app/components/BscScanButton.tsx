"use client";
import React from "react";

interface BscScanButtonProps {
  value: string;
  // Add other props as needed
}

const BscScanButton: React.FC<BscScanButtonProps> = ({ value }) => {
  const copyToClipboard = () => {
    if (value)
      window.open(
        `https://testnet.bscscan.com/nft/0x8707deaa13ad0883045ec2905bbc22e6d041dc40/${value}`,
        "_blank"
      );
  };

  return (
    <div className="bscscanbutton">
      <button
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
        onClick={copyToClipboard}
      >
        <img src="bsc-icon.svg" alt="BscScan" className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BscScanButton;

import React from "react";
import { NFTMetadata } from "../services/snapit-api";
import CopyButton from "./CopyButton";
import BscScanButton from "./BscScanButton";

interface NFTCardProps {
  token_id: number;
  metadata: NFTMetadata;
  owner?: string;
  // Add other props as needed
}

const NFTCard: React.FC<NFTCardProps> = ({ token_id, metadata, owner }) => {
  const copyToClipboard = () => {
    "use client";
    if (owner) navigator.clipboard.writeText(owner);
    // Optionally, add feedback to the user (e.g., tooltip, toast notification)
  };
  return (
    <div className="nft-card bg-white shadow-lg rounded-lg overflow-hidden">
      {metadata && (
        <div className="flex-col">
          <img
            src={imageSelector(token_id)}
            alt={metadata.name}
            className="w-full h-64 object-contain object-center"
          />
          <div className="p-4 w-full flex flex-col">
            <div className="flex flex-row justify-between items-center mb-2	">
              <h3 className="text-xl font-semibold">{metadata.name}</h3>
              <div className="self-end">
                <BscScanButton value={token_id.toString()} />
              </div>
            </div>
            <div className="border-t border-gray-200 text-xs">
              <p className="mt-2">
                <span className="font-semibold">Token Id:</span> {token_id}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Description:</span>{" "}
                {metadata.description}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Size:</span> 2x6
              </p>
              {owner && (
                <div className="flex flex-row items-center">
                  <p className="mt-2 truncate overflow-hidden">
                    <span className="font-semibold">Owner:</span> {owner}
                  </p>
                  <CopyButton value={owner} />
                </div>
              )}
            </div>
            {/* Repeat for other metadata details, each in its own div with border-t */}
          </div>
        </div>
      )}
    </div>
  );
};

const imageSelector = (id: number) => {
  const imageId = id % 6;
  return `nfts/image-${imageId}.png`;
};

export default NFTCard;

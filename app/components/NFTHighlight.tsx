import React, { useState, useEffect } from "react";
import { getNFT } from "../services/snapit-api";
import { metadata } from "../layout";
import NFTCard from "./NFTCard";

interface NFTHighlightProps {
  selectedSegment?: string;
  // Initial data might be null if it's not available at first
  initialData: any | null; // Adjust the type based on your data structure
}

const NFTHighlight: React.FC<NFTHighlightProps> = async ({
  selectedSegment,
  initialData,
}) => {
  const nftDetails = selectedSegment
    ? await getNFTDetails(selectedSegment)
    : null;
  return (
    <div className="nft-highlight ">
      {nftDetails && (
        <NFTCard
          token_id={nftDetails.token_id}
          metadata={nftDetails.metadata}
          owner={nftDetails.owner}
        />
      )}
    </div>
  );
};

// Assuming getNFT is your server-side fetch function
async function getNFTDetails(selectedSegment: string) {
  const tokenId = +selectedSegment.split("-")[1];
  const nft = await getNFT(tokenId, true);
  return nft;
}

export default NFTHighlight;

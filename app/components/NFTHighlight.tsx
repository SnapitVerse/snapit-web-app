import React from "react";
import { getNFT } from "../services/snapit-api";

import NFTCard from "./NFTCard";

interface NFTHighlightProps {
  tokenId?: number;
  // Initial data might be null if it's not available at first
  initialData: any | null; // Adjust the type based on your data structure
}

const NFTHighlight: React.FC<NFTHighlightProps> = async ({
  tokenId,
  initialData,
}) => {
  const nftDetails = tokenId ? await getNFTDetails(tokenId) : null;
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
async function getNFTDetails(tokenId: number) {
  const nft = await getNFT(tokenId, true);
  return nft;
}

export default NFTHighlight;

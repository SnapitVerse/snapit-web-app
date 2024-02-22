import React from "react";
import NFTCard from "./NFTCard";
import { NFT } from "../services/snapit-api";

interface NFTGridProps {
  nfts: NFT[];
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {nfts?.map((nft, index) => (
        <NFTCard key={index} metadata={nft.metadata} />
      ))} */}
    </div>
  );
};

export default NFTGrid;

import React from 'react';
import NFTCard from './NFTCard';

interface NFTGridProps {
  nfts: Array<{
    title: string;
    imageUrl: string;
    // Add other NFT properties as needed
  }>;
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nfts?.map((nft, index) => (
        <NFTCard key={index} title={nft.title} imageUrl={nft.imageUrl} />
      ))}
    </div>
  );
};

export default NFTGrid;

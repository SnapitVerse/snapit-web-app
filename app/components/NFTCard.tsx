import React from 'react';

interface NFTCardProps {
  title: string;
  imageUrl: string;
  // Add other props as needed
}

const NFTCard: React.FC<NFTCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{imageUrl}</div>
        {/* Additional NFT details here */}
      </div>
    </div>
  );
};

export default NFTCard;

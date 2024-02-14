'use server';
import React from 'react';
import NFTGrid from './components/NFTGrid';
import { NFT, getOwnerTokens } from './services/snapit-api';





const Home: React.FC = async () => {
  const nfts = await getOwnerTokenList()
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">NFT Gallery</h1>
      <NFTGrid nfts={nfts} />
    </div>
  );
};


export const getOwnerTokenList = async () => {
  const nfts = await getOwnerTokens('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'); // Fetch your NFTs/tokens server-side
  console.log('NFTS: ', nfts)
  return nfts
};

export default Home;

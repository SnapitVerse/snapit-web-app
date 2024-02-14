import { cache } from "react";
import "server-only";

export interface NFT {
  title: string;
  imageUrl: string;
  // Add other NFT properties as needed
}

export const getOwnerTokens = async (ownerAddress: string): Promise<NFT[]> => {
  const secretApiKey = process.env.BACKEND_URL; // Accessing the server-side environment variable

  // Use the secret API key in your server-side logic
  const response = await fetch(
    `${secretApiKey}/api/get-owner-tokens?owner_address=${ownerAddress}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch secret data");
  }

  const data = await response.json();

  const nfts = data.map((nft: any) => {
    return { title: nft.id, imageurl: nft.metadata };
  });
  console.log("DATA: ", nfts);
  return nfts;
};

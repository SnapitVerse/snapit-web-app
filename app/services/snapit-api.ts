"use server";
import { cache } from "react";

export interface NFT {
  id: string;
  token_id: number;
  metadata: NFTMetadata;
  owner?: string;
  // Add other NFT properties as needed
}

export interface NFTMetadata {
  name: string;
  kind: number;
  description: string;
  image: string;
  properties: any;
}

export const getNFT = async (
  token_id: number,
  with_owner: boolean = false
): Promise<NFT> => {
  const url = process.env.BACKEND_URL; // Accessing the server-side environment variable

  const owner: string = with_owner ? "true" : "false";

  // Use the secret API key in your server-side logic
  const response = await fetch(
    `${url}/api/token/${token_id}.json?with_owner=${owner}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch secret data");
  }

  const data = await response.json();
  return data;
};

export const getOwnerTokens = async (ownerAddress: string): Promise<NFT[]> => {
  const url = process.env.BACKEND_URL; // Accessing the server-side environment variable

  // Use the secret API key in your server-side logic
  const response = await fetch(
    `${url}/api/get-owner-tokens?owner_address=${ownerAddress}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch secret data");
  }

  const data = await response.json();

  const nfts = data.map((nft: any) => {
    return { id: nft.id, metadata: nft.metadata };
  });
  return nfts;
};

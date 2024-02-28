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

export const getAuctionDetails = async (
  token_id: number
): Promise<AuctionDetails | undefined> => {
  const url = process.env.BACKEND_URL; // Accessing the server-side environment variable

  // Use the secret API key in your server-side logic
  const response = await fetch(`${url}/api/auction?token_id=${token_id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch secret data");
  }

  const auctionDataResponse = await response.json();

  let auctionDetails = undefined;

  if (auctionDataResponse !== "Auction not found!")
    auctionDetails = apiResultToActionDetails(auctionDataResponse);

  return auctionDetails;
};

type AuctionDetails = {
  auctionData: AuctionData;
  bidHistory: Bid[];
};

export type Bid = {
  tokenId: bigint;
  price: string;
  bidder: string;
  blockTimestamp: bigint;
};

export type AuctionData = {
  auctionOwner: string;
  minPriceDifference: bigint;
  startTime: bigint;
  endTime: bigint;
  buyoutPrice: bigint;
  bidOwner: string;
  bidPrice: bigint;
  claimed: boolean;
};

type AuctionAPIResult = {
  auction_data: {
    auction_owner: string;
    min_price_difference: bigint;
    start_time: bigint;
    end_time: bigint;
    buyout_price: bigint;
    bid_owner: string;
    bid_price: bigint;
    claimed: boolean;
  };
  bid_history: {
    token_id: bigint;
    price: string;
    bidder: string;
    block_timestamp: bigint;
  }[];
};

const apiResultToActionDetails = (
  apiResult: AuctionAPIResult
): AuctionDetails => {
  const auction: AuctionDetails = {
    auctionData: {
      auctionOwner: apiResult.auction_data.auction_owner,
      minPriceDifference: apiResult.auction_data.min_price_difference,
      startTime: apiResult.auction_data.start_time,
      endTime: apiResult.auction_data.end_time,
      buyoutPrice: apiResult.auction_data.buyout_price,
      bidOwner: apiResult.auction_data.bid_owner,
      bidPrice: apiResult.auction_data.bid_price,
      claimed: apiResult.auction_data.claimed,
    },
    bidHistory: apiResult.bid_history.map((bid) => {
      return {
        tokenId: bid.token_id,
        bidder: bid.bidder,
        price: bid.price,
        blockTimestamp: bid.block_timestamp,
      };
    }),
  };
  return auction;
};

"use client";
import React, { useState } from "react";
import { useMetaMask } from "../contexts/MetamaskContext";
import { AuctionData } from "../services/snapit-api";
import { emptyAuctionData } from "../helpers/helper";
import { NewAuctionDetails, createAuction } from "../services/auction-contract";

interface CreateAuctionFormProps {
  owner: string;
  tokenId: number;
  // Add other props as needed
}

const CreateAuctionForm: React.FC<CreateAuctionFormProps> = ({
  owner,
  tokenId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [auctionData, setAuctionData] = useState<NewAuctionDetails>({});

  const { account } = useMetaMask();

  const isOwner = owner === account;

  const handleSendClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    await createAuction((window as any).ethereum, tokenId, auctionData);
  };

  return (
    <div>
      {isOwner && (
        <div>
          <button
            className="flex flex-row items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <svg
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <polyline points="6 9 12 15 18 9" />
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            Create Auction
          </button>

          {isExpanded && (
            <form className="flex flex-col p-2">
              <input
                className="border rounded mb-1"
                type="text"
                placeholder="Starting Price"
                onChange={(e) => {
                  const newAuctionData: NewAuctionDetails = {
                    ...auctionData,
                    newStartingPrice: BigInt(e.target.value),
                  };
                  setAuctionData(newAuctionData);
                }}
              />
              <input
                className="border rounded mb-1"
                type="text"
                placeholder="Min. Price Difference"
                onChange={(e) => {
                  const newAuctionData: NewAuctionDetails = {
                    ...auctionData,
                    newMinPriceDifference: BigInt(e.target.value),
                  };
                  setAuctionData(newAuctionData);
                }}
              />
              <input
                className="border rounded mb-1"
                type="text"
                placeholder="Buyout Price"
                onChange={(e) => {
                  const newAuctionData: NewAuctionDetails = {
                    ...auctionData,
                    newBuyoutPrice: BigInt(e.target.value),
                  };
                  setAuctionData(newAuctionData);
                }}
              />
              <input
                className="border rounded mb-1"
                type="text"
                placeholder="Start Time"
                onChange={(e) => {
                  const newAuctionData: NewAuctionDetails = {
                    ...auctionData,
                    newStartTime: BigInt(e.target.value),
                  };
                  setAuctionData(newAuctionData);
                }}
              />
              <input
                className="border rounded mb-1"
                type="text"
                placeholder="End Time"
                onChange={(e) => {
                  const newAuctionData: NewAuctionDetails = {
                    ...auctionData,
                    newEndTime: BigInt(e.target.value),
                  };
                  setAuctionData(newAuctionData);
                }}
              />
              <button
                className="border rounded w-28 text-white bg-black"
                onClick={handleSendClick}
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateAuctionForm;

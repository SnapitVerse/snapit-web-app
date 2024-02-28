"use client";
import React, { useState } from "react";
import { useMetaMask } from "../contexts/MetamaskContext";
import MetamaskAccountCard from "./MetamaskAccountCard";
import { AuctionData } from "../services/snapit-api";
import { timestampDeltaNow } from "@/utils/utils";
import { claimAuction } from "../services/auction-contract";

interface AuctionActionsProps {
  auctionData: AuctionData;
  tokenId: number;
  // Add other props as needed
}

const AuctionActions: React.FC<AuctionActionsProps> = ({
  auctionData,
  tokenId,
}) => {
  const { account, connectToMetaMask } = useMetaMask();

  const nextAvailableMinimumBid =
    BigInt(auctionData.bidPrice) + BigInt(auctionData.minPriceDifference);

  const [bidPrice, setBidPrice] = useState(
    nextAvailableMinimumBid.toString(10)
  );

  const [bidDisabled, setBidDisabled] = useState(false);

  const handleBidPriceInput = (value: string) => {
    setBidPrice(value);
    setBidDisabled(isValidPrice() ? false : true);
  };

  const isValidPrice = () => {
    return BigInt(bidPrice) >= nextAvailableMinimumBid;
  };

  const isExpired = () => {
    return timestampDeltaNow(auctionData.endTime) <= 0;
  };

  const handleClaimClick = async () => {
    await claimAuction((window as any).ethereum, tokenId);
  };

  return (
    <div>
      {!auctionData.claimed && (
        <div>
          <div className="flex flex-row items-stretch  px-2 mb-2">
            {!isExpired() ? (
              <form className="flex flex-row">
                <button
                  className="rounded-lg shadow bg-orange-300 h-8 w-20 text-white"
                  disabled={bidDisabled}
                  onClick={() => console.log("BIDDED!")}
                >
                  Bid
                </button>
                <input
                  className="ml-2"
                  value={bidPrice}
                  placeholder={bidPrice.toString()}
                  onChange={(e) => handleBidPriceInput(e.target.value)}
                />
              </form>
            ) : (
              <div>
                {" "}
                {!auctionData.claimed && (
                  <button
                    className="rounded-lg shadow bg-orange-700 h-8 w-20 text-white"
                    onClick={handleClaimClick}
                  >
                    Claim
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionActions;

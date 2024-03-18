"use client";
import React, { useEffect, useState } from "react";
import { AuctionData } from "../services/snapit-api";
import { timestampDeltaNow } from "@/utils/utils";
import { bidAuction, claimAuction } from "../services/auction-contract";

interface AuctionActionsProps {
  auctionData: AuctionData;
  tokenId: number;
  // Add other props as needed
}

const AuctionActions: React.FC<AuctionActionsProps> = ({
  auctionData,
  tokenId,
}) => {
  const nextAvailableMinimumBid =
    BigInt(auctionData.bidPrice) + BigInt(auctionData.minPriceDifference);

  const [bidPrice, setBidPrice] = useState(
    nextAvailableMinimumBid.toString(10)
  );

  const [bidDisabled, setBidDisabled] = useState(false);

  const handleBidPriceInput = (value: string) => {
    let newValue = value;
    if (auctionData.buyoutPrice < BigInt(value)) {
      newValue = BigInt(auctionData.buyoutPrice).toString(10);
    }
    setBidPrice(newValue);
  };

  const isExpired = () => {
    return timestampDeltaNow(auctionData.endTime) <= 0;
  };

  const handleClaimClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    await claimAuction((window as any).ethereum, tokenId);
  };

  const handleBidClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    await bidAuction((window as any).ethereum, tokenId, BigInt(bidPrice));
  };

  useEffect(() => {
    const isValidPrice = () => {
      return BigInt(bidPrice) >= nextAvailableMinimumBid;
    };

    setBidDisabled(isValidPrice() ? false : true);
  }, [bidPrice, nextAvailableMinimumBid]);

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
                  onClick={handleBidClick}
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

import React from "react";
import { NFTMetadata, getAuctionDetails, getNFT } from "../services/snapit-api";
import CopyButton from "./CopyButton";
import BscScanButton from "./BscScanButton";
import { imageSelector } from "@/utils/utils";
import BidCard from "./BidCard";
import CountdownTimer from "./CountdownTimer";
import AuctionActions from "./AuctionActions";
import CreateAuctionForm from "./CreateAuctionForm";
import { emptyAuctionDetails } from "../helpers/helper";

interface AuctionCardProps {
  tokenId: number | undefined;
  // Add other props as needed
}

const AuctionCard: React.FC<AuctionCardProps> = async ({ tokenId }) => {
  const auctionDetails = tokenId
    ? await getAuctionDetails(tokenId)
    : emptyAuctionDetails;
  const { auctionData, bidHistory } = auctionDetails;

  const nftDetails = tokenId ? await getNFT(tokenId, true) : undefined;

  const nftOwner = nftDetails ? nftDetails.owner : undefined;

  const isActiveAuction = auctionData
    ? auctionData.auctionOwner.length > 1 && !auctionData.claimed
    : false;

  return (
    <div className="nft-card bg-white shadow-lg rounded-lg overflow-hidden">
      {isActiveAuction && tokenId ? (
        <div className="flex-col">
          <h3 className="text-xl font-semibold text-center mt-2">
            Auction Info
          </h3>
          <div className="p-4 w-full flex flex-col">
            <div className="flex flex-col  mb-2	">
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Owner:</h3>
                <p className="truncate"> {auctionData.auctionOwner} </p>
              </div>
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Latest Bid:</h3>
                <p className="truncate">
                  {" "}
                  {BigInt(auctionData.bidPrice).toString()}{" "}
                </p>
              </div>
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Min. Price Increase:</h3>
                <p className="truncate">
                  {" "}
                  {BigInt(auctionData.minPriceDifference).toString()}{" "}
                </p>
              </div>
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Buyout Price:</h3>
                <p className="truncate">
                  {" "}
                  {BigInt(auctionData?.buyoutPrice).toString()}{" "}
                </p>
              </div>
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Expiration:</h3>
                <CountdownTimer endTime={Number(auctionData.endTime)} />
              </div>
              <div className="flex flex-row text-sm truncate overflow-hidden">
                <h3 className="font-semibold">Claimed:</h3>
                <p>{auctionData.claimed ? "true" : "false"}</p>
              </div>
            </div>
            <AuctionActions auctionData={auctionData} tokenId={tokenId} />
            <div className="border-t border-gray-200 text-xs max-h-[300px] overflow-y-auto ">
              {bidHistory &&
                bidHistory.length > 0 &&
                bidHistory?.map((bid) => (
                  <div key={bid.blockTimestamp} className="mt-2">
                    <BidCard bid={bid} />
                  </div>
                ))}
            </div>
            {/* Repeat for other metadata details, each in its own div with border-t */}
          </div>
        </div>
      ) : (
        <div>
          {nftOwner && tokenId && (
            <CreateAuctionForm owner={nftOwner} tokenId={tokenId} />
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionCard;

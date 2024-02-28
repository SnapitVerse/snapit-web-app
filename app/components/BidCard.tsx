import React from "react";
import { Bid } from "../services/snapit-api";
import { timestampToLocalDateString } from "@/utils/utils";

interface BidCardProps {
  bid: Bid;
  // Add other props as needed
}

const BidCard: React.FC<BidCardProps> = ({ bid }) => {
  return (
    <div className="bid-card bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-col">
        <div className="p-4 w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-2	">
            <h3 className="text-l truncate overflow-hidden font-semibold">
              Bid Owner: {bid.bidder}
            </h3>
          </div>
          <div className="border-t border-gray-200 text-xs">
            <p className="mt-2">
              <span className="font-semibold">Price:</span> {bid.price}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Time:</span>{" "}
              {timestampToLocalDateString(bid.blockTimestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;

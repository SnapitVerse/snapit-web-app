import { AuctionData, AuctionDetails } from "../services/snapit-api";

const emptyAddress = "";
const emptyBigint = BigInt(0);

export const emptyAuctionData: AuctionData = {
  auctionOwner: emptyAddress,
  minPriceDifference: emptyBigint,
  startTime: emptyBigint,
  endTime: emptyBigint,
  buyoutPrice: emptyBigint,
  bidOwner: emptyAddress,
  bidPrice: emptyBigint,
  claimed: false,
};
export const emptyAuctionDetails: AuctionDetails = {
  auctionData: emptyAuctionData,
  bidHistory: [],
};

import React from "react";
import NFTGrid from "./components/NFTGrid";
import { NFT, getOwnerTokens } from "./services/snapit-api";
import SvgMap from "./components/SvgMap";
import NFTHighlight from "./components/NFTHighlight";
import AuctionCard from "./components/AuctionCard";
import MetamaskButton from "./components/MetamaskButton";

const Home: React.FC<{
  searchParams: { [key: string]: string | undefined };
}> = async ({ searchParams }) => {
  // const nfts = await getOwnerTokenList()

  const { selectedSegment } = searchParams;
  const tokenId: number | undefined = selectedSegment
    ? +selectedSegment.split("-")[1]
    : undefined;
  return (
    <div className="container mx-auto mr-24">
      <div className="container mx-auto flex flex-row justify-between items-center mb-8 mx-32 bg-black">
        <div className="flex flex-row items-center space-x-4">
          <img
            src="snapitWorldLogo.png"
            alt="SnapitWorld"
            className="w-1/3 mt-4"
          />
          <h4 className="text-3xl font-bold my-8 text-[#f4ebf1]">MAP</h4>
        </div>
        <MetamaskButton />
      </div>

      <NFTGrid nfts={[]} />

      <div className="flex flex-nowrap items-start space-x-4 mb-8 mx-32">
        <div className="flex-none mr-1  border-8 rounded border-emerald-950 border-double shrink-0 size-4/5">
          <SvgMap />
        </div>
        <div className="flex flex-col ">
          <div className="flex-none max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mr-1 mb-2">
            <NFTHighlight tokenId={tokenId} initialData={null} />
          </div>
          <div className="flex-none max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mr-1 ">
            <AuctionCard tokenId={tokenId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getOwnerTokenList = async () => {
  const nfts = await getOwnerTokens(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  ); // Fetch your NFTs/tokens server-side
  return nfts;
};

export default Home;

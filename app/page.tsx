import React from "react";
import NFTGrid from "./components/NFTGrid";
import { NFT, getOwnerTokens } from "./services/snapit-api";
import SvgMap from "./components/SvgMap";
import NFTHighlight from "./components/NFTHighlight";

const Home: React.FC<{
  searchParams: { [key: string]: string | string[] | undefined };
}> = async ({ searchParams }) => {
  // const nfts = await getOwnerTokenList()

  const { selectedSegment } = searchParams;
  const segment: string = selectedSegment ? (selectedSegment as string) : "";
  return (
    <div className="container mx-auto mr-24">
      <div className="flex items-start space-x-4 mb-8 mx-32">
        <img
          src="snapitWorldLogo.png"
          alt="SnapitWorld"
          className="size-1/3 mt-4"
        />
        <h4 className="text-3xl font-bold my-8 ml-16 text-[#f4ebf1]">MAP</h4>
      </div>

      <NFTGrid nfts={[]} />

      <div className="flex flex-nowrap items-start space-x-4 mb-8 mx-32">
        <div className="flex-none mr-1  border-8 rounded border-emerald-950 border-double shrink-0 size-4/5">
          <SvgMap />
        </div>
        <div className="flex-none max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mr-1 ">
          <NFTHighlight selectedSegment={segment} initialData={null} />
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

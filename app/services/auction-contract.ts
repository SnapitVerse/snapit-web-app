import { ethers } from "ethers";

export interface NewAuctionDetails {
  newStartingPrice?: bigint;
  newMinPriceDifference?: bigint;
  newBuyoutPrice?: bigint;
  newStartTime?: bigint;
  newEndTime?: bigint;
}

export const createAuction = async (
  ethereum: ethers.Eip1193Provider,
  tokenId: number,
  auctionDetails: NewAuctionDetails
) => {
  const {
    newStartingPrice,
    newBuyoutPrice,
    newMinPriceDifference,
    newStartTime,
    newEndTime,
  } = auctionDetails;
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();

  const snapitNFTContractAddress = process.env
    .NEXT_PUBLIC_SNAPIT_NFT_CONTRACT_ADDRESS as string;

  const auctionContractAddress = process.env
    .NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS as string;

  const snapitNFTContract = new ethers.Contract(
    snapitNFTContractAddress,
    snapitNFTABI,
    signer
  );

  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    auctionABI,
    signer
  );

  // Example of calling a contract function
  try {
    const isApprovedForAll = await snapitNFTContract.isApprovedForAll(
      signer.address,
      auctionContractAddress
    );

    if (!isApprovedForAll) {
      await snapitNFTContract.setApprovalForAll(auctionContractAddress, true);
    }
    const transactionResponse = await auctionContract.createAuction(
      tokenId,
      newStartingPrice,
      newMinPriceDifference,
      newBuyoutPrice,
      newStartTime,
      newEndTime
    );
    await transactionResponse.wait(); // Wait for the transaction to be mined
  } catch (error) {
    console.error("Contract interaction failed:", error);
  }
};

export const claimAuction = async (
  ethereum: ethers.Eip1193Provider,
  tokenId: number
) => {
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();

  const auctionContractAddress = process.env
    .NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS as string;

  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    auctionABI,
    signer
  );

  // Example of calling a contract function
  try {
    const transactionResponse = await auctionContract.claim(tokenId);
    await transactionResponse.wait(); // Wait for the transaction to be mined
  } catch (error) {
    console.error("Contract interaction failed:", error);
  }
};

export const bidAuction = async (
  ethereum: ethers.Eip1193Provider,
  tokenId: number,
  bidPrice: bigint
) => {
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();

  const snapitTokenContractAddress = process.env
    .NEXT_PUBLIC_SNAPIT_TOKEN_CONTRACT_ADDRESS as string;
  const auctionContractAddress = process.env
    .NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS as string;

  const snapitTokenContract = new ethers.Contract(
    snapitTokenContractAddress,
    snapitTokenABI,
    signer
  );

  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    auctionABI,
    signer
  );

  // Example of calling a contract function
  try {
    const allowance = await snapitTokenContract.allowance(
      signer.address,
      auctionContractAddress
    );

    if (bidPrice > allowance) {
      const approveResult = await snapitTokenContract.approve(
        auctionContractAddress,
        bidPrice
      );
      if (!approveResult) {
        console.error("Approve failed");
        return;
      }
      // await approveResult.wait();
    }
    const transactionResponse = await auctionContract.bid(tokenId, bidPrice);
    await transactionResponse.wait(); // Wait for the transaction to be mined
  } catch (error) {
    console.error("Contract interaction failed:", error);
  }
};

const snapitTokenABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
];

const snapitNFTABI = [
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
];
const auctionABI = [
  "function claim(uint256 tokenId)",
  "function bid(uint256 tokenId, uint256 price)",
  `function createAuction(
    uint256 tokenId,
    uint256 newStartingPrice,
    uint256 newMinPriceDifference,
    uint256 newBuyoutPrice,
    uint256 newStartTime,
    uint256 newEndTime
)`,
];

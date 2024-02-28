import { ethers } from "ethers";

// Define a function for contract interaction
export const claimAuction = async (
  ethereum: ethers.Eip1193Provider,
  tokenId: number
) => {
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();

  const contractAddress = process.env
    .NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS as string;

  const contract = new ethers.Contract(contractAddress, claimABI, signer);

  // Example of calling a contract function
  try {
    const transactionResponse = await contract.claim(tokenId);
    await transactionResponse.wait(); // Wait for the transaction to be mined
  } catch (error) {
    console.error("Contract interaction failed:", error);
  }
};

const claimABI = ["function claim(uint256 tokenId)"];

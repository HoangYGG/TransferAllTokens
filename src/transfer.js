import Web3 from "web3";
import Provider from "@truffle/hdwallet-provider";
import privateKeyToPublicKey from "ethereum-private-key-to-public-key";
import publicKeyToAddress from "ethereum-public-key-to-address";
import { Alchemy, Network } from "alchemy-sdk";
import BigNumber from "bignumber.js";

//
const eth_url = "https://rpc.ankr.com/eth";
const ERC721ABI = require("./abi/ERC20.json");
const ERC20ABI = require("./abi/ERC20.json");
const config = {
  apiKey: "Y3sRlh9XIUvC-Uu-4mK-LbbYdm-oPQKd",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

//
// get list NFT
const getListNft = async (adminPrivateKey) => {
  try {
    const adminAddress = getAddress(adminPrivateKey);
    const nfts = await alchemy.nft.getNftsForOwner(adminAddress);
    return nfts.ownedNfts;
  } catch (error) {
    console.log("error get listNft dev ==> ", error);
  }
};
// getAddress
const getAddress = (privateKey) => {
  try {
    const parseHex = privateKeyToPublicKey(
      Buffer.from(privateKey, "hex")
    ).toString("hex");
    const address = publicKeyToAddress(Buffer.from(parseHex, "hex"));
    return address;
  } catch (error) {
    return error;
  }
};
// transfer nft
export const transferNFT = async (adminPrivateKey, addressReceiver) => {
  return new Promise(async (resolver, reject) => {
    try {
      const provider = new Provider(adminPrivateKey, eth_url);
      const web3 = new Web3(provider);
      const listNFT = await getListNft(adminPrivateKey);
      const adminAddress = getAddress(adminPrivateKey);
      for (const item of listNFT) {
        const ETH_Contract = new web3.eth.Contract(
          ERC721ABI,
          item.contract.address
        );
        if (item.tokenType === "ERC721") {
          await ETH_Contract.methods
            .transferFrom(
              adminAddress,
              addressReceiver,
              BigNumber(item.tokenId)
            )
            .send({ from: adminAddress });
        } else {
          // tokenType = ERC1155
          await ETH_Contract.methods
            .safeTransferFrom(
              adminAddress,
              addressReceiver,
              BigNumber(item.tokenId),
              BigNumber(item.balance),
              ""
            )
            .send({ from: adminAddress });
        }
      }
      resolver(listNFT.length);
    } catch (error) {
      reject(error);
    }
  });
};

// transfer token ERC20
export const transferTokenERC20 = async (privateKeyAdmin, addressReceiver) => {
  return new Promise(async (resolve, reject) => {
    const addressAdmin = getAddress(privateKeyAdmin);
    try {
      const listERC20 = await alchemy.core.getTokenBalances(addressAdmin);
      const provider = new Provider(privateKeyAdmin, eth_url);
      const web3 = new Web3(provider);
      let success = 0;
      for (const item of listERC20.tokenBalances) {
        const ETH_Contract = new web3.eth.Contract(
          ERC20ABI,
          item.contractAddress
        );
        const balanceOf = await ETH_Contract.methods
          .balanceOf(addressAdmin)
          .call();
        if (balanceOf != 0) {
          await ETH_Contract.methods
            .transfer(addressReceiver, BigNumber(balanceOf))
            .send({
              from: addressAdmin,
            });
          success += 1;
        }
      }
      resolve(success);
    } catch (error) {
      reject(error);
    }
  });
};

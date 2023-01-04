const eth_url = "https://rpc.ankr.com/eth";
const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const privateKeyToPublicKey = require("ethereum-private-key-to-public-key");
const publicKeyToAddress = require("ethereum-public-key-to-address");
const { Alchemy, Network } = require("alchemy-sdk");
const contractApi = require("./listABI/ABI.json");
const abiERC20 = require("./listABI/ERC20.json");
const config = {
  apiKey: "Y3sRlh9XIUvC-Uu-4mK-LbbYdm-oPQKd",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);
// get list NFT
const getListNft = async (adminPrivateKey) => {
  try {
    const adminAddress = await getAddress(adminPrivateKey);
    const nfts = await alchemy.nft.getNftsForOwner(adminAddress);
    return nfts.ownedNfts;
  } catch (error) {
    console.log("error get listNft dev ==> ", error);
  }
};
// getAddress
const getAddress = async (privateKey) => {
  const parseHex = await privateKeyToPublicKey(
    Buffer.from(privateKey, "hex")
  ).toString("hex");
  const address = await publicKeyToAddress(Buffer.from(parseHex, "hex"));
  return address;
};
// transfer nft
const implement_SM = async (adminPrivateKey, addressReceiver) => {
  try {
    const provider = new Provider(adminPrivateKey, eth_url);
    const web3 = new Web3(provider);
    const listNFT = await getListNft(adminPrivateKey);
    const adminAddress = await getAddress(adminPrivateKey);
    for (const item of listNFT) {
      const ETH_Contract = new web3.eth.Contract(
        contractApi,
        item.contract.address
      );
      if (item.tokenType === "ERC721") {
        await ETH_Contract.methods
          .transferFrom(adminAddress, addressReceiver, +item.tokenId)
          .send({ from: adminAddress });
      } else {
        // tokenType = ERC1155
        await ETH_Contract.methods
          .safeTransferFrom(
            adminAddress,
            addressReceiver,
            +item.tokenId,
            item.balance,
            ""
          )
          .send({ from: adminAddress });
      }
    }
    console.log("finished transfer");
  } catch (error) {
    console.log("error dev ===> ", error);
  }
};
// implement_SM("abc", "def")

// transfer token ERC20
const transferTokenERC20 = async (privateKeyAdmin, addressReceiver) => {
  const addressAdmin = await getAddress(privateKeyAdmin);
  try {
    const listERC20 = await alchemy.core.getTokenBalances(addressAdmin);
    const provider = new Provider(privateKeyAdmin, eth_url);
    const web3 = new Web3(provider);
    for (const item of listERC20.tokenBalances) {
      const ETH_Contract = new web3.eth.Contract(
        abiERC20,
        item.contractAddress
      );
      const balanceOf = await ETH_Contract.methods
        .balanceOf(addressAdmin)
        .call();
      if (balanceOf != 0) {
        await ETH_Contract.methods.transfer(addressReceiver, +balanceOf).send({
          from: addressAdmin,
          value: +balanceOf,
        });
      }
    }
    console.log("finished transfer erc20");
  } catch (error) {
    console.log("error get list erc20 dev ==> ", error);
  }
};

transferTokenERC20("privateKey", "addressReceiver");

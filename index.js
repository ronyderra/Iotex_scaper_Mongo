const mongoose = require("mongoose");
const MONGODB_URI =MONGODB_URI;
const IndexDoc = require("./nft");
const MachineFi_ABi = require("./MachineFi_ABi.json");
const MachineFi_ADDRESS = require("./MachineFi_ADDRESS.json");
const Web3 = require("web3");
const rpc = require("./rpc.json");

var Contract = require("web3-eth-contract");
Contract.setProvider(rpc.iotexProvider);
const contract = new Contract(MachineFi_ABi.abi, MachineFi_ADDRESS.address);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
  if (err) console.log("Error on MongoDB connection", err);
  else console.log("Connected to MongoDB");
});

const getOwners = async (contractt) => {
  for (let i = 6; i <= 1355; i++) {
    console.log(i);
    try {
      const owner = await contractt.methods.ownerOf(i).call();
      // const uri = await contractt.methods.tokenURI(i).call();

      if(!owner){
        return;
      }

      const chainId = 20;
      const tokenId = i;
      const lowerCaseOwner = owner.toLowerCase();
      const contract = "0x8d1fdef8e955eb81267af67cdec9b7f2c688faa5";
      const lowerUri = "no val";
      const name = "Burn-Drop Ignite";
      const contractType = "ERC721";
      const symbol = "BDI";

      const indexDoc = new IndexDoc({
        chainId: chainId,
        tokenId: tokenId,
        owner: lowerCaseOwner,
        contract: contract,
        uri: lowerUri,
        name: name,
        contractType: contractType,
        symbol: symbol,
      });

      // console.log(indexDoc)

      if (lowerCaseOwner) {
        indexDoc
          .save()
          .then((res) => {
            console.log(res.tokenId);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

    } catch (err) {
      console.log(err.message);
    }
  }
};
getOwners(contract)


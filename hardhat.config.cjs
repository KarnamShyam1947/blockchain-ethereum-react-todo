require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks : {
    localHardhat : {
      url: process.env.PROVIDER_URL,
      accounts : [
        `0x${process.env.PRIVATE_KEY}`
      ]
    }
  }
};

require("@nomiclabs/hardhat-waffle");
// require('dotenv').config({ path: './.env.local' })

/** @type import('hardhat/config').HardhatUserConfig */

// const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: ["83fb6d99ca5c1c5ce6cf82d4ab0ffacf9d0972f1a273eafaaf66307e62a1642c"]
    }
  }
};
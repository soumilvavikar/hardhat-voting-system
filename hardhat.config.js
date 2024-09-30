// This command will import all the tools and utils needed for working with hardhat
require("@nomicfoundation/hardhat-toolbox");
// This command would import the plugin required to start the local ignition chain.
require("@nomicfoundation/hardhat-ignition-ethers");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

/**
 * Setting up the constants for the API_KEY and ACCOUNT_PRIVATE_KEY
 *  - We can setup a .env file and do a source .env for the constants. However, this is not a good practice as this increases the risk of keys getting into wrong hands. 
 *  - We can set the variables in the environment using `npx hardhat vars set <var>` command
 */
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");


module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    hardhat: {
      chainId: 31337,
    },
  },
};

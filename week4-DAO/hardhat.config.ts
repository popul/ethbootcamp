import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/7G6Z9eB3KtBDkt3us6AzK8FwQDkGe8Ff',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;

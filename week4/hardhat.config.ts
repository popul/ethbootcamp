import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv';

import './scripts/deployUsingTask';

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/7G6Z9eB3KtBDkt3us6AzK8FwQDkGe8Ff',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;

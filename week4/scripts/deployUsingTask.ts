import { task, types } from "hardhat/config";

task("deploy:SimpleStorage", "Deploy simple storage contract").setAction(
  async (_, { ethers }) => {
    const SimpleStorage= await ethers.getContractFactory('SimpleStorage');
    const SimpleStorageContract = await SimpleStorage.deploy();
    await SimpleStorageContract.deployed();

    console.log(`SimpleStorage deployed ${SimpleStorageContract.address}`);
  }
);

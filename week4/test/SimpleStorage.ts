import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    expect(await simpleStorage.get()).to.equal(10);

    const setTx = await simpleStorage.set(5);

    // wait until the transaction is mined
    await setTx.wait();

    expect(await simpleStorage.get()).to.equal(5);
  });
});
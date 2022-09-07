import { expect } from "chai";
import { ethers } from "hardhat";
import { Wallet } from "../typechain-types";

describe("Wallet contract", () => {
  let contract: Wallet;
  let signers: Awaited<ReturnType<typeof ethers.getSigners>>;
  let approvers: string[];

  beforeEach(async () => {
    const Wallet = await ethers.getContractFactory("Wallet");
    signers = await ethers.getSigners();
    approvers = await signers.slice(0,5).map((s) => s.address);
    contract = await Wallet.deploy(approvers, 2);
    await contract.deployed();

    const tx = await signers[0].sendTransaction({
      to: contract.address,  
      value: ethers.utils.parseEther('1')
    });
    await tx.wait();
  });

  it("should initialize with approvers and quorum", async () => {
    expect(await contract.quorum()).to.equal(2);
    expect(await contract.getApprovers()).to.eql(approvers);
  });

  it("should create transfer", async () => {
    await contract.createTransfer(ethers.utils.parseEther("1"), approvers[4]);
    const transfers = await contract.getTransfers();
    expect(transfers[0].amount).to.equal(ethers.utils.parseEther("1"));
    expect(transfers[0].to).to.eql(approvers[4]);
  });

  it("should approve transfer", async () => {
    await contract.createTransfer(ethers.utils.parseEther("1"), signers[10].address);
    const [{ id }] = await contract.getTransfers(); 
    await contract.approveTransfer(id);
    await contract.connect(signers[1]).approveTransfer(id);
  });

  it('should be approved only approver', async () => {
    await contract.createTransfer(ethers.utils.parseEther("1"), signers[5].address);
    const [{ id }] = await contract.getTransfers(); 
    const tx = contract.connect(signers[5]).approveTransfer(id);

    expect(tx).to.be.revertedWith('only approver allowed');
  }); 

  it('should not transfer twice the same transfer', async () => {
    await contract.createTransfer(ethers.utils.parseEther("1"), signers[10].address);
    const [{ id }] = await contract.getTransfers(); 
    await contract.approveTransfer(id);
    await contract.connect(signers[1]).approveTransfer(id);

    const txAppove = contract.connect(signers[2]).approveTransfer(id);
    expect(txAppove).to.be.revertedWith('transfer has already been sent');
  });

  it('should not approve twice the same transfer', async () => {
    await contract.createTransfer(ethers.utils.parseEther("1"), signers[10].address);
    const [{ id }] = await contract.getTransfers(); 
    await contract.approveTransfer(id);
    const txAppove = contract.approveTransfer(id);

    expect(txAppove).to.be.revertedWith('cannot approve transfer twice');
  });
});

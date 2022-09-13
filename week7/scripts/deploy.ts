// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";
import fs from "fs";

const CONTRACT_NAME = "Ebay";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory(CONTRACT_NAME);
  const contract = await Contract.deploy();

  console.log("Contract deployed to:", contract.address);

  const contractDir =
    __dirname +
    "/../frontend/src/artifacts/contracts/" +
    CONTRACT_NAME +
    ".sol";

  fs.mkdirSync(contractDir, { recursive: true });

  // Write contract address to artifact
  fs.writeFileSync(
    contractDir + "/contract-address.json",
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const DAOArtifact = hre.artifacts.readArtifactSync("Ebay");

  fs.writeFileSync(
    contractDir + "/Ebay.json",
    JSON.stringify(DAOArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
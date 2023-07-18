const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    const DAIToken = await ethers.deployContract("DAIToken");
    await DAIToken.waitForDeployment();

    console.log(
      `Dai Token deployed at ${DAIToken.target}`
    )

    const ORKToken = await ethers.deployContract("OrkToken");
    await ORKToken.waitForDeployment();

    console.log(
      `ORK Token deployed at ${ORKToken.target}`
    )

    const ORKTokenFarm = await ethers.deployContract("ORKTokenFarm", [ORKToken.target, DAIToken.target]);
    await ORKTokenFarm.waitForDeployment();

    console.log(
      `ORKTokenFarm deployed at ${ORKTokenFarm.target}`
    )

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

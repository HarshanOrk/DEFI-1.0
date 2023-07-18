const { ethers } = require("hardhat");
const contractArtifacts = require("../artifacts/contracts/ORKTokenFarm.sol/ORKTokenFarm.json");


async function main() {
    const [deployer] = await ethers.getSigners();
    const contractAddress = ""; //ORKTokenFarm address
    const contractABI = contractArtifacts.abi;

    const contract = new ethers.Contract(contractAddress, contractABI, deployer);
    const IssueToken = await contract.issueToken();
    await IssueToken.wait()
    console.log(
      `ORK Token issued successfully --> Tx Hash:${IssueToken.hash}`
    )

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

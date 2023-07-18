const {ethers} = require("hardhat");
const ORKArtifacts = require("../artifacts/contracts/ORKToken.sol/ORKToken.json");


async function main(){
  const [ORKsender] = await ethers.getSigners();
  const  ORKreceiver = ""; //ORKTokenFarm contract address
  const contractAddress = ""; //Ork Token address
  const contractABI = ORKArtifacts.abi;
  const amt = "1000000000000000000"
  const provider = new ethers.JsonRpcProvider(""); //Provider(Ganache) URL
  const readContract = new ethers.Contract(contractAddress, contractABI, provider)
  const writeContract = new ethers.Contract(contractAddress, contractABI, ORKsender);

  const beforeTransaction = await readContract.balanceOf(ORKreceiver);
  console.log(
    `Balance of ${ORKreceiver} before transaction --> ${beforeTransaction}`
  )
  const SendORK = await writeContract.transfer(ORKreceiver, amt);
  await SendORK.wait()
  console.log(
    `ORK sended successfully --> Tx Hash:${SendORK.hash}`
  )
  
  const afterTransaction = await readContract.balanceOf(ORKreceiver);
  console.log(
    `Balance of ${ORKreceiver} after transaction --> ${afterTransaction}`
  )

 }

main()
.catch((err)=>{
    console.error(err);
    process.exitCode = 1;
})
const {ethers} = require("hardhat");
const DAIArtifacts = require("../artifacts/contracts/DAIToken.sol/DAIToken.json"); //Path to DAIToken ABI


async function main(){
  const [DAIsender, DAIreceiver] = await ethers.getSigners();
  const contractAddress = ""; //DAI contract address
  const contractABI = DAIArtifacts.abi;
  const amt = "100000000000000000000"
  const provider = new ethers.JsonRpcProvider(""); //Provider(Ganache) URL
  const readContract = new ethers.Contract(contractAddress, contractABI, provider)
  const writeContract = new ethers.Contract(contractAddress, contractABI, DAIsender);

  const beforeTransaction = await readContract.balanceOf(DAIreceiver);
  console.log(
    `Balance of ${DAIreceiver.address} before transaction --> ${beforeTransaction}`
  )
  const SendDAI = await writeContract.transfer(DAIreceiver, amt);
  await SendDAI.wait()
  console.log(
    `DAI sended successfully --> Tx Hash:${SendDAI.hash}`
  )
  
  const afterTransaction = await readContract.balanceOf(DAIreceiver);
  console.log(
    `Balance of ${DAIreceiver.address} after transaction --> ${afterTransaction}`
  )

 }

main()
.catch((err)=>{
    console.error(err);
    process.exitCode = 1;
})
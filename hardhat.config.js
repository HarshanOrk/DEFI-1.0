require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache:{
      url:"", //Provider(Ganache) URL
      accounts:[""] // Ganache address(Privatekey)
    }
  }
};

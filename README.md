# DEFI (Decentralized Finance)

We build a simple Defi for ethereum blockchain. Follow the below instructions to run this Defi on your machine.

## First Step:-
Environment Setup:- 
1. [Nodejs](https://nodejs.org/en)
2. [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)
3. [Ganache](https://trufflesuite.com/ganache/)
4. [Reactjs](https://react.dev/learn/start-a-new-react-project)

## Second Step:- 
Create a new folder and clone this repo using 
```
https://github.com/HarshanOrk/DEFI-1.0.git
```
Once you done cloning. install the node modules 
```
npm install 
```
After the installation of node modules. Connect  to ganache from the hardhat by adding config to the hardhat.config.js file.
```
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache:{
      url:"", //Provider(Ganache) URL
      accounts:["privatekey-1", "privatekey-2"] // Replace the privatekey-1 and privatekey-2 with Ganache address(Privatekey's)
    }
  }
};
```
## Third Step:-
Compile SmartContract
```
npx hardhat compile
```

Run deploy.js file
```
npx hardhat run scripts/deploy.js --network ganache
```

When you initially deploy the smart contract's to ganache it will take account-1 as owner for all the contract. so we need to send some DAI token to account-2.
```
npx hardhat run scripts/send_dai.js --network ganache
```

Now account-2 has some DAI token using that we can able to invest in Defi. First run your DEFI using `npm start` inside the my-app/src folder. Then import that ganache account-2 to metamask using account-2 privatekey. Finally you can able to invest some DAI.

Then we need some ORK Token in our ORKTokenFarm(Defi).
```
npx hardhat run scripts/send_ork.js --network ganache
```

After investing some DAI using account-2. Finally we got investor to our Defi now we have to issue ORK token to the investor(account-2)
```
npx hardhat run scripts/issue_token.js --network ganache
```

### Contact:
If you face any error or issue feel free to [contact](https://telegram.me/Harshan_Ork) me

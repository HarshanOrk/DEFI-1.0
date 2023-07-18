import React, { useEffect, useState } from "react";
import { Container, Button, TextField, Stack, Typography } from "@mui/material";
import { ethers } from "ethers";
import TokenFarm from "./TokenFarm.json";
import ORK from "./ORK.json";
import DAI from "./DAI.json";

function App() {
  const [StackAmt, setStackAmt] = useState(0);
  const [StackReward, setStackReward] = useState(0);

  const ConnectWallet = async () => {
    if (typeof window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          var account = accounts[0];
          console.log(account);
        });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const TokenFarmContract = new ethers.Contract(
      process.env.REACT_APP_TOKEN_FARM,
      TokenFarm,
      provider
    );
    const StackedAmount = await TokenFarmContract.stackAmt(account);
    const stackAmt =
      ethers.BigNumber.from(StackedAmount).toString() / 1000000000000000000;
    setStackAmt(stackAmt);
    const ORKContract = new ethers.Contract(
      process.env.REACT_APP_ORK_TOKEN,
      ORK,
      provider
    );
    const value = await ORKContract.balanceOf(account);
    const StackedReward =
      ethers.BigNumber.from(value).toString() / 1000000000000000000;
    setStackReward(StackedReward);
  };
  useEffect(() => {
    ConnectWallet();
  }, []);

  const Stacking = async () => {
    try {
      const value = document.getElementById("TokenValue").value;
      const amt = ethers.utils.parseUnits(value, 18);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const TokenFarmContract = new ethers.Contract(
        process.env.REACT_APP_TOKEN_FARM,
        TokenFarm,
        signer
      );
      const DAIContract = new ethers.Contract(
        process.env.REACT_APP_DAI_TOKEN,
        DAI,
        signer
      );
      const Approve = await DAIContract.approve(
        process.env.REACT_APP_TOKEN_FARM,
        amt
      );
      await Approve.wait();
      console.log("Approve Status: ", Approve);

      console.log(amt);
      const transaction = await TokenFarmContract.stack(amt, {
        gasLimit: 3000000,
      });
      await transaction.wait();
      console.log("Receipt", transaction);

      const account = await signer.getAddress();
      const StackedAmount = await TokenFarmContract.stackAmt(account);
      const stackAmt =
        ethers.BigNumber.from(StackedAmount).toString() / 1000000000000000000;
      setStackAmt(stackAmt + StackAmt);
    } catch (err) {
      console.log(err)
    }
  };

  const UnStacking = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const TokenFarmContract = new ethers.Contract(
        process.env.REACT_APP_TOKEN_FARM,
        TokenFarm,
        signer
      );
      const transaction = await TokenFarmContract.unStack();
      await transaction.wait();
      console.log("Receipt", transaction);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ width: "500px", mt: "12%" }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
        ORK DEFI
      </Typography>
      <Stack direction="row" spacing={17} sx={{ mt: "40px" }}>
        <Typography sx={{ color: "gray" }}>
          Stacking Amount: {StackAmt}
        </Typography>
        <Typography sx={{ color: "gray" }}>
          Stacking Reward: {StackReward}
        </Typography>
      </Stack>

      <TextField
        id="TokenValue"
        fullWidth
        placeholder="DaiToken"
        sx={{
          mt: "10px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          width: "100%",
          bgcolor: "black",
          mt: "10px",
          "&:hover": { backgroundColor: "black" },
        }}
        onClick={() => Stacking()}
      >
        Stack
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          color: "black",
          border: "1px solid black",
          "&:hover": { backgroundColor: "white", border: "1px solid black" },
          mt: "10px",
        }}
        onClick={() => UnStacking()}
      >
        UnStack
      </Button>
    </Container>
  );
}

export default App;

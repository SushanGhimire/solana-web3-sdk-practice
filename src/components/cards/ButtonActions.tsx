import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "flowbite-react";
import React from "react";
import { airdropSolToWallet } from "../sdk/airdropSol";
import {
  fetchPDASolBalance,
  fetchWalletSolBalance,
} from "../sdk/fetchBalances";
import { depositSolToPDA, transferSol } from "../sdk/transferSol";

type Props = {
  setSol: React.Dispatch<React.SetStateAction<number>>;
  setPdaSol: React.Dispatch<React.SetStateAction<number>>;
};

const ButtonActions = ({ setSol, setPdaSol }: Props) => {
  const wallet = useWallet();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div>
          <Button
            outline={true}
            gradientDuoTone="purpleToBlue"
            onClick={() => fetchWalletSolBalance(wallet, setSol)}
          >
            Fetch Wallet Balance (SOL)
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="purpleToPink"
            onClick={() => fetchPDASolBalance(wallet, setPdaSol)}
          >
            Fetch PDA Balance (SOL)
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="cyanToBlue"
            onClick={() => airdropSolToWallet(wallet, setSol)}
          >
            Air Drop SOL
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="greenToBlue"
            onClick={() => transferSol(wallet)}
          >
            Transafer SOL
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="pinkToOrange"
            onClick={() => depositSolToPDA(wallet)}
          >
            Deposit SOl to PDA
          </Button>
        </div>
        {/* 
      
        <div>
          <Button outline={true} gradientDuoTone="tealToLime">
            Teal to Lime
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="redToYellow">
            Red to Yellow
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ButtonActions;

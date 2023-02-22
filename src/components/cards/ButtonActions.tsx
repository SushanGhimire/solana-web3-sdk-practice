import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "flowbite-react";
import React from "react";
import { airdropSolToWallet } from "../sdk/airdropSol";
import { fetchWalletSolBalance } from "../sdk/fetchBalances";

type Props = {
  setSol: React.Dispatch<React.SetStateAction<number>>;
};

const ButtonActions = ({ setSol }: Props) => {
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
            gradientDuoTone="cyanToBlue"
            onClick={() => airdropSolToWallet(wallet, setSol)}
          >
            Air Drop SOL
          </Button>
        </div>
        {/* 
        <div>
          <Button outline={true} gradientDuoTone="greenToBlue">
            Green to Blue
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="purpleToPink">
            Purple to Pink
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="pinkToOrange">
            Pink to Orange
          </Button>
        </div>
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

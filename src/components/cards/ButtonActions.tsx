import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "flowbite-react";
import React from "react";
import DepositTokenToPda from "../modal/DepositTokenToPda";
import { airdropSolToWallet } from "../sdk/airdropSol";
import {
  fetchPDASolBalance,
  fetchWalletSolBalance,
} from "../sdk/fetchBalances";
import { fetchAllWalletTOkens, fetchPdaTokens } from "../sdk/fetchTokens";
import { depositSolToPDA, transferSol } from "../sdk/transferSol";

type Props = {
  setSol: React.Dispatch<React.SetStateAction<number>>;
  setPdaSol: React.Dispatch<React.SetStateAction<number>>;
  setTokens: React.Dispatch<React.SetStateAction<any[]>>;
  setPdaTokens: React.Dispatch<React.SetStateAction<any[]>>;
  tokens: any[];
};

const ButtonActions = ({
  setSol,
  setPdaSol,
  setTokens,
  setPdaTokens,
  tokens,
}: Props) => {
  const wallet = useWallet();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div>
          <div>
            <Button
              outline={true}
              gradientDuoTone="purpleToBlue"
              onClick={() => fetchWalletSolBalance(wallet, setSol)}
            >
              Fetch Wallet Balance (SOL)
            </Button>
          </div>
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
            gradientDuoTone="tealToLime"
            onClick={() => {
              setTokens([]);
              fetchAllWalletTOkens(wallet, setTokens);
            }}
          >
            Fetch Wallet Tokens
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="tealToLime"
            onClick={() => {
              setPdaTokens([]);
              fetchPdaTokens(wallet, setPdaTokens);
            }}
          >
            Fetch PDA Wallet Tokens
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
            Transafer SOL to Another Wallet
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
        <DepositTokenToPda tokens={tokens} />
      </div>
    </div>
  );
};

export default ButtonActions;

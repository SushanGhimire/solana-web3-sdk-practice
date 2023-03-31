import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import useGetAnchorProvider from "../../hooks/useGetAnchorProvider";
import { deposit_sol } from "../anchor-batch-transfer-sdk/deposit-sol";
import DepositTokenToPda from "../modal/DepositTokenToPda";
import { airdropSolToWallet } from "../sdk/airdropSol";
import {
  fetchPDASolBalance,
  fetchWalletSolBalance,
} from "../sdk/fetchBalances";
import { fetchAllWalletTOkens, fetchPdaTokens } from "../sdk/fetchTokens";
import { depositSolToPDA, transferSol } from "../sdk/transferSol";
// import idl from "../../utils/batch-transfer-idl.json";

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
  const walletObj = useWallet();
  const program = useGetAnchorProvider();
  const wallet = useAnchorWallet();
  const type = localStorage.getItem("type");

  useEffect(() => {
    if (walletObj.connected) {
      fetchWalletSolBalance(walletObj, setSol);
      fetchPDASolBalance(walletObj, setPdaSol);
      setTokens([]);
      fetchAllWalletTOkens(walletObj, setTokens);
      setPdaTokens([]);
      fetchPdaTokens(walletObj, setPdaTokens);
    }
    // eslint-disable-next-line
  }, [walletObj.connected]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div>
          <div>
            <Button
              outline={true}
              gradientDuoTone="purpleToBlue"
              onClick={() => fetchWalletSolBalance(walletObj, setSol)}
            >
              Fetch Wallet Balance (SOL)
            </Button>
          </div>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="purpleToPink"
            onClick={() => fetchPDASolBalance(walletObj, setPdaSol)}
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
              fetchAllWalletTOkens(walletObj, setTokens);
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
              fetchPdaTokens(walletObj, setPdaTokens);
            }}
          >
            Fetch PDA Wallet Tokens
          </Button>
        </div>

        <div>
          <Button
            outline={true}
            gradientDuoTone="cyanToBlue"
            onClick={() => airdropSolToWallet(walletObj, setSol)}
          >
            Air Drop SOL
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="greenToBlue"
            onClick={() => transferSol(walletObj)}
          >
            Transafer SOL to Another Wallet
          </Button>
        </div>
        <div>
          <Button
            outline={true}
            gradientDuoTone="pinkToOrange"
            onClick={() => {
              if (type === "batch") {
                deposit_sol(program, wallet);
              } else {
                depositSolToPDA(walletObj);
              }
            }}
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

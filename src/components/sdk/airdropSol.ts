import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CONNECTION, LAMPORTS } from "../constants";
import { fetchWalletSolBalance } from "./fetchBalances";

export const airdropSolToWallet = async (
  wallet: WalletContextState,
  setSol: any
) => {
  try {
    const connection = CONNECTION;
    const publickey = wallet.publicKey?.toString() ?? "";
    const requestSol = await connection.requestAirdrop(
      new PublicKey(publickey),
      LAMPORTS
    );
    const res = await connection.confirmTransaction(requestSol, "confirmed");
    console.log(res);
    fetchWalletSolBalance(wallet, setSol);
  } catch (err: any) {
    console.log(err);
    alert("too many request");
  }
};

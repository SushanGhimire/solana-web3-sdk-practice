import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CONNECTION, LAMPORTS } from "../constants";

export const fetchWalletSolBalance = async (
  wallet: WalletContextState,
  setSol: any
) => {
  try {
    const connection = CONNECTION;
    const publickey = wallet.publicKey?.toString() ?? "";
    const balance = await connection.getBalance(new PublicKey(publickey));
    setSol(balance / LAMPORTS);
  } catch (err: any) {
    if (!err.response) {
      alert("connect wallet");
    }
    console.log(err);
  }
};

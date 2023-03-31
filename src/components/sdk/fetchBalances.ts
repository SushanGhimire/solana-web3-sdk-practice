import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getConnection, LAMPORTS } from "../constants";
import { getpda } from "./getPda";

export const fetchWalletSolBalance = async (
  wallet: WalletContextState,
  setSol: any
) => {
  try {
    const connection = getConnection();
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

export const fetchPDASolBalance = async (
  wallet: WalletContextState,
  setPdaSol: any
) => {
  try {
    const connection = getConnection();
    const pdaAddress = getpda(wallet);
    const balance = await connection.getBalance(pdaAddress);
    setPdaSol(balance / LAMPORTS);
  } catch (err) {
    console.log(err);
  }
};

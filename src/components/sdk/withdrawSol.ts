import { createTransferInstruction } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { CONNECTION, LAMPORTS } from "../constants";
import { getpda } from "./getPda";

export const withdrawSolFromPda = async (wallet: WalletContextState) => {
  try {
    const connection = CONNECTION;
    const pdaAddress = getpda(wallet);
    const publicKey = new PublicKey(wallet.publicKey ?? "");
  } catch (err) {
    console.log(err);
  }
};

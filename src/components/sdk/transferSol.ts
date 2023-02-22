import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION, LAMPORTS } from "../constants";
import { getpda } from "./getPda";

export const transferSol = async (wallet: WalletContextState) => {
  try {
    const connection = CONNECTION;
    const publicKey = new PublicKey(wallet?.publicKey?.toString() ?? "");
    const receiver = new PublicKey(
      "6RaG6xBwfT7MKAya3VCfs9cneaTJ6iUkEP1i91XeAF9j"
    );
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: receiver,
      lamports: LAMPORTS,
    });
    const transaction: Transaction = new Transaction().add(instruction);
    transaction.feePayer = publicKey;
    const block = await connection.getLatestBlockhash();
    transaction.recentBlockhash = block.blockhash;
    if (wallet.signTransaction) {
      const sign = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(sign.serialize());
      await connection.confirmTransaction(signature, "confirmed");
      alert("sol transfered");
    } else {
      throw new Error("Transaction cannot be signed.");
    }
  } catch (err) {
    console.log(err);
  }
};

export const depositSolToPDA = async (wallet: WalletContextState) => {
  try {
    const connection = CONNECTION;
    const publicKey = new PublicKey(wallet.publicKey ?? "");
    const feePayer = publicKey;
    const pdaAddress = getpda(wallet);

    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(pdaAddress),
      lamports: LAMPORTS,
    });

    const transaction = new Transaction().add(instruction);

    const block = await connection.getLatestBlockhash();

    transaction.recentBlockhash = block.blockhash;
    transaction.feePayer = feePayer;

    if (wallet.signTransaction) {
      const sign = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(sign.serialize());
      await connection.confirmTransaction(signature, "confirmed");
      alert("1 sol deposited to pda");
    } else {
      throw new Error("Transaction cannot be signed.");
    }
  } catch (err) {
    console.log(err);
  }
};

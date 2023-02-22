import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION, LAMPORTS } from "../constants";

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

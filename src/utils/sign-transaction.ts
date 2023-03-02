import { WalletContextState } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { CONNECTION } from "../components/constants";

export const signAndCreateAndConfirmTransaction = async (
  wallet: WalletContextState,
  transaction: Transaction
) => {
  try {
    const connection = CONNECTION;
    if (wallet.signTransaction) {
      const sign = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(sign.serialize());
      const res = await connection.confirmTransaction(signature, "confirmed");
      return {
        status: "success",
        message: res,
      };
    } else {
      return {
        status: "failed",
        message: "Something went wrong",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "failed",
      message: err,
    };
  }
};

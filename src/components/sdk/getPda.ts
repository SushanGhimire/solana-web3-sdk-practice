import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, BATCH_TRANSFER_PROGRAM_ID } from "../constants";
import * as anchor from "@project-serum/anchor";

export const getpda = (wallet: WalletContextState) => {
  let address: any = "";
  if (wallet.connected && wallet) {
    try {
      const publickey = new PublicKey(wallet.publicKey ?? "");
      const type = localStorage.getItem("type");
      if (type === "batch") {
        const PROGRAM_ID = new anchor.web3.PublicKey(BATCH_TRANSFER_PROGRAM_ID);
        const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("BatchTransaction"), publickey.toBuffer()],
          PROGRAM_ID
        );
        address = pda;
      } else {
        const data = PublicKey.findProgramAddressSync(
          [publickey?.toBuffer()],
          new PublicKey(PROGRAM_ID)
        );
        address = data[0];
      }
    } catch (err) {
      console.log(err);
    }
  }
  return address;
};

export const getWithdrawData = (wallet: WalletContextState) => {
  let w_data: any;
  if (wallet.connected && wallet) {
    const publickey = new PublicKey(wallet.publicKey ?? "");
    const data = PublicKey.findProgramAddressSync(
      [Buffer.from("withdraw_sol"), publickey?.toBuffer()],
      new PublicKey(PROGRAM_ID)
    );
    w_data = data[0];
  }
  return w_data;
};

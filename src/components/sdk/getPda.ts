import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, BATCH_TRANSFER_PROGRAM_ID } from "../constants";

export const getpda = (wallet: WalletContextState) => {
  let address: any = "";
  if (wallet.connected && wallet) {
    try {
      const type = localStorage.getItem("type");
      const publickey = new PublicKey(wallet.publicKey ?? "");
      const data = PublicKey.findProgramAddressSync(
        [publickey?.toBuffer()],
        type === "batch"
          ? new PublicKey(BATCH_TRANSFER_PROGRAM_ID)
          : new PublicKey(PROGRAM_ID)
      );
      address = data[0];
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

import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "../constants";

export const getpda = (wallet: WalletContextState) => {
  let address: any = "";
  if (wallet.connected && wallet) {
    try {
      const publickey = new PublicKey(wallet.publicKey ?? "");
      address = PublicKey.findProgramAddressSync(
        [publickey?.toBuffer()],
        new PublicKey(PROGRAM_ID)
      );
    } catch (err) {
      console.log(err);
    }
  }
  return address ? address[0].toBase58() : "";
};

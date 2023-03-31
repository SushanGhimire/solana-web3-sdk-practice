import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { BATCH_TRANSFER_PROGRAM_ID } from "../constants";

export const getAnchorPda = (wallet: AnchorWallet | undefined) => {
  if (!wallet) return "";
  const PROGRAM_ID = new anchor.web3.PublicKey(BATCH_TRANSFER_PROGRAM_ID);
  const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("BatchTransaction"), wallet.publicKey.toBuffer()],
    PROGRAM_ID
  );
  return pda.toString() ?? "";
};

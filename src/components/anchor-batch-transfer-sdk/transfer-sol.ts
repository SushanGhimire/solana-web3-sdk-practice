import { Idl, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAnchorPda } from "./get-pda";
import * as anchor from "@project-serum/anchor";

export const trasfer_sol = async (
  program: Program<Idl> | undefined,
  wallet: AnchorWallet | undefined
) => {
  if (!program || !wallet) return;
  const pda = getAnchorPda(wallet);
  const amount = new anchor.BN(1 * LAMPORTS_PER_SOL);
  const signature = await program.methods
    .solTransfer(amount)
    .accounts({
      ledger: pda,
      to: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
  console.log(signature);
};

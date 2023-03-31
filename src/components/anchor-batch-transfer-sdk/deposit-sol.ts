import { Idl, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAnchorPda } from "./get-pda";
import * as anchor from "@project-serum/anchor";
import { BatchTransfer } from "../../types/batch_transfer";

export const deposit_sol = async (
  program: Program<BatchTransfer> | undefined,
  wallet: AnchorWallet | undefined
) => {
  if (!program || !wallet) return;
  try {
    const pda = getAnchorPda(wallet);
    const amount = new anchor.BN(1 * LAMPORTS_PER_SOL);
    const signature = await program.methods
      .depositSol(amount)
      .accounts({
        authority: wallet.publicKey,
        ledger: new anchor.web3.PublicKey(pda),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(signature);
  } catch (err) {
    console.log(err);
  }
};

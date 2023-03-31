import { Idl, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAnchorPda } from "./get-pda";
import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@project-serum/anchor/dist/cjs/utils/token";
import { BatchTransfer } from "../../types/batch_transfer";
import { getConnection } from "../constants";
import { getMint } from "@solana/spl-token";

export const deposit_spl = async (
  program: Program<BatchTransfer> | undefined,
  wallet: AnchorWallet | undefined,
  data: {
    mint: string;
    amount: string;
  }
) => {
  if (!program || !wallet) return;
  try {
    const mint = new anchor.web3.PublicKey(data.mint);
    const pda = getAnchorPda(wallet);
    const pdaTokenAccount = await anchor.utils.token.associatedAddress({
      mint,
      owner: new anchor.web3.PublicKey(pda),
    });
    const senderTokenAccount = await anchor.utils.token.associatedAddress({
      mint,
      owner: wallet.publicKey,
    });
    const amount = await parseTokenAmount(data.amount, data.mint);
    const signature = await program.methods
      .depositToken(amount)
      .accounts({
        ledger: pda,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        from: senderTokenAccount,
        mint,
        tokenProgram: TOKEN_PROGRAM_ID,
        vault: pdaTokenAccount,
      })
      .rpc();
    console.log(signature);
  } catch (err) {
    console.log(err);
  }
};

export const parseTokenAmount = async (amount: string, mint: string) => {
  const connection = getConnection();
  const amt = Number(amount);
  const mintInfo = await getMint(connection, new PublicKey(mint), "confirmed");
  const unitPerToken = Math.pow(10, mintInfo.decimals);
  return new anchor.BN(amt * unitPerToken);
};

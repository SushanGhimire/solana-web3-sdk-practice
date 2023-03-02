import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { CONNECTION } from "../components/constants";

export const GetTransferInstruction = async (
  instruction: TransactionInstruction,
  publickey: PublicKey
) => {
  const connection = CONNECTION;
  const transferInstruction = new Transaction();
  transferInstruction.add(instruction);

  const block = await connection.getLatestBlockhash();
  transferInstruction.recentBlockhash = block.blockhash;
  transferInstruction.feePayer = publickey;

  return transferInstruction;
};

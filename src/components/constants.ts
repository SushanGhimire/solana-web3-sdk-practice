import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const RPC_NETWORK = "devnet";
export const PROGRAM_ID = "zbcKGdAmXfthXY3rEPBzexVByT2cqRqCZb9NwWdGQ2T";
export const CONNECTION = new Connection(
  clusterApiUrl(RPC_NETWORK),
  "confirmed"
);
export const LAMPORTS = LAMPORTS_PER_SOL;

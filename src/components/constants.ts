import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const RPC_NETWORK = "devnet";
export const ANCHOR_RPC_NETWORK = "http://localhost:8899";
export const PROGRAM_ID = "7FNWTfCo3AyRBFCvr49daqKHehdn2GjNgpjuTsqy5twk";
export const ANCHOR_PROGRAM_ID = "GQbVPdXM9nTxr3gua2vj5F5CVeWoZ9MfwMHpbCgux5jN";
export const BATCH_TRANSFER_PROGRAM_ID =
  "9xxMJ1CUKS9G2AjLuZDG8i5d8Va7dqcMsXgaPsjPir66";

export const CONNECTION = new Connection(
  clusterApiUrl(RPC_NETWORK),
  "confirmed"
);
export const ANCHOR_CONNECTION = new Connection(
  ANCHOR_RPC_NETWORK,
  "confirmed"
);
export const LAMPORTS = LAMPORTS_PER_SOL;

export const token_images: any = {
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU": {
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=0244",
    symbol: "USDC",
    token_name: "USDC",
  },
  "6vvKBoSx7p33YER66LQ8VokTRHUcmxwz3iA1GSbexC5i": {
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/18860.png",
    symbol: "ZBC",
    token_name: "Zebec Protocol",
  },
  "2ibSirDWk5P68ZKmQQSxUMtiWQFRuanpPfMfaYzxgSRv": {
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
    symbol: "UKN",
    token_name: "Unknown Token",
  },
};

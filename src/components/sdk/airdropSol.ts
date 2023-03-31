import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getConnection, LAMPORTS } from "../constants";
import { fetchWalletSolBalance } from "./fetchBalances";

export const airdropSolToWallet = async (
  wallet: WalletContextState,
  setSol: any
) => {
  try {
    const connection = getConnection();
    const publickey = wallet.publicKey?.toString() ?? "";
    const requestSol = await connection.requestAirdrop(
      new PublicKey(publickey),
      LAMPORTS * 2
    );
    await connection.confirmTransaction(requestSol, "confirmed");
    fetchWalletSolBalance(wallet, setSol);
  } catch (err: any) {
    console.log(err);
    alert("too many request");
  }
};

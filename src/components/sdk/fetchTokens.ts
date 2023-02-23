import { AccountLayout, getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CONNECTION, token_images } from "../constants";

const getMintInfo = async (mint: PublicKey) => {
  const connection = CONNECTION;
  const mintData = await getMint(connection, mint);
  return Number(mintData.supply) !== 1 ? mintData : "";
};

export const fetchAllWalletTOkens = async (
  wallet: WalletContextState,
  setTokens: any
) => {
  try {
    const connection = CONNECTION;
    const publickey = new PublicKey(wallet?.publicKey ?? "");
    const tokenAccounts = await connection.getTokenAccountsByOwner(publickey, {
      programId: TOKEN_PROGRAM_ID,
    });

    tokenAccounts.value.forEach(async (token) => {
      const accountData = AccountLayout.decode(token.account.data);
      const mintData = await getMintInfo(new PublicKey(accountData.mint));
      if (!mintData) return;
      const data = {
        mint: accountData.mint.toString(),
        amount: Number(accountData.amount) / Math.pow(10, mintData.decimals),
        decimal: mintData.decimals,
        tokenInfo: token_images[accountData.mint.toString()],
      };
      setTokens((preval: any) => {
        return [...preval, data];
      });
    });
  } catch (err) {
    console.log(err);
  }
};

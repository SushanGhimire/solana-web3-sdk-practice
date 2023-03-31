import { AccountLayout, getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { AccountInfo, PublicKey, RpcResponseAndContext } from "@solana/web3.js";
import { getConnection, token_images } from "../constants";
import { getpda } from "./getPda";

const getMintInfo = async (mint: PublicKey) => {
  const connection = getConnection();
  const mintData = await getMint(connection, mint);
  return Number(mintData.supply) !== 1 ? mintData : "";
};

export const fetchAllWalletTOkens = async (
  wallet: WalletContextState,
  setTokens: any
) => {
  try {
    const connection = getConnection();
    const publickey = new PublicKey(wallet?.publicKey ?? "");
    const tokenAccounts = await connection.getTokenAccountsByOwner(publickey, {
      programId: TOKEN_PROGRAM_ID,
    });
    getTokenDetails(setTokens, tokenAccounts);
  } catch (err) {
    console.log(err);
  }
};

export const fetchPdaTokens = async (
  wallet: WalletContextState,
  setPdaTokens: any
) => {
  try {
    const connection = getConnection();
    const pdaAddress = getpda(wallet);
    // const publicKey = new PublicKey(wallet?.publicKey ?? "");
    const tokenAccounts = await connection.getTokenAccountsByOwner(pdaAddress, {
      programId: TOKEN_PROGRAM_ID,
    });
    getTokenDetails(setPdaTokens, tokenAccounts);
  } catch (err) {
    console.log(err);
  }
};

const getTokenDetails = (
  setTokens: any,
  tokenAccounts: RpcResponseAndContext<
    {
      pubkey: PublicKey;
      account: AccountInfo<Buffer>;
    }[]
  >
) => {
  tokenAccounts.value.forEach(async (token) => {
    const accountData = AccountLayout.decode(token.account.data);
    const mintData = await getMintInfo(new PublicKey(accountData.mint));
    if (!mintData) return;
    const data = {
      mint: accountData.mint.toString(),
      amount: Number(accountData.amount) / Math.pow(10, mintData.decimals),
      decimal: mintData.decimals,
      tokenInfo: token_images[accountData.mint.toString()] ?? "",
    };
    setTokens((preval: any) => {
      return [...preval, data];
    });
  });
};

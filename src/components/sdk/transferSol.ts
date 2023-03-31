import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getConnection, LAMPORTS } from "../constants";
import { getpda } from "./getPda";

export const transferSol = async (wallet: WalletContextState) => {
  try {
    const connection = getConnection();
    const publicKey = new PublicKey(wallet?.publicKey?.toString() ?? "");
    const receiver = new PublicKey(
      "6RaG6xBwfT7MKAya3VCfs9cneaTJ6iUkEP1i91XeAF9j"
    );
    const transaction = new Transaction();
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: receiver,
      lamports: LAMPORTS,
    });
    transaction.add(instruction);

    wallet
      .sendTransaction(transaction, connection)
      .then((res) => {
        console.log(res);
        alert("sol transfered");
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Transaction cannot be signed.");
      });

    // const transaction: Transaction = new Transaction().add(instruction);
    // transaction.feePayer = publicKey;
    // const block = await connection.getLatestBlockhash();
    // transaction.recentBlockhash = block.blockhash;
    // if (wallet.signTransaction) {
    //   const sign = await wallet.signTransaction(transaction);
    //   const signature = await connection.sendRawTransaction(sign.serialize());
    //   await connection.confirmTransaction(signature, "confirmed");
    //   alert("sol transfered");
    // } else {
    //   throw new Error("Transaction cannot be signed.");
    // }
  } catch (err) {
    console.log(err);
  }
};

export const depositSolToPDA = async (wallet: WalletContextState) => {
  try {
    const connection = getConnection();
    const publicKey = new PublicKey(wallet.publicKey ?? "");
    const feePayer = publicKey;
    const pdaAddress = getpda(wallet);

    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(pdaAddress),
      lamports: LAMPORTS,
    });

    const transaction = new Transaction().add(instruction);
    transaction.feePayer = feePayer;
    wallet
      .sendTransaction(transaction, connection)
      .then((res) => {
        console.log(res);
        alert("sol transfered");
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Transaction cannot be signed.");
      });
  } catch (err) {
    console.log(err);
  }
};

export const depositTokenToPda = async (
  wallet: WalletContextState,
  data: {
    mint: string;
    amount: string;
  }
) => {
  try {
    const connection = getConnection();
    const senderPublicKey = new PublicKey(wallet.publicKey ?? "");
    const mint = new PublicKey(data.mint);
    const pdaAddress = getpda(wallet);
    const amount = await parseTokenAmount(data.amount, data.mint);

    const fromTokenAccount = await getAssociatedTokenAddress(
      mint,
      new PublicKey(senderPublicKey)
    );
    const toToTokenAccount = await getAssociatedTokenAddress(
      mint,
      new PublicKey(pdaAddress),
      true
    );
    const toTokenAccInfo = await connection.getAccountInfo(toToTokenAccount);

    const transaction = new Transaction();
    if (!toTokenAccInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          senderPublicKey,
          toToTokenAccount,
          pdaAddress,
          mint
        )
      );
    }
    const tokenAccountInst = createTransferInstruction(
      fromTokenAccount,
      toToTokenAccount,
      senderPublicKey,
      amount
    );
    transaction.add(tokenAccountInst);
    transaction.feePayer = senderPublicKey;

    wallet
      .sendTransaction(transaction, connection)
      .then((res) => {
        alert("Token deposited into pda");
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const parseTokenAmount = async (amount: string, mint: string) => {
  const connection = getConnection();
  const amt = Number(amount);
  const mintInfo = await getMint(connection, new PublicKey(mint), "confirmed");
  const unitPerToken = Math.pow(10, mintInfo.decimals);
  return amt * unitPerToken;
};

// transaction.feePayer = senderPublicKey;
// const { blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash();
// transaction.recentBlockhash = blockhash;
// transaction.lastValidBlockHeight = lastValidBlockHeight;

// if (wallet.signTransaction) {
//   const sign = await wallet.signTransaction(transaction);
//   const signature = await connection.sendRawTransaction(sign.serialize());
//   await connection.confirmTransaction({signature, blockhash, lastValidBlockHeight}, "confirmed");
//   alert("Token added to pda");
// }

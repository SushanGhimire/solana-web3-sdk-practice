import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { PROGRAM_ID } from "../constants";

type Props = {};

const WalletAddresses = (props: Props) => {
  const wallet = useWallet();
  const [pda, setPda] = useState<string>("");
  const getpda = async () => {
    let address: any = "";
    if (wallet.connected && wallet) {
      try {
        const publickey = new PublicKey(wallet.publicKey ?? "");
        address = PublicKey.findProgramAddressSync(
          [publickey?.toBuffer()],
          new PublicKey(PROGRAM_ID)
        );
      } catch (err) {
        console.log(err);
      }
    }
    setPda(address ? address[0].toBase58() : "");
  };

  useEffect(() => {
    getpda();
    //eslint-disable-next-line
  }, [wallet]);
  return (
    <div className="space-y-2">
      <Card>
        <div>
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            Connected Wallet Address
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-xs">
            {wallet?.publicKey?.toString()}
          </p>
        </div>
        <div>
          <h5 className="text-lg font-bold  text-gray-900 dark:text-white">
            PDA Wallet Address
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-xs">
            {pda}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WalletAddresses;

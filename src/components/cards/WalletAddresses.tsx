import { useWallet } from "@solana/wallet-adapter-react";
import { Card } from "flowbite-react";
import { getpda } from "../sdk/getPda";

type Props = {};

const WalletAddresses = (props: Props) => {
  const wallet = useWallet();

  return (
    <div className="space-y-2">
      <Card>
        <div className="flex justify-between items-center">
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
              {getpda(wallet)?.toString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletAddresses;

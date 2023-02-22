import { Card } from "flowbite-react";
import React from "react";

type Props = {};

const WalletAddresses = (props: Props) => {
  return (
    <div className="space-y-2">
      <Card>
        <div>
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            Connected Wallet Address
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-xs">
            FocNiUwHyjBzyZ7eQqqVooqNBWyMkM2xdEtamigddbDZ
          </p>
        </div>
        <div>
          <h5 className="text-lg font-bold  text-gray-900 dark:text-white">
            PDA Wallet Address
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-xs">
            FocNiUwHyjBzyZ7eQqqVooqNBWyMkM2xdEtamigddbDZ
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WalletAddresses;

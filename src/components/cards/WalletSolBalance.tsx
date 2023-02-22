import { Card } from "flowbite-react";

type Props = {
  sol: number;
};

const WalletSolBalance = ({ sol }: Props) => {
  return (
    <div>
      <div className="max-w-sm">
        <Card>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Wallet Balance
              </h5>
            </div>
            <div className="flow-root"></div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=024"
                      alt="Neil"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                      SOL
                    </p>
                    {/* <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p> */}
                  </div>
                  <div className="inline-flex items-center font-medium text-gray-900 dark:text-white">
                    {/* $320 */}
                    {sol} SOL
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                PDA Balance
              </h5>
            </div>
            <div className="flow-root"></div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=024"
                      alt="Neil"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                      SOL
                    </p>
                    {/* <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p> */}
                  </div>
                  <div className="inline-flex items-center font-medium text-gray-900 dark:text-white">
                    {/* $320 */}
                    {sol} SOL
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WalletSolBalance;

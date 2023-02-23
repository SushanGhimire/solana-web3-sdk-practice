import { Card } from "flowbite-react";
import React from "react";

type Props = {
  tokens: any;
};

const PdaWalletTokens = ({ tokens }: Props) => {
  return (
    <div className="max-w-sm">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            PDA Wallet Tokens
          </h5>
          <div className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(tokens) &&
              tokens.map((data, index) => {
                return (
                  <li className="py-3 sm:py-4" key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={data.tokenInfo?.logo}
                          alt="Neil"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {data.tokenInfo?.symbol}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {data.tokenInfo?.token_name}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {data.amount} {data.tokenInfo?.symbol}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PdaWalletTokens;

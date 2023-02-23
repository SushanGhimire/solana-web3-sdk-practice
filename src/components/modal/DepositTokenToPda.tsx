import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { depositTokenToPda } from "../sdk/transferSol";

type Props = {
  tokens: any[];
};

const DepositTokenToPda = ({ tokens }: Props) => {
  const wallet = useWallet();
  const [open, setOpen] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{
    mint: string;
    amount: string;
  }>({
    mint: "",
    amount: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  console.log(inputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    depositTokenToPda(wallet, inputs);
  };

  return (
    <div>
      <React.Fragment>
        <Button
          outline={true}
          gradientDuoTone="purpleToBlue"
          onClick={() => {
            setOpen(true);
          }}
        >
          Deposit SPL Token
        </Button>
        <Modal
          show={open}
          size="md"
          popup={true}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Deposit Token To PDA
              </h3>
              <form action="" onSubmit={handleSubmit}>
                <div id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="tokens" value="Select Token" />
                    <select
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                      id="tokens"
                      required={true}
                      value={inputs.mint}
                      name="mint"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleOnChange(e);
                      }}
                    >
                      <option hidden>Select Token</option>
                      {tokens.map((data) => {
                        return (
                          <option key={data.tokenInfo.symbol} value={data.mint}>
                            {data.tokenInfo.token_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Token Amount" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    required={true}
                    sizing="md"
                    value={inputs.amount}
                    name="amount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChange(e);
                    }}
                  />
                </div>
                <Button className="my-5 w-full" type="submit">
                  Deposit
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default DepositTokenToPda;

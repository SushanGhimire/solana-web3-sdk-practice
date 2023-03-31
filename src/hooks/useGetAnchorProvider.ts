import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import {
  ANCHOR_CONNECTION,
  BATCH_TRANSFER_PROGRAM_ID,
} from "../components/constants";
import idl from "../utils/batch-transfer-idl.json";

const useGetAnchorProvider = () => {
  const [program, setProgram] = useState<anchor.Program>();
  const connection = ANCHOR_CONNECTION;
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (wallet) {
      let provider: anchor.Provider;

      try {
        provider = anchor.getProvider();
      } catch {
        provider = new anchor.AnchorProvider(connection, wallet, {});
        anchor.setProvider(provider);
      }

      const program = new anchor.Program(
        idl as anchor.Idl,
        BATCH_TRANSFER_PROGRAM_ID
      );
      setProgram(program);
    }
    //eslint-disable-next-line
  }, [wallet]);

  return program;
};

export default useGetAnchorProvider;

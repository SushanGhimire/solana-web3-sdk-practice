import { useState } from "react";
import ButtonActions from "../cards/ButtonActions";
import PdaWalletTokens from "../cards/PdaWalletTokens";
import WalletAddresses from "../cards/WalletAddresses";
import WalletSolBalance from "../cards/WalletSolBalance";
import WalletTokens from "../cards/WalletTokens";

type Props = {};

const Home = (props: Props) => {
  const [sol, setSol] = useState<number>(0);
  const [pdaSol, setPdaSol] = useState<number>(0);
  const [tokens, setTokens] = useState<any>([]);
  const [pdaTokens, setPdaTokens] = useState<any>([]);
  console.log(tokens);
  return (
    <div className="space-y-3">
      <ButtonActions
        setSol={setSol}
        setPdaSol={setPdaSol}
        setTokens={setTokens}
        setPdaTokens={setPdaTokens}
        tokens={tokens}
      />
      <WalletAddresses />
      <div className="grid grid-cols-3 gap-6">
        <WalletSolBalance sol={sol} pdaSol={pdaSol} />
        <WalletTokens tokens={tokens} />
        <PdaWalletTokens tokens={pdaTokens} />
      </div>
    </div>
  );
};

export default Home;

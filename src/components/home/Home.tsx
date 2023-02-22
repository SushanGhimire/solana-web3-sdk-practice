import { useState } from "react";
import ButtonActions from "../cards/ButtonActions";
import WalletAddresses from "../cards/WalletAddresses";
import WalletSolBalance from "../cards/WalletSolBalance";
import WalletTokens from "../cards/WalletTokens";

type Props = {};

const Home = (props: Props) => {
  const [sol, setSol] = useState<number>(0);
  return (
    <div className="space-y-3">
      <ButtonActions setSol={setSol} />
      <div className="grid grid-cols-3 gap-6">
        <WalletAddresses />
        <WalletSolBalance sol={sol} />
        <WalletTokens />
      </div>
    </div>
  );
};

export default Home;

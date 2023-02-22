import ButtonActions from "../cards/ButtonActions";
import WalletAddresses from "../cards/WalletAddresses";
import WalletTokens from "../cards/WalletTokens";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="space-y-3">
      <ButtonActions />
      <div className="grid grid-cols-3 gap-6">
        <WalletAddresses />
        <WalletTokens />
      </div>
    </div>
  );
};

export default Home;

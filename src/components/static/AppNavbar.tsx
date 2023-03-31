import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Navbar } from "flowbite-react";
import React from "react";

type Props = {};

const AppNavbar = (props: Props) => {
  const wallet = useWallet();
  return (
    <div>
      <Navbar className="bg-slate-200" fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {wallet?.connected ? (
            <WalletDisconnectButton />
          ) : (
            <WalletMultiButton />
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={true}
            onClick={() => localStorage.setItem("type", "")}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/batch-transfer"
            active={true}
            onClick={() => localStorage.setItem("type", "batch")}
          >
            Batch Transfer (Anchor)
          </Navbar.Link>
          <Navbar.Link
            href="/movie-review"
            active={true}
            onClick={() => localStorage.setItem("type", "")}
          >
            Movie Review (Anchor)
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

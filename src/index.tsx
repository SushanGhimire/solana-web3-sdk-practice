import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
window.Buffer = Buffer;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import ContextProvider, { Context } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
      <App />
    {/* </ContextProvider> */}
  </React.StrictMode>
);

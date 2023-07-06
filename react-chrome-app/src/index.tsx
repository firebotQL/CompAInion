import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    bottom: 20px;
    right: 20px
    z-index: 9999;
  }
`;
document.head.appendChild(globalStyles); // append to head of document, not rootElement
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

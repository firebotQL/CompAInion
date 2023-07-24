import { cssom, observe, twind } from "@twind/core";
import "construct-style-sheets-polyfill";
import React from "react";
import { createRoot } from "react-dom/client";
import config from "../twind.config";
import App from "./App";
import "./index.css";

// Create separate CSSStyleSheet
const sheet = cssom(new CSSStyleSheet());

// Use sheet and config to create a Twind instance. `tw` will
// append the right CSS to our custom stylesheet.
const tw = twind(config, sheet);

const rootElement = document.createElement("div");
rootElement.id = "companion-root";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    bottom: 0px;
    right: 0px
    z-index: 9999;
  }
`;
document.head.appendChild(globalStyles); // append to head of document, not rootElement
document.body.appendChild(rootElement);

const shadow = rootElement.attachShadow({ mode: "open" }); // Create a Shadow DOM

// link sheet target to shadow dom root
shadow.adoptedStyleSheets = [sheet.target];

// finally, observe using tw function
observe(tw, shadow);

const root = createRoot(shadow); // Attach React root to the shadow root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./popup.css";

chrome.storage.local.get(['bots'], function (data) {
  ReactDOM.render(
    <App {...data} />, 
    document.getElementById("popup")
  );
});

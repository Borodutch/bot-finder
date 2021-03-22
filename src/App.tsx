import * as React from "react";
import logo from "./logo.png";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-settings">
          Bots finder
          <input type="checkbox"></input>
        </div>
      </header>
    </div>
  );
};

export default App;

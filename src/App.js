import React, { Component } from "react";
import "./App.css";

import BlockList from "./containers/Blocks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BlockList />
      </div>
    );
  }
}

export default App;

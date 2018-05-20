import React, { Component } from "react";
import Block from "../components/Block";
import { Button } from "semantic-ui-react";

import "./Blocks.css";

class Blocks extends Component {
  state = {
    prevHash: "",
    blockList: []
  };

  setNextHash = hash => {
    this.setState({ prevHash: hash });
    console.log(this.state.prevHash);
  };

  onAddBlockClick = () => {
    let newBlock = (
      <Block
        prevHash={this.state.prevHash}
        setNextHash={hash => this.setNextHash(hash)}
      />
    );
    this.setState(prevState => ({
      blockList: [...prevState.blockList, newBlock]
    }));
  };

  render() {
    return (
      <div className="Blocks">
        <Block
          prevHash={this.state.prevHash}
          setNextHash={hash => this.setNextHash(hash)}
        />
        {this.state.blockList}
        <Button onClick={this.onAddBlockClick}>Add Block</Button>
      </div>
    );
  }
}

export default Blocks;

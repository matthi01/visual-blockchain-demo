import React, { Component } from "react";
import Block from "../components/Block";
import { Button } from "semantic-ui-react";

import "./Blocks.css";

class Blocks extends Component {
  state = {
    prevHashArr: [""],
    blockList: [
      <Block
        blockNumber={0}
        prevHash=""
        setNextHash={(blockNumber, hash) => this.setNextHash(blockNumber, hash)}
      />
    ]
  };

  setNextHash = (blockNumber, hash) => {
    let newPrevHashArr = this.state.prevHashArr.slice();
    newPrevHashArr[blockNumber + 1] = hash;

    this.setState({
      prevHashArr: newPrevHashArr
    });
    console.log(newPrevHashArr);
  };

  onAddBlockClick = () => {
    let newBlock = (
      <Block
        blockNumber={this.state.blockList.length}
        prevHash={this.state.prevHashArr[this.state.blockList.length]}
        setNextHash={(blockNumber, hash) => this.setNextHash(blockNumber, hash)}
      />
    );
    this.setState(prevState => ({
      blockList: [...prevState.blockList, newBlock]
    }));
  };

  render() {
    return (
      <div className="Blocks">
        {this.state.blockList}
        <Button onClick={this.onAddBlockClick}>Add Block</Button>
      </div>
    );
  }
}

export default Blocks;

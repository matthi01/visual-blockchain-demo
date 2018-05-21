import React, { Component } from "react";
import Block from "../components/Block";
import { Button } from "semantic-ui-react";

import "./Blocks.css";

class Blocks extends Component {
  state = {
    prevHashArr: [""],
    blocks: [
      {
        blockNumber: 0,
        prevHash: ""
      }
    ]
  };

  setNextHash = (blockNumber, hash) => {
    let newPrevHashArr = this.state.prevHashArr.slice();
    newPrevHashArr[blockNumber + 1] = hash;

    this.setState({
      prevHashArr: newPrevHashArr
    });

    // if an earlier block was altered, cycle through all hashes
    if (blockNumber + 1 < this.state.blocks.length) {
      this.cycleHashNumbers();
    }
  };

  cycleHashNumbers = () => {
    let newBlockList = this.state.blocks.slice().map((el, index) => {
      return {
        blockNumber: el.blockNumber,
        prevHash: this.state.prevHashArr[el.blockNumber]
      };
    });

    this.setState({ blocks: newBlockList });
  };

  onAddBlockClick = () => {
    let newBlock = {
      blockNumber: this.state.blocks.length,
      prevHash: this.state.prevHashArr[this.state.blocks.length]
    };

    this.setState(prevState => ({
      blocks: [...prevState.blocks, newBlock]
    }));
  };

  render() {
    let blockList = this.state.blocks.map((el, index) => {
      // console.log("index: ", index);
      // console.log("el: ", el);
      // console.log("");
      return (
        <Block
          key={el.blockNumber}
          blockNumber={el.blockNumber}
          prevHash={el.prevHash}
          setNextHash={(blockNumber, hash) =>
            this.setNextHash(blockNumber, hash)
          }
        />
      );
    });

    return (
      <div className="Blocks">
        {blockList}
        <Button onClick={this.onAddBlockClick}>Add Block</Button>
      </div>
    );
  }
}

export default Blocks;

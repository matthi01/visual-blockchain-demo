import React, { Component } from "react";
import sha256 from "js-sha256";
import { Button, Checkbox, Form } from "semantic-ui-react";

import "./Block.css";

class Block extends Component {
  state = {
    blockData: "I love vittoria",
    blockDifficulty: 3,
    previousHash: this.props.prevHash,
    blockNonce: 0,
    blockHashValue: "",
    blockMined: false,
    blockTouched: false,
    blockNumber: this.props.blockNumber
  };

  onMineClick = async () => {
    let currNonce = this.state.blockNonce;
    await this.setState({
      blockMined: false,
      blockTouched: true
    });

    while (!this.state.blockMined) {
      this.hashBlock(currNonce, true);
      if (!this.state.blockMined) {
        currNonce++;
      }
    }

    this.setState({ blockNonce: currNonce });
  };

  hashBlock = async (currNonce, mine) => {
    let hash = sha256.create();
    let hashValue;
    hash.update(this.state.previousHash);
    hash.update(this.state.blockData);
    hash.update(currNonce.toString());

    hashValue = hash.hex();

    if (!mine) {
      await this.setState({ blockHashValue: hashValue });
      this.props.setNextHash(this.state.blockNumber, hashValue);
    }

    if (
      hashValue.substr(0, this.state.blockDifficulty) ===
      "0".repeat(this.state.blockDifficulty)
    ) {
      await this.setState({
        blockMined: true,
        blockHashValue: hashValue
      });
      this.props.setNextHash(this.state.blockNumber, hashValue);
    }
  };

  onBlockDifficultyChange = event => {
    this.setState({
      blockMined: false,
      blockDifficulty: event.target.value,
      blockTouched: true
    });
    this.hashBlock(this.state.blockNonce, false);
  };

  onBlockDataChange = event => {
    this.setState({
      blockMined: false,
      blockData: event.target.value,
      blockTouched: true
    });
    this.hashBlock(this.state.blockNonce, false);
  };

  onBlockNonceChange = event => {
    this.setState({
      blockMined: false,
      blockNonce: event.target.value,
      blockTouched: true
    });
    this.hashBlock(event.target.value, false);
  };

  render() {
    let blockClassList = ["Block__Form"];
    if (this.state.blockTouched && this.state.blockMined) {
      blockClassList.push("Mined");
    } else if (this.state.blockTouched && !this.state.blockMined) {
      blockClassList.push("Not-Mined");
    }
    blockClassList = blockClassList.join(" ");
    return (
      <Form size="tiny" className={blockClassList}>
        <div>Block: {this.state.blockNumber}</div>
        <Form.Field>
          <label>Block Difficulty</label>
          <input
            placeholder="Block Difficulty"
            value={this.state.blockDifficulty}
            onChange={this.onBlockDifficultyChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Previous Hash</label>
          <input
            placeholder="Previous Hash"
            disabled
            value={this.state.previousHash}
          />
        </Form.Field>
        <Form.Field>
          <label>Data</label>
          <input
            placeholder="Data"
            value={this.state.blockData}
            onChange={this.onBlockDataChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Nonce</label>
          <input
            placeholder="Nonce"
            value={this.state.blockNonce}
            onChange={this.onBlockNonceChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Block Hash Value</label>
          <input
            placeholder="Block Hash Value"
            disabled
            value={this.state.blockHashValue}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="Mined" disabled checked={this.state.blockMined} />
        </Form.Field>
        <Button primary onClick={this.onMineClick}>
          Mine
        </Button>
      </Form>
    );
  }
}

export default Block;

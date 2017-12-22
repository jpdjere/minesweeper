import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Row extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <ol>
        {
          this.props.data.map((el,idx) => {
            return <Square
              value={el}
              key={idx}
              visibleGame={this.props.visibleGame}
              row={this.props.row}
              col={idx}
              onClick={() => this.props.click(this.props.row,idx,this.props.game,this.props.visibleGame,this.props.gameConfig,this.props.createNewGame)}>
              </Square>
          })
        }
      </ol>
    );
  }
}



function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {!props.visibleGame[props.row][props.col] ? props.value : "-"}
    </button>
  );
}

export default Row;

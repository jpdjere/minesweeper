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
            return <Square value={el} key={idx}></Square>
          })
        }
      </ol>
    );
  }
}



function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Row;

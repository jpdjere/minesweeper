import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Row from './Row'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.createNewGame();
  }

  createNewGame = async () => {
    let newGame = await createGame();
    this.setState({game:newGame.data});
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.createNewGame()}>Button</button>

        <div className="game">
          <div className="game-board">
          {this.state.game &&
            this.state.game.map((row) => {
              return <Row data={row}></Row>
            })
          }
          </div>
        </div>
      </div>
    );
  }
}



let createGame = () => {
  return new Promise(
    (resolve, reject) => {
      axios.post('/createGame',{
        rows:5,
        columns:5,
        mines:10
      }).then((res) => {
         resolve(res);
      })
    }
  )
}

export default App;

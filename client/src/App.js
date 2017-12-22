import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Row from './Row'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameConfig: {
        rows:5,
        columns:5,
        mines:10
      }
    };
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleMinesChange = this.handleMinesChange.bind(this);
  }

  handleRowChange(event) {
    this.setState({gameConfig: {
      ...this.state.gameConfig,
      rows: parseInt(event.target.value)}
    }
    );
  }

  handleColumnChange(event) {
    this.setState({gameConfig: {
      ...this.state.gameConfig,
      columns: parseInt(event.target.value)}
    }
    );
  }

  handleMinesChange(event) {
    this.setState({gameConfig: {
      ...this.state.gameConfig,
      mines: parseInt(event.target.value)
    }}
    );
  }

  createNewGame = async (gameConfig) => {
    // let newGame = await createGame(5,3,2);
    let newGame = await createGame(gameConfig.rows,gameConfig.columns,gameConfig.mines);
    this.setState({game:newGame.data});
  }

  componentDidMount(){
    this.createNewGame(this.state.gameConfig);
  }


  render() {
    return (
      <div className="App">
        <button onClick={() => this.createNewGame(this.state.gameConfig)}>Button</button>
        <InputForm gameConfig={this.state.gameConfig} changeRows={this.handleRowChange} changeColumns={this.handleColumnChange} changeMines={this.handleMinesChange}></InputForm>
        <div className="game">
          <div className="game-board">
          {this.state.game &&
            this.state.game.map((row,idx) => {
              return <Row data={row} key={idx}></Row>
            })
          }
          </div>
        </div>
      </div>
    );
  }
}



let createGame = (rows,columns,mines) => {
  return new Promise(
    (resolve, reject) => {
      axios.post('/createGame',{
        rows:rows,
        columns:columns,
        mines:mines
      }).then((res) => {
         resolve(res);
      })
    }
  )
}

function InputForm(props) {
  return (
    <form>
      <label>
        Rows:
        {/* <input type="text" pattern="[0-9]*" value={props.gameConfig.rows} onChange={props.changeRows} /> */}
        <input type="number" name="quantity" min="1" max="20" value={props.gameConfig.rows} onChange={props.changeRows} />
      </label>
      <label>
        Columns:
        <input type="number" name="quantity" min="1" max="20" value={props.gameConfig.columns} onChange={props.changeColumns} />
      </label>
      <label>
        Mines:
        <input type="number" name="quantity" min="1" max={props.gameConfig.rows*props.gameConfig.columns} value={props.gameConfig.mines} onChange={props.changeMines} />
      </label>

    </form>
  );
}

export default App;

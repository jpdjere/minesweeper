import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Row from './Row'
import InputForm from './InputForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click:{
        x:null,
        y:null
      },
      gameConfig: {
        rows:4,
        columns:4,
        mines:4
      },
      once:false
    };
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleMinesChange = this.handleMinesChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.identifyAdjacentTiles = this.identifyAdjacentTiles.bind(this);
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

  handleClick(row,col,game,visibleGame,gameConfig,createNewGame) {
    console.log(row,col);
    setTimeout(function () {

      if(game[row][col]=== '*'){
        alert("¡PERDISTE! :(\n\nEmpecemos un juego nuevo.");
        createNewGame(gameConfig);
        return;
      }
    }, 300);

    let modifiedRow = [...visibleGame[row]];
    modifiedRow[col] = false;
    let newVisibleGame = [...visibleGame];
    newVisibleGame[row] = modifiedRow;
    console.log("modifiedRow",modifiedRow);
    this.setState((state)=>({
      ...this.state,
      click:{
        x:row,
        y:col
      },
      visibleGame:newVisibleGame
    }));
    console.log("After setState");


  }

  /*--------------NOT USED---------------*/
  identifyAdjacentTiles(i,j,game,visibleGame){
    if(j === null) return;
    console.log("identifyAdjacentTiles called with: i="+i+" j="+j);
    [[-1,0],[0,1],[1,0],[0,-1]].map((el) => {

      try {
        if(game[i+el[0]][j+el[1]] !== '*'){
          let modifiedRow = [...visibleGame[i+el[0]]];
          modifiedRow[j+el[1]] = false;
          let newVisibleGame = [...visibleGame];
          newVisibleGame[i+el[0]] = modifiedRow;
          console.log("adjacent Modified",i+el[0],j+el[1]);
          this.setState({
            ...this.state,
            once:true,
            visibleGame:newVisibleGame
          })
        }
        // return;
      } catch (e) {
        console.log("Out of bounds\n-------------");
      }

    })
  }
  /*---------------------------------------*/


  createNewGame = async (gameConfig) => {
    if(gameConfig.rows*gameConfig.columns<gameConfig.mines){
      alert("Mines should be less than tiles!");
      return;
    }
    let newGame = await createGame(gameConfig.rows,gameConfig.columns,gameConfig.mines);
    this.setState({
      game:newGame.data,
      visibleGame:new Array(gameConfig.rows).fill(Array(gameConfig.columns).fill(true)),
    });
    console.log(this.state.game);

  }

  componentDidMount(){
    console.log("Component reloaded");
    this.createNewGame(this.state.gameConfig);

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("1. prevState: ",prevState);
    // console.log("2. prevState: ",prevState.click);
    // if(this.state.click.x !== null){
    //   console.log("3. Se actualizó");
    // }
    // this.identifyAdjacentTiles(this.state.click.x,this.state.click.y,this.state.game,this.state.visibleGame)
    // }

  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log("4. nextProps: ",nextProps);
  //   console.log("5. nextState: ",nextState);
  // }


  render() {
    return (
      <div className="App">
        <InputForm
          gameConfig={this.state.gameConfig}
          changeRows={this.handleRowChange}
          changeColumns={this.handleColumnChange}
          changeMines={this.handleMinesChange}>
          </InputForm>
        <button onClick={() => this.createNewGame(this.state.gameConfig)}>Create new game!</button>
        <div className="game">
          <div className="game-board">
          {this.state.game &&
            this.state.game.map((row,idx) => {
              return <Row
                data={row}
                row={idx}
                key={idx}
                visibleGame={this.state.visibleGame}
                game={this.state.game}
                click={this.handleClick}
                gameConfig={this.state.gameConfig}
                createNewGame={this.createNewGame}
                lastClick={this.state.click}
                >

                </Row>
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

export default App;

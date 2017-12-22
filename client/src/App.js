import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Row from './Row'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameConfig: {
        rows:8,
        columns:8,
        mines:5
      }
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
      visibleGame:newVisibleGame
    }));
    console.log("After setState");
    // this.identifyAdjacentTiles(row,col,game,this.state.visibleGame)
    // console.log("After identify");

  }

  identifyAdjacentTiles(i,j,game,visibleGame){
    console.log("identifyAdjacentTiles called with: i="+i+" j="+j);
    for(let y = -1; y<2; y++){
      for(let x = -1; x<2; x++){
        console.log("x and y: ", x,y);
        if(x === 0 && y === 0){
          continue;
        }
        else if(i+x<0 || j+y<0){
          continue;
        }
        else{
          try {
            if(game[i+x][j+y] !== '*'){
              let modifiedRow = [...visibleGame[i+x]];
              modifiedRow[j+y] = false;
              let newVisibleGame = [...visibleGame];
              newVisibleGame[i+x] = modifiedRow;
              console.log("adjacent Modified",i+x,j+y);
              this.setState({
                ...this.state,
                visibleGame:newVisibleGame
              })
              // this.identifyAdjacentTiles(i+x,j+y,game,this.state.visibleGame)
            }
            return;
          } catch (e) {
            // console.log("error: ",e);
          }
        }

      }
    }

  }

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
    // console.log("this.state.visibleGame");
    // console.log(this.state.visibleGame);
    // console.log(obj);
  }

  componentDidMount(){
    console.log("Component reloaded");
    this.createNewGame(this.state.gameConfig);


  }


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



let identifyAdjacentTiles2 = (i,j,game,visibleGame) => {
  console.log("identifyAdjacentTiles called with: i="+i+" j="+j);
  for(let y = -1; y<2; y++){
    for(let x = -1; x<2; x++){
      console.log("x and y: ", x,y);
      if(x === 0 && y === 0){
        continue;
      }
      else if(i+x<0 || j+y<0){
        continue;
      }
      else{
        try {
          if(game[i+x][j+y] !== '*'){
            let modifiedRow = [...visibleGame[i+x]];
            modifiedRow[j+y] = false;
            let newVisibleGame = [...visibleGame];
            newVisibleGame[i+x] = modifiedRow;
            console.log("adjacent Modified",i+x,j+y);
            this.setState({
              ...this.state,
              visibleGame:newVisibleGame
            })
            // identifyAdjacentTiles(i+x,j+y,game,this.state.visibleGame)
          }
        } catch (e) {
          // console.log("error: ",e);
        }
      }
      return;
    }
  }

}
export default App;

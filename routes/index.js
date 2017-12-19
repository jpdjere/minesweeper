const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/createGame', (req,res) => {
  let {rows, columns, mines} = req.body
  let board = createBoard(rows, columns);
  let minedBoard = fillBoard(mines,board,rows,columns);
  let fullBoard = fillCount(minedBoard,rows,columns);
  res.send(fullBoard)
})

let createBoard = (rows, columns) => {
  let board = [];
  for(let i = 0;i<rows;i++){
    let row = [];
    for(let j = 0;j<columns;j++){
      row.push(null);
    }
    board.push(row);
  }
  return board;
}

let fillBoard = (mines,board,rows,columns) => {
  let minesArray = new Array(mines).fill(true);

  while(mines > 0){
    let randomRow = _.sample(_.range(rows));
    let randomColumn = _.sample(_.range(columns));
    if(board[randomRow][randomColumn] === null){
      board[randomRow][randomColumn] = '*';
      mines--;
    }
  }
  // console.log(board);
  return board
}

let fillCount = (board,rows,columns) => {

  for(let i = 0;i<rows;i++){
    for(let j = 0;j<columns;j++){
      let count = 0;
      if(board[i][j] === '*'){
        console.log("Mine found, skip step");
        continue;
      }else{
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
                console.log(board);
                console.log("i+x",i+x);
                console.log("j+y",j+y);
                if(board[i+x][j+y] === '*'){
                  count++;
                }
              } catch (e) {
                console.log("error: ",e);
              }
            }
          }
        }


      }
      board[i][j] = count;
    }
  }
  console.log(board);
  return board;

}
// fillBoard(10,createBoard(5, 5, 10),5,5);
module.exports = router;

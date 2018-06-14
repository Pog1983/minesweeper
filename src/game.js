// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
  constructor(numberOfRows, numberOfColomns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColomns, numberOfBombs);
  };

  playMove(rowIndex, colIndex) {
    this._board.flipTile(rowIndex, colIndex);
    if (this._board.playerBoard[rowIndex][colIndex] === 'B') {
      console.log('Game over, bro!');
      this._board.print(this._board.playerBoard);
    } else if (this._board.hasSafeTiles()) {
      console.log('You win. Init dat special!');
    } else {
      console.log('Current Board:');
      this._board.print(this._board.playerBoard);
    };
  };
};

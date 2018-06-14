export class Board {
  constructor(numberOfRows, numberOfColomns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColomns;
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColomns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColomns, numberOfBombs);
  };

  get playerBoard() {
    return this._playerBoard;
  };

  flipTile (rowIndex, colIndex) {
    if (this._playerBoard[rowIndex][colIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
      this._playerBoard[rowIndex][colIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][colIndex] = this.getNumOfNeighborBombs(rowIndex, colIndex);
    };// end if/else control flow
    this._numberOfTiles--;
  };// flipTile() end

  getNumOfNeighborBombs (rowIndex, colIndex) {
    let neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0,-1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numOfRows = this._bombBoard.length;
    const numOfCols = this._bombBoard[0].length;
    let numOfBombs = 0;
    neighborOffsets.forEach(offSet => {
      const neighborRowIndex = rowIndex + offSet[0];
      const neighborColIndex = colIndex + offSet[1];
      if (neighborRowIndex >= 0 && neighborColIndex >= 0 &&
          neighborRowIndex < neighborOffsets.length &&
          neighborColIndex < neighborOffsets.length) {
        if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
          numOfBombs++;
        }; // bomb check
      }; // bounds check
    });// end .foreach() call
    return numOfBombs;
  };// end getNumOfNeighborBombs

  hasSafeTiles () {
    return this._numberOfBombs === this._numberOfTiles;
  };//end hasSafeTiles()

  print (board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  };

  generatePlayerBoard (numRows, numCols) {
    let board = [];

    for (let rows = 0; rows < numRows; rows++) {
      let row = [];
        for (let col = 0; col < numCols ; col++) {
          row.push(' ');
        };
      board.push(row);
    };

    return board;
  }; // end generatePlayerBoard()

  generateBombBoard (numRows, numCols, numBombs) {
    let board = [];

    for (let rows = 0; rows < numRows; rows++) {
      let row = [];
        for (let col = 0; col < numCols ; col++) {
          row.push(null);
        };
      board.push(row);
    };

    let numOfBombsPlaced = 0;

    while (numOfBombsPlaced < numBombs) {
      const  randomRowIndex = Math.floor(Math.random() * numRows);
      const randomColIndex = Math.floor(Math.random() * numCols);

      if (board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numOfBombsPlaced++;
      };
    };

    return board;
  }; // end generateBombBoard()
};

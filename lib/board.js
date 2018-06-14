'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColomns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColomns;
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColomns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColomns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, colIndex) {
      if (this._playerBoard[rowIndex][colIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
        this._playerBoard[rowIndex][colIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][colIndex] = this.getNumOfNeighborBombs(rowIndex, colIndex);
      }; // end if/else control flow
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumOfNeighborBombs',
    // flipTile() end

    value: function getNumOfNeighborBombs(rowIndex, colIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numOfRows = this._bombBoard.length;
      var numOfCols = this._bombBoard[0].length;
      var numOfBombs = 0;
      neighborOffsets.forEach(function (offSet) {
        var neighborRowIndex = rowIndex + offSet[0];
        var neighborColIndex = colIndex + offSet[1];
        if (neighborRowIndex >= 0 && neighborColIndex >= 0 && neighborRowIndex < neighborOffsets.length && neighborColIndex < neighborOffsets.length) {
          if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
            numOfBombs++;
          }; // bomb check
        }; // bounds check
      }); // end .foreach() call
      return numOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    // end getNumOfNeighborBombs

    value: function hasSafeTiles() {
      return this._numberOfBombs === this._numberOfTiles;
    }
  }, {
    key: 'print',
    //end hasSafeTiles()

    value: function print(board) {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numRows, numCols) {
      var board = [];

      for (var rows = 0; rows < numRows; rows++) {
        var row = [];
        for (var col = 0; col < numCols; col++) {
          row.push(' ');
        };
        board.push(row);
      };

      return board;
    }
  }, {
    key: 'generateBombBoard',
    // end generatePlayerBoard()

    value: function generateBombBoard(numRows, numCols, numBombs) {
      var board = [];

      for (var rows = 0; rows < numRows; rows++) {
        var row = [];
        for (var col = 0; col < numCols; col++) {
          row.push(null);
        };
        board.push(row);
      };

      var numOfBombsPlaced = 0;

      while (numOfBombsPlaced < numBombs) {
        var randomRowIndex = Math.floor(Math.random() * numRows);
        var randomColIndex = Math.floor(Math.random() * numCols);

        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numOfBombsPlaced++;
        };
      };

      return board;
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }]);

  return Board;
}();

;
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

const Square=({ value, onClick })=> {

  return (
    <button className="Square" onClick={onClick}>
      {value}
    </button>
  );
}

const Restart=({ onClick }) => {

  return (
    <button className="Restart" onClick={onClick}>
      Play again
    </button>
  );
}

const Game=()=> {
  const [ Squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(Squares);

  const getStatus=()=> {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(Squares)) {
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  }

  const renderSquare=(i)=> {
    return (
      <Square
        value={Squares[i]}
        onClick={() => {
          if (Squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = Squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  const renderRestartButton=()=> {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="Container">
      <div className="Game">
        <div className="Game-board">
          <div className="boardrow">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="boardrow">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="boardrow">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="Game-info">{getStatus()}</div>
        <div className="Restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}
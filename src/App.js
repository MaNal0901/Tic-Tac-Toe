import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    playWinterMusic();
  }, []);

  function startGame() {
    if (playerX.trim() !== "" && playerO.trim() !== "") {
      setGameStarted(true);
    } else {
      alert("Veuillez entrer les noms des deux joueurs !");
    }
  }

  return (
    <div className="App">
      <h1>Jeu du Morpion</h1>
      {!gameStarted ? (
        <div>
          <input
            type="text"
            placeholder="Nom du joueur X"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom du joueur O"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <button onClick={startGame}>Commencer le jeu</button>
        </div>
      ) : (
        <Board playerX={playerX} playerO={playerO} />
      )}
    </div>
  );
}

function playWinterMusic() {
  const audio = new Audio(
    "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
  );
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
}

function Board({ playerX, playerO }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    const winnerName = winner === "X" ? playerX : playerO;
    status = `${winnerName} a gagné ! 🎉`;
  } else {
    status = `Prochain tour : ${xIsNext ? playerX : playerO} (${
      xIsNext ? "X" : "O"
    })`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value === "X" ? "X" : value === "O" ? "O" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;

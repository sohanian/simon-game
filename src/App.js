import React from "react";
import "./App.css";

import Broadcaster from "./Broadcaster";
import GameState from "./GameState";
import Button from "./Button";

const INTERVAL = 1000;
const colors = ["green", "red", "blue", "yellow"];

let sequence = null;
const broadcaster = new Broadcaster();

const App = () => {
  const [simonSays, setSimonSays] = React.useState([]);
  const [playerSays, setPlayerSays] = React.useState([]);
  const [gameState, setGameState] = React.useState("NONE");
  const [muted, setMuted] = React.useState(false);


  const simonTurn = () => {
    const newSimonSays = [
      ...simonSays,
      colors[Math.floor(Math.random() * colors.length)]
    ];

    setSimonSays(newSimonSays);
    setPlayerSays([]);

    let i = 0;
    sequence = setInterval(() => {
      if (i < newSimonSays.length) {
        broadcaster.broadcast(newSimonSays[i++]);
      } else {
        clearInterval(sequence);
      }
    }, INTERVAL);
  };

  const newGame = () => {
    setSimonSays([]);
    setPlayerSays([]);
    setGameState("PLAYING");
    simonTurn();
  };

  const endGame = () => {
    clearInterval(sequence);
    setSimonSays([]);
    setPlayerSays([]);
    setGameState("FAIL");
  };

  const playerClick = color => {
    const newPlayerSays = [...playerSays, color];

    setPlayerSays(newPlayerSays);

    if (simonSays[newPlayerSays.length - 1] !== color) {
      endGame();
    }

    if (simonSays.length === newPlayerSays.length) {
      simonTurn();
    }
  };

  const toggleMute = evnt => setMuted(!!evnt.target.checked);

  const isPlayerTurn = gameState === "PLAYING" && simonSays.length !== playerSays.length;

  return (
    <div className="game">
      <GameState
        round={simonSays.length}
        gameState={gameState}
        newGame={newGame}
        toggleMute={toggleMute}
        muted={muted}
      />

      {colors.map(color => (
        <Button
          color={color}
          key={color}
          isPlayerTurn={isPlayerTurn}
          broadcaster={broadcaster}
          playerClick={playerClick}
          muted={muted}
        />
      ))}
    </div>
  );
};


export default App;

import React from "react";
import "./App.css";

import Broadcaster from "./Broadcaster";
import GameState from "./GameState";
import Button from "./Button";

const INTERVAL = 1000;
const colors = ["green", "red", "blue", "yellow"];

class App extends React.Component {
  state = {
    simonSays: [],
    playerSays: [],
    gameState: "NONE",
    muted: false,
  };

  broadcaster = new Broadcaster();

  newGame = () => {
    this.setState({
      simonSays: [],
      playerSays: [],
      gameState: "PLAYING"
    });

    this.simonTurn();
  };

  endGame = () => 
    this.setState({
      simonSays: [],
      playerSays: [],
      gameState: "FAIL",
    });

  setMute = (evnt) =>
    this.setState({
      muted: !!evnt.target.checked,
    });

  simonTurn = () => {
    const simonSays = [
      ...this.state.simonSays,
      colors[Math.floor(Math.random() * colors.length)]
    ];

    this.setState({
      simonSays,
      playerSays: [],
    });

    let i = 0;
    let sequence = setInterval(() => {
      if (i < simonSays.length) {
        this.broadcaster.broadcast(simonSays[i++]);
      } else {
        clearInterval(sequence);
      }
    }, INTERVAL);
  };

  playerClick = color => {
    const { simonSays } = this.state;

    const playerSays = [...this.state.playerSays, color];

    this.setState({
      playerSays
    });

    if (simonSays[playerSays.length - 1] !== color) {
      return this.endGame();
    }

    if (simonSays.length === playerSays.length) {
      return this.simonTurn();
    }
  };

  render() {
    const { simonSays, playerSays, gameState, muted } = this.state;
    const isPlayerTurn =
      gameState === "PLAYING" && simonSays.length !== playerSays.length;

    return (
      <div className="App">
        <GameState
          round={simonSays.length}
          gameState={gameState}
          newGame={this.newGame}
          setMute={this.setMute}
          muted={muted}
        />

        {colors.map(color => (
          <Button
            color={color}
            key={color}
            isPlayerTurn={isPlayerTurn}
            broadcaster={this.broadcaster}
            playerClick={this.playerClick}
            muted={muted}
          />
        ))}
      </div>
    );
  }
}

export default App;

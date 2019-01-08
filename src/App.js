import React from "react";
import "./App.css";

import Broadcaster from "./Broadcaster";
import GameState from "./GameState";
import Button from "./Button";

const colors = ["green", "red", "blue", "yellow"];

class App extends React.Component {
  state = {
    simonSays: [],
    playerSays: [],
    gameState: "NONE"
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

  endGame = () => {
    this.setState({
      simonSays: [],
      playerSays: [],
      gameState: "FAIL"
    });
  };

  simonTurn = () => {
    const simonSays = [
      ...this.state.simonSays,
      colors[Math.floor(Math.random() * colors.length)]
    ];

    this.setState({
      simonSays,
      playerSays: [],
    });

    setTimeout(() => {
      for (let i = 0; i < simonSays.length; i++) {
        setTimeout(() => {
          this.broadcaster.broadcast(simonSays[i]);
        }, 750 * i);
      }
    }, 1000);
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
    const { simonSays, playerSays, gameState } = this.state;
    const isPlayerTurn =
      gameState === "PLAYING" && simonSays.length !== playerSays.length;

    return (
      <div className="App">
        <GameState
          round={simonSays.length}
          gameState={gameState}
          newGame={this.newGame}
        />

        {colors.map(color => (
          <Button
            color={color}
            key={color}
            isPlayerTurn={isPlayerTurn}
            broadcaster={this.broadcaster}
            playerClick={this.playerClick}
          />
        ))}
      </div>
    );
  }
}

export default App;

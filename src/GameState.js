import React from "react";

const GameState = ({ gameState, round, newGame }) => {
  let state;
  if (gameState === "PLAYING") {
    state = <div>Round {round}, Light!</div>;
  } else if (gameState === "FAIL") {
    state = <div>You failed! <span onClick={newGame} className="clickable">Start Over</span></div>;
  } else {
    state = <div onClick={newGame} className="clickable">Start Game</div>;
  }

  return <div className="gameState">{state}</div>;

};

export default GameState;
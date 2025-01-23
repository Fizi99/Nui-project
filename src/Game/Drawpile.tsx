import React, { useContext } from "react";
import { useState } from "react";
import { Deck } from "./game";
import { GameContext } from "../App";

interface Props {
  deck: Deck;
}

export function Drawpile() {
  const { currentGame, setCurrentGame } = useContext(GameContext);
  return (
    <div
      style={{
        width: "5em",
        backgroundColor: "grey",
        padding: "10px",
        borderRadius: "5px",
        color: "#fff",
      }}
      onClick={() => {
        if (currentGame != null) {
          let newgame = Object.create(currentGame);
          newgame.players[newgame.currentPlayerIndex].drawCards(
            newgame.deck,
            1
          );
          if (setCurrentGame) {
            setCurrentGame(newgame);
          }
        }
      }}
    >
      <h1>Deck</h1>
    </div>
  );
}

import React, { useContext } from "react";
import { useState } from "react";
import { Card } from "./game";
import { GameContext } from "../App";

interface Props {
  discardPile?: Card[];
}

export function Discardpile() {
  const { currentGame } = useContext(GameContext);
  return (
    <div
      style={{
        width: "5em",
        backgroundColor: currentGame
          ? currentGame.discardPile[currentGame.discardPile.length - 1].color
          : "black",
        padding: "10px",
        borderRadius: "5px",
        color: "#fff",
      }}
    >
      <h1>
        {currentGame
          ? currentGame.discardPile[currentGame.discardPile.length - 1].value
          : "no Game"}
      </h1>
    </div>
  );
}

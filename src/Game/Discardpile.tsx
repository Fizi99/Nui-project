import { useContext } from "react";
import { GameContext } from "../App";

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

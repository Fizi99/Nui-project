import React, { useContext } from "react";
import { Discardpile } from "./Discardpile";
import { Drawpile } from "./Drawpile";
import { Playerhand } from "./Playerhand";
import { GameContext } from "../App";

export function Gameboard() {
  const { currentGame } = useContext(GameContext);
  return (
    <div>
      <ul>
        <li>
          <Discardpile></Discardpile>
        </li>
        <li>
          <Drawpile></Drawpile>
        </li>
        {currentGame
          ? currentGame.players.map((player, index) => (
              <Playerhand index={index}></Playerhand>
            ))
          : []}
      </ul>
    </div>
  );
}

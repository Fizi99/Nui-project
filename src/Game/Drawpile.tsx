// import { GameContext } from "../App";

import { getState, setState } from "playroomkit";
import { Game, Player } from "./game";
import { useState } from "react";

export function Drawpile() {
  // const { currentGame, setCurrentGame } = useContext(GameContext);
  //  const { counter, game, trackingData, counterIncremented, changeName } =
  //     useGameEngine();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  return (
    <ul>
      <li>
        <div
          style={{
            width: "5em",
            backgroundColor: "grey",
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
          }}
          onClick={() => {
            if (getState("game")) {
              let gameInstance = new Game([""]);
              gameInstance.fromGameState(getState("game"));
              gameInstance.drawCards(currentPlayerIndex, 1);
              setState("game", gameInstance.toGameState(), true);
            }
          }}
        >
          <h1>Deck</h1>
        </div>
      </li>
      {getState("game")
        ? getState("game").players.map(
            (player: Player, playerIndex: number) => {
              //console.log(player);
              return (
                <button
                  onClick={() => {
                    setCurrentPlayerIndex(playerIndex);
                  }}
                >
                  player: {player.name}
                </button>
              );
            }
          )
        : "no Game"}
    </ul>
  );
}

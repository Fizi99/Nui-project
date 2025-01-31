import { Game } from "./game";
import { getState, setState } from "playroomkit";
import { Gameboard } from "./Gameboard";
import { useState } from "react";

interface Props {
  playerIndex: number;
  playerListWithoutHost: string[];
}

export function HostStartPage({
  playerIndex: playerIndex,
  playerListWithoutHost: playerListWithoutHost,
}: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div>
      <ul
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        {/* check if game is started. if not, show option to start, else show gameboard*/}
        {!gameStarted ? (
          <ul>
            <li>
              wait for every player to start their tracking service, then press
              play! host is: {playerIndex}
            </li>
            <li>
              <button
                onClick={() => {
                  let gameInstance = new Game(playerListWithoutHost);
                  setState("game", gameInstance.toGameState(), true);
                  setGameStarted(true);
                }}
              >
                play!
              </button>
            </li>
          </ul>
        ) : getState("game") && getState("game").players.length > 0 ? (
          <Gameboard></Gameboard>
        ) : (
          "something went wrong! (vllt die reihenfolge der statechanges?)"
        )}
      </ul>
    </div>
  );
}

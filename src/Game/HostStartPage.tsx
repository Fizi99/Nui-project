import { Game } from "./game";
import { getState, setState } from "playroomkit";
import { useState } from "react";
import { DeviceRegisterPage } from "./DeviceRegisterPage";

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
    <div style={{ width: "100%", height: "100%" }}>
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
        // after initializing the game, register playerpositions
        <DeviceRegisterPage></DeviceRegisterPage>
      ) : (
        "something went wrong! (vllt die reihenfolge der statechanges?)"
      )}
    </div>
  );
}

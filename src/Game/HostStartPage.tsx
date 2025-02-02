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
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <li>
            Tippe, um die Positionen der Spieler zu registrieren: {playerIndex}
          </li>
          <li>
            <button
              onClick={() => {
                let gameInstance = new Game(playerListWithoutHost);
                setState("game", gameInstance.toGameState(), true);
                setGameStarted(true);
              }}
            >
              Starte die Registrierung!
            </button>
          </li>
        </ul>
      ) : getState("game") && getState("game").players.length > 0 ? (
        // after initializing the game, register playerpositions
        <DeviceRegisterPage></DeviceRegisterPage>
      ) : (
        "something went wrong!"
      )}
    </div>
  );
}

// import { GameContext } from "../App";
import { Playerhand } from "./Playerhand";
import { getState } from "playroomkit";

interface Props {
  playerIndex: number;
}

export function PlayerStartPage({ playerIndex: playerIndex }: Props) {
  //console.log(getState("game"));
  return (
    <div>
      <ul
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        {/* only show playerhand, if game is started, gamestate exists and game has more than 0 players*/}
        {getState("game") && getState("game").players.length > 0 ? (
          <li>
            <Playerhand playerIndex={playerIndex}></Playerhand>
          </li>
        ) : (
          <li>"wait for host to start the game"</li>
        )}
      </ul>
    </div>
  );
}

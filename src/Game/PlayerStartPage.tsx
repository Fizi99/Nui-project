// import { GameContext } from "../App";
import { getState } from "playroomkit";
import { PlayerhandNew } from "./PlayerhandNew";

interface Props {
  playerIndex: number;
}

export function PlayerStartPage({ playerIndex: playerIndex }: Props) {
  //console.log(getState("game"));
  return (
    <div>
      {/* only show playerhand, if game is started, gamestate exists and game has more than 0 players*/}
      {getState("game") &&
      getState("game").players.length > 0 &&
      getState("game").started ? (
        <PlayerhandNew playerIndex={playerIndex}></PlayerhandNew>
      ) : (
        <div>"wait for host to start the game"</div>
      )}
    </div>
  );
}

// import { GameContext } from "../App";
import { UnoCard } from "./UnoCard";
import { Card } from "./game";
import { getState } from "playroomkit";

interface Props {
  playerIndex: number;
}

export function Playerhand({ playerIndex: playerIndex }: Props) {
  // const { currentGame } = useContext(GameContext);
  //const { game } = useGameEngine();
  return (
    <div>
      <ul
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <li>
          {getState("game")
            ? getState("game").players[playerIndex].name + "s hand"
            : "no game"}
        </li>
        {getState("game")
          ? getState("game").players[playerIndex].hand.map(
              (_card: Card, cardIndex: number) => {
                //console.log(card);
                return (
                  <UnoCard
                    handIndex={cardIndex}
                    playerIndex={playerIndex}
                  ></UnoCard>
                );
              }
            )
          : "no Game"}
      </ul>
    </div>
  );
}

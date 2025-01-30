// import { GameContext } from "../App";
import { UnoCard } from "./UnoCard";
import { Card } from "./game";
import { getState } from "playroomkit";

interface Props {
  index: number;
}

export function Playerhand({ index }: Props) {
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
            ? getState("game").players[index].name + "s hand"
            : "no game"}
        </li>
        {getState("game")
          ? getState("game").players[index].hand.map(
              (card: Card, cardIndex: number) => {
                console.log(card);
                return (
                  <UnoCard handIndex={cardIndex} playerIndex={index}></UnoCard>
                );
              }
            )
          : "no Game"}
      </ul>
    </div>
  );
}

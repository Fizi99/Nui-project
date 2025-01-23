import { useContext } from "react";
import { GameContext } from "../App";
import { UnoCard } from "./UnoCard";

interface Props {
  index: number;
}

export function Playerhand({ index }: Props) {
  const { currentGame } = useContext(GameContext);
  return (
    <div>
      <ul
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <li>
          {currentGame
            ? currentGame.currentPlayerIndex === index
              ? currentGame.players[index].name + "s turn"
              : currentGame.players[index].name
            : "no Game"}
        </li>
        {currentGame
          ? currentGame.players[index].hand.map((card, cardIndex) => (
              <UnoCard
                card={card}
                handIndex={cardIndex}
                player={currentGame.players[index]}
              ></UnoCard>
            ))
          : "no Game"}
      </ul>
    </div>
  );
}

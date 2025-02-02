import { getState } from "playroomkit";
import { Card } from "./game";
import { DrawPileCard } from "./DrawPileCard";
import { PlayerDevice } from "./Device";

interface Props {
  playerDevices: PlayerDevice[];
}

export function Drawpile({ playerDevices }: Props) {
  const game = getState("game");

  return (
    <div
      style={{
        width: "5em",
        height: "8em",
        background: "linear-gradient(-45deg, #008B8B, #008B8B, rgba(0,0,0,0.2))",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        borderRadius: "10px",
        display: "flex",
        position: "relative",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        touchAction: "none",
        zIndex: 2,
      }}
    >
      {game.deck.map((_card: Card, index: number) => {
        return (
          <DrawPileCard
            index={index}
            playerDevices={playerDevices}
          ></DrawPileCard>
        );
      })}
    </div>
  );
}

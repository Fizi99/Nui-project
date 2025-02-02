import { getState, setState } from "playroomkit";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Game } from "./game";

interface Props {
  handIndex: number;
  playerIndex: number;
  cardDrawn: boolean;
}

export function PlayerhandCard({ handIndex, playerIndex, cardDrawn }: Props) {
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const card = getState("game").players[playerIndex].hand[handIndex];
  const bind = useDrag(
    ({ down, movement: [ox, oy], xy: [_x, y] }) => {
      // if player lets card go, check where it is positioned
      if (!down) {
        // if card is at left right top or bottom screenborder, register the playerposition
        if (y < (innerHeight / 100) * 10) {
          // Play the card
          const gameState = getState("game");
          if (gameState != null) {
            let gameInstance = new Game([""]);
            gameInstance.fromGameState(gameState);

            // Play the card
            gameInstance.playCard(playerIndex, handIndex);
            setState("game", gameInstance.toGameState(), true);
          }
        }
        api.start({ x: 0, y: 0, immediate: down });
        return;
      }

      // animate movement
      api.start({
        x: ox,
        y: oy,
        immediate: down,
        config: {
          tension: 0, // Remove spring tension
          friction: 0, // Remove friction
        },
      });
    },
    {
      //bounds: { top: -window.innerHeight },
      rubberband: false, // Disable rubberband effect
    }
  );

  if (
    cardDrawn &&
    handIndex === getState("game").players[playerIndex].hand.length - 1
  ) {
    api.start({
      from: {
        x: -100,
        y: -100,
      },
      to: { x: 0, y: 0 },
    });
  }

  return (
    <animated.div {...bind()} style={{ x, y, position: "relative" }}>
      <div
        style={{
          width: "5em",
          height: "8em",

          background:
            card.value === "shuffle"
              ? `linear-gradient(-45deg, blue, yellow, red, green, rgba(0,0,0,1))`
              : `linear-gradient(-45deg, ${card.color}, ${card.color}, rgba(0,0,0,1))`,
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "3px solid white",
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        {/* Top number */}
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>

        {/* Center large number */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "1.2em" : "1.8em",
            fontWeight: "bold",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>

        {/* Bottom number (rotated) */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
            transform: "rotate(180deg)",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>
      </div>
    </animated.div>
  );
}

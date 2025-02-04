import { getState, setState } from "playroomkit";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { PlayerDevice } from "./Device";
import { useRef, useState } from "react";
import { Game } from "./game";

interface Props {
  index: number;
  playerDevices: PlayerDevice[];
}

export function DrawPileCard({ playerDevices }: Props) {
  // get position of discardpile and save it in react state
  const [_cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const elementRef = useRef<any>(null);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  const bind = useDrag(({ down, movement: [ox, oy], xy: [x, y] }) => {
    // if player lets card go, check where it is positioned
    if (!down) {
      // if card is dropped over playericon, draw it to that player
      playerDevices.forEach((element: PlayerDevice) => {
        if (
          x < element.x + 90 &&
          x > element.x - 90 &&
          y < element.y + 90 &&
          y > element.y - 90
        ) {
          drawCardToPlayer(element.index);
          return;
        }
      });

      api.start({ x: 0, y: 0, immediate: down });
      return;
    }

    // set current screen position state
    if (elementRef.current != null) {
      const rect = elementRef?.current?.getBoundingClientRect();
      setCardPosition({ x: rect.x, y: rect.y });
    }

    // animate movement
    api.start({
      x: ox,
      y: oy,
      immediate: down,
    });
  });

  // draw that card to some player by index
  const drawCardToPlayer = (playerIndex: number) => {
    // draw the card
    const gameState = getState("game");
    if (gameState != null) {
      let gameInstance = new Game([""]);
      gameInstance.fromGameState(gameState);
      gameInstance.drawCards(playerIndex, 1);
      setState("game", gameInstance.toGameState(), true);
    }
  };

  return (
    <animated.div
      {...bind()}
      style={{ x, y, overflow: "hidden", position: "fixed" }}
      ref={elementRef}
    >
      <div
        style={{
          width: "5em",
          height: "8em",
          background:
            "linear-gradient(-45deg, #008B8B, #008B8B, rgba(0,0,0,1))",
          animation: "gradient 15s ease infinite",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "3px solid white",
          cursor: "pointer",
          touchAction: "none",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "1.0em",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          DigiFlip
        </div>
      </div>
    </animated.div>
  );
}

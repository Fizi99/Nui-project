import { getState } from "playroomkit";
import { animated, useSpring } from "@react-spring/web";
import { PlayerDevice } from "./Device";

interface Props {
  index: number;
  playerDevice?: PlayerDevice;
  discardPileX: number;
  discardPileY: number;
}

export function DiscardPileCard({
  index,
  playerDevice,
  discardPileX,
  discardPileY,
}: Props) {
  const [props, _api] = useSpring(() => ({
    from: {
      left: playerDevice ? playerDevice.x : discardPileX,
      top: playerDevice ? playerDevice.y : discardPileY,
    },
    to: {
      left: discardPileX,
      top: discardPileY,
    },
  }));

  const game = getState("game");

  return (
    <animated.div style={{ ...props, position: "fixed", zIndex: "100" }}>
      <div
        style={{
          width: "5em",
          height: "8em",
          backgroundColor: game ? game.discardPile[index].color : "black",
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
        }}
      >
        {game ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                color: "white",
                fontSize: isNaN(Number(game.discardPile[index].value))
                  ? "0.6em"
                  : "0.9em",
                fontWeight: "bold",
              }}
            >
              {game ? game.discardPile[index].value : "no value"}
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: isNaN(Number(game.discardPile[index].value))
                  ? "1.2em"
                  : "1.8em",
                fontWeight: "bold",
              }}
            >
              {game ? game.discardPile[index].value : "no value"}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                color: "white",
                fontSize: isNaN(Number(game.discardPile[index].value))
                  ? "0.6em"
                  : "0.9em",
                fontWeight: "bold",
                transform: "rotate(180deg)",
              }}
            >
              {game ? game.discardPile[index].value : "no value"}
            </div>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "0.9em",
              fontWeight: "bold",
            }}
          >
            no Game
          </div>
        )}
      </div>
    </animated.div>
  );
}

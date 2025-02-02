import { getState, usePlayersList } from "playroomkit";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface Props {
  index: number;
  registerDevice: (index: number, x: number, y: number) => void;
}

export function DeviceRegisterCard({ index, registerDevice }: Props) {
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  const bind = useDrag(({ down, movement: [ox, oy], xy: [x, y] }) => {
    // if player lets card go, check where it is positioned
    if (!down) {
      // if card is at left right top or bottom screenborder, register the playerposition
      if (
        x < (innerWidth / 100) * 10 ||
        x > (innerWidth / 100) * 90 ||
        y > (innerHeight / 100) * 90 ||
        y < (innerHeight / 100) * 10
      ) {
        registerDevice(index, x, y);
      }
      api.start({ x: 0, y: 0, immediate: down });
      return;
    }

    // animate movement
    api.start({
      x: ox,
      y: oy,
      immediate: down,
    });
  });

  return (
    <animated.div
      {...bind()}
      style={{ x, y, overflow: "hidden", position: "absolute" }}
    >
      <div
        style={{
          width: "5em",
          height: "8em",
          backgroundColor: "lightgray",
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
          cursor: "pointer",
          touchAction: "none",
          color: "black",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "0.5em" }}>
          {getState("game")
            ? getState("game").players[index].name
            : "no player found!"}
        </div>
        <img
          src={usePlayersList(true)[index].getProfile().photo}
          style={{ width: "100%" }}
          draggable="false"
        ></img>
      </div>
    </animated.div>
  );
}

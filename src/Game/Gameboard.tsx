import { Discardpile } from "./Discardpile";
import { Drawpile } from "./Drawpile";
import { PlayerIcon } from "./PlayerIcon";
import { PlayerDevice } from "./Device";

interface Props {
  playerDevices: PlayerDevice[];
}

export function Gameboard({ playerDevices }: Props) {
  // const gameState = getState("game");

  return (
    /*container for gameboard */
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* interaction borders
      <InteractionBorder
        width={"100%"}
        height={(innerHeight / 100) * 10}
        top={"0"}
      ></InteractionBorder>
      <InteractionBorder
        width={(innerWidth / 100) * 10}
        height={"100%"}
        left={"0"}
      ></InteractionBorder>
      <InteractionBorder
        width={(innerWidth / 100) * 10}
        height={"100%"}
        right={"0"}
      ></InteractionBorder>
      <InteractionBorder
        width={"100%"}
        height={(innerHeight / 100) * 10}
        bottom={"0"}
      ></InteractionBorder> */}
      {playerDevices.map((element: PlayerDevice, index: number) => {
        return (
          <PlayerIcon
            top={element.y}
            left={element.x}
            index={index}
          ></PlayerIcon>
        );
      })}
      <div
        style={{
          position: "relative",
          borderRadius: "10px",
          maxWidth: "600px",
          height: "400px",
          margin: "0 auto",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
        }}
      >
        {/* Removed background layers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "100px",
            position: "relative",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Discardpile playerDevices={playerDevices} />
          <Drawpile playerDevices={playerDevices} />
        </div>

        {/* Removed players names row */}
      </div>
    </div>
  );
}

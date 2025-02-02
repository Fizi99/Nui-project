import { Discardpile } from "./Discardpile";
import { Drawpile } from "./Drawpile";
import { getState } from "playroomkit";
import { Player } from "./game";
import { InteractionBorder } from "./InteractionBorder";
import { PlayerIcon } from "./PlayerIcon";
import { PlayerDevice } from "./Device";

interface Props {
  playerDevices: PlayerDevice[];
}

export function Gameboard({ playerDevices }: Props) {
  const gameState = getState("game");

  return (
    /*container for gameboard */
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        verticalAlign: "middle",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* top */}
      <InteractionBorder
        width={"100%"}
        height={(innerHeight / 100) * 10}
        top={"0"}
      ></InteractionBorder>
      {/* left */}
      <InteractionBorder
        width={(innerWidth / 100) * 10}
        height={"100%"}
        left={"0"}
      ></InteractionBorder>
      {/* right */}
      <InteractionBorder
        width={(innerWidth / 100) * 10}
        height={"100%"}
        right={"0"}
      ></InteractionBorder>
      {/* bottom */}
      <InteractionBorder
        width={"100%"}
        height={(innerHeight / 100) * 10}
        bottom={"0"}
      ></InteractionBorder>
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
          border: "3px solid black",
          borderRadius: "10px",
          maxWidth: "600px",
          height: "400px",
          margin: "0 auto",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Background layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#A0D8EF",
            opacity: 0.3,
            borderRadius: "10px",
            zIndex: -1,
          }}
        ></div>

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

        {/* Player names row */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
            padding: "10px 0",
          }}
        >
          {gameState &&
            gameState.players.map((player: Player, index: number) => (
              <div
                key={index}
                style={{
                  padding: "5px 15px",
                  backgroundColor: "#f1f1f1",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {player.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

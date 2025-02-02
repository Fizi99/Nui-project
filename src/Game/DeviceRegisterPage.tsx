import { useEffect, useState } from "react";
import { getState, setState } from "playroomkit";
import { Gameboard } from "./Gameboard";
import { PlayerDevice } from "./Device";
import { DeviceRegisterCard } from "./DeviceRegisterCard";
import { InteractionBorder } from "./InteractionBorder";
import { PlayerIcon } from "./PlayerIcon";
import { Game, Player } from "./game";

export function DeviceRegisterPage() {
  let game = getState("game");
  let playersReverted: number[] = [];

  // revert playerlist, to show playercard of player with index 0 first, and safely delete it
  game.players.forEach((_element: Player, index: number) => {
    playersReverted.unshift(index);
  });

  // playerstate, to check if registration is complete
  const [registeredPlayerIndex, setRegisteredPlayerIndex] = useState(0);
  // state with reverted playerlist, to dynamically load playercards
  const [playersLeft, setPlayersLeft] = useState(playersReverted);
  // state with registered devices
  const [registeredDevices, setRegisteredDevices] = useState<PlayerDevice[]>(
    []
  );

  // register a new playerposition
  const registerDevice = (index: number, x: number, y: number) => {
    let newDevice: PlayerDevice = {
      index: index,
      x: x,
      y: y,
    };

    let deviceList: PlayerDevice[] = registeredDevices.slice();
    deviceList[index] = newDevice;

    // update playerposition list
    setRegisteredDevices(deviceList);

    // update reverted playerlist
    let playersLeftNew = playersLeft.slice();
    playersLeftNew.pop();
    setPlayersLeft(playersLeftNew);

    // update counter for checking, if all players are registered
    setRegisteredPlayerIndex(registeredPlayerIndex + 1);
  };

  useEffect(() => {
    if (registeredPlayerIndex >= game.players.length && !game.started) {
      console.log("start");
      let gameInstance = new Game([]);
      gameInstance.fromGameState(game);
      gameInstance.startGame(true);

      setState("game", gameInstance.toGameState(), true);
    }
  }, [registeredPlayerIndex]);

  return (
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
      {game ? (
        registeredPlayerIndex >= game.players.length ? (
          <Gameboard playerDevices={registeredDevices}></Gameboard>
        ) : (
          <>
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
            {playersLeft.map((PlayerIndex: number) => {
              return (
                <DeviceRegisterCard
                  index={PlayerIndex}
                  registerDevice={registerDevice}
                ></DeviceRegisterCard>
              );
            })}

            <div style={{ position: "absolute", top: "5em" }}>
              Ziehe deine Karte in den markierten Bereich, um deine
              Spielerposition zu registrieren!
            </div>
            {registeredDevices.map((element, index) => {
              return (
                <PlayerIcon
                  top={element.y}
                  left={element.x}
                  index={index}
                ></PlayerIcon>
              );
            })}
          </>
        )
      ) : (
        "no game found!"
      )}
    </div>
  );
}

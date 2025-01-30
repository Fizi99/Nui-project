import { useMultiplayerState, usePlayersList } from "playroomkit";
import React from "react";
import { Game, GameState } from "../Game/game";
import { Device, TrackingData } from "../trackingTest/tracking";

const GameEngineContext = React.createContext<any>(null);

export const GameEngineProvider = ({ children }: any) => {
  // get playernames to instantiate game and tracking
  const playersList = usePlayersList(true);
  const playerNames = [];
  const devices: Device[] = [];
  for (let i = 0; i < playersList.length; i++) {
    playerNames.push(playersList[i].getProfile().name);
    devices.push({
      id: i.toString(),
      name: "Device of " + playerNames[i],
      status: "online",
      position: { x: 0, y: 0 },
    });
  }

  const initialGame = new Game(playerNames);
  const initialGameState: GameState = initialGame.toGameState();

  // multiplayer states
  const [counter, setCounter] = useMultiplayerState("counter", 0);
  const [game] = useMultiplayerState("game", initialGameState);
  const [trackingData] = useMultiplayerState(
    "trackingData",
    new TrackingData(devices)
  );

  const counterIncremented = () => {
    console.log("counter before : " + counter);
    let countIncrementer = counter + 1;
    setCounter(countIncrementer, true);
    console.log("counter after : " + counter);
  };

  // const changeName = (name: string, index: number) => {
  //   let gameInstance = new Game([""]);
  //   gameInstance.fromGameState(game);
  //   gameInstance.changeName(name, index);
  //   setGame(gameInstance.toGameState(), true);
  // };

  // const updateGame = (game: Game) => {
  //   let gameInstance = Object.create(game);
  //   setGame(gameInstance.toGameState(), true);
  // };

  const gameState = {
    counter,
    game,
    trackingData,
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
        counterIncremented,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => {
  const context = React.useContext(GameEngineContext);
  if (context === undefined) {
    throw new Error("useGameEngine must be used within a GameEngine");
  }
  return context;
};

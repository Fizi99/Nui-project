import { useMultiplayerState, usePlayersList } from "playroomkit";
import React from "react";
import { Game, GameState } from "../Game/game";
import { Device, DeviceState } from "../trackingTest/Device";

const GameEngineContext = React.createContext<any>(null);

export const GameEngineProvider = ({ children }: any) => {
  // get playernames to instantiate game and tracking
  const playersList = usePlayersList(true);
  const playerNames = playersList.map((player) => player.getProfile().name);

  const initialGame = new Game(playerNames);
  const initialGameState: GameState = initialGame.toGameState();

  const initialDevices: Device[] = playersList.map((_player, index) => ({
    location: { x: 0, y: 0 },
    index: index,
  }));

  const initialDeviceState: DeviceState = { devices: initialDevices };

  // multiplayer states
  const [game] = useMultiplayerState("game", initialGameState);
  const [devices] = useMultiplayerState("devices", initialDeviceState);

  const gameState = {
    game,
    devices,
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
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

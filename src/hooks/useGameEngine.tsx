import { useMultiplayerState, usePlayersList } from "playroomkit";
import React from "react";
import { Game, GameState } from "../Game/game";

const GameEngineContext = React.createContext<any>(null);

export const GameEngineProvider = ({ children }: any) => {
  // get playernames to instantiate game and tracking
  const playersList = usePlayersList(true);
  const playerNames = playersList.map((player) => player.getProfile().name);

  const initialGame = new Game(playerNames);
  const initialGameState: GameState = initialGame.toGameState();

  // multiplayer states
  const [counter, setCounter] = useMultiplayerState("counter", 0);
  const [game] = useMultiplayerState("game", initialGameState);
  const counterIncremented = () => {
    console.log("counter before : " + counter);
    let countIncrementer = counter + 1;
    setCounter(countIncrementer, true);
    console.log("counter after : " + counter);
  };

  const gameState = {
    counter,
    game,
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

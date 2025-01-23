import { createContext, Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import { Game } from "./Game/game";
import { Gameboard } from "./Game/Gameboard";

interface GameContextType {
  currentGame: Game | null;
  setCurrentGame: Dispatch<SetStateAction<Game | null>> | null;
}

const GameContext = createContext<GameContextType>({
  currentGame: null,
  setCurrentGame: null,
});
export { GameContext };

export default function App() {
  //const [count, setCount] = useState(0);
  const [currentGame, setCurrentGame] = useState<Game | null>(
    new Game(["player 1", "player 2"])
  );

  return (
    <GameContext.Provider value={{ currentGame, setCurrentGame }}>
      <div>
        {
          // check if a game exists
          currentGame !== null ? (
            // check if game has a winner. If yes: show winning screen
            currentGame.winner !== null ? (
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                <li>{currentGame.winner.name} won!</li>
                <li
                  onClick={() => {
                    setCurrentGame(new Game(["player 1", "player 2"]));
                  }}
                  style={{ border: "1px solid rgb(27, 189, 238)" }}
                >
                  replay
                </li>
              </ul>
            ) : (
              // else, show gamescreen
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                <li>Welcome to Uno!</li>
                <li>
                  <Gameboard></Gameboard>
                </li>
              </ul>
            )
          ) : (
            <li>No Game found</li>
          )
        }
      </div>
    </GameContext.Provider>
  );
}

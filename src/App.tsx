// import { createContext, Dispatch, SetStateAction, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Game } from "./Game/game";
// import { Gameboard } from "./Game/Gameboard";
// import { MainDevice } from "./Tracking/mainDevice";

// interface GameContextType {
//   currentGame: Game | null;
//   setCurrentGame: Dispatch<SetStateAction<Game | null>> | null;
// }

// const GameContext = createContext<GameContextType>({
//   currentGame: null,
//   setCurrentGame: null,
// });
// export { GameContext };

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [currentGame, setCurrentGame] = useState<Game | null>(
//     new Game(["player 1", "player 2"])
//   );

//   return (
//     <GameContext.Provider value={{ currentGame, setCurrentGame }}>
//       <div>
//         {
//           // check if a game exists
//           currentGame !== null ? (
//             // check if game has a winner. If yes: show winning screen
//             currentGame.winner !== null ? (
//               <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
//                 <li>{currentGame.winner.name} won!</li>
//                 <li
//                   onClick={() => {
//                     setCurrentGame(new Game(["player 1", "player 2"]));
//                   }}
//                   style={{ border: "1px solid rgb(27, 189, 238)" }}
//                 >
//                   replay
//                 </li>
//               </ul>
//             ) : (
//               // else, show gamescreen
//               <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
//                 <li>Welcome to Uno!</li>
//                 <li>
//                   <Gameboard></Gameboard>
//                 </li>
//               </ul>
//             )
//           ) : (
//             <li>No Game found</li>
//           )
//         }
//       </div>
//       <MainDevice />
//     </GameContext.Provider>
//   );
// }

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { myPlayer, onPlayerJoin, setState, usePlayersList } from "playroomkit";
import { useGameEngine } from "./hooks/useGameEngine";
import { Gameboard } from "./Game/Gameboard";
import { Playerhand } from "./Game/Playerhand";
import { Game, GameState } from "./Game/game";
import MotionTracker from "./trackingTest/TestStartPage";

function App() {
  const { counter, game, trackingData, counterIncremented } = useGameEngine();

  onPlayerJoin((playerState) => {
    // PlayerState is this player's multiplayer state along with it's profile.
    // Probably add a player sprite to the game here.
    const playersList = usePlayersList(true);
    const playerNames = [];
    for (let i = 0; i < playersList.length; i++) {
      playerNames.push(playersList[i].getProfile().name);
    }

    const initialGame = new Game(playerNames);
    const initialGameState: GameState = initialGame.toGameState();

    setState("game", initialGameState);

    playerState.onQuit(() => {
      // Handle player quitting. Maybe remove player sprite?
    });
  });

  let index = -1;

  for (let i = 0; i < usePlayersList(true).length; i++) {
    if (
      myPlayer().getProfile().name == usePlayersList(true)[i].getProfile().name
    ) {
      index = i;
    }
  }

  let showNames = () => {
    let names: string = "";
    for (let i = 0; i < game.players.length; i++) {
      if (index !== i) {
        names += game.players[i].name + " ";
      }
    }
    return names;
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>my index: {index}</h1>
      <h1>{game.players[index].name}</h1>
      <button onClick={() => counterIncremented()}>count is {counter}</button>
      <h1>{trackingData.devices[index].name}</h1>
      <h1>other player: {showNames()}</h1>
      <button
        onClick={() => {
          console.log(game.players);
          let gameInstance = new Game([""]);
          gameInstance.fromGameState(game);
          gameInstance.changeName("jakob", index);
          setState("game", gameInstance.toGameState(), true);
        }}
      >
        count is {counter}
      </button>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {index >= usePlayersList(true).length - 1 ? (
        <Gameboard></Gameboard>
      ) : (
        <Playerhand index={index}></Playerhand>
      )}
      <MotionTracker />
    </>
  );
}

export default App;

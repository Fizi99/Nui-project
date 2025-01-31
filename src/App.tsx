import "./App.css";
import { myPlayer, usePlayersList } from "playroomkit";
import MotionTracker from "./trackingTest/TestStartPage";
import { HostStartPage } from "./Game/HostStartPage";
import { PlayerStartPage } from "./Game/PlayerStartPage";
import { useGameEngine } from "./hooks/useGameEngine";
import { getIntersection, Point } from "./trackingTest/Vector";
import Demo from "./trackingTest/GeoTest";

function App() {
  const { game } = useGameEngine();
  const playersList = usePlayersList(true);
  let index = playersList.findIndex(
    (player) => myPlayer().getProfile().name === player.getProfile().name
  );
  console.log(game);

  // Beispiel:
  const A: Point = { x: 0, y: 0 };
  const B: Point = { x: 1, y: 0 };
  const C: Point = { x: 0, y: 0.5 };
  const D: Point = { x: -3, y: -1 };

  const intersection = getIntersection(A, B, C, D);
  console.log(intersection); // Sollte { x: 2.5, y: 2.5 } ausgeben

  // find playernames except from host
  let playerNamesWithoutHost = () => {
    let playerNames: string[] = [];
    for (let i = 0; i < playersList.length - 1; i++) {
      playerNames.push(playersList[i].getProfile().name);
    }

    return playerNames;
  };

  return (
    <>
      <h1>my index: {index}</h1>
      <h1>{myPlayer().getProfile().name}</h1>

      {/* show either host startpage or playerstartpage*/}
      {index === playersList.length - 1 ? (
        <HostStartPage
          playerIndex={index}
          playerListWithoutHost={playerNamesWithoutHost()}
        ></HostStartPage>
      ) : (
        <PlayerStartPage playerIndex={index}></PlayerStartPage>
      )}

      <MotionTracker />
      <Demo></Demo>
    </>
  );
}

export default App;

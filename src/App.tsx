import "./App.css";
import { myPlayer, usePlayersList } from "playroomkit";
import MotionTracker from "./trackingTest/TestStartPage";
import { HostStartPage } from "./Game/HostStartPage";
import { PlayerStartPage } from "./Game/PlayerStartPage";
import { useGameEngine } from "./hooks/useGameEngine";
import GeoDemo from "./trackingTest/GeoTest";
import GeoOtherDevices from "./trackingTest/GeoOtherDevices";

function App() {
  const { game, devices } = useGameEngine();
  const playersList = usePlayersList(true);
  let index = playersList.findIndex(
    (player) => myPlayer().getProfile().name === player.getProfile().name
  );
  console.log(game);
  console.log(devices);

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

      <Accelerometer />
      <GeoDemo index={index}></GeoDemo>
      {devices.devices.map((device: any, deviceIndex: number) => {
        console.log(device);
        return <GeoOtherDevices index={deviceIndex}></GeoOtherDevices>;
      })}
    </>
  );
}

export default App;

import "./App.css";
import { myPlayer, usePlayersList } from "playroomkit";
import { HostStartPage } from "./Game/HostStartPage";
import { PlayerStartPage } from "./Game/PlayerStartPage";
import { useGameEngine } from "./hooks/useGameEngine";

function App() {
  const { game /*devices */ } = useGameEngine();
  const playersList = usePlayersList(true);
  let index = playersList.findIndex(
    (player) => myPlayer().getProfile().name === player.getProfile().name
  );
  console.log(game);
  // console.log(devices);

  // find playernames except from host
  let playerNamesWithoutHost = () => {
    let playerNames: string[] = [];
    for (let i = 0; i < playersList.length - 1; i++) {
      playerNames.push(playersList[i].getProfile().name);
    }

    return playerNames;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <h1>my index: {index}</h1>
      <h1>{myPlayer().getProfile().name}</h1> */}

      {/* show either host startpage or playerstartpage*/}
      {index === playersList.length - 1 ? (
        <HostStartPage
          playerIndex={index}
          playerListWithoutHost={playerNamesWithoutHost()}
        ></HostStartPage>
      ) : (
        <PlayerStartPage playerIndex={index}></PlayerStartPage>
      )}

      {/* <MotionTracker />
      <GeoDemo index={index}></GeoDemo>
      {devices.devices.map((_device: any, deviceIndex: number) => {
        return <GeoOtherDevices index={deviceIndex}></GeoOtherDevices>;
      })} */}
    </div>
  );
}

export default App;

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

  const compassCircle = document.querySelector<HTMLDivElement>(".compass-circle");
  const startBtn = document.querySelector<HTMLButtonElement>(".start-btn");
  //const myPoint = document.querySelector<HTMLDivElement>(".my-point");
  
  let compass: number;
  
  // Detect if the device is running iOS
  const isIOS: boolean = !!(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );
  
  // Extend DeviceOrientationEvent to include webkitCompassHeading
  interface DeviceOrientationEventWithCompass extends DeviceOrientationEvent {
    webkitCompassHeading?: number;
  }
  
  function init(): void {
    if (startBtn) {
      startBtn.addEventListener("click", startCompass);
    }
  }
  
  function startCompass(): void {
    if (isIOS) {
      (DeviceOrientationEvent as any).requestPermission?.()
        .then((response: string) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handler, true);
          } else {
            alert("Permission must be granted!");
          }
        })
        .catch(() => alert("Device orientation not supported"));
    } else {
      window.addEventListener("deviceorientationabsolute", handler, true);
    }
  }
  
  function handler(e: DeviceOrientationEventWithCompass): void {
    compass = e.webkitCompassHeading ?? Math.abs((e.alpha ?? 0) - 360);
    if (compassCircle) {
      compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
    }
  }
  
  init();
  

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
    <div className="compass">
    <div className="arrow"></div>
    <div className="compass-circle"></div>
</div>
<button className="start-btn">Start compass</button>
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
      <GeoDemo index={index}></GeoDemo>
      {devices.devices.map((_device: any, deviceIndex: number) => {
        return <GeoOtherDevices index={deviceIndex}></GeoOtherDevices>;
      })}
    </>
  );
}

export default App;

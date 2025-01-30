import { Discardpile } from "./Discardpile";
import { Drawpile } from "./Drawpile";
// import { GameContext } from "../App";

export function Gameboard() {
  // const { currentGame } = useContext(GameContext);
  // const { counter, game, trackingData, counterIncremented, changeName } =
  //   useGameEngine();
  return (
    <div>
      <ul>
        <li>
          <Discardpile></Discardpile>
        </li>
        <li>
          <Drawpile></Drawpile>
        </li>
        {/* {game
          ? game.players.map((player: any, index: number) => {
              console.log(player);
              return <Playerhand index={index}></Playerhand>;
            })
          : []} */}
      </ul>
    </div>
  );
}

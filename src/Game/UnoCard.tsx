import { getState, setState } from "playroomkit";
import { Card, Game } from "./game";
// import { GameContext } from "../App";

interface Props {
  handIndex: number;
  playerIndex: number;
}

export function UnoCard({ handIndex, playerIndex }: Props) {
  // const { currentGame, setCurrentGame } = useContext(GameContext);
  // const { counter, game, trackingData, counterIncremented, changeName } =
  //   useGameEngine();

  const card: Card = getState("game").players[playerIndex].hand[handIndex];
  return (
    <div
      style={{
        width: "5em",
        height: "8em",
        backgroundColor: card.color,
        padding: "10px",
        borderRadius: "5px",
        color: "rgb(0, 194, 184)",
        display: "flex",
      }}
    >
      {
        /** wild card color selection */
        // card.value.startsWith("wild") ? (
        //   <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
        //     <li>{card.value}</li>
        //     <li>
        //       <div
        //         style={{
        //           width: "1em",
        //           height: "1em",
        //           backgroundColor: "red",
        //         }}
        //         onClick={() => {
        //           if (game != null) {
        //             card.setColor("red");
        //             let gameInstance = new Game([""]);
        //             gameInstance.fromGameState(game);

        //             setState("game", gameInstance.toGameState());
        //           }
        //         }}
        //       ></div>
        //     </li>
        //     <li>
        //       <div
        //         style={{
        //           width: "1em",
        //           height: "1em",
        //           backgroundColor: "blue",
        //         }}
        //         onClick={() => {
        //           if (game != null) {
        //             card.setColor("blue");
        //             let gameInstance = new Game([""]);
        //             gameInstance.fromGameState(game);

        //             setState("game", gameInstance.toGameState());
        //           }
        //         }}
        //       ></div>
        //     </li>
        //     <li>
        //       <div
        //         style={{
        //           width: "1em",
        //           height: "1em",
        //           backgroundColor: "yellow",
        //         }}
        //         onClick={() => {
        //           if (game != null) {
        //             card.setColor("yellow");
        //             let gameInstance = new Game([""]);
        //             gameInstance.fromGameState(game);

        //             setState("game", gameInstance.toGameState());
        //           }
        //         }}
        //       ></div>
        //     </li>
        //     <li>
        //       <div
        //         style={{
        //           width: "1em",
        //           height: "1em",
        //           backgroundColor: "green",
        //         }}
        //         onClick={() => {
        //           if (game != null) {
        //             card.setColor("green");
        //             let gameInstance = new Game([""]);
        //             gameInstance.fromGameState(game);

        //             setState("game", gameInstance.toGameState());
        //           }
        //         }}
        //       ></div>
        //     </li>
        //     <li
        //       style={{ border: "1px solid rgb(27, 189, 238)" }}
        //       onClick={() => {
        //         if (game != null) {
        //           let gameInstance = new Game([""]);
        //           gameInstance.fromGameState(game);
        //           gameInstance.playTurn(handIndex, player);
        //           setState("game", gameInstance.toGameState());
        //         }
        //       }}
        //     >
        //       play Card
        //     </li>
        //   </ul>
        // ) : (
        // regular card
        <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
          <li>{card.value}</li>
          <li
            style={{ border: "1px solid rgb(27, 189, 238)" }}
            onClick={() => {
              if (getState("game") != null) {
                let gameInstance = new Game([""]);
                gameInstance.fromGameState(getState("game"));
                gameInstance.playCard(playerIndex, handIndex);

                setState("game", gameInstance.toGameState(), true);
              }
            }}
          >
            play Card
          </li>
        </ul>
        // )
      }
    </div>
  );
}

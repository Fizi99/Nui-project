// import { GameContext } from "../App";

export function Drawpile() {
  // const { currentGame, setCurrentGame } = useContext(GameContext);
  //  const { counter, game, trackingData, counterIncremented, changeName } =
  //     useGameEngine();
  return (
    <div
      style={{
        width: "5em",
        backgroundColor: "grey",
        padding: "10px",
        borderRadius: "5px",
        color: "#fff",
      }}
      onClick={() => {
        // if (game != null) {
        //   let newgame = Object.create(game);
        //   newgame.players[newgame.currentPlayerIndex].drawCards(
        //     newgame.deck,
        //     1
        //   );
        //   if (setgame) {
        //     setCurrentGame(newgame);
        //   }
        // }
      }}
    >
      <h1>Deck</h1>
    </div>
  );
}

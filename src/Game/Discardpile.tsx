import { useGameEngine } from "../hooks/useGameEngine";
// import { GameContext } from "../App";

export function Discardpile() {
  // const { currentGame } = useContext(GameContext);
  const { game } = useGameEngine();
  return (
    <div
      style={{
        width: "5em",
        backgroundColor: game
          ? game.discardPile[game.discardPile.length - 1].color
          : "black",
        padding: "10px",
        borderRadius: "5px",
        color: "#fff",
      }}
    >
      <h1>
        {game ? game.discardPile[game.discardPile.length - 1].value : "no Game"}
      </h1>
    </div>
  );
}

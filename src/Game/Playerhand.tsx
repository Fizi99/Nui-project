import { UnoCard } from "./UnoCard";
import { getState } from "playroomkit";
import { useSprings, animated } from "@react-spring/web";
interface Props {
  playerIndex: number;
}

export function Playerhand({ playerIndex }: Props) {
  const gameState = getState("game");
  const cards = gameState ? gameState.players[playerIndex].hand : [];
  // const order = useRef(cards.map((_: any, index: any) => index)); // Speichert die Kartenreihenfolge

  // Initialisiere Springs für Animationen
  const [springs, _api] = useSprings(cards.length, (index) => ({
    x: index * 80,
    scale: 1,
    zIndex: 0,
    immediate: false,
  }));

  // Drag-Handler
  // const bind = useDrag(({ args: [originalIndex], active, movement: [mx] }) => {
  //   // const curIndex = order.current.indexOf(originalIndex);
  //   // const curRow = Math.min(cards.length - 1, Math.max(0, Math.round((curIndex * 80 + mx) / 80)));
  //   // // Abbrechen, wenn keine Änderung notwendig ist
  //   // if (curIndex === curRow) return;
  //   // const newOrder = arrayMoveImmutable(order.current, curIndex, curRow);
  //   // let gameInstance = new Game([""]);
  //   // gameInstance.fromGameState(gameState);
  //   // gameInstance.sortPlayershand(playerIndex,curIndex,curRow);
  //   // setState("game", gameInstance.toGameState(), true);
  //   // api.start((index) => {
  //   //   const isDragging = index === originalIndex;
  //   //   return {
  //   //     x: newOrder.indexOf(index) * 80,
  //   //     scale: isDragging && active ? 1.1 : 1,
  //   //     zIndex: isDragging ? 1 : 0,
  //   //     immediate: isDragging,
  //   //   };
  //   // });
  //   // if (!active) {
  //   //   // Reihenfolge final speichern
  //   //   order.current = newOrder;
  //   // }
  // });

  // const PLAY_LINE_Y = -window.innerHeight * 0.3; // 30vh in pixels
  const PLAY_THRESHOLD = window.innerHeight * 0.2; // 20% of screen height
  return (
    <div style={{ display: "flex", position: "relative", height: 100 }}>
      {springs.map(({ x, scale, zIndex }, i) => (
        <animated.div
          key={i}
          style={{
            transform: x.to((x) => `translateX(${x}px)`),
            scale,
            zIndex,
            position: "absolute",
            listStyle: "none", // Remove default list styling
            padding: 0, // Remove default padding
            margin: 0, // Remove default margin
            top: PLAY_THRESHOLD + "px",
          }}
        >
          <UnoCard handIndex={i} playerIndex={playerIndex} />
        </animated.div>
      ))}
    </div>
  );
}

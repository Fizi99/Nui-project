import { UnoCard } from "./UnoCard";
import { getState, setState } from "playroomkit";
import { useSprings, animated } from "@react-spring/web";
import { Game } from "./game";
import { useDrag } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
interface Props {
  playerIndex: number;
}

export function Playerhand({ playerIndex }: Props) {
  const gameState = getState("game");
  const cards = gameState ? gameState.players[playerIndex].hand : [];
  const order = useRef(cards.map((_: any, index: any) => index)); // Speichert die Kartenreihenfolge

  // Initialisiere Springs für Animationen
  const [springs, _api] = useSprings(cards.length, (index) => ({
    x: index * 80,
    scale: 1,
    zIndex: 0,
    immediate: false,
  }));

  ///////////////////////////ANTON////////////////////77
  const [handState, setHandState] = useState(
    gameState.players[playerIndex].hand
  );
  const [wasDrawn, setWasDrawn] = useState(false);

  // check if a card was playerd or drawn
  useEffect(() => {
    // card drawn
    if (handState.length < getState("game").players[playerIndex].hand.length) {
      setWasDrawn(true);
    }
  }, [getState("game").players[playerIndex].hand.length]);

  // set state for draw animation
  useEffect(() => {
    if (wasDrawn) {
      setWasDrawn(false);
      setHandState(gameState.players[playerIndex].hand);
    }
  }, [wasDrawn]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  // Drag-Handler
  const bind = useDrag(({ args: [originalIndex], active, movement: [mx] }) => {
    const curIndex = order.current.indexOf(originalIndex);

    // Berechnung der neuen Position während des Drags
    const targetIndex = Math.round((curIndex * 80 + mx) / 80);
    const clampedTargetIndex = Math.max(
      0,
      Math.min(targetIndex, cards.length - 1)
    );

    // Temporär nur für die Animation verwenden, Zustand nicht überschreiben
    const newOrder = [...order.current];
    if (active && curIndex !== clampedTargetIndex) {
      newOrder.splice(curIndex, 1);
      newOrder.splice(clampedTargetIndex, 0, originalIndex);
    }

    // api.start((index) => ({
    //   x: newOrder.indexOf(index) * 80,
    //   scale: index === originalIndex && active ? 1.1 : 1,
    //   zIndex: index === originalIndex && active ? 1 : 0,
    //   immediate: index === originalIndex,
    // }));

    if (!active && curIndex !== clampedTargetIndex) {
      // Reihenfolge dauerhaft speichern
      order.current = newOrder;

      // **Spielzustand synchronisieren**
      const gameInstance = new Game([""]);
      gameInstance.fromGameState(gameState);
      gameInstance.sortPlayershand(playerIndex, curIndex, clampedTargetIndex);
      setState("game", gameInstance.toGameState(), true);
    }
  });

  // const PLAY_LINE_Y = -window.innerHeight * 0.3; // 30vh in pixels
  const PLAY_THRESHOLD = window.innerHeight * 0.2; // 20% of screen height
  return (
    <div style={{ display: "flex", position: "relative", height: 100 }}>
      {springs.map(({ x, scale, zIndex }, i) => (
        <animated.div
          key={i}
          {...bind(i)}
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
          <UnoCard
            handIndex={i}
            playerIndex={playerIndex}
            cardDrawn={wasDrawn}
          />
        </animated.div>
      ))}
    </div>
  );
}

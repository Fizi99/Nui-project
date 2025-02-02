import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { getState, setState } from "playroomkit";
import { Card, Game } from "./game";
// import { GameContext } from "../App";

interface Props {
  handIndex: number;
  playerIndex: number;
  cardDrawn: boolean;
}

export function UnoCard({ handIndex, playerIndex, cardDrawn }: Props) {
  // const { currentGame, setCurrentGame } = useContext(GameContext);
  // const { counter, game, trackingData, counterIncremented, changeName } =
  //   useGameEngine();

  const card: Card = getState("game").players[playerIndex].hand[handIndex];

  // // Track whether this specific card has been played to prevent multiple plays
  // const [hasBeenPlayed, setHasBeenPlayed] = useState(false);
  // const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const PLAY_LINE_Y = -window.innerHeight * 0.3; // 30vh in pixels

  // Track card play state and drag information
  const [isDragging, setIsDragging] = useState(false);
  // const [setDragStart] = useState({ x: 0, y: 0 });
  const [hasPlayedCard, setHasPlayedCard] = useState(false);

  // Set up spring animation
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Reset card state when the game state changes
  useEffect(() => {
    setHasPlayedCard(false);
    api.start({ x: 0, y: 0 });
  }, [getState("game")]);

  // Set up drag gesture
  const bind = useDrag(
    ({ down, movement: [mx, my], first, last }) => {
      // Prevent multiple plays
      if (hasPlayedCard) return;

      // Track the start of dragging
      if (first) {
        setIsDragging(true);
        // setDragStart({ x: mx, y: my });
      }

      // During drag
      if (down && isDragging) {
        // Animate card movement during drag
        api.start({
          x: mx,
          y: my,
          immediate: true,
          config: {
            tension: 0, // Remove spring tension
            friction: 0, // Remove friction
          },
        });

        // Check if card has crossed play line with sufficient drag
        if (
          my < PLAY_LINE_Y /*&& Math.abs(my - dragStart.y) > PLAY_THRESHOLD*/
        ) {
          // Play the card
          const gameState = getState("game");
          if (gameState != null) {
            let gameInstance = new Game([""]);
            gameInstance.fromGameState(gameState);

            // Play the card
            gameInstance.playCard(playerIndex, handIndex);
            console.log(
              gameInstance.discardPile[gameInstance.discardPile.length - 1]
            );
            setState("game", gameInstance.toGameState(), true);

            // Mark as played and animate off screen
            setHasPlayedCard(true);
            setIsDragging(false);

            api.start({
              x: 0,
              y: -window.innerHeight * 1.5,
              immediate: false,
              config: { duration: 500 }, // Slower, more visible animation
            });
          }
        }
      }

      // End of drag
      if (last) {
        // If not played, return to original position
        if (!hasPlayedCard) {
          api.start({
            x: 0,
            y: 0,
            immediate: true, // Instant return
            config: {
              tension: 0, // Remove spring tension
              friction: 0, // Remove friction
            },
          });
        }
        setIsDragging(false);
      }
    },
    {
      //bounds: { top: -window.innerHeight },
      rubberband: false, // Disable rubberband effect
    }
  );

  ////////////////////////////////////ANTON///////////////////////////////
  if (
    cardDrawn &&
    handIndex === getState("game").players[playerIndex].hand.length - 1
  ) {
    api.start({
      from: {
        x: -100,
        y: -100,
      },
      to: { x: 0, y: 0 },
    });
  }
  ////////////////////////////////////ANTON///////////////////////////////

  return (
    <>
      {/* Play line indicator */}
      <div
        style={{
          position: "fixed",
          top: "30vh",
          left: 0,
          width: "100%",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />
      <animated.div
        {...bind()}
        style={{
          width: "5em",
          height: "8em",
          background: `linear-gradient(-45deg, ${card.color}, ${card.color}, rgba(0,0,0,0.2))`,
          animation: "gradient 15s ease infinite",
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "3px solid white",
          cursor: "pointer",
          touchAction: "none",
          x,
          y,
          zIndex: 1001,
        }}
      >
        {/* Top number */}
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>

        {/* Center large number */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "1.2em" : "1.8em",
            fontWeight: "bold",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>

        {/* Bottom number (rotated) */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            color: "black",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
            transform: "rotate(180deg)",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {card.value}
        </div>
      </animated.div>
    </>
  );
}

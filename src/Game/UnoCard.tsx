import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
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

  // // Track whether this specific card has been played to prevent multiple plays
  // const [hasBeenPlayed, setHasBeenPlayed] = useState(false);
  // const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const PLAY_LINE_Y = -window.innerHeight * 0.3; // 30vh in pixels
  const PLAY_THRESHOLD = window.innerHeight * 0.2; // 20% of screen height

  // Track card play state and drag information
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
        setDragStart({ x: mx, y: my });
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
        if (my < PLAY_LINE_Y && Math.abs(my - dragStart.y) > PLAY_THRESHOLD) {
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
      bounds: { top: -window.innerHeight },
      rubberband: false, // Disable rubberband effect
    }
  );

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
      >
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "-25px",
            color: "white",
            fontSize: "0.9em",
          }}
        >
          Drop to play
        </div>
      </div>
      <animated.div
        {...bind()}
        style={{
          width: "5em",
          height: "8em",
          backgroundColor: card.color,
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
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
            color: "white",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
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
            color: "white",
            fontSize: isNaN(Number(card.value)) ? "1.2em" : "1.8em",
            fontWeight: "bold",
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
            color: "white",
            fontSize: isNaN(Number(card.value)) ? "0.6em" : "0.9em",
            fontWeight: "bold",
            transform: "rotate(180deg)",
          }}
        >
          {card.value}
        </div>
      </animated.div>
    </>
  );
}

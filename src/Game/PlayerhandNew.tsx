import { getState } from "playroomkit";
import { Card } from "./game";
import { PlayerhandCard } from "./PlayerhandCard";
import { InteractionBorder } from "./InteractionBorder";
import { useEffect, useState } from "react";
import { RiArrowUpCircleFill } from "react-icons/ri";

interface Props {
  playerIndex: number;
}

export function PlayerhandNew({ playerIndex }: Props) {
  const game = getState("game");

  const [handState, setHandState] = useState(game.players[playerIndex].hand);
  const [wasDrawn, setWasDrawn] = useState(false);
  const [wasPlayed, setWasPlayed] = useState(false);

  console.log(handState);

  // check if a card was playerd or drawn
  useEffect(() => {
    // card drawn
    if (handState.length < getState("game").players[playerIndex].hand.length) {
      setWasDrawn(true);
    } else if (
      // card played
      handState.length > getState("game").players[playerIndex].hand.length
    ) {
      setWasPlayed(true);
    }
  }, [getState("game").players[playerIndex].hand.length]);

  // set state for draw animation
  useEffect(() => {
    if (wasDrawn) {
      setWasDrawn(false);
      setHandState(game.players[playerIndex].hand);
    }
  }, [wasDrawn]);

  // listen to state change of played state
  useEffect(() => {
    if (wasPlayed) {
      setWasPlayed(false);
      setHandState(game.players[playerIndex].hand);
    }
  }, [wasPlayed]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RiArrowUpCircleFill
        style={{
          width: "2em",
          top: "0.5em",
          fontSize: "2em",
          fontWeight: "bold",
          color: " #36135a",
          position: "relative",
          zIndex: "1000",
        }}
      />
      <InteractionBorder
        width={"100%"}
        height={(innerHeight / 100) * 10}
        top="0"
      ></InteractionBorder>

      <div
        style={{
          display: "flex",
          top: "3em",
          position: "relative",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        {game.players[playerIndex].hand.map((_card: Card, index: number) => {
          return (
            <PlayerhandCard
              handIndex={index}
              playerIndex={playerIndex}
              cardDrawn={wasDrawn} /*draw animation trigger */
            ></PlayerhandCard>
          );
        })}
      </div>
    </div>
  );
}

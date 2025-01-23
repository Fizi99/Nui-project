import React, { useContext } from "react";
import { Card, Player } from "./game";
import { GameContext } from "../App";

interface Props {
  card?: Card;
  handIndex?: number;
  player?: Player;
}

export function UnoCard({
  card = new Card("black", "0"),
  handIndex,
  player = new Player("empty"),
}: Props) {
  const { currentGame, setCurrentGame } = useContext(GameContext);
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
        card.value.startsWith("wild") ? (
          <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
            <li>{card.value}</li>
            <li>
              <div
                style={{
                  width: "1em",
                  height: "1em",
                  backgroundColor: "red",
                }}
                onClick={() => {
                  if (currentGame != null) {
                    card.setColor("red");
                    let newgame = Object.create(currentGame);
                    if (setCurrentGame) {
                      setCurrentGame(newgame);
                    }
                  }
                }}
              ></div>
            </li>
            <li>
              <div
                style={{
                  width: "1em",
                  height: "1em",
                  backgroundColor: "blue",
                }}
                onClick={() => {
                  if (currentGame != null) {
                    card.setColor("blue");
                    let newgame = Object.create(currentGame);
                    if (setCurrentGame) {
                      setCurrentGame(newgame);
                    }
                  }
                }}
              ></div>
            </li>
            <li>
              <div
                style={{
                  width: "1em",
                  height: "1em",
                  backgroundColor: "yellow",
                }}
                onClick={() => {
                  if (currentGame != null) {
                    card.setColor("yellow");
                    let newgame = Object.create(currentGame);
                    if (setCurrentGame) {
                      setCurrentGame(newgame);
                    }
                  }
                }}
              ></div>
            </li>
            <li>
              <div
                style={{
                  width: "1em",
                  height: "1em",
                  backgroundColor: "green",
                }}
                onClick={() => {
                  if (currentGame != null) {
                    card.setColor("green");
                    let newgame = Object.create(currentGame);
                    if (setCurrentGame) {
                      setCurrentGame(newgame);
                    }
                  }
                }}
              ></div>
            </li>
            <li
              style={{ border: "1px solid rgb(27, 189, 238)" }}
              onClick={() => {
                if (currentGame != null) {
                  let newgame = Object.create(currentGame);
                  newgame.playTurn(handIndex, player);
                  if (setCurrentGame) {
                    setCurrentGame(newgame);
                  }
                }
              }}
            >
              play Card
            </li>
          </ul>
        ) : (
          // regular card
          <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
            <li>{card.value}</li>
            <li
              style={{ border: "1px solid rgb(27, 189, 238)" }}
              onClick={() => {
                if (currentGame != null) {
                  let newgame = Object.create(currentGame);
                  newgame.playTurn(handIndex, player);
                  if (setCurrentGame) {
                    setCurrentGame(newgame);
                  }
                }
              }}
            >
              play Card
            </li>
          </ul>
        )
      }
    </div>
  );
}

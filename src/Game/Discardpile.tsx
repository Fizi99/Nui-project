import { useState, useEffect, useRef } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { DiscardPileCard } from "./DiscardpileCard";
import { PlayerDevice } from "./Device";
import { Card } from "./game";
import { getState } from "playroomkit";

interface Props {
  playerDevices: PlayerDevice[];
}

export function Discardpile({ playerDevices }: Props) {
  const { game } = useGameEngine();
  const hasCards = game && game.discardPile.length > 1;
  const maxDiscardHistory = 5;

  // const [isSecondCardVisible, setIsSecondCardVisible] = useState(false);
  // const [isNewCardReady, setIsNewCardReady] = useState(false);
  // const [secondCardPosition, setSecondCardPosition] = useState({
  //   x: 500,
  //   y: 800,
  // });

  // get position of discardpile and save it in react state
  const [pilePosition, setPilePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const elementRef = useRef<any>(null);
  useEffect(() => {
    if (elementRef.current != null) {
      const rect = elementRef?.current?.getBoundingClientRect();
      setPilePosition({ x: rect.left, y: rect.top });
    }
  }, []);

  useEffect(() => {
    const checkBox = document.getElementById(
      "checkBoxDiscard"
    ) as HTMLInputElement;
    hideDiscardHistory();
    if (checkBox.checked) {
      showDiscardHistory();
    } else {
      hideDiscardHistory();
    }
  }, [getState("game").discardPile.length]);

  function hideDiscardHistory() {
    const discardParent = document.getElementById("discardParent")!;

    while (discardParent.childNodes.length > 0) {
      discardParent.removeChild(
        discardParent.childNodes[discardParent.childNodes.length - 1]
      );
    }
  }

  function showDiscardHistory() {
    if (game.discardPile.length <= maxDiscardHistory) {
      for (let i = 0; i < game.discardPile.length; i++) {
        let leftPosition: number = i;
        leftPosition = leftPosition * 100 - 400;
        const discardParent = document.getElementById("discardParent")!;
        const discardStepParentDiv = document.createElement("div");
        discardStepParentDiv.style.position = "absolute";
        discardStepParentDiv.style.left = String(leftPosition) + "px";
        discardStepParentDiv.style.top = "-200px";
        const discardDiv = document.createElement("div");
        discardDiv.style.position = "relative";
        discardDiv.style.top = "-300";
        discardDiv.style.left = "0";
        discardDiv.style.width = "5em";
        discardDiv.style.height = "8em";
        (discardDiv.style.background =
          game.discardPile[i].value === "shuffle"
            ? `linear-gradient(-45deg, blue, yellow, red, green, rgba(0,0,0,1))`
            : `linear-gradient(-45deg, ${
                game.discardPile[i] ? game.discardPile[i].color : `black`
              },${
                game.discardPile[i] ? game.discardPile[i].color : `black`
              },rgba(0,0,0,1))`),
          (discardDiv.style.padding = "8px");
        discardDiv.style.borderRadius = "10px";
        discardDiv.style.display = "flex";
        discardDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
        discardDiv.style.border = "3px solid white";
        discardDiv.style.cursor = "pointer";
        discardDiv.style.touchAction = "none";
        const cardValueDivTop = document.createElement("div");
        cardValueDivTop.style.position = "absolute";
        cardValueDivTop.style.top = "5px";
        cardValueDivTop.style.left = "5px";
        cardValueDivTop.style.color = "black";
        cardValueDivTop.style.fontSize = isNaN(
          Number(game.discardPile[i].value)
        )
          ? "0.6em"
          : "0.9em";
        cardValueDivTop.style.fontWeight = "bold";
        cardValueDivTop.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white";
        cardValueDivTop.textContent = game.discardPile[i]
          ? game.discardPile[i].value
          : "skip";
        discardDiv.appendChild(cardValueDivTop);
        const cardValueDiv = document.createElement("div");
        cardValueDiv.style.position = "absolute";
        cardValueDiv.style.top = "50%";
        cardValueDiv.style.left = "50%";
        cardValueDiv.style.transform = "translate(-50%, -50%)";
        cardValueDiv.style.color = "black";
        cardValueDiv.style.fontSize = isNaN(Number(game.discardPile[i].value))
          ? "1.2em"
          : "1.8em";
        cardValueDiv.style.fontWeight = "bold";
        (cardValueDiv.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white"),
          (cardValueDiv.textContent = game.discardPile[i]
            ? game.discardPile[i].value
            : "skip");
        discardDiv.appendChild(cardValueDiv);
        const cardValueDivBottom = document.createElement("div");
        cardValueDivBottom.style.position = "absolute";
        cardValueDivBottom.style.bottom = "5px";
        cardValueDivBottom.style.right = "5px";
        cardValueDivBottom.style.color = "black";
        cardValueDivBottom.style.fontWeight = "bold";
        cardValueDivBottom.style.fontSize = isNaN(
          Number(game.discardPile[i].value)
        )
          ? "0.6em"
          : "0.9em";
        cardValueDivBottom.style.transform = "rotate(180deg)";
        (cardValueDivBottom.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white"),
          (cardValueDivBottom.textContent = game.discardPile[i]
            ? game.discardPile[i].value
            : "skip");
        discardDiv.appendChild(cardValueDivBottom);
        const playedByDiv = document.createElement("div");
        playedByDiv.innerText =
          game.discardPile[i].playedByIndex != null
            ? "Zug " +
              i +
              ": " +
              game.players[game.discardPile[i].playedByIndex].name
            : "Zug " + i + ": Start";
        playedByDiv.style.position = "relative";
        playedByDiv.style.top = "50%";
        playedByDiv.style.left = "50%";
        playedByDiv.style.transform = "translate(-50%, -100%)";
        playedByDiv.style.color = "white";
        playedByDiv.style.fontSize = "0.8em";
        playedByDiv.style.fontWeight = "bold";
        discardDiv.appendChild(playedByDiv);
        discardStepParentDiv.append(discardDiv);
        discardParent.appendChild(discardStepParentDiv);
      }
    } else {
      for (let i = 0; i < maxDiscardHistory; i++) {
        let currentCardIndex = game.discardPile.length - maxDiscardHistory + i;

        let leftPosition: number = i;
        leftPosition = leftPosition * 100 - 400;
        const discardParent = document.getElementById("discardParent")!;
        const discardStepParentDiv = document.createElement("div");
        discardStepParentDiv.style.position = "absolute";
        discardStepParentDiv.style.left = String(leftPosition) + "px";
        discardStepParentDiv.style.top = "-200px";
        const discardDiv = document.createElement("div");
        discardDiv.style.position = "relative";
        discardDiv.style.top = "-300";
        discardDiv.style.left = "0";
        discardDiv.style.width = "5em";
        discardDiv.style.height = "8em";
        (discardDiv.style.background =
          game.discardPile[currentCardIndex].value === "shuffle"
            ? `linear-gradient(-45deg, blue, yellow, red, green, rgba(0,0,0,1))`
            : `linear-gradient(-45deg, ${
                game.discardPile[currentCardIndex]
                  ? game.discardPile[currentCardIndex].color
                  : `black`
              },${
                game.discardPile[currentCardIndex]
                  ? game.discardPile[currentCardIndex].color
                  : `black`
              },rgba(0,0,0,1))`),
          (discardDiv.style.padding = "8px");
        discardDiv.style.borderRadius = "10px";
        discardDiv.style.display = "flex";
        discardDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
        discardDiv.style.border = "3px solid white";
        discardDiv.style.cursor = "pointer";
        discardDiv.style.touchAction = "none";
        const cardValueDivTop = document.createElement("div");
        cardValueDivTop.style.position = "absolute";
        cardValueDivTop.style.top = "5px";
        cardValueDivTop.style.left = "5px";
        cardValueDivTop.style.color = "black";
        cardValueDivTop.style.fontSize = isNaN(
          Number(game.discardPile[currentCardIndex].value)
        )
          ? "0.6em"
          : "0.9em";
        cardValueDivTop.style.fontWeight = "bold";
        cardValueDivTop.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white";
        cardValueDivTop.textContent = game.discardPile[currentCardIndex]
          ? game.discardPile[currentCardIndex].value
          : "skip";
        discardDiv.appendChild(cardValueDivTop);
        const cardValueDiv = document.createElement("div");
        cardValueDiv.style.position = "absolute";
        cardValueDiv.style.top = "50%";
        cardValueDiv.style.left = "50%";
        cardValueDiv.style.transform = "translate(-50%, -50%)";
        cardValueDiv.style.color = "black";
        cardValueDiv.style.fontSize = isNaN(
          Number(game.discardPile[currentCardIndex].value)
        )
          ? "1.2em"
          : "1.8em";
        cardValueDiv.style.fontWeight = "bold";
        (cardValueDiv.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white"),
          (cardValueDiv.textContent = game.discardPile[currentCardIndex]
            ? game.discardPile[currentCardIndex].value
            : "skip");
        discardDiv.appendChild(cardValueDiv);
        const cardValueDivBottom = document.createElement("div");
        cardValueDivBottom.style.position = "absolute";
        cardValueDivBottom.style.bottom = "5px";
        cardValueDivBottom.style.right = "5px";
        cardValueDivBottom.style.color = "black";
        cardValueDivBottom.style.fontWeight = "bold";
        cardValueDivBottom.style.fontSize = isNaN(
          Number(game.discardPile[currentCardIndex].value)
        )
          ? "0.6em"
          : "0.9em";
        cardValueDivBottom.style.transform = "rotate(180deg)";
        (cardValueDivBottom.style.textShadow =
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white"),
          (cardValueDivBottom.textContent = game.discardPile[currentCardIndex]
            ? game.discardPile[currentCardIndex].value
            : "skip");
        discardDiv.appendChild(cardValueDivBottom);
        const playedByDiv = document.createElement("div");
        playedByDiv.innerText =
          game.discardPile[currentCardIndex].playedByIndex != null
            ? "Zug " +
              currentCardIndex +
              ": " +
              game.players[game.discardPile[currentCardIndex].playedByIndex]
                .name
            : "Zug " + i + ": Start";
        playedByDiv.style.position = "relative";
        playedByDiv.style.top = "50%";
        playedByDiv.style.left = "50%";
        playedByDiv.style.transform = "translate(-50%, -100%)";
        playedByDiv.style.color = "white";
        playedByDiv.style.fontSize = "0.8em";
        playedByDiv.style.fontWeight = "bold";
        discardDiv.appendChild(playedByDiv);
        discardStepParentDiv.append(discardDiv);
        discardParent.appendChild(discardStepParentDiv);
      }
    }
  }
  return (
    <div
      ref={elementRef}
      style={{ position: "relative", width: "5em", height: "8em" }}
    >
      <div style={{ position: "relative", top: "210px", left: "-20px" }}>
        Historie:
        <input
          id="checkBoxDiscard"
          type="checkbox"
          onChange={() => {
            const checkBox = document.getElementById(
              "checkBoxDiscard"
            ) as HTMLInputElement;
            if (checkBox.checked) {
              showDiscardHistory();
            } else {
              hideDiscardHistory();
            }
          }}
        ></input>
      </div>
      <div id="discardParent">{/* discard history*/}</div>

      {/* Bottom cards illusion */}
      {hasCards && game.discardPile.length > 2 && (
        <>
          <div
            style={{
              position: "absolute",
              width: "5em",
              height: "8em",
              background:
                "linear-gradient(-45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))",
              top: "0px",
              left: "-4px",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "5em",
              height: "8em",
              background:
                "linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1))",
              top: "0px",
              left: "-2px",
              borderRadius: "10px",
            }}
          />
        </>
      )}
      {game.discardPile.map((card: Card, index: number) => {
        if (index <= 0) {
          if (pilePosition != null) {
            // if its first card that hasnt been played: dont animate it
            return (
              <DiscardPileCard
                index={index}
                discardPileX={pilePosition.x}
                discardPileY={pilePosition.y}
              ></DiscardPileCard>
            );
          }
        }
        // else animate it from playerposition to discardpile
        if (card.playedByIndex != null) {
          if (pilePosition != null) {
            return (
              <DiscardPileCard
                index={index}
                playerDevice={playerDevices[card.playedByIndex]}
                discardPileX={pilePosition.x}
                discardPileY={pilePosition.y}
              ></DiscardPileCard>
            );
          }
        }
      })}
    </div>
  );
}

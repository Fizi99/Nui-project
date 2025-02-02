import { useState, useEffect, useRef } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { DiscardPileCard } from "./DiscardpileCard";
import { PlayerDevice } from "./Device";
import { Card } from "./game";

interface Props {
  playerDevices: PlayerDevice[];
}

export function Discardpile({ playerDevices }: Props) {
  const { game } = useGameEngine();
  const hasCards = game && game.discardPile.length > 1;

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

  // Later in your component, you can access getBoundingClientRect

  // const [lastDiscardPileLength, setLastDiscardPileLength] = useState(
  //   game?.discardPile.length || 0
  // );
  // const [wasCardJustPlayed, setWasCardJustPlayed] = useState(false);
  // const [isSecondCardAnimationComplete, setIsSecondCardAnimationComplete] =
  //   useState(false);

  // // Store the last top card separately
  // const [lastTopCard, setLastTopCard] = useState(
  //   game?.discardPile.length > 0
  //     ? game.discardPile[game.discardPile.length - 1]
  //     : null
  // );

  // // Add a new state to store the base pile color
  // const [basePileColor, setBasePileColor] = useState(
  //   game?.discardPile.length > 1 ? game.discardPile[0].color : "black"
  // );

  // useEffect(() => {
  //   if (game && game.discardPile.length > 0) {
  //     // Always use the first card's color as the base pile color
  //     if (game.discardPile.length === 1) {
  //       setBasePileColor(game.discardPile[0].color);
  //     }
  //   }
  // }, [game?.discardPile.length]);

  // useEffect(() => {
  //   if (game?.discardPile.length !== lastDiscardPileLength) {
  //     setLastDiscardPileLength(game?.discardPile.length || 0);
  //   }
  // }, [game?.discardPile.length]);

  // useEffect(() => {
  //   if (game && game.discardPile.length > 1) {
  //     const currentPlayer = game.players[game.currentPlayerIndex];
  //     const lastDiscardedCard = game.discardPile[game.discardPile.length - 1];

  //     const isCardPlayed = !currentPlayer.hand.some(
  //       (card) =>
  //         card.color === lastDiscardedCard.color &&
  //         card.value === lastDiscardedCard.value
  //     );

  //     if (isCardPlayed) {
  //       setWasCardJustPlayed(true);
  //       setIsSecondCardAnimationComplete(false);
  //     }
  //   }
  // }, [game?.discardPile.length]);

  // useEffect(() => {
  //   if (wasCardJustPlayed) {
  //     setIsNewCardReady(false);
  //     setIsSecondCardVisible(true);

  //     setSecondCardPosition({ x: 500, y: 800 });

  //     const animationTimer = setTimeout(() => {
  //       setSecondCardPosition({
  //         x: 100 + (game.discardPile.length - 1) * -2,
  //         y: 200 - (game.discardPile.length - 1) * 5,
  //       });
  //     }, 50);

  //     const cleanupTimer = setTimeout(() => {
  //       setIsSecondCardVisible(false);
  //       setIsSecondCardAnimationComplete(true);
  //     }, 2000);

  //     return () => {
  //       clearTimeout(animationTimer);
  //       clearTimeout(cleanupTimer);
  //     };
  //   }
  // }, [wasCardJustPlayed, game]);

  // useEffect(() => {
  //   if (wasCardJustPlayed && isSecondCardAnimationComplete) {
  //     const newCardTimer = setTimeout(() => {
  //       setIsNewCardReady(true);
  //       setWasCardJustPlayed(false);
  //       setIsSecondCardAnimationComplete(false);

  //       // Update lastTopCard AFTER the animation completes
  //       if (game?.discardPile.length > 0) {
  //         setLastTopCard(game.discardPile[game.discardPile.length - 1]);
  //       }
  //     }, 500);

  //     return () => {
  //       clearTimeout(newCardTimer);
  //     };
  //   }
  // }, [wasCardJustPlayed, isSecondCardAnimationComplete]);

  function showDiscardHistory() {
    if (game?.discardPile.length >= 5) {
      for (let i = 0; i < 5; i++) {
        game?.discardPile[i]
      }
    } else {
      for (let i = 0; i < game?.discardPile.length; i++) {

      }
    }
    const label = document.getElementById("iSneaky")!;
    if (label.style.visibility == "hidden") {
      label.style.visibility = "visible";
    }
    else {
      label.style.visibility = "hidden";
    }
  }

  return (
    <div 
    ref={elementRef}
    style={{ position: "relative", width: "5em", height: "8em" }}>
    <div id="discardParent" 
    style={{ position: "relative",left: -100, top:-300, width: "5em", height: "8em" }}>
      {/* discard history*/}
        </div>
      

      {/* Bottom cards illusion */}
      {hasCards && game.discardPile.length > 2 && (
        <>
          <div 
           style={{
            position: 'absolute',
            width: "5em",
            height: "8em",
            backgroundColor: "rgba(0,0,0,0.2)",
            top: "0px",
            left: "-4px",
            borderRadius: "10px",
          }} />
          <div style={{
            position: 'absolute',
            width: "5em",
            height: "8em",
            backgroundColor: "rgba(0,0,0,0.1)",
            top: "0px",
            left: "-2px",
            borderRadius: "10px",
          }} />
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

      {/* Top card (main card) */}
      {/*<div onMouseEnter={() => {
        for(let i = 0; i<game.discardPile.length;i++){
        const discardDiv= document.createElement("div");
        discardDiv.style.position ="absolute";
        discardDiv.style.left =(i*50).toString();
        discardDiv.style.top ="-300";
        discardDiv.style.width ="5em";
        discardDiv.style.height ="8em";
        discardDiv.style.zIndex ="100";
        discardDiv.style.transition ="all 2s ease-in-out";
        const cardColorDiv = document.createElement("div");
        cardColorDiv.style.width = "5em";
        cardColorDiv.style.height = "8em";
        cardColorDiv.style.backgroundColor = game.discardPile[i] ? game.discardPile[i].color : "black";
        cardColorDiv.style.padding = "8px";
        cardColorDiv.style.borderRadius = "10px";
        cardColorDiv.style.display = "flex";
        cardColorDiv.style.position = "relative";
        cardColorDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
        cardColorDiv.style.border = "2px solid white";
        discardDiv.appendChild(cardColorDiv);
         const cardValueDiv= document.createElement("div");
         cardValueDiv.style.position = "absolute";
         cardValueDiv.style.top = "50%";
         cardValueDiv.style.left = "50%";
         cardValueDiv.style.transform = "translate(-50%, -50%)";
         cardValueDiv.style.color = "white";
         cardValueDiv.style.fontSize = "1.8em";
         cardValueDiv.style.fontWeight = "bold";
         cardValueDiv.textContent = game.discardPile[i] ? game.discardPile[i].value : "skip";
         cardColorDiv.appendChild(cardValueDiv);
         const discardParent= document.getElementById("discardParent")!;
         discardParent.appendChild(discardDiv);
        }
          // const discardHistory = document.getElementsByClassName("discard");
          // for(let i= 0; discardHistory.length;i++){
          //   const element = discardHistory[i] as HTMLElement
          //   element.style.visibility = "visible";
          // }
        }}
        onMouseLeave={() => {
          // const discardHistory = document.getElementsByClassName("discard");
          // for(let i= 0; discardHistory.length;i++){
          //   const element = discardHistory[i] as HTMLElement
          //   element.style.visibility = "hidden";
          // }
         const discardParent= document.getElementById("discardParent")!;
         while(discardParent.hasChildNodes){
          discardParent.removeChild(discardParent.childNodes[discardParent.childNodes.length-1]);
         }}}
        style={{
          width: "5em",
          height: "8em",
          backgroundColor: lastTopCard ? lastTopCard.color : "black",
          padding: "8px",
          borderRadius: "10px",
          display: "flex",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
        }}
      >
        {lastTopCard ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                color: "white",
                fontSize: isNaN(Number(lastTopCard.value)) ? "0.6em" : "0.9em",
                fontWeight: "bold",
              }}
            >
              {lastTopCard.value}
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: isNaN(Number(lastTopCard.value)) ? "1.2em" : "1.8em",
                fontWeight: "bold",
              }}
            >
              {lastTopCard.value}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                color: "white",
                fontSize: isNaN(Number(lastTopCard.value)) ? "0.6em" : "0.9em",
                fontWeight: "bold",
                transform: "rotate(180deg)",
              }}
            >
              {lastTopCard.value}
            </div>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "0.9em",
              fontWeight: "bold",
            }}
          >
            no Game
          </div>
        )}
      </div> */}

      {/* {wasCardJustPlayed && game && isSecondCardVisible && (
        <div
          style={{
            position: "absolute",
            left: secondCardPosition.x,
            top: secondCardPosition.y,
            width: "5em",
            height: "8em",
            zIndex: 100,
            transition: "all 2s ease-in-out",
          }}
        >
          <div
            style={{
              width: "5em",
              height: "8em",
              backgroundColor:
                game.discardPile[game.discardPile.length - 1].color,
              padding: "8px",
              borderRadius: "10px",
              display: "flex",
              position: "relative",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              border: "2px solid white",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "1.8em",
                fontWeight: "bold",
              }}
            >
              {game.discardPile[game.discardPile.length - 1].value}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}


      // {/* discard history card 1*/}
      // <div className="discard"
      //     style={{
      //       visibility:"hidden",
      //       position: "absolute",
      //       left: -100,
      //       top: -300,
      //       width: "5em",
      //       height: "8em",
      //       zIndex: 100,
      //       transition: "all 2s ease-in-out",
      //     }}
      //   >
      //     <div
      //       style={{
      //         width: "5em",
      //         height: "8em",
      //         backgroundColor:
      //         game.discardPile[game.discardPile.length - 1] ? game.discardPile[game.discardPile.length - 1].color : "black",
      //         padding: "8px",
      //         borderRadius: "10px",
      //         display: "flex",
      //         position: "relative",
      //         boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      //         border: "2px solid white",
      //       }}
      //     >
      //       <div
      //         style={{
      //           position: "absolute",
      //           top: "50%",
      //           left: "50%",
      //           transform: "translate(-50%, -50%)",
      //           color: "white",
      //           fontSize: "1.8em",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {game.discardPile[game.discardPile.length - 1] ? game.discardPile[game.discardPile.length - 1].value : "skip"}
      //         </div>
      //     </div>
      //   </div>

      // {/* discard history card 2*/}
      //   <div className="discard"
      //     style={{
      //       visibility:"hidden",
      //       position: "absolute",
      //       left: 0,
      //       top: -300,
      //       width: "5em",
      //       height: "8em",
      //       zIndex: 100,
      //       transition: "all 2s ease-in-out",
      //     }}
      //   >
      //     <div
      //       style={{
      //         width: "5em",
      //         height: "8em",
      //         backgroundColor:
      //         game.discardPile[game.discardPile.length - 2] ? game.discardPile[game.discardPile.length - 2].color : "black",
      //         padding: "8px",
      //         borderRadius: "10px",
      //         display: "flex",
      //         position: "relative",
      //         boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      //         border: "2px solid white",
      //       }}
      //     >
      //       <div
      //         style={{
      //           position: "absolute",
      //           top: "50%",
      //           left: "50%",
      //           transform: "translate(-50%, -50%)",
      //           color: "white",
      //           fontSize: "1.8em",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {game.discardPile[game.discardPile.length - 2] ? game.discardPile[game.discardPile.length - 2].value : "skip"}
      //         </div>
      //     </div>
      //   </div>


      // {/* discard history card 3*/}
      //   <div className="discard"
      //     style={{
      //       visibility:"hidden",
      //       position: "absolute",
      //       left: 100,
      //       top: -300,
      //       width: "5em",
      //       height: "8em",
      //       zIndex: 100,
      //       transition: "all 2s ease-in-out",
      //     }}
      //   >
      //     <div
      //       style={{
      //         width: "5em",
      //         height: "8em",
      //         backgroundColor:
      //         game.discardPile[game.discardPile.length - 3] ? game.discardPile[game.discardPile.length - 3].color : "black",
      //         padding: "8px",
      //         borderRadius: "10px",
      //         display: "flex",
      //         position: "relative",
      //         boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      //         border: "2px solid white",
      //       }}
      //     >
      //       <div
      //         style={{
      //           position: "absolute",
      //           top: "50%",
      //           left: "50%",
      //           transform: "translate(-50%, -50%)",
      //           color: "white",
      //           fontSize: "1.8em",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {game.discardPile[game.discardPile.length - 3] ? game.discardPile[game.discardPile.length - 3].value : "skip"}
      //         </div>
      //     </div>
      //   </div>


      // {/* discard history card 4*/}
      //   <div className="discard"
      //     style={{
      //       visibility:"hidden",
      //       position: "absolute",
      //       left: 200,
      //       top: -300,
      //       width: "5em",
      //       height: "8em",
      //       zIndex: 100,
      //       transition: "all 2s ease-in-out",
      //     }}
      //   >
      //     <div
      //       style={{
      //         width: "5em",
      //         height: "8em",
      //         backgroundColor:
      //         game.discardPile[game.discardPile.length - 4] ? game.discardPile[game.discardPile.length - 4].color : "black",
      //         padding: "8px",
      //         borderRadius: "10px",
      //         display: "flex",
      //         position: "relative",
      //         boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      //         border: "2px solid white",
      //       }}
      //     >
      //       <div
      //         style={{
      //           position: "absolute",
      //           top: "50%",
      //           left: "50%",
      //           transform: "translate(-50%, -50%)",
      //           color: "white",
      //           fontSize: "1.8em",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {game.discardPile[game.discardPile.length - 4] ? game.discardPile[game.discardPile.length - 4].value : "skip"}
      //         </div>
      //     </div>
      //   </div>


      // {/* discard history card 5*/}
      //   <div className="discard"
      //     style={{
      //       visibility:"hidden",
      //       position: "absolute",
      //       left: 300,
      //       top: -300,
      //       width: "5em",
      //       height: "8em",
      //       zIndex: 100,
      //       transition: "all 2s ease-in-out",
      //     }}
      //   >
      //     <div
      //       style={{
      //         width: "5em",
      //         height: "8em",
      //         backgroundColor:
      //           game.discardPile[game.discardPile.length - 5] ? game.discardPile[game.discardPile.length - 5].color : "black",
      //         padding: "8px",
      //         borderRadius: "10px",
      //         display: "flex",
      //         position: "relative",
      //         boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      //         border: "2px solid white",
      //       }}
      //     >
      //       <div
      //         style={{
      //           position: "absolute",
      //           top: "50%",
      //           left: "50%",
      //           transform: "translate(-50%, -50%)",
      //           color: "white",
      //           fontSize: "1.8em",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {game.discardPile[game.discardPile.length - 5] ? game.discardPile[game.discardPile.length - 5].value : "skip"}
      //       </div>
      //     </div>
      //   </div>*\}
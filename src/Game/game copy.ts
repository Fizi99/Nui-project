// // Card types for Uno
// type Color = "red" | "yellow" | "green" | "blue" | "purple";
// type Value = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "skip" | "reverse" | "+2" | "+4" | "Random";

// export class Card {
//   color: Color;  // Wild cards have no color initially
//   value: Value;

//   constructor(color:Color, value:Value) {
//     this.color = color;
//     this.value = value;
//   }

//   setColor(color:Color){
//     this.color = color;
//   }
// }

// export class Deck {
//   private cards: Card[] = [];

//   constructor() {
//     this.initializeDeck();
//     this.shuffle();
//   }

//   private initializeDeck() {
//     const colors: Color[] = ["red", "yellow", "green", "blue"];
//     const values: Value[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2"];

//     // Add number and action cards
//     colors.forEach((color) => {
//       values.forEach((value) => {
//         this.cards.push(new Card(color, value));
//         if (value !== "0") this.cards.push(new Card(color, value)); // Two of each except 0
//       });
//     });

//     // Add wild cards
//     for (let i = 0; i < 4; i++) {
//       this.cards.push(new Card("purple", "+4"));
//       this.cards.push(new Card("purple", "+4"));
//     }
//   }

//   private shuffle() {
//     for (let i = this.cards.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
//     }
//   }

//   drawCard(): Card | null {
//     return this.cards.length > 0 ? this.cards.pop()! : null;
//   }

//   drawMultiple(count: number): Card[] {
//     const cards: Card[] = [];
//     for (let i = 0; i < count; i++) {
//       const card = this.drawCard();
//       if (card) cards.push(card);
//     }
//     return cards;
//   }
// }

// export class Player {
//   name: string;
//   hand: Card[];

//   constructor(name: string) {
//     this.name = name;
//     this.hand = [];
//   }

//   drawCards(deck: Deck, count: number) {
//     this.hand.push(...deck.drawMultiple(count));
//   }

//   playCard(index: number): Card | null {
//     if (index >= 0 && index < this.hand.length) {
//       return this.hand.splice(index, 1)[0];
//     }
//     return null;
//   }
// }
// ////////////////////////////////////////////////////////////////////// GAMELOGIC
// export class Game {
//   deck: Deck;
//   players: Player[];
//   discardPile: Card[];
//   currentPlayerIndex: number;
//   currentColor: Color | null = null;
//   winner: Player | null = null;

//   constructor(playerNames: string[]) {



//     this.deck = new Deck();

//     this.players = playerNames.map(name => new Player(name))
//     this.discardPile = [];
//     this.currentPlayerIndex = 0;

//     this.dealInitialCards();
//   }

//   public fromGameState(gameState : GameState){
//     this.deck = gameState.deck;
//     this.players= gameState.players;
//     this.discardPile= gameState.discardPile;
//     this.currentPlayerIndex= gameState.currentPlayerIndex;
//     this.currentColor= gameState.currentColor;
//     this.winner= gameState.winner;
//   }
  

//   public toGameState() : GameState {
//     return {
//       deck : this.deck,
//       players: this.players,
//       discardPile: this.discardPile,
//       currentPlayerIndex: this.currentPlayerIndex,
//       currentColor: this.currentColor,
//       winner: this.winner,
//     }
//   }


//   public changeName(name: string, index: number){
//     this.players[index].name = name;
//   }

//   private dealInitialCards() {
//     this.players.forEach(player => player.drawCards(this.deck, 7));
//     const firstCard = this.deck.drawCard();
//     if (firstCard) {
//       this.discardPile.push(firstCard);
//       this.currentColor = firstCard.color;
//     }
//   }

//   playTurn(index: number, player: Player){
//     const cardToPlay = player.playCard(index);
//     if (cardToPlay)console.log(cardToPlay);
//     if(cardToPlay){
//       this.discardPile.push(cardToPlay);
//     }else{
//       if (cardToPlay) player.hand.push(cardToPlay); // Invalid move, return card to hand
//       console.log("Invalid move. Try again.");
//     }
//   }

//   // playTurn(cardIndex: number, player : Player) {

//   //   if(this.winner !== null){
//   //     return;
//   //   }

//   //   if(player.name != this.players[this.currentPlayerIndex].name){
//   //     console.log("wrong player! not your turn!");
//   //     return
//   //   }

//   //   const currentPlayer = this.players[this.currentPlayerIndex];
//   //   const cardToPlay = currentPlayer.playCard(cardIndex);

//   //   if (cardToPlay && this.isValidMove(cardToPlay)) {
//   //     this.discardPile.push(cardToPlay);
//   //     if (cardToPlay.value.startsWith("wild") && (cardToPlay.color === "purple" || cardToPlay.color === null)) {
//   //       console.log("A color must be chosen for wild cards.");
//   //       currentPlayer.hand.push(cardToPlay); // Return card to hand if no color chosen
//   //       return;
//   //     }
//   //     this.currentColor = cardToPlay.color;
//   //     this.applyCardEffect(cardToPlay);
//   //     this.nextPlayer();
//   //   } else {
//   //     if (cardToPlay) currentPlayer.hand.push(cardToPlay); // Invalid move, return card to hand
//   //     console.log("Invalid move. Try again.");
//   //   }

//   //   this.determineWinner();
//   // }

//   private isValidMove(card: Card): boolean {
//     const topCard = this.discardPile[this.discardPile.length - 1];
//     if(this.currentColor === "purple"){
//       return true;
//     }
//     return card.color === this.currentColor || card.value === topCard.value || card.value.startsWith("wild");
//   }

//   private applyCardEffect(card: Card) {
//     if (card.value === "skip") {
//       this.nextPlayer();
//     } else if (card.value === "reverse") {
//       this.players.reverse();
//       this.currentPlayerIndex = this.players.length - this.currentPlayerIndex - 1;
//     } else if (card.value === "+2") {
//       this.nextPlayer();
//       this.players[this.currentPlayerIndex].drawCards(this.deck, 2);
//     } else if (card.value === "+4") {
//       this.nextPlayer();
//       this.players[this.currentPlayerIndex].drawCards(this.deck, 4);
//     }
//   }

//   private nextPlayer() {
//     this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
//   }

//   private determineWinner(){
//     this.players.forEach(player => {

//       if(player.hand.length <= 0){
//         this.winner = player;
//         return;
//       }
      
//     });
//   }
// }
import { arrayMoveImmutable } from "array-move";
// Data interfaces
type Color = "red" | "yellow" | "green" | "blue" | "purple";
type Value = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "skip" | "reverse" | "+2" | "+4" | "shuffle";

export interface Card{
  color: Color,
  value: Value,
  playedByIndex: number | null,
  drawnByIndex: number |null,
}

export interface Deck{
  
  drawPile: Card[]

}

export interface Player{

  name: string,
  hand: Card[]
}

// interface for gamestate. is shared through multiplayer
export interface GameState{
  deck: Card[],
  players: Player[],
  discardPile: Card[],
  currentPlayerIndex: number,
  currentColor: Color | null,
  winner: Player | null,
  started: boolean,
}


// gameclass with gamelogic
export class Game {
    deck: Card[];
    players: Player[];
    discardPile: Card[];
    currentPlayerIndex: number;
    currentColor: Color | null = null;
    winner: Player | null = null;
    started: boolean;
  
    constructor(playerNames: string[]) {
      this.deck = [],
      this.players = playerNames.map(name => ({name: name, hand: []})),
      this.discardPile = [],
      this.currentPlayerIndex = 0;
      this.started = false;

      this.initializeDeck();
      this.shuffle();

      this.dealInitialCards();
      this.turnFirstCard();
    }
  
    public fromGameState(gameState : GameState){
      this.deck = gameState.deck;
      this.players= gameState.players;
      this.discardPile= gameState.discardPile;
      this.currentPlayerIndex= gameState.currentPlayerIndex;
      this.currentColor= gameState.currentColor;
      this.winner= gameState.winner;
      this.started = gameState.started;
    }

    public toGameState() : GameState {
      return {
        deck : this.deck,
        players: this.players,
        discardPile: this.discardPile,
        currentPlayerIndex: this.currentPlayerIndex,
        currentColor: this.currentColor,
        winner: this.winner,
        started: this.started
      }
    }

    public startGame(start: boolean){
      this.started = start;
    }

    public changeName(name: string, index: number){
      this.players[index].name = name;
    }

    private initializeDeck() {
    const colors: Color[] = ["red", "yellow", "green", "blue"];
    const values: Value[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2"];

    // Add number and action cards
    colors.forEach((color) => {
      values.forEach((value) => {
        this.deck.push({color: color, value: value, playedByIndex: null, drawnByIndex: null});
        if (value !== "0") this.deck.push({color: color, value: value, playedByIndex: null,  drawnByIndex: null}); // Two of each except 0
      });
    });

    // Add wild cards
    for (let i = 0; i < 4; i++) {
      //this.deck.push({color: "purple", value: "+2", playedByIndex: null,  drawnByIndex: null});
      this.deck.push({color: "purple", value: "+4", playedByIndex: null, drawnByIndex: null});
    }


    for (let i = 0; i < 4; i++) {
      this.deck.push({color: "purple", value: "shuffle", playedByIndex: null,  drawnByIndex: null});
    }

  }

  private shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
  
    private dealInitialCards() {
      this.players.forEach((_player : Player,index: number) => {;this.drawCards(index, 7)});
    }

    private turnFirstCard(){
      this.discardPile.push(...this.deck.splice(0, 1));
    }

    public drawCards(playerIndex: number, amount:number){

      for(let i = 0; i < amount; i++){
        const card :Card = {color: this.deck[0].color, value: this.deck[0].value, playedByIndex: null,  drawnByIndex: playerIndex}
        this.deck.splice(0, 1)
        this.players[playerIndex].hand.push(card);
      }

    }

    public playCard(playerIndex: number, handIndex: number){
      const card :Card = {color: this.players[playerIndex].hand[handIndex].color, value: this.players[playerIndex].hand[handIndex].value, playedByIndex: playerIndex,  drawnByIndex: null}
    
      if (card.value === "shuffle") {
      //     const colors: Color[] = ["red", "yellow", "green", "blue"];
      //     const values: Value[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2"];
          
      //     card.color = colors[Math.floor(Math.random() * colors.length)];
      //     card.value = values[Math.floor(Math.random() * values.length)];

      this.players.forEach((_element, index : number) => {
        if(index !== playerIndex){
          this.shufflePlayerHandColor(index);
        }
        
      });
        
      }
      
      this.currentColor = card.color;
      this.players[playerIndex].hand.splice(handIndex, 1)
      this.discardPile.push(card);  
    }

    public shufflePlayerHandColor(playerIndex: number){
      const colors: Color[] = ["red", "yellow", "green", "blue"];
        this.players[playerIndex].hand.forEach(element => {
          if(element.value !== "+2" && element.value !== "+4" && element.value !== "shuffle"){
            element.color = colors[Math.floor(Math.random() * colors.length)];
          }
        });
    }

    public sortPlayershand(playerIndex: number, curIndex: number, toIndex: number){
      const newSortHand = arrayMoveImmutable(this.players[playerIndex].hand, curIndex, toIndex);
      this.players[playerIndex].hand = newSortHand;
  }
}
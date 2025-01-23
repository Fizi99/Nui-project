// Card types for Uno
type Color = "red" | "yellow" | "green" | "blue" | "black";
type Value = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "skip" | "reverse" | "draw2" | "wild" | "wildDraw4";

export class Card {
  color: Color;  // Wild cards have no color initially
  value: Value;

  constructor(color:Color, value:Value) {
    this.color = color;
    this.value = value;
  }

  setColor(color:Color){
    this.color = color;
  }
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck() {
    const colors: Color[] = ["red", "yellow", "green", "blue"];
    const values: Value[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw2"];

    // Add number and action cards
    colors.forEach((color) => {
      values.forEach((value) => {
        this.cards.push(new Card(color, value));
        if (value !== "0") this.cards.push(new Card(color, value)); // Two of each except 0
      });
    });

    // Add wild cards
    for (let i = 0; i < 4; i++) {
      this.cards.push(new Card("black", "wild"));
      this.cards.push(new Card("black", "wildDraw4"));
    }
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard(): Card | null {
    return this.cards.length > 0 ? this.cards.pop()! : null;
  }

  drawMultiple(count: number): Card[] {
    const cards: Card[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.drawCard();
      if (card) cards.push(card);
    }
    return cards;
  }
}

export class Player {
  name: string;
  hand: Card[];

  constructor(name: string) {
    this.name = name;
    this.hand = [];
  }

  drawCards(deck: Deck, count: number) {
    this.hand.push(...deck.drawMultiple(count));
  }

  playCard(index: number): Card | null {
    if (index >= 0 && index < this.hand.length) {
      return this.hand.splice(index, 1)[0];
    }
    return null;
  }
}
////////////////////////////////////////////////////////////////////// GAMELOGIC
export class Game {
  deck: Deck;
  players: Player[];
  discardPile: Card[];
  currentPlayerIndex: number;
  currentColor: Color | null = null;
  winner: Player | null = null;

  constructor(playerNames: string[]) {
    this.deck = new Deck();
    this.players = playerNames.map(name => new Player(name));
    this.discardPile = [];
    this.currentPlayerIndex = 0;

    this.dealInitialCards();
  }

  private dealInitialCards() {
    this.players.forEach(player => player.drawCards(this.deck, 7));
    const firstCard = this.deck.drawCard();
    if (firstCard) {
      this.discardPile.push(firstCard);
      this.currentColor = firstCard.color;
    }
  }

  /*playTurn(index: number, player: Player){
    const cardToPlay = player.playCard(index);
    if (cardToPlay)console.log(cardToPlay);
    if(cardToPlay && this.isValidMove(cardToPlay)){
      this.discardPile.push(cardToPlay);
    }else{
      if (cardToPlay) player.hand.push(cardToPlay); // Invalid move, return card to hand
      console.log("Invalid move. Try again.");
    }
  }*/

  playTurn(cardIndex: number) {

    if(this.winner !== null){
      return;
    }

    const currentPlayer = this.players[this.currentPlayerIndex];
    const cardToPlay = currentPlayer.playCard(cardIndex);

    if (cardToPlay && this.isValidMove(cardToPlay)) {
      this.discardPile.push(cardToPlay);
      if (cardToPlay.value.startsWith("wild") && (cardToPlay.color === "black" || cardToPlay.color === null)) {
        console.log("A color must be chosen for wild cards.");
        currentPlayer.hand.push(cardToPlay); // Return card to hand if no color chosen
        return;
      }
      this.currentColor = cardToPlay.color;
      this.applyCardEffect(cardToPlay);
      this.nextPlayer();
    } else {
      if (cardToPlay) currentPlayer.hand.push(cardToPlay); // Invalid move, return card to hand
      console.log("Invalid move. Try again.");
    }

    this.determineWinner();
  }

  private isValidMove(card: Card): boolean {
    const topCard = this.discardPile[this.discardPile.length - 1];
    if(this.currentColor === "black"){
      return true;
    }
    return card.color === this.currentColor || card.value === topCard.value || card.value.startsWith("wild");
  }

  private applyCardEffect(card: Card) {
    if (card.value === "skip") {
      this.nextPlayer();
    } else if (card.value === "reverse") {
      this.players.reverse();
      this.currentPlayerIndex = this.players.length - this.currentPlayerIndex - 1;
    } else if (card.value === "draw2") {
      this.nextPlayer();
      this.players[this.currentPlayerIndex].drawCards(this.deck, 2);
    } else if (card.value === "wildDraw4") {
      this.nextPlayer();
      this.players[this.currentPlayerIndex].drawCards(this.deck, 4);
    }
  }

  private nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  private determineWinner(){
    this.players.forEach(player => {

      if(player.hand.length <= 0){
        this.winner = player;
        return;
      }
      
    });
  }
}

import { useState } from 'react';
import Card from '../hanafuda/Card';

interface aCard {
    value: string;
    id: string;
    monthValue: string;
    readableName: string;
    faceUp: boolean;
  }

  interface GameState {
    win: boolean;
    faceDownCards: aCard[];
    faceUpCards: aCard[];
    matchingCards: aCard[];
    currentMonth: monthMatching;
  }

  interface monthMatching {
    [key: string]: number;
  }

function Memory() {
    const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_bird', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
    // const rowLength = 6;
    // const numberOfRows = 8;
    const initialState: GameState = {
        win: false,
        faceDownCards: [],
        faceUpCards: [],
        matchingCards: [],
        currentMonth: {}
    };
    const initialCardSet: aCard[] = [];
    const [gameState, setGameState] = useState(initialState);
    const [cardSet, setCardSet] = useState(initialCardSet);
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    function initializeCardValues() {
        const cards = [];
        const copyCardList = [...cardList];
        for (let i = 0; i < cardList.length; i++) {
          const randomNumber = Math.floor(Math.random() * copyCardList.length);
    
          const newCard: aCard = {
            value: copyCardList[randomNumber],
            readableName: copyCardList[randomNumber].replace('_', ' '),
            id: i.toString(),
            monthValue: copyCardList[randomNumber].slice(0, copyCardList[randomNumber].indexOf('_')),
            faceUp: true,
          };
          cards.push(newCard);
          copyCardList.splice(randomNumber, 1);
        }
        setCardSet(cards);
        const copyGameState = {...gameState};
        copyGameState.faceUpCards = [];
        copyGameState.faceDownCards = [...cards];
        setGameState(copyGameState);
      }
    
    function flipCard (id: string, e: React.SyntheticEvent) {
      const target = e.target as HTMLImageElement;
      console.log('flip', id);
      const copyGameState = {...gameState};
      const arrayToUse = target.alt !== 'back of card' ? copyGameState.faceUpCards : copyGameState.faceDownCards;
      const indexToChange = arrayToUse.findIndex((card) => card.id === id);
      const cardToChange = arrayToUse[indexToChange];

      if (target.alt === 'back of card') {
        if (copyGameState.faceUpCards.length >= 2) {
            return;
        }
        cardToChange.faceUp = true;
        if (copyGameState.currentMonth[cardToChange.monthValue] < 2) {
            copyGameState.matchingCards.push(...copyGameState.faceUpCards);
            copyGameState.faceUpCards.pop();
            copyGameState.faceUpCards.pop();
            copyGameState.currentMonth[cardToChange.monthValue] = 0;
            // target.parentElement.className = 'cardboxscoring';
        } else {
            copyGameState.currentMonth[cardToChange.monthValue] += 1;
            copyGameState.faceUpCards.push(cardToChange);
            copyGameState.faceDownCards.splice(indexToChange, 1);
        }
        setGameState(copyGameState);
      } else {
        copyGameState.currentMonth[cardToChange.monthValue] -= 1;
        cardToChange.faceUp = false;
        copyGameState.faceDownCards.push(cardToChange);
        copyGameState.faceUpCards.splice(indexToChange, 1);
        setGameState(copyGameState);
      }
    }

    function makeDeckLayout() {
        const deck: JSX.Element[] = [];
            for (let i = 0; i < cardSet.length; i++) {
                const currentCard = cardSet[i];
                const aNewCard = <div className="cardbox" key={currentCard.id}>
                <Card monthValue={currentCard.monthValue} faceUp={currentCard.faceUp} flipCard={(e: React.MouseEvent<HTMLElement, MouseEvent>) => flipCard(currentCard.id, e)} id={currentCard.id} chosenCard={currentCard.value} altText={currentCard.readableName}/>
              </div>
              deck.push(aNewCard);
            }
        return deck;
    }
    const deckToUse = makeDeckLayout();
    function layoutRow(deck: JSX.Element[], start: number, finish: number) {
        const cardsToUse = deck.slice(start, finish);
        let newRow: JSX.Element = <div className="cardrow">{...cardsToUse}<br></br></div>;
        return newRow;
    }

    function resetGame() {
      if (!played) setPlayed(true);
      initializeCardValues();
    //   setGameState(initialState);
      setIsPlaying(false);
    }

    function startGame() {
        setIsPlaying(true);
        const copyGameState = {...gameState};
        copyGameState.faceDownCards.forEach((card) => {
            card.faceUp = false;
        });
        setGameState(copyGameState);
    }

    const resetButton = <button onClick={() => resetGame()}>{!played ? "Play a game?" : "Reset?"}</button>
    const startButton = <button onClick={() => startGame()}>Press when ready</button>

    function makeActionButton() {
      if (!played) {
        if (isPlaying) return startButton;
        else return resetButton;
      } else {
        if (!isPlaying) return startButton;
        else return resetButton;
      }
    }
    

    return (
        <>
          {makeActionButton()}
          {isPlaying ? Math.floor(gameState.matchingCards.length / 2) : null}
          <div className="memoryboard">
            {layoutRow(deckToUse, 0, 8)}
            {layoutRow(deckToUse, 8, 16)}
            {layoutRow(deckToUse, 16, 24)}
            {layoutRow(deckToUse, 24, 32)}
            {layoutRow(deckToUse, 32, 40)}
            {layoutRow(deckToUse, 40, 48)}
          </div>
        </>
    )
};

export default Memory;
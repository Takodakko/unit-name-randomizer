import { useState, useRef, useEffect } from 'react';
import Card from '../hanafuda/Card';

interface aCard {
    value: string;
    id: string;
    monthValue: string;
    readableName: string;
    faceUp: boolean;
    scored: boolean;
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

  const initialMonthMatching = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  }

function Memory() {
    const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_scroll', 'november_bird', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
    const [hardMode, setHardMode] = useState(false);
    const numberOfTurnsHard = 4;
    const numberOfTurnsEasy = 72;
    const [remainingTurns, setRemainingTurns] = useState(numberOfTurnsEasy);
    const initialState: GameState = {
        win: false,
        faceDownCards: [],
        faceUpCards: [],
        matchingCards: [],
        currentMonth: {...initialMonthMatching}
    };
    
    const refStorage = new Map();
    for (let i = 0; i < 48; i++) {
      const newRef = useRef(null);
      refStorage.set(i.toString(), newRef);
    }
    const initialCardSet: aCard[] = [];
    const [gameState, setGameState] = useState(initialState);
    const [cardSet, setCardSet] = useState(initialCardSet);
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
      if (remainingTurns < 1) {
        setGameState({...gameState, win: true});
      }
    }, [remainingTurns, gameState.win]);

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
            scored: false
          };
          cards.push(newCard);
          copyCardList.splice(randomNumber, 1);
        }
        setCardSet(cards);
        setHardMode(false);
        setRemainingTurns(numberOfTurnsEasy);
        const copyGameState = {...gameState};
        copyGameState.win = false;
        copyGameState.faceUpCards = [];
        copyGameState.faceDownCards = [...cards];
        copyGameState.matchingCards = [];
        copyGameState.currentMonth = {...initialMonthMatching};
        setGameState(copyGameState);
      }
    
    function flipCard (id: string, e: React.SyntheticEvent) {
      console.log(gameState.win, 'won?')
      if (remainingTurns < 1) {
        return;
      }
      const target = e.target as HTMLImageElement;
      console.log('flip', id);
      const copyGameState = {...gameState};
      const arrayToUse = target.alt !== 'back of card' ? copyGameState.faceUpCards : copyGameState.faceDownCards;
      const indexToChange = arrayToUse.findIndex((card) => card.id === id);
      if (indexToChange === -1) {
        return;
      }
      const cardToChange = arrayToUse[indexToChange];

      if (target.alt === 'back of card') {
        if (copyGameState.faceUpCards.length >= 2) {
            return;
        }
        setRemainingTurns(remainingTurns - 1);
        cardToChange.faceUp = true;
        const currentCardElement = refStorage.get(cardToChange.id);
        if (copyGameState.currentMonth[cardToChange.monthValue] === 1) {
            currentCardElement.current.className = 'cardbox cardboxscoring';
            const ids:string[] = [];
            copyGameState.matchingCards.push(...copyGameState.faceUpCards);
            copyGameState.matchingCards.push(cardToChange);
            copyGameState.faceUpCards.forEach((card) => {
              card.scored = true;
              ids.push(card.id);
            });
            ids.forEach((id) => {
              const otherScoringCard = refStorage.get(id);
              otherScoringCard.current.className = 'cardbox cardboxscoring';
            })
            
            copyGameState.faceUpCards.pop();
            copyGameState.faceUpCards.pop();
            copyGameState.currentMonth[cardToChange.monthValue] = 0;
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
                const divRef = refStorage.get(currentCard.id);
                const aNewCard = <div className="cardbox" key={currentCard.id} ref={divRef}>
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
      setIsPlaying(false);
      refStorage.forEach((val) => {
        if (val.current) val.current.className = 'cardbox';
      })
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

    function toggleHardMode() {
      if (isPlaying) return;
      if (!hardMode) setRemainingTurns(numberOfTurnsHard);
      else setRemainingTurns(numberOfTurnsEasy);
      setHardMode(!hardMode);
    }

    function hardModeButtonClass() {
      if (!hardMode) return 'hardmodebutton'
      else return 'hardmodebutton chosen'
    }

    

    if (!gameState.win) {
    return (
        <>
          <div className={hardModeButtonClass()}>
            <button className={hardMode ? "chosenbutton" : ""} onClick={() => toggleHardMode()}>Hard Mode {hardMode ? "is On" : "is Off"}</button>
          </div>
          {makeActionButton()} <br></br>Points: {isPlaying ? Math.floor(gameState.matchingCards.length / 2) : null}<br></br>
          Turns left: {remainingTurns}
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
  } else {
    return (
      <>
        <div>
          {(gameState.matchingCards.length / 2) === 24 ? "You Win!!!" : "Better luck next time"}
        </div><br></br>
        <div>
          Turns left: {remainingTurns}<br></br>
          Points achieved: {Math.floor(gameState.matchingCards.length / 2)}
        </div><br></br>
        <div>
          {makeActionButton()}
        </div>
        
      </>
    )
  }
};

export default Memory;
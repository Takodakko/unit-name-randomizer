import { useState } from 'react';
import GameBoard from './GameBoard';

export interface aCard {
  value: string;
  id: string;
  monthValue: string;
  faceUp: boolean;
  inDeck: boolean;
  readableName: string;
}

function Hanafuda() {
  const [youWin, setYouWin] = useState(false);

  let boardKey = Math.random();
  
  const cardNumber = 12;
  
  const rowLength = cardNumber / 2;
  
  const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_scroll', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
  const initialSet = initializeCardValues();
  const [cardValues, setCardValues] = useState(initialSet);
  
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
        faceUp: i < rowLength ? true : false,
        inDeck: i < cardNumber ? false : true
      };
      
      cards.push(newCard);
      copyCardList.splice(randomNumber, 1);
    }
    return cards;
  }

  function resetCardValues() {
    console.log('reseting...');
    const newValues = initializeCardValues();
    setCardValues(newValues);
  }
  

  function calculateCardValues() {
        console.log('calculating...');
        
  }
  
  function displayBoardState() {
    if (youWin === true) {
      return <div>You win!</div>;
    } else {
      return (<div>Play a matching game?
      <GameBoard 
        key={boardKey}
        cardNumber={cardNumber} 
        rowLength={rowLength}
        resetCardValues={resetCardValues}
        calculateCardValues={calculateCardValues}
        cardValues={cardValues}
        />
    </div>)
    }
  }
  
  return (
    <>
      {displayBoardState()}
    </>
  )
}

export default Hanafuda;
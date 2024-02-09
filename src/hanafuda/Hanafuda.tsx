import { useState } from 'react';
import Card from './Card';

function Hanafuda() {
  const [youWin, setYouWin] = useState(false);
  const [faceDownCards, setFaceDownCards] = useState([true, true, true]);
  const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_bird', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
  const [cardValues, setCardValues] = useState(initializeCardValues());

  function initializeCardValues() {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * cardList.length);
      cards.push(cardList[randomNumber]);
    }
    return cards;
  }

  function resetCardValues() {
    const newValues = initializeCardValues();
    setCardValues(newValues);
    setFaceDownCards([true, true, true]);
  }

  function flipCard(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    console.log(e);
    if (e.target) {
      const cardToChange = parseInt(e.target.id, 10);
      const newState = [...faceDownCards];
      newState[cardToChange] = false;
      setFaceDownCards(newState);
    }
  }

  return (
    <>
      {youWin ? 
      <div>You win!</div> : 
      <div>Play a matching game?
        <br></br>
        <div className="cardrow">
          <div className="cardbox">
            <Card blank={false} flipCard={flipCard} id="3" chosenCard={cardValues[0]}/>
          </div>
          <div className="cardbox">
            <Card blank={false} flipCard={flipCard} id="4" chosenCard={cardValues[1]}/>
          </div>
          <div className="cardbox">
            <Card blank={false} flipCard={flipCard} id="5" chosenCard={cardValues[2]}/>
          </div>
        </div>
        <br></br>
        <div className="cardrow">
          <div className="cardbox">
            <Card blank={faceDownCards[0]} flipCard={flipCard} id="0" chosenCard={cardValues[3]}/>
          </div>
          <div className="cardbox">
            <Card blank={faceDownCards[1]} flipCard={flipCard} id="1" chosenCard={cardValues[4]}/>
          </div>
          <div className="cardbox">
            <Card blank={faceDownCards[2]} flipCard={flipCard} id="2" chosenCard={cardValues[5]}/>
          </div>
        </div>
        <button onClick={resetCardValues}>Reset</button>
      </div>}
    </>
  )
}

export default Hanafuda;
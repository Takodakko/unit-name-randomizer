import { useState } from 'react';
import Card from './Card';

function GameBoard(props: {cardNumber: number, deleteFromHidden: Function, assignToShown: Function, getMonthValueFromHidden: Function, resetAllMonthValues: Function, assignToHidden: Function}) {
    const initialFaceDown = new Array();
    initialFaceDown.length = props.cardNumber;
    initialFaceDown.fill(true);
    const rowLength = props.cardNumber / 2;
    const [faceDownCards, setFaceDownCards] = useState(initialFaceDown);
    const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_bird', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
    const [cardValues, setCardValues] = useState(initializeCardValues());
  
    function initializeCardValues() {
      const cards = [];
      const copyCardList = [...cardList];
      for (let i = 0; i < props.cardNumber; i++) {
        const randomNumber = Math.floor(Math.random() * copyCardList.length);
        cards.push(copyCardList[randomNumber]);
        copyCardList.splice(randomNumber, 1);
      }
      return cards;
    }
  
    function resetCardValues() {
      const newValues = initializeCardValues();
      setCardValues(newValues);
      setFaceDownCards(initialFaceDown);
      props.resetAllMonthValues();
    }

    function calculateCardValues() {
        console.log('calculating...');
        
    }

    function flipCard(id: string) {
          const cardToChange = parseInt(id, 10);
          const newState = [...faceDownCards];
          newState[cardToChange] = false;
          setFaceDownCards(newState);
          const month = props.getMonthValueFromHidden(id);
        //   props.assignToShown(id, month);
          props.deleteFromHidden(id, month);
      }

    function makeCardRow(number: number, frontOfCard: boolean) {
      const cards = [];
      for (let i = 0; i < number; i++) {
        const cardId = !frontOfCard ? (i + rowLength).toString() : i.toString();
        const chosenCard = !frontOfCard ? cardValues[i] : cardValues[i + rowLength];
        const monthValue = chosenCard.slice(0, chosenCard.indexOf('_'));
        if (!frontOfCard) {
            props.assignToShown(cardId, monthValue);
        } else {
            props.assignToHidden(cardId, monthValue);
        }
        const aCard = <div className="cardbox">
        <Card monthValue={monthValue} blank={!frontOfCard ? frontOfCard : faceDownCards[i]} flipCard={() => flipCard(cardId)} id={cardId} chosenCard={chosenCard}/>
      </div>
      cards.push(aCard);
      }
      return cards;
    }

    return (
        <>
        <br></br>
        <div className="cardrow">
            {makeCardRow(rowLength, false)}
        </div>
        <br></br>
        <div className="cardrow">
            {makeCardRow(rowLength, true)}
        </div>
        <button className="hanafudabutton" onClick={resetCardValues}>Reset</button><br></br>
        <button className="hanafudabutton" onClick={calculateCardValues}>What's my score?</button>
        </>
    )
};

export default GameBoard;
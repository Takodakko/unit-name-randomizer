import { MouseEventHandler, useState } from 'react';
import Card from './Card';
import {aCard}  from './Hanafuda';

function GameBoard(props: {
    cardNumber: number,
    rowLength: number, 
    resetCardValues: Function, 
    calculateCardValues: MouseEventHandler<HTMLButtonElement>, 
    cardValues: aCard[],
    }) {
    
    const [activeCardsInDeck, setActiveCardsInDeck] = useState(props.cardValues.slice(12));
    const [activeCardsFaceUp, setActiveCardsFaceUp] = useState(props.cardValues.slice(0, 6));
    const [activeCardsFaceDown, setActiveCardsFaceDown] = useState(props.cardValues.slice(6, 12));
    const [canReveal, setCanReveal] = useState(true);

    function resetGame() {
        props.resetCardValues();
        deckRow = makeCardRow('cardsInDeck');
        faceDownRow = makeCardRow('cardsFaceDown');
        faceUpRow = makeCardRow('cardsFaceUp');
    }

    function flipCard(id: string, place: 'up' | 'down' | 'deck') {
      console.log('flip')
        const copyUpCards = [...activeCardsFaceUp];
        const copyDownCards = [...activeCardsFaceDown];
        const copyDeck = [...activeCardsInDeck];

        if (place === 'up' || canReveal === false) {
            return;
        } else if (place === 'down') {
            const cardToChange = copyDownCards.findIndex((card) => card.id === id)
            copyDownCards[cardToChange].faceUp = true;
            copyUpCards.push(copyDownCards[cardToChange]);
            copyDownCards.splice(cardToChange, 1);
            setActiveCardsFaceUp(copyUpCards);
            setActiveCardsFaceDown(copyDownCards);
        } else {
            copyDeck[0].faceUp = true;
            copyDeck[0].inDeck = false;
            copyUpCards.push(copyDeck[0]);
            copyDeck.shift();
            setActiveCardsFaceUp(copyUpCards);
            setActiveCardsInDeck(copyDeck);
        }
        if (activeCardsFaceUp.length > 7) {
          setCanReveal(false);
        }
    }
    
    function makeCardRow(arrayName: 'cardsFaceUp' | 'cardsFaceDown' | 'cardsInDeck'): JSX.Element[] {
        const displayCardsFaceUp: JSX.Element[] = [];
        const displayCardsFaceDown: JSX.Element[] = [];
        const displayCardsInDeck: JSX.Element[] = [];

      if (arrayName === 'cardsFaceUp') {
        for (let i = 0; i < activeCardsFaceUp.length; i++) {
            const currentCard = activeCardsFaceUp[i];
            const aNewCard = <div className="cardbox">
            <Card monthValue={currentCard.monthValue} faceUp={currentCard.faceUp} flipCard={() => flipCard(currentCard.id, 'up')} id={currentCard.id} chosenCard={currentCard.value} altText={currentCard.readableName}/>
          </div>
          displayCardsFaceUp.push(aNewCard);
        }
        return displayCardsFaceUp;
      } else if (arrayName === 'cardsFaceDown') {
        for (let i = 0; i < activeCardsFaceDown.length; i++) {
            const currentCard = activeCardsFaceDown[i];
            const aNewCard = <div className="cardbox">
            <Card monthValue={currentCard.monthValue} faceUp={currentCard.faceUp} flipCard={() => flipCard(currentCard.id, 'down')} id={currentCard.id} chosenCard={currentCard.value} altText={currentCard.readableName}/>
          </div>
          displayCardsFaceDown.push(aNewCard);
        }
        return displayCardsFaceDown;
      } else {
        const currentCard = activeCardsInDeck[0];
        const aNewCard = <div className="cardbox">
            <Card monthValue={currentCard.monthValue} faceUp={currentCard.faceUp} flipCard={() => flipCard(currentCard.id, 'deck')} id={currentCard.id} chosenCard={currentCard.value} altText={currentCard.readableName}/>
          </div>
        displayCardsInDeck.push(aNewCard);
        return displayCardsInDeck;
      }
    }

    let deckRow = makeCardRow('cardsInDeck');
    let faceDownRow = makeCardRow('cardsFaceDown');
    let faceUpRow = makeCardRow('cardsFaceUp');

    return (
        <>
        <br></br>
        <div className="cardrow">
          {...deckRow}
        </div>
        <br></br>
        <div className="cardrow">
            {...faceDownRow}
        </div>
        <br></br>
        <div className="cardrow">
            {...faceUpRow}
        </div>
        <button className="hanafudabutton" onClick={() => resetGame()}>Reset</button><br></br>
        <button className="hanafudabutton" onClick={props.calculateCardValues}>What's my score?</button>
        </>
    )
};

export default GameBoard;
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
    
    const [cardsInDeck, setCardsInDeck] = useState(sortCards('deck'));
    const [cardsFaceUp, setCardsFaceUp] = useState(sortCards('up'));
    const [cardsFaceDown, setCardsFaceDown] = useState(sortCards('down'));

    function resetGame() {
        props.resetCardValues();
        setCardsInDeck(sortCards('deck'));
        setCardsInDeck(sortCards('down'));
        setCardsInDeck(sortCards('up'));
    }

    function flipCard(id: string, place: 'up' | 'down' | 'deck') {
        const copyUpCards = [...cardsFaceUp];
        const copyDownCards = [...cardsFaceDown];
        const copyDeck = [...cardsInDeck];

        if (place === 'up') {
            return;
        } else if (place === 'down') {
            const cardToChange = copyDownCards.findIndex((card) => card.id === id)
            copyDownCards[cardToChange].faceUp = true;
            copyUpCards.push(copyDownCards[cardToChange]);
            copyDownCards.splice(cardToChange, 1);
            setCardsFaceUp(copyUpCards);
            setCardsFaceDown(copyDownCards);
        } else {
            copyDeck[0].faceUp = true;
            copyDeck[0].inDeck = false;
            copyUpCards.push(copyDeck[0]);
            copyDeck.shift();
            setCardsFaceUp(copyUpCards);
            setCardsInDeck(copyDeck);
        }
    }

    function sortCards(group: 'deck' | 'up' | 'down') {
      const theFullSet = props.cardValues;
      const up: aCard[] = [];
      const down: aCard[] = [];
      const deck: aCard[] = [];
      
      if (group === 'up') {
        for (let i = 0; i < props.rowLength; i++) {
            const aNewCard = theFullSet[i];
            up.push(aNewCard);
        }
        return up;
      } else if (group === 'down') {
        for (let i = props.rowLength; i < (props.rowLength * 2); i++) {
            const aNewCard = theFullSet[i];
            down.push(aNewCard);
        }
        return down;
      } else {
        for (let i = (props.rowLength * 2); i < theFullSet.length; i++) {
            const aNewCard = theFullSet[i];
            deck.push(aNewCard);
        }
        return deck;
      }
    }
    
    function makeCardRow(arrayName: 'cardsFaceUp' | 'cardsFaceDown' | 'cardsInDeck'): JSX.Element[] {
        const displayCardsFaceUp: JSX.Element[] = [];
        const displayCardsFaceDown: JSX.Element[] = [];
        const displayCardsInDeck: JSX.Element[] = [];
        
      if (arrayName === 'cardsFaceUp') {
        for (let i = 0; i < cardsFaceUp.length; i++) {
            const aNewCard = <div className="cardbox">
            <Card monthValue={cardsFaceUp[i].monthValue} faceUp={cardsFaceUp[i].faceUp} flipCard={() => flipCard(cardsFaceUp[i].id, 'up')} id={cardsFaceUp[i].id} chosenCard={cardsFaceUp[i].value} altText={cardsFaceUp[i].readableName}/>
          </div>
          displayCardsFaceUp.push(aNewCard);
        }
        return displayCardsFaceUp;
      } else if (arrayName === 'cardsFaceDown') {
        for (let i = 0; i < cardsFaceDown.length; i++) {
            const aNewCard = <div className="cardbox">
            <Card monthValue={cardsFaceDown[i].monthValue} faceUp={cardsFaceDown[i].faceUp} flipCard={() => flipCard(cardsFaceDown[i].id, 'down')} id={cardsFaceDown[i].id} chosenCard={cardsFaceDown[i].value} altText={cardsFaceDown[i].readableName}/>
          </div>
          displayCardsFaceDown.push(aNewCard);
        }
        return displayCardsFaceDown;
      } else {
        const aNewCard = <div className="cardbox">
            <Card monthValue={cardsInDeck[0].monthValue} faceUp={cardsInDeck[0].faceUp} flipCard={() => flipCard(cardsInDeck[0].id, 'deck')} id={cardsInDeck[0].id} chosenCard={cardsInDeck[0].value} altText={cardsInDeck[0].readableName}/>
          </div>
        displayCardsInDeck.push(aNewCard);
        return displayCardsInDeck;
      }
    }

    return (
        <>
        <br></br>
        <div className="cardrow">
          {...makeCardRow('cardsInDeck')}
        </div>
        <br></br>
        <div className="cardrow">
            {...makeCardRow('cardsFaceDown')}
        </div>
        <br></br>
        <div className="cardrow">
            {...makeCardRow('cardsFaceUp')}
        </div>
        <button className="hanafudabutton" onClick={() => resetGame()}>Reset</button><br></br>
        <button className="hanafudabutton" onClick={props.calculateCardValues}>What's my score?</button>
        </>
    )
};

export default GameBoard;
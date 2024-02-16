
function Card(props: {
  faceUp: boolean, 
  flipCard: React.MouseEventHandler<HTMLImageElement>, 
  id: string, 
  chosenCard: string, 
  monthValue: string, 
  altText: string
}) {

    return (
        <>
          {props.faceUp ? 
          <img 
            id={props.id} 
            onClick={props.flipCard} 
            alt={props.altText} 
            src={`../src/assets/cards/${props.chosenCard}.jpg`} 
            height="100px" 
            width="65px">
          </img> : 
          <img 
            id={props.id} 
            onClick={props.flipCard} 
            height="100px" 
            width="65px" 
            alt="back of card" 
            src="../src/assets/cards/card_back.jpg">
          </img>}
        </>
    )
}

export default Card;
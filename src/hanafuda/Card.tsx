
function Card(props: {blank: boolean, flipCard: Function, id: string, chosenCard: string}) {

    return (
        <>
          {!props.blank ? <img id={props.id} alt={props.chosenCard} src={`../src/assets/cards/${props.chosenCard}.jpg`} height="100px" width="65px"></img> : <img id={props.id} onClick={props.flipCard} height="100px" width="65px" alt="back of card" src="../src/assets/cards/card_back.jpg"></img>}
        </>
    )
}

export default Card;
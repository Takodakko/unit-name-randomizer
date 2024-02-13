
function Card(props: {blank: boolean, flipCard: React.MouseEventHandler<HTMLImageElement>, id: string, chosenCard: string, monthValue: string}) {

    return (
        <>
          {!props.blank ? <img id={props.id} onClick={props.flipCard} alt={props.chosenCard} src={`../src/assets/cards/${props.chosenCard}.jpg`} height="100px" width="65px"></img> : <img id={props.id} onClick={props.flipCard} height="100px" width="65px" alt="back of card" src="../src/assets/cards/card_back.jpg"></img>}
        </>
    )
}

export default Card;
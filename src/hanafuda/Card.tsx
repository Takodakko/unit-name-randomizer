

function Card(props: {blank: boolean}) {

    const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_bird', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
    const randomNumber = Math.floor(Math.random() * cardList.length);
    const chosenCard = cardList[randomNumber];
    return (
        <>
          {!props.blank ? <img alt={chosenCard} src={`../src/assets/cards/${chosenCard}.jpg`} height="100px" width="65px"></img> : <img height="100px" width="65px" alt="back of card" src="../src/assets/cards/card_back.jpg"></img>}
        </>
    )
}

export default Card;
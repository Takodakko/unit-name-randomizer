import { useState } from 'react';
import GameBoard from './GameBoard';

function Hanafuda() {
  const [youWin, setYouWin] = useState(false);
  interface idMonthValue {
    [key: string]: string;
  }
  let shownMonthValueList: idMonthValue = {};
  let hiddenMonthValueList: idMonthValue = {};
  
  function assignToShown(id: string, month: string) {
    shownMonthValueList[id] = month;
    console.log(shownMonthValueList, 'shown')
    console.log(hiddenMonthValueList, 'hidden')
  }

  function assignToHidden(id: string, month: string) {
    hiddenMonthValueList[id] = month;
    console.log(shownMonthValueList, 'shown')
    console.log(hiddenMonthValueList, 'hidden')
  }

  function deleteFromHidden(id: string, month: string) {
    shownMonthValueList[id] = month;
    hiddenMonthValueList[id] = 'null';
    console.log(shownMonthValueList, 'shown')
    console.log(hiddenMonthValueList, 'hidden')
  }

  function getMonthValueFromHidden(id: string) {
    return hiddenMonthValueList[id];
  }

  function resetAllMonthValues() {
    shownMonthValueList = {};
    hiddenMonthValueList = {};
  }
  
  return (
    <>
      {youWin ? 
      <div>You win!</div> : 
      <div>Play a matching game?
        <GameBoard cardNumber={12} assignToShown={assignToShown} deleteFromHidden={deleteFromHidden} getMonthValueFromHidden={getMonthValueFromHidden} resetAllMonthValues={resetAllMonthValues} assignToHidden={assignToHidden}/>
      </div>}
    </>
  )
}

export default Hanafuda;
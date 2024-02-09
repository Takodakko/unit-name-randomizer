import ColorTile from './ColorTile';
import { useState } from 'react';

function ColorBoard(props: {tileNumber: number}) {
  const boardLengthArray: number[] = [];
  for (let i = 0; i < props.tileNumber * props.tileNumber; i++) {
    boardLengthArray.push(i);
  }
  const [boardChange, setBoardChange] = useState(boardLengthArray);
  const colorOptions = [
    'red',
    'blue',
    'yellow',
    'purple',
    'green',
    'orange',
    'brown',
    'white',
    'pink'
  ];
  function randomizeArray() {
    let arrayLength = boardChange.length;
    const nums: number[] = [];
    for (let k = 0; k < arrayLength; k++) {
      const number = Math.floor(Math.random() * arrayLength);
      nums.push(number);
    }
    setBoardChange(nums);
  };
  const rows: Array<JSX.Element> = [];
  for (let i = 0; i < props.tileNumber; i++) {
    const row: Array<JSX.Element> = [];
    for (let j = 0; j < props.tileNumber; j++) {
      const tile = <ColorTile colorchange={colorOptions[Math.floor(Math.random() * 9)]} randomizeArray={randomizeArray}/>
      row.push(tile);
    }
    rows.push(<div className="colorboardrow"> {...row} </div>);
  }
  return (
    <div className="colorboardbox">
      {
        ...rows
      }
    </div>
  )
}

export default ColorBoard;

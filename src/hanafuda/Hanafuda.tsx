import { useState } from 'react';
import Card from './Card';

function Hanafuda() {
  const [youWin, setYouWin] = useState(false);

  return (
    <>
      {youWin ? 
      <div>You win!</div> : 
      <div>Play a matching game?
        <br></br>
        <div className="cardrow">
          <div className="cardbox">
            <Card blank={false}/>
          </div>
          <div className="cardbox">
            <Card blank={false}/>
          </div>
          <div className="cardbox">
            <Card blank={false}/>
          </div>
        </div>
        <br></br>
        <div className="cardrow">
          <div className="cardbox">
            <Card blank={true}/>
          </div>
          <div className="cardbox">
            <Card blank={true}/>
          </div>
          <div className="cardbox">
            <Card blank={true}/>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Hanafuda;
import { useState } from 'react';
import './App.css';
import Crunc from './crunc/Crunc';
import ColorBoard from './color_board/ColorBoard';
import Hanafuda from './hanafuda/Hanafuda';

function App() {
  const [colorBoardSize, setColorBoardSize] = useState(3);

  function handleColorBoardSize(e: React.ChangeEvent<HTMLInputElement>) {
    const valueAsNumber = parseInt(e.target.value, 10);
    setColorBoardSize(valueAsNumber);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const displayedElement = {
    colorboard: false,
    crunc: false,
    hanafuda: false
  };
  const [showElement, setShowElement] = useState(displayedElement);

  return (
    <>
      <div className="buttonbox">
        <button onClick={() => {
          setShowElement({colorboard: false, crunc: !showElement.crunc, hanafuda: false});
          setColorBoardSize(3);
          }}>
          {showElement.crunc ? 'Hide Crunc?' : 'Show Crunc?'}
        </button>
        <button onClick={() => {
          setShowElement({colorboard: !showElement.colorboard, crunc: false, hanafuda: false});
          setColorBoardSize(3);
          }}>
          {showElement.colorboard ? 'Hide Color Board?' : 'Show Color Board?'}
        </button>
        <button onClick={() => {
          setShowElement({colorboard: false, crunc: false, hanafuda: !showElement.hanafuda});
          setColorBoardSize(3);
          }}>
          {showElement.hanafuda ? 'Hide Hanafuda?' : 'Show Hanafuda?'}
        </button>
      </div>
      <div>
        {showElement.crunc ? <Crunc /> : null}
      </div>
      {showElement.colorboard ? <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="boardsize">How big a board? </label>
          <input id="boardsize" onChange={handleColorBoardSize}></input>
        </form>
        <ColorBoard tileNumber={colorBoardSize} />
      </div> : null}
      {showElement.hanafuda ? <Hanafuda /> : null}
    </>
  )
}

export default App

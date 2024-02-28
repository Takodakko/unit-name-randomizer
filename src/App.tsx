import { useState } from 'react';
import './App.css';
import Crunc from './crunc/Crunc';
import ColorBoard from './color_board/ColorBoard';
import Hanafuda from './hanafuda/Hanafuda';
import Memory from './memory/Memory';

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
    hanafuda: false,
    memory: false
  };
  const [showElement, setShowElement] = useState(displayedElement);
  function changeShownElement(el: 'colorboard' | 'crunc' | 'hanafuda' | 'memory') {
    const copyShowElement = {...showElement};
    const targetElementValue = !showElement[el];
    copyShowElement.colorboard = false;
    copyShowElement.crunc = false;
    copyShowElement.hanafuda = false;
    copyShowElement.memory = false;
    copyShowElement[el] = targetElementValue;
    setShowElement(copyShowElement);
  }

  return (
    <>
      <div className="buttonbox">
        <button onClick={() => {
          changeShownElement('crunc');
          setColorBoardSize(3);
          }}>
          {showElement.crunc ? 'Hide Crunc?' : 'Show Crunc?'}
        </button>
        <button onClick={() => {
          changeShownElement('colorboard');
          setColorBoardSize(3);
          }}>
          {showElement.colorboard ? 'Hide Color Board?' : 'Show Color Board?'}
        </button>
        <button onClick={() => {
          changeShownElement('hanafuda');
          setColorBoardSize(3);
          }}>
          {showElement.hanafuda ? 'Hide Hanafuda?' : 'Show Hanafuda?'}
        </button>
        <button onClick={() => {
          changeShownElement('memory');
          setColorBoardSize(3);
          }}>
          {showElement.memory ? 'Hide Memory?' : 'Show Memory?'}
        </button>
      </div>
      <div className="contentbox">
        {showElement.crunc ? <Crunc /> : null}
        {showElement.colorboard ? <div>
          <form onSubmit={onSubmit}>
            <label htmlFor="boardsize">How big a board? </label>
            <input id="boardsize" onChange={handleColorBoardSize}></input>
          </form>
          <ColorBoard tileNumber={colorBoardSize} />
      </div> : null}
        {showElement.hanafuda ? <Hanafuda /> : null}
        {showElement.memory ? <Memory /> : null}
      </div>
    </>
  )
}

export default App

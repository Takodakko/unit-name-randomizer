import { useState } from 'react';
import adjectives from '../assets/zenhan.json';
import nouns from '../assets/kouhan.json';

function Crunc() {
    const chooseRandom = (whichList: string): number => {
        if (whichList === 'adjectives') {
          return Math.floor(Math.random() * (adjectives.list.length));
        } else {
          return Math.floor(Math.random() * (nouns.list.length));
        }
      }
      const [adjective, setAdjective] = useState(adjectives.list[0]);
      const [noun, setNoun] = useState(nouns.list[0]);
      const setAdjectiveAndNoun = function() {
        setAdjective((adjective) => {
          adjective = adjectives.list[chooseRandom('adjectives')]
          return adjective;
        });
        setNoun((noun) => {
          noun = nouns.list[chooseRandom('nouns')]
          return noun;
        });
      }
      
      const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    
      return (
        <div className="cruncbox">
          <h1>Clever Random Unit Name Creator (CRUNC)</h1>
          <div className="card">
            <button onClick={() => setAdjectiveAndNoun()}>
              clicky
            </button><p></p>
            {vowels.includes(adjective[0]) ? 'An' : 'A'} {adjective} {noun}
          </div>
        </div>
      )
}

export default Crunc;
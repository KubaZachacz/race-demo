import { useState } from 'react';
import './App.css';
import speedway from "./assets/speedway.svg";
import { Player, Animation } from './animation/animation';
import { getRandom } from './utils';

function App() {
  const [players, setPlayers] = useState([]);

  const handlePrepare = () => {
    const sourceContainer = document.getElementById('source');
    const source = sourceContainer.contentDocument;
    const svg = source.querySelector('svg');

    const track = source.querySelector('#track path');
    const sourceSprite = source.querySelector('#player');

    const viewBox = svg.viewBox.baseVal;

    const sprite = sourceSprite.cloneNode(true);
    sprite.id = `player_${players.length}`;

    svg.appendChild(sprite);

    const player = new Player(sprite, track, viewBox);

    const offset = {
      x: 25,
      y: 30 * players.length
    }

    const maxVelocity = getRandom(25, 50) / 10;
    const acceleration = getRandom(4, 7) / 100;

    console.log(maxVelocity, acceleration)

    player.prepare(offset, maxVelocity, acceleration);

    setPlayers([...players, player]);
  }

  const handleStart = () => {
    const animation = new Animation(players);
    const laps = document.getElementById('laps').value;

    animation.start(laps);
  }

  return (
    <div className="App">
      <div className="speedway">
        <object id="source" data={speedway}></object>
      </div>
      <div className="control">
        <button onClick={handlePrepare}>Prepare</button>
        <button onClick={handleStart}>Start</button>
        <div>
          <label htmlFor="laps">laps</label>
          <input type="number" name="laps" id="laps" defaultValue="1" />
        </div>
        {/* <div>
          <label htmlFor="duration">duration: <span id="duration-val">5000</span>ms</label>
          <input type="range" name="duration" id="duration" min="500" max="30000" step="250" defaultValue="5000" />
        </div> */}
        {/* <div>
          <label htmlFor="offset">offset: <span id="offset-val">50</span>px</label>
          <input type="range" name="offset" id="offset" min="0" max="150" step="1" defaultValue="0" />
        </div> */}
      </div>
    </div>
  );
}

export default App;
